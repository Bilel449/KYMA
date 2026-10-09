/*! KYMA pages v1.0 — composants des pages (natif, sans dépendance). Charge unique (garde window.KYMAP).
 *  Cartes Cercle Waves qui pivotent, FAQ en accordéon + recherche, guide des tailles, frise des étapes,
 *  frise de la précommande, tracés SVG au défilement, κύμα, fleuve, formulaires (contact, Cercle), lecteur
 *  3D 360° (Shopify natif / lecteur commun KYMAViewer / repli), pastilles de teinte, anneaux au défilement, tuiles Instagram,
 *  bouton « Mettre le mouvement en pause ». Tous les états sont accessibles au clavier et au toucher ;
 *  prefers-reduced-motion : fondus courts, aucun mouvement ambiant. */
(function (w, d) {
  'use strict';
  if (w.KYMAP) return;
  var root = d.documentElement;
  var RM = !!(w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var fine = !!(w.matchMedia && w.matchMedia('(hover: hover) and (pointer: fine)').matches);
  var hasIO = 'IntersectionObserver' in w;
  var P = w.KYMAP = { reduced: RM };

  function $(s, c) { return [].slice.call((c || d).querySelectorAll(s)); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function once(n, k) { if (n['_kp' + k]) return false; n['_kp' + k] = 1; return true; }
  function scene(cv) { return w.KYMA3D && cv ? w.KYMA3D.get(cv) : null; }
  function paused() { return root.classList.contains('kyma-motion-paused'); }
  function store(k, v) { try { if (v == null) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } return null; }
  function view(fn, opts) { return hasIO ? new IntersectionObserver(fn, opts || { threshold: 0.15 }) : null; }
  function goTo(y) { if (w.KYMA && w.KYMA.goTo) w.KYMA.goTo(y); else w.scrollTo({ top: y, behavior: RM ? 'auto' : 'smooth' }); }
  var ticks = [], raf = 0;
  function tick() { raf = 0; var more = false; for (var i = 0; i < ticks.length; i++) if (ticks[i]() === true) more = true; if (more && !raf) raf = w.requestAnimationFrame(tick); }
  function wake() { if (!raf) raf = w.requestAnimationFrame(tick); }
  w.addEventListener('scroll', wake, { passive: true });
  w.addEventListener('resize', wake);
  function prog(el) { var r = el.getBoundingClientRect(), vh = w.innerHeight; return { r: r, vh: vh, on: r.bottom > -vh * 0.2 && r.top < vh * 1.2 }; }

  /* ── 1. Bouton « Mettre le mouvement en pause » (mémorisé) ───────────────────────────── */
  function pauseButtons() {
    function apply(on, save) {
      root.classList.toggle('kyma-motion-paused', on);
      if (w.KYMA3D && w.KYMA3D.pause) w.KYMA3D.pause(on);
      $('[data-kyma-pause]').forEach(function (b) {
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        var l = b.querySelector('[data-kyma-pause-label]') || b;
        l.textContent = b.getAttribute(on ? 'data-label-on' : 'data-label-off') || l.textContent;
      });
      if (save) store('kyma-motion-paused', on ? '1' : '0');
      try { d.dispatchEvent(new CustomEvent('kyma:motion', { detail: { paused: on } })); } catch (e) { /* ancien navigateur */ }
    }
    $('[data-kyma-pause]').forEach(function (b) {
      if (!once(b, 'pz')) return;
      b.addEventListener('click', function () { apply(!paused(), true); });
    });
    apply(store('kyma-motion-paused') === '1', false);
  }

  /* ── 2. Cartes Cercle Waves (data-kyma-flip) ─────────────────────────────────────────── */
  /* verso fermé : hors de l'ordre de tabulation (inert + tabindex=-1), restauré à l'ouverture */
  function tabbable(face, on) {
    $('a[href], button, input, select, textarea, [tabindex]', face).forEach(function (n) {
      if (on) { if (n.hasAttribute('data-kyma-tab')) { var t = n.getAttribute('data-kyma-tab'); if (t === '') n.removeAttribute('tabindex'); else n.setAttribute('tabindex', t); n.removeAttribute('data-kyma-tab'); } }
      else if (!n.hasAttribute('data-kyma-tab')) { var cur = n.getAttribute('tabindex'); n.setAttribute('data-kyma-tab', cur === '-1' ? '' : (cur || '')); n.setAttribute('tabindex', '-1'); }
    });
  }
  function flips(scope) {
    $('[data-kyma-flip]', scope).forEach(function (card) {
      if (!once(card, 'fl')) return;
      var hit = card.querySelector('.kyma-tier__hit'), front = card.querySelector('.kyma-flip__front'), back = card.querySelector('.kyma-flip__back');
      var zone = card.querySelector('.kyma-tier__card') || card; /* zone sensible = la carte seule (pas le prix ni le bouton) */
      var flipEl = card.querySelector('.kyma-flip'), state = { on: false, pin: false, tIn: 0, tOut: 0, ptype: 'mouse' };
      var tilt = { x: 0, y: 0, tx: 0, ty: 0, mx: 50, my: 30, run: false, last: 0 }, turning = 0;
      function set(on, why) {
        if (on === state.on) return;
        state.on = on;
        card.classList.toggle('is-flipped', on);
        if (hit) hit.setAttribute('aria-pressed', on ? 'true' : 'false');
        if (back) { back.setAttribute('aria-hidden', on ? 'false' : 'true'); back.inert = !on; tabbable(back, on); }
        if (front) { front.setAttribute('aria-hidden', on ? 'true' : 'false'); front.inert = on; }
        if (!RM) { card.classList.remove('is-turning'); void card.offsetWidth; card.classList.add('is-turning'); clearTimeout(turning); turning = setTimeout(function () { card.classList.remove('is-turning'); }, 950); }
        card.dispatchEvent(new CustomEvent('kyma:flip', { bubbles: true, detail: { on: on, why: why } }));
      }
      set(false); state.on = false; card.classList.remove('is-flipped');
      if (back) { back.inert = true; tabbable(back, false); }
      zone.addEventListener('pointerdown', function (e) { state.ptype = e.pointerType; });
      /* souris : intention 120 ms, retour 400 ms après la sortie, clic = épingle */
      zone.addEventListener('pointerenter', function (e) {
        if (e.pointerType !== 'mouse') return;
        clearTimeout(state.tOut); state.tIn = setTimeout(function () { set(true, 'hover'); }, 120);
      });
      zone.addEventListener('pointerleave', function (e) {
        if (e.pointerType !== 'mouse') return;
        clearTimeout(state.tIn); runTilt();
        state.tOut = setTimeout(function () { if (!state.pin) set(false, 'leave'); }, 400);
      });
      if (hit) hit.addEventListener('click', function (e) {
        if (e.detail === 0) { state.pin = !state.on; set(!state.on, 'key'); return; } /* clavier : bascule */
        if (state.ptype === 'mouse' && fine) {
          clearTimeout(state.tIn);
          if (!state.on) { state.pin = true; set(true, 'click'); }
          else { state.pin = !state.pin; card.classList.toggle('is-pinned', state.pin); }
        } else if (!card._dragged) set(!state.on, 'tap');
        card._dragged = false;
      });
      card.addEventListener('keydown', function (e) { if (e.key === 'Escape' && state.on) { state.pin = false; set(false, 'esc'); if (hit) hit.focus(); } });
      /* toucher : glisser horizontal = la carte suit le doigt, puis s'accroche à la face la plus proche */
      var drag = null;
      zone.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse') return;
        drag = { x: e.clientX, y: e.clientY, t: performance.now(), a: state.on ? 180 : 0, v: 0, live: false };
      });
      zone.addEventListener('pointermove', function (e) {
        if (drag) {
          var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
          if (!drag.live && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) { drag.live = true; card.classList.add('is-dragging'); }
          if (!drag.live) return;
          var now = performance.now(), ang = drag.a + dx * 0.6;
          drag.v = (ang - (drag.ang || drag.a)) / Math.max(8, now - (drag.tt || drag.t)); drag.ang = ang; drag.tt = now;
          flipEl.style.setProperty('--drag', ang.toFixed(1) + 'deg');
          return;
        }
      });
      /* inclinaison vers le pointeur : toute la section attire les cartes (±6°), davantage sur la carte (±11°) */
      if (fine && !RM) {
        var sec = card.closest('section') || d.body;
        sec.addEventListener('pointermove', function (e) {
          if (e.pointerType !== 'mouse' || drag) return;
          var r = zone.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          var inside = x >= 0 && x <= 1 && y >= 0 && y <= 1, k = inside ? 22 : 12;
          var cx = clamp(x - 0.5, -1, 1), cy = clamp(y - 0.5, -1, 1);
          tilt.tx = -cy * k * 0.5; tilt.ty = cx * k * 0.5;
          tilt.mx = clamp(x, 0, 1) * 100; tilt.my = clamp(y, 0, 1) * 100; runTilt();
        });
        sec.addEventListener('pointerleave', function () { tilt.tx = 0; tilt.ty = 0; runTilt(); });
      }
      function endDrag() {
        if (!drag) return;
        if (drag.live) {
          var ang = (drag.ang || drag.a) + drag.v * 220, n = ((Math.round(ang / 180) % 2) + 2) % 2;
          card.classList.remove('is-dragging'); flipEl.style.removeProperty('--drag');
          card._dragged = true; set(n === 1, 'swipe'); setTimeout(function () { card._dragged = false; }, 400);
        }
        drag = null;
      }
      zone.addEventListener('pointerup', endDrag); zone.addEventListener('pointercancel', endDrag);
      /* inclinaison ±8°, lissage exponentiel (taux 6/s), atténuée à 25 % pendant un pivot */
      function runTilt() {
        if (tilt.run || RM) return; tilt.run = true; tilt.last = 0;
        ticks.push(function step() {
          var now = performance.now(), dt = tilt.last ? Math.min(0.05, (now - tilt.last) / 1000) : 1 / 60; tilt.last = now;
          var k = 1 - Math.exp(-dt * 6), att = card.classList.contains('is-turning') ? 0.25 : 1;
          tilt.x += (tilt.tx * att - tilt.x) * k; tilt.y += (tilt.ty * att - tilt.y) * k;
          card.style.setProperty('--rx', tilt.x.toFixed(2) + 'deg'); card.style.setProperty('--ry', tilt.y.toFixed(2) + 'deg');
          card.style.setProperty('--mx', tilt.mx.toFixed(1) + '%'); card.style.setProperty('--my', tilt.my.toFixed(1) + '%');
          var busy = Math.abs(tilt.tx * att - tilt.x) + Math.abs(tilt.ty * att - tilt.y) > 0.02;
          if (!busy) { tilt.run = false; ticks.splice(ticks.indexOf(step), 1); }
          return busy;
        });
        wake();
      }
    });
  }

  /* ── 3. FAQ : accordéon (une réponse ouverte par groupe) + recherche ──────────────────── */
  function faq(scope) {
    $('[data-kyma-faq]', scope).forEach(function (f) {
      if (!once(f, 'fq')) return;
      f.classList.add('kyma-faq--js');
      var btns = $('.kyma-faq__btn', f);
      function open(b, on) {
        b.setAttribute('aria-expanded', on ? 'true' : 'false');
        var item = b.closest('.kyma-faq__item'); item.classList.toggle('is-open', on);
      }
      btns.forEach(function (b, i) {
        open(b, false);
        b.addEventListener('click', function () {
          var on = b.getAttribute('aria-expanded') !== 'true', grp = b.closest('[data-kyma-faq-group]');
          if (on && grp) $('.kyma-faq__btn', grp).forEach(function (o) { if (o !== b) open(o, false); });
          open(b, on);
        });
        b.addEventListener('keydown', function (e) {
          var vis = btns.filter(function (x) { return !x.closest('[hidden]') && x.offsetParent !== null; }), k = vis.indexOf(b), t = null;
          if (e.key === 'ArrowDown') t = vis[k + 1] || vis[0];
          else if (e.key === 'ArrowUp') t = vis[k - 1] || vis[vis.length - 1];
          else if (e.key === 'Home') t = vis[0];
          else if (e.key === 'End') t = vis[vis.length - 1];
          if (t) { e.preventDefault(); t.focus(); }
        });
      });
      var q = f.querySelector('[data-kyma-faq-search]'), empty = f.querySelector('[data-kyma-faq-empty]'), count = f.querySelector('[data-kyma-faq-count]');
      var wave = f.querySelector('.kyma-faq__wave'), timer = 0;
      $('[data-kyma-hl]', f).forEach(function (n) { n._html = n.innerHTML; });
      function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
      function mark(n, term) {
        n.innerHTML = n._html; if (!term) return;
        var tw = d.createTreeWalker(n, NodeFilter.SHOW_TEXT), nodes = [], x;
        while ((x = tw.nextNode())) nodes.push(x);
        nodes.forEach(function (t) {
          var s = t.data, ns = norm(s), i = ns.indexOf(term); if (i < 0) return;
          var frag = d.createDocumentFragment(), last = 0;
          while (i > -1) {
            frag.appendChild(d.createTextNode(s.slice(last, i)));
            var m = d.createElement('mark'); m.className = 'kyma-hl'; m.textContent = s.slice(i, i + term.length); frag.appendChild(m);
            last = i + term.length; i = ns.indexOf(term, last);
          }
          frag.appendChild(d.createTextNode(s.slice(last))); t.parentNode.replaceChild(frag, t);
        });
      }
      function filter() {
        var term = norm((q.value || '').trim()), shown = 0;
        $('[data-kyma-faq-item]', f).forEach(function (it) {
          var txt = norm(it.textContent), hitOk = !term || txt.indexOf(term) > -1;
          it.hidden = !hitOk; if (hitOk) shown++;
          $('[data-kyma-hl]', it).forEach(function (n) { mark(n, hitOk ? term : ''); });
          var b = it.querySelector('.kyma-faq__btn'); if (term && hitOk && b) open(b, norm(it.querySelector('.kyma-faq__a').textContent).indexOf(term) > -1);
          if (!term && b) open(b, false);
        });
        $('[data-kyma-faq-group]', f).forEach(function (g) { g.hidden = !$('[data-kyma-faq-item]', g).some(function (it) { return !it.hidden; }); });
        if (empty) empty.hidden = shown > 0;
        if (count) count.textContent = term ? shown + (shown > 1 ? ' questions correspondent.' : ' question correspond.') : '';
      }
      if (q) q.addEventListener('input', function () {
        if (wave) wave.style.transform = 'scaleX(' + clamp(0.12 + q.value.length / 28, 0.12, 1).toFixed(3) + ')';
        clearTimeout(timer); timer = setTimeout(filter, 120);
      });
    });
  }

  /* ── 4. Guide des tailles : tableau <-> dessin à cotes, conseils, vignettes ────────────── */
  function sizes(scope) {
    $('[data-kyma-size]', scope).forEach(function (s) {
      if (!once(s, 'sz')) return;
      var szBtns = $('[data-size-btn]', s), msBtns = $('[data-measure-btn]', s), body = s.querySelector('.kyma-size__body');
      var cur = parseInt(s.getAttribute('data-default'), 10) || 0, n = szBtns.length || 1;
      function val(mk, col) { var c = s.querySelector('tr[data-measure="' + mk + '"] td[data-col="' + col + '"]'); return c ? parseFloat(c.textContent) : NaN; }
      function count(el, from, to) {
        if (RM || isNaN(from) || from === to) { el.textContent = to; return; }
        var t0 = performance.now();
        (function f(now) { var k = clamp((now - t0) / 400, 0, 1); el.textContent = Math.round(from + (to - from) * k); if (k < 1) w.requestAnimationFrame(f); })(t0);
      }
      function pick(i, focus) {
        var prev = cur; cur = i;
        szBtns.forEach(function (b) { b.setAttribute('aria-pressed', +b.getAttribute('data-size-btn') === i ? 'true' : 'false'); });
        $('[data-col]', s).forEach(function (c) { c.classList.toggle('is-col', +c.getAttribute('data-col') === i); });
        $('[data-cote-val]', s).forEach(function (t) { var mk = t.getAttribute('data-cote-val'), v = val(mk, i); if (!isNaN(v)) count(t, val(mk, prev), v); });
        if (body) { body.style.setProperty('--ks', (1 + (i - (n - 1) / 2) / ((n - 1) / 2 || 1) * 0.03).toFixed(4)); }
        if (focus) szBtns[i].focus();
      }
      function measure(mk) {
        msBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-measure-btn') === mk ? 'true' : 'false'); });
        $('tr[data-measure]', s).forEach(function (r) { r.classList.toggle('is-row', r.getAttribute('data-measure') === mk); });
        $('[data-cote]', s).forEach(function (g) { g.classList.toggle('is-hot', g.getAttribute('data-cote') === mk); });
      }
      szBtns.forEach(function (b, i) { b.addEventListener('click', function () { pick(i); }); });
      msBtns.forEach(function (b) {
        var mk = b.getAttribute('data-measure-btn');
        b.addEventListener('click', function () { measure(b.getAttribute('aria-pressed') === 'true' ? '' : mk); });
        b.closest('tr').addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') measure(mk); });
      });
      /* flèches : se déplacer entre les en-têtes (tailles en ligne, mesures en colonne) */
      s.addEventListener('keydown', function (e) {
        var t = e.target, list = t.hasAttribute('data-size-btn') ? szBtns : t.hasAttribute('data-measure-btn') ? msBtns : null;
        if (!list) return;
        var k = list.indexOf(t), nx = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nx = list[k + 1];
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nx = list[k - 1];
        else if (e.key === 'Home') nx = list[0]; else if (e.key === 'End') nx = list[list.length - 1];
        if (nx) { e.preventDefault(); nx.focus(); nx.click(); }
      });
      pick(cur);
      /* conseils */
      var adv = s.querySelector('[data-kyma-advice]');
      if (adv) {
        var usual = adv.querySelector('[data-advice-usual]'), fit = adv.querySelector('[data-advice-fit]'), out = adv.querySelector('[data-advice-out]');
        var names = szBtns.map(function (b) { return b.textContent.trim(); });
        var upd = function () {
          var u = parseInt(usual.value, 10) || 0, f = parseInt(fit.value, 10), k = f < 34 ? -1 : f > 66 ? 1 : 0, r = clamp(u + k, 0, names.length - 1);
          var words = k < 0 ? 'Plus ajusté' : k > 0 ? 'Plus ample' : 'Coupe posée';
          fit.setAttribute('aria-valuetext', words);
          out.innerHTML = '<span class="kyma-advice__k">' + words + '</span> Taille indiquée : <strong>' + names[r] + '</strong>' +
            (k < 0 ? ' (une taille en dessous)' : k > 0 ? ' (une taille au-dessus, plus d’amplitude)' : ' (votre taille habituelle)') + '.';
          if (body) body.style.setProperty('--kf', (0.94 + f / 100 * 0.12).toFixed(3));
          pick(r);
        };
        usual.addEventListener('change', upd); fit.addEventListener('input', upd); upd();
      }
      /* vignettes « Se mesurer » : boucle unique, relançable */
      var ms = s.querySelector('[data-kyma-measure]'), again = s.querySelector('[data-kyma-measure-again]');
      if (ms) {
        var play = function () { ms.classList.remove('is-play'); void ms.offsetWidth; ms.classList.add('is-play'); };
        var o = view(function (es) { if (es[0].isIntersecting) { play(); o.unobserve(ms); } }, { threshold: 0.4 });
        if (o && !RM) o.observe(ms); else ms.classList.add('is-play');
        if (again) again.addEventListener('click', play);
      }
    });
  }

  /* ── 5. Frise des étapes (épinglée sur bureau, défilement horizontal sur mobile) ──────── */
  function steps(scope) {
    $('[data-kyma-steps]', scope).forEach(function (sec) {
      if (!once(sec, 'st')) return;
      var items = $('.kyma-step', sec), bar = sec.querySelector('.kyma-steps__bar span'), cur = -1, n = items.length;
      var pinned = function () { return !RM && w.innerWidth >= 990 && !paused(); };
      sec.classList.toggle('is-pinned', pinned());
      function act(i) {
        if (i === cur) return; cur = i;
        items.forEach(function (it, k) {
          it.classList.toggle('is-on', k === i); it.classList.toggle('is-past', k < i);
          var b = it.querySelector('.kyma-step__go'); if (b) b.setAttribute('aria-current', k === i ? 'step' : 'false');
        });
      }
      items.forEach(function (it, k) {
        var b = it.querySelector('.kyma-step__go');
        b.addEventListener('click', function () {
          if (pinned()) { var top = sec.getBoundingClientRect().top + w.scrollY, span = sec.offsetHeight - w.innerHeight; goTo(top + span * (k + 0.5) / n); }
          else { it.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', inline: 'center', block: 'nearest' }); act(k); }
        });
        b.addEventListener('keydown', function (e) {
          var t = e.key === 'ArrowRight' ? items[k + 1] : e.key === 'ArrowLeft' ? items[k - 1] : null;
          if (t) { e.preventDefault(); var tb = t.querySelector('.kyma-step__go'); tb.focus(); tb.click(); }
        });
      });
      act(0);
      if (RM) { items.forEach(function (it) { it.classList.add('is-past'); }); return; }
      ticks.push(function () {
        var on = pinned(); sec.classList.toggle('is-pinned', on);
        var P2 = prog(sec); if (!P2.on) return false;
        var p;
        if (on) { var span = Math.max(1, P2.r.height - P2.vh); p = clamp(-P2.r.top / span, 0, 0.999); }
        else { p = clamp((P2.vh * 0.6 - P2.r.top) / Math.max(1, P2.r.height), 0, 0.999); }
        if (bar) bar.style.transform = 'scaleX(' + ((p * n + 0.5) / n).toFixed(3) + ')';
        if (on) act(Math.floor(p * n));
        return false;
      });
      var list = sec.querySelector('.kyma-steps__list');
      if (list && hasIO) {
        var io = new IntersectionObserver(function (es) { if (pinned()) return; es.forEach(function (e) { if (e.isIntersecting) act(items.indexOf(e.target)); }); }, { root: null, threshold: 0.7 });
        items.forEach(function (it) { io.observe(it); });
      }
      wake();
    });
  }

  /* ── 6. Frise de la précommande : tracé + points qui s'allument ; phrase au survol / appui ─ */
  function timeline(scope) {
    $('[data-kyma-timeline]', scope).forEach(function (tl) {
      if (!once(tl, 'tl')) return;
      var pts = $('.kyma-tl__pt', tl);
      function show(b, on) { b.setAttribute('aria-expanded', on ? 'true' : 'false'); b.parentNode.classList.toggle('is-open', on); }
      pts.forEach(function (b) {
        b.addEventListener('click', function () { var on = b.getAttribute('aria-expanded') !== 'true'; pts.forEach(function (o) { show(o, false); }); show(b, on); });
        b.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { pts.forEach(function (o) { show(o, false); }); show(b, true); } });
        b.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') show(b, false); });
        b.addEventListener('focus', function () { show(b, true); });
        b.addEventListener('blur', function () { show(b, false); });
        b.addEventListener('keydown', function (e) { if (e.key === 'Escape') show(b, false); });
      });
    });
  }

  /* ── 7. Tracés SVG au défilement (κύμα, fleuve, ruban, passage, dessins) ───────────────── */
  var traceIO = view(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-traced'); traceIO.unobserve(e.target); } });
  }, { threshold: 0.25 });
  function traces(scope) {
    $('[data-kyma-trace]', scope).forEach(function (svg) {
      if (!once(svg, 'tr')) return;
      $('[pathLength]', svg).forEach(function (p, i) { p.style.setProperty('--pi', i); });
      if (RM || !traceIO) svg.classList.add('is-traced', 'is-static'); else { svg.classList.add('is-tracing'); traceIO.observe(svg); }
    });
    /* κύμα : les lettres se décalent de ±6 px selon le pointeur */
    $('[data-kyma-letters]', scope).forEach(function (svg) {
      if (!once(svg, 'lt') || RM || !fine) return;
      var ls = $('.kyma-kuma__l', svg);
      w.addEventListener('pointermove', function (e) {
        if (paused()) return;
        var x = e.clientX / w.innerWidth - 0.5, y = e.clientY / w.innerHeight - 0.5;
        ls.forEach(function (l, i) { var f = (i % 2 ? -1 : 1) * (0.6 + i * 0.15); l.style.transform = 'translate(' + (x * 12 * f).toFixed(1) + 'px,' + (y * 8 * f).toFixed(1) + 'px)'; });
      }, { passive: true });
    });
    /* fleuve : appui sur le point = « KYMA Paris » */
    $('.kyma-chap__river', scope).forEach(function (r) {
      if (!once(r, 'rv')) return;
      var b = r.querySelector('.kyma-river__hit');
      if (b) b.addEventListener('click', function () { r.classList.toggle('is-tip'); });
    });
    $('.kyma-sym', scope).forEach(function (b) {
      if (!once(b, 'sy')) return;
      b.addEventListener('click', function () { b.parentNode.classList.toggle('is-tip'); });
    });
  }

  /* ── 8. Pastilles de teinte (motif, recoloration) ──────────────────────────────────────── */
  function tints(scope) {
    $('[data-kyma-tints]', scope).forEach(function (g) {
      if (!once(g, 'tn')) return;
      var host = g.closest('[data-kyma-tint-scope]') || g.parentNode, dots = $('[data-colorway]', g).filter(function (b) { return b.tagName === 'BUTTON'; });
      var nameEl = host.querySelector('[data-kyma-tint-name]'), sel = dots.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0] || dots[0];
      function cv() { return host.querySelector('canvas[data-kyma-3d]'); }
      function paint(b) {
        var c = cv(), s = scene(c), k = b.getAttribute('data-colorway');
        if (s) s.setColorway(k); else if (c) c.setAttribute('data-colorway', k);
      }
      function choose(b) {
        sel = b; dots.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        paint(b); if (nameEl) nameEl.textContent = b.getAttribute('data-name') || b.textContent.trim();
      }
      dots.forEach(function (b) {
        b.addEventListener('click', function () { choose(b); });
        if (g.hasAttribute('data-preview')) {
          b.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' && b !== sel) paint(b); });
          b.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') paint(sel); });
        }
      });
    });
  }

  /* ── 9. Mots-clés de l'ADN : Texture · Couleur · Mouvement pilotent la sculpture ────────── */
  function keywords(scope) {
    $('[data-kyma-keywords]', scope).forEach(function (ul) {
      if (!once(ul, 'kw')) return;
      var sec = ul.closest('section'), bs = $('.kyma-chap__kwbtn', ul);
      function step(i) {
        bs.forEach(function (b, k) { b.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
        var s = scene(sec.querySelector('canvas[data-kyma-3d]')); if (!s) return;
        if (i === 0) { s.setColorway(['#D8CEC6', '#EFE8E1', '#BDB2A9']); s.set({ speed: 0.15 }); }
        else if (i === 1) { s.setColorway('kyma'); s.set({ speed: 0.15 }); }
        else { s.setColorway('kyma'); s.set({ speed: 1 }); }
      }
      bs.forEach(function (b, i) {
        b.addEventListener('click', function () { step(i); });
        b.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') step(i); });
      });
      /* au défilement : trois temps d'un tiers de la section chacun */
      if (!RM) ticks.push(function () {
        var P2 = prog(sec); if (!P2.on || sec._kwManual) return false;
        var p = clamp((P2.vh * 0.75 - P2.r.top) / Math.max(1, P2.r.height), 0, 0.999), i = Math.floor(p * 3);
        if (i !== sec._kwi) { sec._kwi = i; step(i); }
        return false;
      });
      ul.addEventListener('click', function () { sec._kwManual = true; });
      setTimeout(function () { step(0); }, 1200);
    });
  }

  /* ── 10. Anneaux au défilement : MAJESTÉ entre par la droite (« enter ») / se rapprochent (« join ») ─ */
  function ringsScroll(scope) {
    $('[data-kyma-rings-scroll]', scope).forEach(function (sec) {
      if (!once(sec, 'rs')) return;
      var mode = sec.getAttribute('data-kyma-rings-scroll'), last = -1;
      function apply(p) {
        var s = scene(sec.querySelector('canvas[data-kyma-3d="rings"]')); if (!s) return false;
        var e = 1 - Math.pow(1 - p, 3);
        if (mode === 'enter') s.set({ c1: -0.45 * e, c2: 0.45 + (1 - e) * 2.4 });
        else s.set({ c1: -0.45 - (1 - e) * 0.63, c2: 0.45 + (1 - e) * 0.63 });
        sec.style.setProperty('--rp', e.toFixed(3));
        return true;
      }
      if (RM) { var tries = 0, iv = setInterval(function () { if (apply(1) || ++tries > 40) clearInterval(iv); }, 150); return; }
      ticks.push(function () {
        var P2 = prog(sec); if (!P2.on) return false;
        var p = mode === 'enter' ? clamp(0.22 + -P2.r.top / Math.max(1, P2.r.height * 0.7), 0, 1)
          : clamp((P2.vh - P2.r.top) / (P2.vh * 0.9), 0, 1);
        if (Math.abs(p - last) > 0.002 && apply(p)) last = p;
        return false;
      });
      var iv2 = setInterval(function () { last = -1; wake(); if (scene(sec.querySelector('canvas[data-kyma-3d="rings"]'))) clearInterval(iv2); }, 200);
      setTimeout(function () { clearInterval(iv2); }, 15000);
    });
  }

  /* ── 11. Tuiles Instagram : fragments fixes du motif (une image, aucun canvas actif) ──────── */
  function tiles(scope) {
    $('[data-kyma-tiles]', scope).forEach(function (g) {
      if (!once(g, 'ti')) return;
      var go = function () {
        if (!w.KYMA3D || !w.KYMA3D.snapshot) return;
        $('.kyma-ig__link', g).forEach(function (a, i) {
          var url = w.KYMA3D.snapshot({ scene: 'pattern', colorway: a.getAttribute('data-colorway') || 'kyma', width: 360, height: 360, seed: 30 + i * 47, pattern: 0.8 + (i % 3) * 0.25, shift: [i * 1.7, i * 0.9] });
          if (url) { a.style.backgroundImage = 'url(' + url + ')'; a.classList.add('has-bg'); }
        });
      };
      var o = view(function (es) { if (es[0].isIntersecting) { o.disconnect(); (w.requestIdleCallback || setTimeout)(go); } }, { rootMargin: '50% 0px' });
      if (o) o.observe(g); else go();
    });
  }

  /* ── 12. Formulaires (contact, Cercle) : vérification de l'e-mail, anneau, onde ─────────── */
  function forms(scope) {
    $('form[data-kyma-form]', scope).forEach(function (f) {
      if (!once(f, 'fm')) return;
      var sec = f.closest('section'), ring = sec && (sec.querySelector('[data-kyma-ring]') || null);
      var email = f.querySelector('[data-kyma-email]'), err = email && email.parentNode.querySelector('.kyma-field__err'), ok = f.querySelector('[data-kyma-ok]');
      var demo = f.hasAttribute('data-kyma-demo') || root.hasAttribute('data-kyma-demo');
      if (f.querySelector('[data-kyma-posted]') && ring) ring.classList.add('is-closed');
      function valid(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
      if (email) email.addEventListener('input', function () { if (valid(email.value)) { email.removeAttribute('aria-invalid'); if (err) err.hidden = true; } });
      f.addEventListener('submit', function (e) {
        if (email && !valid(email.value.trim())) {
          e.preventDefault(); email.setAttribute('aria-invalid', 'true'); if (err) { err.hidden = false; err.id = err.id || 'kyma-err-' + Math.random().toString(36).slice(2); email.setAttribute('aria-describedby', err.id); }
          email.focus(); if (ring) ring.classList.remove('is-loading'); return;
        }
        var req = $('[required]', f).filter(function (x) { return x.type === 'checkbox' ? !x.checked : !x.value.trim(); })[0];
        if (req) { e.preventDefault(); req.setAttribute('aria-invalid', 'true'); req.focus(); if (req.reportValidity) req.reportValidity(); return; }
        var btn = f.querySelector('[data-kyma-submit]');
        if (btn) { btn.setAttribute('aria-busy', 'true'); btn.classList.add('is-loading'); }
        if (ring) ring.classList.add('is-loading');
        if (demo) {
          e.preventDefault();
          setTimeout(function () {
            if (btn) { btn.removeAttribute('aria-busy'); btn.classList.remove('is-loading'); }
            if (ring) { ring.classList.remove('is-loading'); ring.classList.add('is-closed'); }
            if (ok) { ok.hidden = false; ok.setAttribute('tabindex', '-1'); ok.focus(); }
            var cv = sec && sec.querySelector('canvas[data-kyma-3d="ripple"]'), s = scene(cv);
            if (s && btn) { var r = btn.getBoundingClientRect(); s.ripple(r.left + r.width / 2, r.top + r.height / 2, 2.4); }
          }, 700);
        }
      });
    });
    /* onde au toucher sur le fond de la page Contact (jamais pendant un défilement) */
    $('.kyma-ct', scope).forEach(function (ct) {
      if (!once(ct, 'ct')) return;
      var down = null;
      ct.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') down = { x: e.clientX, y: e.clientY }; });
      ct.addEventListener('pointerup', function (e) {
        if (!down || e.target.closest('input, textarea, select, button, a, label')) { down = null; return; }
        if (Math.hypot(e.clientX - down.x, e.clientY - down.y) < 10) { var s = scene(ct.querySelector('canvas[data-kyma-3d]')); if (s) s.ripple(e.clientX, e.clientY, 1.2); }
        down = null;
      });
    });
  }

  /* ── 13. Lecteur 3D 360° : natif Shopify -> lecteur commun KYMAViewer (three.js, GLB du thème) -> aperçu de coloris ── */
  /* [point, normale, zoom] des détails du hoodie Ressac : valeurs de secours (GLB v1) ; le lecteur commun les recalcule
     sur le modèle chargé (v.anchor : extras zipPath / poi du GLB v2+, sinon boîte englobante) */
  var ANCHORS = {
    capuche: [[0.09, 0.85, -0.03], [0.35, 0.7, 0.45], 1.2],
    tirette: [[0, 0.748, 0.15], [0, 0.1, 1], 1.45],
    zip: [[0, 0.46, 0.142], [0, 0, 1], 1.15],
    poches: [[0.19, 0.27, 0.13], [0.3, 0, 1], 1.25],
    cotes: [[0.2, 0.045, 0.112], [0.15, -0.1, 1], 1.2],
    poignet: [[0.43, 0.07, 0.03], [0.6, -0.3, 0.6], 1.2],
    dos: [[0, 0.5, -0.2], [0, 0, -1], 1]
  };
  function viewer360(scope) {
    $('[data-kyma-360]', scope).forEach(function (sec) {
      if (!once(sec, '36')) return;
      var mode = sec.getAttribute('data-mode'), stage = sec.querySelector('.kyma-360__stage');
      var presets = sec.querySelector('.kyma-360__presets'), cap = sec.querySelector('[data-kyma-360-caption]');
      var fb = sec.querySelector('.kyma-360__fallback'), dots = $('[data-kyma-360-tints] [data-colorway]', sec);
      var cur = sec.getAttribute('data-colorway') || 'kyma', api = null, glbv = null;
      /* points chauds : position sur le modèle (coordonnées du GLB : mètres, Y en haut, face avant vers +Z) et normale */
      var spots = $('.kyma-360__spot', sec), legs = $('.kyma-360__lg', sec), hotA = '';
      function hot(a) {
        hotA = a || '';
        spots.forEach(function (x) { x.classList.toggle('is-hot', x.getAttribute('data-anchor') === hotA); });
        legs.forEach(function (x) { x.classList.toggle('is-hot', x.getAttribute('data-anchor') === hotA); });
      }
      function placeSpots(v) {
        spots.forEach(function (x) {
          var A = (v.anchor && v.anchor(x.getAttribute('data-anchor'))) || ANCHORS[x.getAttribute('data-anchor')]; if (!A) return;
          var r = v.project(A[0], A[1]); if (!r) return;
          var on = r.front > 0.12;
          x.style.transform = 'translate3d(' + r.x.toFixed(1) + 'px,' + r.y.toFixed(1) + 'px,0)';
          if (on !== x._on) { x._on = on; x.classList.toggle('is-back', !on); }
        });
      }
      legs.forEach(function (li) {
        var a = li.getAttribute('data-anchor'), b = li.querySelector('button');
        var go = function () { hot(a); var A = (glbv && glbv.anchor && glbv.anchor(a)) || ANCHORS[a]; if (glbv && A) glbv.to(Math.atan2(-A[1][0], A[1][2]), 4 * Math.PI / 180, A[2] || 1.25, 1200); };
        if (b) { b.addEventListener('click', go); b.addEventListener('focus', function () { hot(a); }); }
        li.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') hot(a); });
        li.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') hot(''); });
      });
      spots.forEach(function (x) {
        x.addEventListener('pointerenter', function () { hot(x.getAttribute('data-anchor')); });
        x.addEventListener('pointerleave', function () { hot(''); });
      });
      function fallback() {
        mode = 'fallback'; sec.setAttribute('data-mode', 'fallback');
        $('model-viewer, .kyma-360__glb, .kyma-360__loading', stage).forEach(function (n) { n.hidden = true; });
        if (presets) presets.hidden = true;
        if (fb) { fb.hidden = false; var c = fb.querySelector('canvas'); c.hidden = false; c.setAttribute('data-colorway', cur); if (w.KYMA && w.KYMA.mount3d) w.KYMA.mount3d(fb); }
        if (cap) cap.textContent = cap.getAttribute('data-fallback');
      }
      function pressed(k) { dots.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-colorway') === k ? 'true' : 'false'); }); }
      /* 13a. lecteur natif (média 3D Shopify, <model-viewer>) */
      if (mode === 'native') {
        var mvs = $('model-viewer', stage), ORB = { face: '0deg 82deg 105%', profil: '90deg 82deg 105%', dos: '180deg 82deg 105%', detail: '0deg 78deg 62%' };
        var active = mvs[0];
        var ready = function () { if (w.KYMA3D && w.KYMA3D.external) w.KYMA3D.external(stage); };
        if (w.customElements && w.customElements.get('model-viewer')) ready();
        else if (w.Shopify && w.Shopify.loadFeatures) w.Shopify.loadFeatures([{ name: 'model-viewer-ui', version: '1.0', onLoad: function (er) { if (er) fallback(); else ready(); } }]);
        else if (sec.getAttribute('data-mv-src')) { var sc = d.createElement('script'); sc.type = 'module'; sc.src = sec.getAttribute('data-mv-src'); sc.onerror = fallback; sc.onload = ready; d.head.appendChild(sc); }
        else fallback();
        if (!mvs.length) fallback();
        api = {
          preset: function (n) { if (!active) return; active.cameraOrbit = ORB[n] || ORB.face; active.cameraTarget = n === 'detail' ? 'auto 0.62m auto' : 'auto auto auto'; },
          colorway: function (k) {
            var m = mvs.filter(function (x) { return x.getAttribute('data-colorway').indexOf(k) > -1; })[0]; if (!m || m === active) return;
            var orbit = active && active.getCameraOrbit ? active.getCameraOrbit().toString() : null;
            if (!m.getAttribute('src')) m.setAttribute('src', m.getAttribute('data-src'));
            m.hidden = false; if (active) active.hidden = true; active = m;
            if (orbit) m.cameraOrbit = orbit;
          }
        };
      }
      /* 13b. lecteur commun KYMAViewer (assets/kyma-viewer.js + kyma-three.js ; GLB dans les fichiers du thème) */
      if (mode === 'glb') {
        var cv = stage.querySelector('.kyma-360__glb'), curUrl = cv ? cv.getAttribute('data-src') : '';
        var start = function () {
          if (!w.KYMAViewer) { fallback(); return; }
          stage.classList.add('is-loading');
          var sp = sec.getAttribute('data-spin');
          var v = w.KYMAViewer.mount(cv, {
            src: cv.getAttribute('data-src'), spin: sp == null ? 7 : parseFloat(sp), idle: parseFloat(sec.getAttribute('data-spin-delay') || '3'),
            yaw: spots.length ? -24 : 0,
            onload: function () { stage.classList.remove('is-loading'); stage.classList.add('is-ready'); },
            onerror: function () { stage.classList.remove('is-loading'); fallback(); },
            onframe: spots.length ? placeSpots : null
          });
          if (v.dead) return;
          glbv = v;
          if (w.KYMA3D && w.KYMA3D.external) w.KYMA3D.external(cv);
          api = {
            preset: function (n) { v.preset(n); },
            colorway: function (k) {
              var b = dots.filter(function (x) { return x.getAttribute('data-colorway') === k; })[0], url = b && b.getAttribute('data-glb');
              if (!url || url === curUrl) return; curUrl = url; stage.classList.add('is-loading');
              if (cv.getAttribute('data-label')) cv.setAttribute('aria-label', cv.getAttribute('data-label') + ' Coloris : ' + (b.getAttribute('data-name') || k) + '.');
              v.load(url).then(function () { stage.classList.remove('is-loading'); }, function () { stage.classList.remove('is-loading'); });
            }
          };
          if (cur !== 'kyma') api.colorway(cur);
        };
        /* chargé seulement à l'approche de l'écran */
        var go = function () { if (w.KYMAViewer) start(); else w.addEventListener('load', start); };
        var o = view(function (es) { if (es[0].isIntersecting) { o.disconnect(); if (w.KYMA && w.KYMA.settled) w.KYMA.settled(go); else go(); } }, { rootMargin: '50% 0px' });
        if (o) o.observe(stage); else start();
      }
      if (presets) $('[data-preset]', presets).forEach(function (b) {
        b.addEventListener('click', function () { $('[data-preset]', presets).forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); }); if (api) api.preset(b.getAttribute('data-preset')); });
      });
      sec.addEventListener('keydown', function (e) {
        var n = { 1: 'face', 2: 'profil', 3: 'dos', 4: 'detail' }[e.key];
        if (n && api && mode === 'native' && e.target.closest('.kyma-360__stage')) { e.preventDefault(); api.preset(n); }
      });
      function setCw(k) {
        k = w.KYMA3D ? w.KYMA3D.key(k) : k; if (!k) return;
        cur = k; pressed(k);
        if (api && api.colorway) api.colorway(k);
        var fc = fb && fb.querySelector('canvas'), s = scene(fc); if (s) s.setColorway(k);
      }
      dots.forEach(function (b) { b.addEventListener('click', function () { setCw(b.getAttribute('data-colorway')); }); });
      d.addEventListener('kyma:colorway', function (e) { setCw(e.detail && e.detail.name); });
    });
  }

  /* ── 14. Cartes coloris : la carte survolée s'élargit, les autres reculent ; flèches ───────── */
  function cards(scope) {
    $('[data-kyma-cards]', scope).forEach(function (ul) {
      if (!once(ul, 'cd')) return;
      var items = $('.kyma-card', ul), links = items.map(function (li) { return li.querySelector('a'); });
      function hot(li) {
        ul.classList.toggle('has-hot', !!li);
        items.forEach(function (o) {
          o.classList.toggle('is-hot', o === li);
          var s = scene(o.querySelector('canvas')); if (s) s.set({ speed: o === li ? 0.35 : 1 });
        });
      }
      items.forEach(function (li, i) {
        li.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') hot(li); });
        li.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') hot(null); });
        links[i].addEventListener('focus', function () { hot(li); });
        links[i].addEventListener('blur', function () { hot(null); });
        links[i].addEventListener('keydown', function (e) {
          var t = e.key === 'ArrowRight' ? links[i + 1] : e.key === 'ArrowLeft' ? links[i - 1] : null;
          if (t) { e.preventDefault(); t.focus(); if (t.scrollIntoView) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: RM ? 'auto' : 'smooth' }); }
        });
      });
    });
  }

  /* ── 15. Sculpture qui tourne au défilement (chapitres « La Vague ») ──────────────────────── */
  function spin(scope) {
    $('[data-kyma-spin]', scope).forEach(function (sec) {
      if (!once(sec, 'sp') || RM) return;
      ticks.push(function () {
        var P2 = prog(sec); if (!P2.on) return false;
        var s = scene(sec.querySelector('canvas[data-kyma-3d="hero"]')); if (!s) return false;
        var p = clamp((P2.vh - P2.r.top) / (P2.r.height + P2.vh), 0, 1);
        s.set({ morph: p * 0.6 });
        return false;
      });
    });
  }

  function init(scope) {
    flips(scope); faq(scope); sizes(scope); steps(scope); timeline(scope); traces(scope); tints(scope);
    keywords(scope); ringsScroll(scope); tiles(scope); forms(scope); viewer360(scope); cards(scope); spin(scope);
    wake();
  }
  P.init = init;
  function boot() { pauseButtons(); init(d); root.classList.add('kyma-pages-ready'); }
  d.addEventListener('shopify:section:load', function (e) { init(e.target); });
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot); else boot();
})(window, document);
