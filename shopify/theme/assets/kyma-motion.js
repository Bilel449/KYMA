/*! KYMA motion v2.0 — natif, sans dépendance. Charge unique (garde window.KYMA).
 *  Défilement doux, curseur, barre de progression en vague, rideau-vague entre les pages, titres lettre à lettre,
 *  révélations, bouton magnétique, bandeau défilant, sélecteur de coloris 3D, plongée épinglée, dessin technique,
 *  anneaux Cercle Waves, synchronisation des variantes Dawn, repli Spline. Monte les scènes kyma-3d après le 1er rendu.
 *  prefers-reduced-motion : tout est statique et lisible. Pause hors écran / onglet caché. */
(function (w, d) {
  'use strict';
  if (w.KYMA) return;
  var root = d.documentElement;
  var mq = w.matchMedia ? w.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var K = w.KYMA = { reduced: mq.matches };
  var editor = !!(w.Shopify && w.Shopify.designMode);
  var fine = !!(w.matchMedia && w.matchMedia('(hover: hover) and (pointer: fine)').matches);
  var hasIO = 'IntersectionObserver' in w;
  var tasks = [], raf = 0, lastT = 0, lastY = 0, vel = 0, SS = { on: false, cur: 0, target: 0, active: false };

  function $(s, c) { return [].slice.call((c || d).querySelectorAll(s)); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function el(tag, cls, html) { var n = d.createElement(tag); if (cls) n.className = cls; if (html) n.innerHTML = html; return n; }
  function IO(fn, o) { return hasIO ? new IntersectionObserver(fn, o) : null; }
  function headerH() { var h = d.querySelector('.section-header, .shopify-section-header'); return h ? h.offsetHeight : 0; }
  function maxY() { return Math.max(0, root.scrollHeight - w.innerHeight); }

  /* ── 0. ressources dédoublonnées (plusieurs sections appellent kyma-assets) ─────────────── */
  function dedupe() {
    var seen = {};
    $('[data-kyma-asset]').forEach(function (n) {
      var k = n.getAttribute('data-kyma-asset');
      if (seen[k]) n.parentNode.removeChild(n); else seen[k] = 1;
    });
  }

  /* ── 1. titres lettre par lettre (texte complet conservé pour les lecteurs d'écran) ──────── */
  function split(node) {
    if (node._split) return; node._split = 1;
    var label = node.textContent.replace(/\s+/g, ' ').trim(), box = el('span', 'kyma-split'), i = 0;
    box.setAttribute('aria-hidden', 'true');
    (function walk(src, out) {
      [].slice.call(src.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          c.data.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { out.appendChild(d.createTextNode(' ')); return; }
            var wd = el('span', 'kyma-word');
            part.split('').forEach(function (ch) { var s = el('span', 'kyma-ch'); s.textContent = ch; s.style.setProperty('--ci', i++); wd.appendChild(s); });
            out.appendChild(wd);
          });
        } else if (c.nodeType === 1) {
          var cl = c.cloneNode(false); out.appendChild(cl); if (c.tagName !== 'BR') walk(c, cl);
        }
      });
    })(node, box);
    node.textContent = '';
    var vh = el('span', 'kyma-vh'); vh.textContent = label;
    node.appendChild(vh); node.appendChild(box);
    node.classList.add('is-split');
  }

  /* ── 2. révélations au défilement ─────────────────────────────────────────────────────── */
  var rev = IO(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); rev.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  function reveal(scope) {
    $('.kyma-sec__title, [data-kyma-split]', scope).forEach(function (t) {
      if (!K.reduced) split(t);
      if (!t.hasAttribute('data-kyma-reveal') && !t.closest('[data-kyma-reveal]')) t.setAttribute('data-kyma-reveal', '');
    });
    $('[data-kyma-reveal], .kyma-waves', scope).forEach(function (n) {
      if (n.closest('.kyma-hero')) return; /* le hero se révèle seul au chargement */
      if (K.reduced || !rev || editor) n.classList.add('is-in'); else rev.observe(n);
    });
  }

  /* ── 3. défilement doux interpolé (souris/pavé uniquement ; jamais tactile ni mouvement réduit) */
  function scrollable(t, dy) {
    for (; t && t !== d.body && t !== root; t = t.parentElement) {
      var s = w.getComputedStyle(t), o = s.overflowY;
      if ((o === 'auto' || o === 'scroll') && t.scrollHeight > t.clientHeight + 1) {
        if ((dy > 0 && t.scrollTop + t.clientHeight < t.scrollHeight - 1) || (dy < 0 && t.scrollTop > 0)) return true;
      }
    }
    return false;
  }
  function smooth() {
    if (K.reduced || !fine || editor || root.hasAttribute('data-kyma-native-scroll')) return;
    SS.on = true; SS.cur = SS.target = w.scrollY; root.classList.add('kyma-smooth');
    w.addEventListener('wheel', function (e) {
      if (e.ctrlKey || e.defaultPrevented || scrollable(e.target, e.deltaY) || d.body.style.overflow === 'hidden' || root.classList.contains('overflow-hidden')) return;
      e.preventDefault();
      var dy = e.deltaY * (e.deltaMode === 1 ? 36 : e.deltaMode === 2 ? w.innerHeight : 1);
      if (!SS.active) SS.cur = w.scrollY;
      SS.target = clamp((SS.active ? SS.target : w.scrollY) + dy, 0, maxY());
      SS.active = true; wake();
    }, { passive: false });
    w.addEventListener('scroll', function () { if (!SS.active) SS.cur = SS.target = w.scrollY; }, { passive: true });
    ['keydown', 'pointerdown', 'touchstart'].forEach(function (ev) { w.addEventListener(ev, function () { SS.active = false; }, { passive: true }); });
  }
  function goTo(y) {
    y = clamp(y, 0, maxY());
    if (SS.on) { SS.cur = w.scrollY; SS.target = y; SS.active = true; wake(); }
    else w.scrollTo({ top: y, behavior: K.reduced ? 'auto' : 'smooth' });
  }
  function anchors() {
    d.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var id = a.getAttribute('href').slice(1), t = id ? d.getElementById(decodeURIComponent(id)) : null;
      if (!t && id !== 'top' && id !== '') return;
      e.preventDefault();
      goTo(t ? t.getBoundingClientRect().top + w.scrollY - headerH() : 0);
      if (t) { if (!t.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(t.tagName)) t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); }
      if (w.history && history.pushState) history.pushState(null, '', '#' + id);
    });
  }

  /* ── 4. boucle commune (défilement, vitesse, tâches liées au scroll) ─────────────────── */
  function loop(now) {
    raf = 0;
    var dt = lastT ? Math.min(0.1, (now - lastT) / 1000) : 1 / 60; lastT = now;
    if (SS.active) {
      SS.cur += (SS.target - SS.cur) * (1 - Math.exp(-dt * 8.5));
      if (Math.abs(SS.target - SS.cur) < 0.6) { SS.cur = SS.target; SS.active = false; }
      w.scrollTo(0, SS.cur);
    }
    var y = w.scrollY, v = (y - lastY) / dt; lastY = y;
    vel += (v - vel) * (1 - Math.exp(-dt * 6));
    var keep = SS.active || Math.abs(vel) > 2;
    for (var i = 0; i < tasks.length; i++) if (tasks[i](dt, y, vel) === true) keep = true;
    if (keep && !d.hidden) raf = w.requestAnimationFrame(loop); else lastT = 0;
  }
  function wake() { if (!raf && !K.reduced) raf = w.requestAnimationFrame(loop); }
  function prog(n) { var r = n.getBoundingClientRect(), vh = w.innerHeight; return { r: r, vh: vh, on: r.bottom > -vh * 0.2 && r.top < vh * 1.2 }; }

  /* ── 5. barre de progression en forme de vague ───────────────────────────────────────── */
  function progress() {
    if (editor) return;
    var bar = el('div', 'kyma-progress', '<svg viewBox="0 0 1000 14" preserveAspectRatio="none" focusable="false"><path pathLength="1"/></svg>');
    bar.setAttribute('aria-hidden', 'true'); d.body.appendChild(bar);
    var path = bar.querySelector('path'), ph = 0, amp = 2;
    function wave() {
      var s = 'M0 7', x;
      for (x = 0; x <= 1000; x += 20) s += ' L' + x + ' ' + (7 + Math.sin(x / 1000 * Math.PI * 22 + ph) * amp).toFixed(2);
      path.setAttribute('d', s);
    }
    function set(y) { path.style.strokeDashoffset = (1 - clamp(y / (maxY() || 1), 0, 1)).toFixed(4); }
    wave(); set(w.scrollY);
    if (K.reduced) { w.addEventListener('scroll', function () { set(w.scrollY); }, { passive: true }); return; }
    tasks.push(function (dt, y, v) {
      var a = 1.6 + Math.min(Math.abs(v) * 0.0035, 4);
      amp += (a - amp) * (1 - Math.exp(-dt * 5)); ph += dt * (1.2 + Math.min(Math.abs(v) * 0.01, 10));
      wave(); set(y);
      return amp > 1.7;
    });
  }

  /* ── 6. curseur : anneau qui suit avec inertie, grossit sur les liens, onde au clic ──── */
  function cursor() {
    if (!fine || K.reduced || editor) return;
    var c = el('div', 'kyma-cursor', '<span class="kyma-cursor__ring"></span><span class="kyma-cursor__dot"></span>');
    c.setAttribute('aria-hidden', 'true'); d.body.appendChild(c);
    var ring = c.firstChild, dot = c.lastChild, x = -100, y = -100, rx = -100, ry = -100, shown = false;
    var SEL = 'a, button, summary, label, select, [role="button"], [data-kyma-cursor], input[type="submit"]';
    w.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; rx = x; ry = y; c.classList.add('is-on'); }
      var t = e.target.closest ? e.target.closest(SEL) : null;
      c.classList.toggle('is-link', !!t);
      c.classList.toggle('is-text', !!(e.target.closest && e.target.closest('input:not([type="submit"]), textarea')));
      dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      wake();
    }, { passive: true });
    d.addEventListener('pointerleave', function () { shown = false; c.classList.remove('is-on'); });
    w.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = el('span', 'kyma-cursor__wave'); r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px';
      c.appendChild(r); c.classList.add('is-down');
      setTimeout(function () { if (r.parentNode) r.parentNode.removeChild(r); }, 900);
    }, { passive: true });
    w.addEventListener('pointerup', function () { c.classList.remove('is-down'); }, { passive: true });
    tasks.push(function (dt) {
      var k = 1 - Math.exp(-dt * 14);
      rx += (x - rx) * k; ry += (y - ry) * k;
      ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
      return Math.abs(x - rx) + Math.abs(y - ry) > 0.3;
    });
  }

  /* ── 7. bouton magnétique ─────────────────────────────────────────────────────────────── */
  function magnetic(scope) {
    if (!fine || K.reduced) return;
    $('[data-kyma-magnetic]', scope).forEach(function (b) {
      if (b._mag) return; b._mag = 1;
      var inner = b.querySelector('span');
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        b.style.transform = 'translate3d(' + (dx * 0.28).toFixed(1) + 'px,' + (dy * 0.38).toFixed(1) + 'px,0)';
        if (inner) inner.style.transform = 'translate3d(' + (dx * 0.12).toFixed(1) + 'px,' + (dy * 0.14).toFixed(1) + 'px,0)';
        b.style.setProperty('--mx', (e.clientX - r.left) + 'px'); b.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; if (inner) inner.style.transform = ''; });
    });
  }

  /* ── 8. rideau-vague entre les pages ─────────────────────────────────────────────────── */
  function curtain() {
    var c = el('div', 'kyma-curtain', '<svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false"><path class="kyma-curtain__a"/><path class="kyma-curtain__b"/></svg>');
    c.setAttribute('aria-hidden', 'true'); d.body.appendChild(c);
    var pa = c.querySelector('.kyma-curtain__a'), pb = c.querySelector('.kyma-curtain__b');
    function shape(p, up) { /* p 0..1 ; up=false : monte depuis le bas ; up=true : se retire vers le haut */
      var e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2, bend = Math.sin(p * Math.PI) * 18, L;
      if (!up) { L = 100 - e * 100; return 'M0 100 L0 ' + L + ' Q25 ' + (L - bend) + ' 50 ' + L + ' T100 ' + L + ' L100 100 Z'; }
      L = 100 - e * 100; return 'M0 0 L100 0 L100 ' + L + ' Q75 ' + (L + bend) + ' 50 ' + L + ' T0 ' + L + ' Z';
    }
    function run(up, ms, done) {
      var t0 = 0; c.classList.add('is-on');
      (function f(now) {
        if (!t0) t0 = now;
        var p = clamp((now - t0) / ms, 0, 1), q = clamp((now - t0 - ms * 0.14) / ms, 0, 1);
        pa.setAttribute('d', shape(up ? q : p, up)); pb.setAttribute('d', shape(up ? p : q, up));
        if (p < 1 || q < 1) w.requestAnimationFrame(f); else if (done) done();
      })(performance.now());
    }
    K.curtain = function (href) {
      run(false, 760, function () {
        try { sessionStorage.setItem('kyma-curtain', '1'); } catch (e) { /* stockage indisponible */ }
        if (href) w.location.href = href; else run(true, 760, function () { c.classList.remove('is-on'); });
      });
    };
    if (root.classList.contains('kyma-arrive')) {
      try { sessionStorage.removeItem('kyma-curtain'); } catch (e) { /* stockage indisponible */ }
      pa.setAttribute('d', 'M0 0H100V100H0Z'); pb.setAttribute('d', 'M0 0H100V100H0Z'); c.classList.add('is-on');
      root.classList.remove('kyma-arrive');
      setTimeout(function () { run(true, 820, function () { c.classList.remove('is-on'); }); }, 60);
    }
    w.addEventListener('pageshow', function (e) { if (e.persisted) c.classList.remove('is-on'); });
    if (K.reduced || editor) return;
    d.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target && a.target !== '_self') return;
      if (a.hasAttribute('download') || a.closest('[data-kyma-no-curtain]')) return;
      var u; try { u = new URL(a.href, w.location.href); } catch (er) { return; }
      if (u.origin !== w.location.origin || !/^https?:$/.test(u.protocol)) return;
      if (u.pathname === w.location.pathname && u.search === w.location.search) return; /* ancre de la même page */
      if (/^\/(cart|checkout|account)/.test(u.pathname)) return;
      e.preventDefault(); K.curtain(u.href);
    });
  }

  /* ── 9. bandeau défilant : vitesse et inclinaison suivent la vitesse de défilement ───── */
  function marquee(scope) {
    $('[data-kyma-marquee]', scope).forEach(function (m) {
      if (m._mq) return; m._mq = 1;
      var track = m.querySelector('.kyma-marquee__track'), item = track && track.firstElementChild;
      if (!item) return;
      var n = Math.max(2, Math.ceil((w.innerWidth * 2) / (item.offsetWidth || 300)) + 1);
      for (var i = 1; i < n; i++) { var cl = item.cloneNode(true); cl.setAttribute('aria-hidden', 'true'); track.appendChild(cl); }
      if (K.reduced) return;
      var x = 0, sk = 0, dir = parseFloat(m.getAttribute('data-direction')) || 1, base = parseFloat(m.getAttribute('data-speed')) || 50, vis = true, sgn = 1;
      var o = IO(function (es) { vis = es[0].isIntersecting; if (vis) wake(); }); if (o) o.observe(m);
      tasks.push(function (dt, y, v) {
        if (!vis) return false;
        var wdt = item.offsetWidth || 1;
        if (Math.abs(v) > 30) sgn = v > 0 ? 1 : -1;
        x -= (base + Math.min(Math.abs(v) * 0.35, 900)) * dt * dir * sgn;
        x = ((x % wdt) - wdt) % wdt;
        sk += (clamp(-v * 0.006, -9, 9) - sk) * (1 - Math.exp(-dt * 6));
        track.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0) skewX(' + sk.toFixed(2) + 'deg)';
        return true;
      });
      wake();
    });
  }

  /* ── 10. scènes 3D : montées après le premier rendu ──────────────────────────────────── */
  function scene(cv) { return cv && cv._k3d && cv._k3d.ok ? cv._k3d : null; }
  function mount3d(scope) {
    var X = w.KYMA3D;
    $('canvas[data-kyma-3d]', scope).forEach(function (cv) {
      var host = cv.closest('[data-kyma-3d-host]') || cv.parentNode;
      if (!X) { host.classList.add('kyma3d-off'); return; }
      if (cv._k3d || cv.hidden) return;
      var sh = cv.getAttribute('data-shift');
      X.mount(cv, {
        scene: cv.getAttribute('data-kyma-3d') || 'hero', colorway: cv.getAttribute('data-colorway') || 'lilac-whirl',
        host: host, follow: cv.getAttribute('data-follow') !== 'false', interactive: cv.getAttribute('data-interactive') !== 'false',
        shift: sh ? sh.split(',').map(parseFloat) : null, pattern: parseFloat(cv.getAttribute('data-pattern')) || 0
      });
    });
  }
  function after(fn) {
    var go = function () { (w.requestIdleCallback || function (f) { return setTimeout(f, 60); })(fn, { timeout: 900 }); };
    if (d.readyState === 'complete') w.requestAnimationFrame(go); else w.addEventListener('load', function () { w.requestAnimationFrame(go); });
  }

  /* ── 11. hero : titre, défilement -> caméra & forme ──────────────────────────────────── */
  function hero(scope) {
    $('[data-kyma-hero]', scope).forEach(function (h) {
      if (h._h) return; h._h = 1;
      var go = function () { h.classList.add('is-in'); };
      if (K.reduced) go(); else if (d.fonts && d.fonts.ready) { d.fonts.ready.then(go); setTimeout(go, 1200); } else go();
      if (K.reduced) return;
      var last = -1;
      tasks.push(function (dt, y) {
        var P = prog(h); if (!P.on) return false;
        var p = clamp(-P.r.top / (P.r.height || 1), 0, 1);
        if (Math.abs(p - last) > 0.002) {
          last = p; h.style.setProperty('--hp', p.toFixed(3));
          var s = scene(h.querySelector('canvas[data-kyma-3d]')); if (s) s.set({ morph: p });
        }
        return false;
      });
    });
  }

  /* ── 12. 01 Coloris : survol / clic / focus -> couleurs 3D + nom animé ───────────────── */
  function colorways(scope) {
    $('[data-kyma-colorways]', scope).forEach(function (sec) {
      if (sec._cw) return; sec._cw = 1;
      var opts = $('[data-colorway]', sec).filter(function (b) { return b.tagName === 'BUTTON'; });
      var name = sec.querySelector('[data-kyma-cw-name]'), desc = sec.querySelector('[data-kyma-cw-desc]');
      var link = sec.querySelector('[data-kyma-cw-link]'), live = sec.querySelector('[data-kyma-cw-live]'), cur = null, tok = 0, hov;
      function pick(b, announce) {
        if (!b || b === cur) return;
        cur = b; var my = ++tok;
        opts.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        var key = b.getAttribute('data-colorway'), nm = b.getAttribute('data-name') || b.textContent.trim();
        sec.style.setProperty('--cw-a', b.getAttribute('data-a')); sec.style.setProperty('--cw-b', b.getAttribute('data-b'));
        var ca = b.getAttribute('data-a'), cb = b.getAttribute('data-b');
        if (w.KYMA3D) w.KYMA3D.setColorway(ca && cb ? [ca, cb] : key);
        if (link && b.getAttribute('data-url')) link.setAttribute('href', b.getAttribute('data-url'));
        if (live && announce) live.textContent = 'Coloris sélectionné : ' + nm;
        if (!name) return;
        var swap = function () {
          if (my !== tok) return;
          name.textContent = nm; name._split = 0; if (!K.reduced) split(name);
          if (desc) desc.textContent = b.getAttribute('data-desc') || '';
          name.classList.remove('is-out'); if (desc) desc.classList.remove('is-out');
          void name.offsetWidth; name.classList.add('is-in');
        };
        if (K.reduced) { swap(); return; }
        name.classList.add('is-out'); name.classList.remove('is-in'); if (desc) desc.classList.add('is-out');
        setTimeout(swap, 320);
      }
      opts.forEach(function (b) {
        b.addEventListener('click', function () { pick(b, true); });
        b.addEventListener('focus', function () { pick(b, true); });
        b.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { clearTimeout(hov); hov = setTimeout(function () { pick(b); }, 110); } });
      });
      cur = opts.filter(function (o) { return o.getAttribute('aria-pressed') === 'true'; })[0] || null;
      if (name && !K.reduced) { split(name); name.classList.add('is-in'); }
    });
  }

  /* ── 13. 02 Le motif : section épinglée, la caméra plonge dans la surface ────────────── */
  function dive(scope) {
    $('[data-kyma-dive]', scope).forEach(function (sec) {
      if (sec._dv) return; sec._dv = 1;
      var lines = $('[data-at]', sec), bar = sec.querySelector('.kyma-dive__meter span'), last = -1;
      if (K.reduced || editor) { sec.classList.add('is-static'); lines.forEach(function (l) { l.classList.add('is-in'); }); return; }
      tasks.push(function () {
        var P = prog(sec); if (!P.on) return false;
        var span = Math.max(1, P.r.height - P.vh), p = clamp(-P.r.top / span, 0, 1);
        if (Math.abs(p - last) < 0.001) return false; last = p;
        var s = scene(sec.querySelector('canvas[data-kyma-3d]')); if (s) s.set({ dive: clamp((p - 0.04) / 0.7, 0, 1) });
        lines.forEach(function (l, i) {
          var at = parseFloat(l.getAttribute('data-at')) || 0, nx = lines[i + 1] ? parseFloat(lines[i + 1].getAttribute('data-at')) : 2;
          l.classList.toggle('is-in', p >= at); l.classList.toggle('is-past', p >= nx);
        });
        if (bar) bar.style.transform = 'scaleY(' + p.toFixed(3) + ')';
        return false;
      });
    });
  }

  /* ── 14. 03 La pièce : dessin technique tracé au défilement + points chauds ──────────── */
  function drawing(scope) {
    $('[data-kyma-draw]', scope).forEach(function (sec) {
      if (sec._dr) return; sec._dr = 1;
      var paths = $('.kyma-tech__svg [pathLength]', sec), spots = $('[data-at]', sec), n = paths.length, last = -1;
      function set(p) {
        paths.forEach(function (pa, i) {
          var o = (i / n) * 0.55, q = clamp((p - o) / 0.35, 0, 1);
          pa.style.strokeDashoffset = (1 - q).toFixed(4);
        });
        spots.forEach(function (s) { s.classList.toggle('is-on', p >= (parseFloat(s.getAttribute('data-at')) || 0)); });
      }
      if (K.reduced || editor) { sec.classList.add('is-static'); set(1); return; }
      sec.classList.add('is-drawing'); set(0);
      tasks.push(function () {
        var P = prog(sec); if (!P.on) return false;
        var p = clamp((P.vh * 0.9 - P.r.top) / (P.r.height * 0.75 + P.vh * 0.2), 0, 1);
        if (Math.abs(p - last) > 0.001) { last = p; set(p); }
        return false;
      });
      $('.kyma-tech__spot', sec).forEach(function (b) {
        var id = b.getAttribute('aria-describedby'), li = id && d.getElementById(id);
        var on = function () { sec.querySelectorAll('.is-hot').forEach(function (x) { x.classList.remove('is-hot'); }); b.classList.add('is-hot'); if (li) li.classList.add('is-hot'); };
        b.addEventListener('pointerenter', on); b.addEventListener('focus', on);
        if (li) li.addEventListener('pointerenter', on);
      });
    });
  }

  /* ── 15. 05 Cercle Waves : survol d'un palier -> l'anneau correspondant s'anime ─────── */
  function rings(scope) {
    $('[data-kyma-rings]', scope).forEach(function (sec) {
      if (sec._rg) return; sec._rg = 1;
      $('[data-ring]', sec).forEach(function (t) {
        var i = parseFloat(t.getAttribute('data-ring'));
        var on = function () { var s = scene(sec.querySelector('canvas[data-kyma-3d]')); if (s) s.set({ focus: i }); };
        var off = function () { var s = scene(sec.querySelector('canvas[data-kyma-3d]')); if (s) s.set({ focus: -1 }); };
        t.addEventListener('pointerenter', on); t.addEventListener('pointerleave', off);
        t.addEventListener('focusin', on); t.addEventListener('focusout', off);
      });
    });
  }

  /* ── 16. fiche produit : aperçu 3D synchronisé sur la variante Dawn ──────────────────── */
  function variants() {
    var hosts = $('[data-kyma-variant-sync]'); if (!hosts.length) return;
    function apply(v) {
      if (!v) return;
      hosts.forEach(function (h) {
        var c = h.querySelector('canvas[data-kyma-3d]'), s = scene(c), lab = h.parentNode.querySelector('[data-kyma-cw-name]');
        if (w.KYMA3D && !w.KYMA3D.colorways[w.KYMA3D.key(v)]) return; /* valeur qui n'est pas un coloris (ex. taille) */
        if (s) s.setColorway(v); else if (c) c.setAttribute('data-colorway', v);
        if (lab) lab.textContent = v;
      });
    }
    var opt = hosts[0].getAttribute('data-option') || 'Couleur', idx = parseInt(hosts[0].getAttribute('data-option-index'), 10) || 1;
    if (typeof w.subscribe === 'function' && w.PUB_SUB_EVENTS && w.PUB_SUB_EVENTS.variantChange) {
      w.subscribe(w.PUB_SUB_EVENTS.variantChange, function (ev) { var v = ev && ev.data && ev.data.variant; if (v) apply(v['option' + idx] || (v.options && v.options[idx - 1])); });
    }
    d.addEventListener('change', function (e) {
      var t = e.target; if (!t || !t.name) return;
      if (t.name.indexOf(opt) === 0 || t.name.indexOf('[' + opt + ']') > -1 || t.closest('[data-kyma-variant-source]')) apply(t.value);
    });
  }

  /* ── 17. section Spline : repli kyma-3d si le lecteur Spline ne se charge pas ────────── */
  function spline(scope) {
    $('[data-kyma-spline]', scope).forEach(function (sec) {
      if (sec._sp) return; sec._sp = 1;
      var v = sec.querySelector('spline-viewer'), cv = sec.querySelector('canvas[data-kyma-3d]');
      function fallback() { if (v && v.parentNode) v.parentNode.removeChild(v); if (cv) { cv.hidden = false; sec.classList.add('is-fallback'); mount3d(sec); } }
      if (!v) return;
      if (!w.customElements) { fallback(); return; }
      var t = setTimeout(fallback, 8000);
      w.customElements.whenDefined('spline-viewer').then(function () { clearTimeout(t); sec.classList.add('is-spline'); });
    });
  }

  /* ── 18. divers : hauteur du header, état « défilé », pause onglet caché ─────────────── */
  function chrome() {
    var hh = function () { root.style.setProperty('--kyma-header-h', (headerH() || 64) + 'px'); };
    hh(); w.addEventListener('resize', hh);
    var sc = function () { root.classList.toggle('kyma-scrolled', w.scrollY > 8); };
    sc(); w.addEventListener('scroll', function () { sc(); wake(); }, { passive: true });
    d.addEventListener('visibilitychange', function () { root.classList.toggle('kyma-paused', d.hidden); if (!d.hidden) wake(); });
    var live = IO(function (es) { es.forEach(function (e) { e.target.classList.toggle('kyma-off', !e.isIntersecting); }); }, { rootMargin: '10% 0px' });
    if (live) $('[data-kyma-live]').forEach(function (n) { live.observe(n); });
  }

  function initScope(scope) {
    reveal(scope); hero(scope); magnetic(scope); marquee(scope); colorways(scope);
    dive(scope); drawing(scope); rings(scope); spline(scope);
  }
  function init() {
    dedupe(); chrome(); initScope(d); smooth(); anchors(); progress(); cursor(); curtain(); variants();
    root.classList.add('kyma-ready');
    lastY = w.scrollY; wake();
    after(function () { mount3d(d); });
  }
  K.init = initScope; K.mount3d = mount3d; K.goTo = goTo;

  /* Éditeur de thème Shopify : réinitialiser une section rechargée */
  d.addEventListener('shopify:section:load', function (e) { initScope(e.target); mount3d(e.target); });

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})(window, document);
