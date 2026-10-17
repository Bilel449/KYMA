/* KYMA — maquettes : comportements de la coquille (menu mobile, menu « Aide », simulation des variantes Horizon).
   Dans la boutique, ces rôles sont tenus par Horizon (header-component, variant-picker, buy-buttons). */
(function (w, d) {
  'use strict';
  var root = d.documentElement;
  function $(s, c) { return [].slice.call((c || d).querySelectorAll(s)); }

  /* menu mobile plein écran */
  var burger = d.querySelector('.kp-burger'), panel = d.getElementById('kp-panel');
  function setPanel(on) {
    if (!burger || !panel) return;
    burger.setAttribute('aria-expanded', on ? 'true' : 'false');
    burger.querySelector('[data-kp-label]').textContent = on ? 'Fermer' : 'Menu';
    panel.classList.toggle('is-open', on); panel.inert = !on; root.classList.toggle('kp-locked', on);
    if (on) { var a = panel.querySelector('a'); if (a) setTimeout(function () { a.focus(); }, 60); } else burger.focus({ preventScroll: true });
  }
  if (burger && panel) {
    panel.inert = true;
    burger.addEventListener('click', function () { setPanel(burger.getAttribute('aria-expanded') !== 'true'); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('is-open')) setPanel(false); });
  }

  /* sous-menu « Aide » (clic, survol, clavier) */
  $('.kp-nav__drop').forEach(function (li) {
    var b = li.querySelector('.kp-nav__more'), sub = li.querySelector('.kp-nav__sub'), t = 0, hov = false;
    function set(on) { b.setAttribute('aria-expanded', on ? 'true' : 'false'); sub.classList.toggle('is-open', on); }
    /* souris : le survol ouvre, le clic ne referme pas ce que le survol vient d'ouvrir ; clavier / toucher : bascule */
    b.addEventListener('click', function (e) { if (hov && e.detail > 0) { set(true); return; } set(b.getAttribute('aria-expanded') !== 'true'); });
    li.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hov = true; clearTimeout(t); set(true); } });
    li.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { hov = false; t = setTimeout(function () { set(false); }, 220); } });
    li.addEventListener('keydown', function (e) { if (e.key === 'Escape') { set(false); b.focus(); } });
    li.addEventListener('focusout', function (e) { if (!li.contains(e.relatedTarget)) set(false); });
  });

  /* simulation du sélecteur de variantes Horizon : <input data-option-name="Coloris"> émet « change »,
     écouté par kyma-motion.js (synchronisation du lecteur 360°). ?variant=<id> présélectionne le coloris. */
  var buy = d.querySelector('[data-kp-buy]');
  if (buy) {
    var VAR = { '57613620904316': 'Lilac Whirl', '57613621100924': 'Ivory Tide', '57613621297532': 'Silver Drift', '57613621494140': 'Noir Absolu', '57613621690748': 'Crimson Flow' };
    var m = /[?&]variant=(\d+)/.exec(w.location.search), want = m && VAR[m[1]];
    var out = buy.querySelector('[data-kp-cw]');
    $('input[name="Coloris"]', buy).forEach(function (i) {
      i.addEventListener('change', function () { if (out) out.textContent = i.value; });
      if (want && i.value === want) {
        i.checked = true; if (out) out.textContent = want;
        var fire = function () { i.dispatchEvent(new Event('change', { bubbles: true })); };
        if (d.readyState === 'complete') setTimeout(fire, 50); else w.addEventListener('load', function () { setTimeout(fire, 50); });
      }
    });
    var cta = buy.querySelector('[data-kp-cta]'), msg = buy.querySelector('[data-kp-msg]');
    $('input[name="Taille"]', buy).forEach(function (i) {
      i.addEventListener('change', function () { cta.querySelector('span').textContent = 'Précommander'; msg.textContent = ''; });
    });
    cta.addEventListener('click', function () {
      if (!buy.querySelector('input[name="Taille"]:checked')) {
        msg.textContent = 'Choisissez une taille.';
        cta.classList.remove('is-pulse'); void cta.offsetWidth; cta.classList.add('is-pulse');
        return;
      }
      msg.textContent = 'Maquette : l\'ajout au panier est assuré par Horizon dans la boutique.';
    });
  }
})(window, document);
