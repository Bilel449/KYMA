/*! KYMA motion v1.0 — JS natif, sans dépendance (~11 Ko non minifié).
 *  Révélations au scroll, parallaxe/zoom doux, dessin des vagues du logo, motif « KYMA Wave » (canvas),
 *  carrousel des coloris, transitions de page, micro-interactions CTA.
 *  Pause hors écran / onglet caché. Tout est désactivé sous prefers-reduced-motion
 *  (le motif reste affiché en image fixe). Chargement unique : garde window.KYMA. */
(function () {
  'use strict';
  if (window.KYMA) return;
  var w = window, d = document, root = d.documentElement;
  var mq = w.matchMedia ? w.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var K = w.KYMA = { reduced: mq.matches };
  var editor = !!(w.Shopify && w.Shopify.designMode);
  var hasIO = 'IntersectionObserver' in w;
  var heroSync = [];

  function $(s, c) { return [].slice.call((c || d).querySelectorAll(s)); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  /* Le CSS/JS peut être demandé par plusieurs sections : on ne garde qu'un exemplaire. */
  function dedupe() {
    var seen = {};
    $('[data-kyma-asset]').forEach(function (n) {
      var k = n.getAttribute('data-kyma-asset');
      if (seen[k]) n.parentNode.removeChild(n); else seen[k] = 1;
    });
  }

  /* ── Pause des animations CSS hors écran ─────────────────────────────── */
  var live = hasIO ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.target.classList.toggle('kyma-off', !e.isIntersecting); });
  }, { rootMargin: '10% 0px' }) : null;

  /* ── Révélations au scroll + dessin des vagues ───────────────────────── */
  var rev = hasIO ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); rev.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;

  function prepWave(svg) {
    if (K.reduced || svg._k) return;
    svg._k = 1;
    $('path', svg).forEach(function (p, i) {
      var L = Math.ceil((p.getTotalLength && p.getTotalLength()) || 700) + 2;
      p.style.setProperty('--len', L);
      p.style.setProperty('--i', i);
    });
    svg.setAttribute('data-ready', '');
  }

  function reveal(scope) {
    $('[data-kyma-reveal], .kyma-waves', scope).forEach(function (el) {
      if (el.classList.contains('is-in')) return;
      if (K.reduced || !rev || editor) el.classList.add('is-in'); else rev.observe(el);
    });
  }

  /* ── Parallaxe (data-kyma-parallax="0.3") et zoom (data-kyma-zoom="1.2,1.7") ── */
  var items = [], queued = 0;
  var io2 = hasIO ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.target._v = e.isIntersecting; });
    tick();
  }, { rootMargin: '15% 0px' }) : null;

  function tick() { if (!queued) queued = w.requestAnimationFrame(run); }
  function run() {
    queued = 0;
    if (K.reduced || d.hidden) return;
    var vh = w.innerHeight || 800;
    items = items.filter(function (el) { return el.isConnected; });
    items.forEach(function (el) {
      var h = el.parentElement || el;
      if (!h._v) return;
      var r = h.getBoundingClientRect();
      var ps = el.getAttribute('data-kyma-parallax'), z = el.getAttribute('data-kyma-zoom');
      if (ps) el.style.setProperty('--kpy', (-(r.top + r.height / 2 - vh / 2) / vh * parseFloat(ps) * 100).toFixed(1) + 'px');
      if (z) {
        var a = z.split(','), f = parseFloat(a[0]) || 1, t = parseFloat(a[1]) || f;
        el.style.setProperty('--kz', (f + (t - f) * clamp((vh - r.top) / (vh + r.height), 0, 1)).toFixed(3));
      }
    });
  }
  function initPar(scope) {
    if (K.reduced || !io2) return;
    $('[data-kyma-parallax], [data-kyma-zoom]', scope).forEach(function (el) {
      if (el._p) return;
      el._p = 1; items.push(el); io2.observe(el.parentElement || el);
    });
  }

  /* ── Motif « KYMA Wave » : marbrure tonale par bruit de gradient + déformation de domaine ── */
  function noise(seed) {
    var p = new Uint8Array(512), s = seed || 1, i, j, t;
    var G = [1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 0, 1, 0, -1];
    for (i = 0; i < 256; i++) p[i] = i;
    for (i = 255; i > 0; i--) {
      s = (s * 1664525 + 1013904223) >>> 0; j = s % (i + 1); t = p[i]; p[i] = p[j]; p[j] = t;
    }
    for (i = 0; i < 256; i++) p[i + 256] = p[i];
    function g(h, x, y) { h = (h & 7) * 2; return G[h] * x + G[h + 1] * y; }
    function fade(v) { return v * v * v * (v * (v * 6 - 15) + 10); }
    return function (x, y) {
      var X = Math.floor(x), Y = Math.floor(y), u, v, a, b, n0, n1;
      x -= X; y -= Y; X &= 255; Y &= 255; u = fade(x); v = fade(y);
      a = p[X] + Y; b = p[X + 1] + Y;
      n0 = g(p[a], x, y) + u * (g(p[b], x - 1, y) - g(p[a], x, y));
      n1 = g(p[a + 1], x, y - 1) + u * (g(p[b + 1], x - 1, y - 1) - g(p[a + 1], x, y - 1));
      return n0 + v * (n1 - n0);
    };
  }
  function rgb(h, f) {
    h = String(h || f).replace('#', '');
    if (h.length === 3) h = h.replace(/./g, '$&$&');
    var n = parseInt(h, 16) || 0;
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }

  function hero(el) {
    var cv = el.querySelector('canvas'), ctx = cv && cv.getContext && cv.getContext('2d');
    if (!ctx || el._h) return;
    el._h = 1;
    var A = rgb(el.getAttribute('data-color-a'), 'F5EDE4'), B = rgb(el.getAttribute('data-color-b'), 'E9DCE6');
    var sv = parseFloat(el.getAttribute('data-speed')), sp = (isNaN(sv) ? 30 : sv) / 100;
    var sc = (parseFloat(el.getAttribute('data-scale')) || 100) / 100;
    var N = noise((Math.random() * 4294967296) >>> 0);       /* graine différente à chaque visite */
    var ox = Math.random() * 60, oy = Math.random() * 60, t = Math.random() * 50;
    var W, H, img, last = 0, raf = 0, run = false, vis = true, qual = 1, slow = 0, lw = 0, rt;

    function f(x, y) { return N(x, y) * 0.5 + N(x * 2.1 + 5.2, y * 2.1 + 1.3) * 0.25; }
    function g(x, y) { return f(x, y) + N(x * 4.3 + 9.1, y * 4.3 + 3.7) * 0.125; }
    function size() {
      var w0 = el.clientWidth || 800, h0 = el.clientHeight || 600;
      var k = Math.min(1, (w.innerWidth < 750 ? 120 : 180) * qual / w0);
      W = Math.max(48, Math.round(w0 * k)); H = Math.max(48, Math.round(h0 * k));
      cv.width = W; cv.height = H; img = ctx.createImageData(W, H); lw = w0;
    }
    function frame() {
      var o = img.data, i = 0, z = t * 0.05, S = 1.7 / sc, asp = W / H, x, y, px, py, qx, qy, rx, ry, v, m, k;
      for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
        px = x / W * asp * S + ox; py = y / H * S + oy;
        qx = f(px + z, py); qy = f(px + 5.2, py + 1.3 - z);
        rx = f(px + 3 * qx + 1.7 + z * 0.6, py + 3 * qy + 9.2);
        ry = f(px + 3 * qx + 8.3, py + 3 * qy + 2.8 - z * 0.6);
        v = g(px + 3 * rx, py + 3 * ry);
        m = 0.5 + 0.5 * Math.sin(v * 9 + rx * 4); m = m * m * (3 - 2 * m);
        k = 0.975 + 0.05 * (v + 0.5);                       /* relief très léger : toujours tonal */
        o[i++] = (A[0] + (B[0] - A[0]) * m) * k;
        o[i++] = (A[1] + (B[1] - A[1]) * m) * k;
        o[i++] = (A[2] + (B[2] - A[2]) * m) * k;
        o[i++] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }
    function loop(ts) {
      if (!run) return;
      raf = w.requestAnimationFrame(loop);
      if (ts - last < 48) return;                            /* ~20 images/s : mouvement lent */
      t += (last ? Math.min((ts - last) / 1000, 0.2) : 0.05) * sp * 1.2; last = ts;
      var t0 = w.performance.now(); frame();
      if (w.performance.now() - t0 > 30) { if (++slow > 4 && qual > 0.4) { qual *= 0.75; slow = 0; size(); } } else slow = 0;
    }
    function sync() {
      if (!el.isConnected) { run = false; w.cancelAnimationFrame(raf); return; }
      var go = vis && !d.hidden && !K.reduced && sp > 0;
      if (go && !run) { run = true; last = 0; raf = w.requestAnimationFrame(loop); }
      else if (!go && run) { run = false; w.cancelAnimationFrame(raf); }
    }
    size(); frame();                                         /* image fixe immédiate (aussi en mouvement réduit) */
    if (hasIO) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; sync(); }).observe(el);
    w.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        if (el.isConnected && Math.abs(el.clientWidth - lw) > 30) { size(); if (!run) frame(); }
      }, 200);
    });
    heroSync.push(sync); sync();
  }

  /* ── Carrousel des coloris : boutons, clavier (zone focusable), glisser à la souris ── */
  function carousel(box) {
    if (box._c) return;
    box._c = 1;
    var btns = $('[data-kyma-scroll]', box.closest('section') || d), down = false, sx = 0, sl = 0, moved = 0, q = 0;
    function upd() {
      var max = box.scrollWidth - box.clientWidth - 2;
      btns.forEach(function (b) {
        b.disabled = +b.getAttribute('data-kyma-scroll') < 0 ? box.scrollLeft <= 2 : box.scrollLeft >= max;
      });
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var it = box.querySelector('li'), step = (it ? it.getBoundingClientRect().width : 300) + 16;
        box.scrollBy({ left: +b.getAttribute('data-kyma-scroll') * step, behavior: K.reduced ? 'auto' : 'smooth' });
      });
    });
    box.addEventListener('scroll', function () {
      if (!q) q = w.requestAnimationFrame(function () { q = 0; upd(); });
    }, { passive: true });
    w.addEventListener('resize', upd);
    box.addEventListener('dragstart', function (e) { e.preventDefault(); });
    box.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button) return;
      down = true; moved = 0; sx = e.clientX; sl = box.scrollLeft;
    });
    w.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
      if (moved > 4) { box.classList.add('is-drag'); box.scrollLeft = sl - dx; }
    });
    w.addEventListener('pointerup', function () {
      down = false; setTimeout(function () { box.classList.remove('is-drag'); }, 0);
    });
    box.addEventListener('click', function (e) {
      if (moved > 4) { e.preventDefault(); e.stopPropagation(); moved = 0; }
    }, true);
    upd();
  }

  /* ── Header : hauteur mesurée (le hero glisse dessous) + état « scrollé » ── */
  function header() {
    var h = d.querySelector('.section-header');
    function set() { if (h) root.style.setProperty('--kyma-header-h', h.offsetHeight + 'px'); }
    function sc() { root.classList.toggle('kyma-scrolled', (w.pageYOffset || 0) > 8); tick(); }
    if (h) { set(); if (w.ResizeObserver) new ResizeObserver(set).observe(h); else w.addEventListener('resize', set); }
    w.addEventListener('scroll', sc, { passive: true });
    w.addEventListener('resize', tick);
    sc();
  }

  /* ── Transitions de page en fondu (liens internes uniquement) ── */
  function transitions() {
    if (K.reduced || editor) return;
    d.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || K.reduced) return;
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download') || a.hasAttribute('data-kyma-no-transition')) return;
      if (a.origin !== w.location.origin || /^\/checkout/.test(a.pathname)) return;
      if (a.pathname === w.location.pathname && a.search === w.location.search) return;
      e.preventDefault();
      root.classList.add('kyma-leaving');
      setTimeout(function () { w.location.href = a.href; }, 280);
      setTimeout(function () { root.classList.remove('kyma-leaving'); }, 3000);
    });
    w.addEventListener('pageshow', function (e) { if (e.persisted) root.classList.remove('kyma-leaving'); });
  }

  /* ── Micro-interaction CTA : halo lilas qui suit le pointeur ── */
  function glow() {
    d.addEventListener('pointermove', function (e) {
      if (K.reduced || e.pointerType !== 'mouse') return;
      var b = e.target.closest && e.target.closest('.kyma-btn');
      if (!b) return;
      var r = b.getBoundingClientRect();
      b.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      b.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  /* ── Initialisation ── */
  function init(scope) {
    dedupe();
    $('.kyma-waves', scope).forEach(prepWave);
    reveal(scope);
    initPar(scope);
    $('[data-kyma-hero]', scope).forEach(hero);
    $('[data-kyma-carousel]', scope).forEach(carousel);
    if (live) $('[data-kyma-live]', scope).forEach(function (e) { live.observe(e); });
    tick();
  }
  function ready() {
    root.classList.add('kyma-ready');
    init(d); header(); transitions(); glow();
  }
  d.addEventListener('visibilitychange', function () {
    root.classList.toggle('kyma-paused', d.hidden);
    heroSync.forEach(function (s) { s(); });
    tick();
  });
  function onMotionChange() {
    K.reduced = mq.matches;
    if (K.reduced) $('[data-kyma-reveal], .kyma-waves').forEach(function (e) { e.classList.add('is-in'); });
    heroSync.forEach(function (s) { s(); });
  }
  if (mq.addEventListener) mq.addEventListener('change', onMotionChange);
  else if (mq.addListener) mq.addListener(onMotionChange);
  d.addEventListener('shopify:section:load', function (e) { init(e.target); });

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', ready); else ready();
})();
