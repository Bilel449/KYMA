/*! KYMA Viewer v1.0 — LE lecteur 3D commun du site (hoodie Ressac) : three.js r180 vendorisé (assets/kyma-three.js,
 *  MIT) + GLTFLoader. Remplace le lecteur maison kyma-glb.js (qui ne lisait pas KHR_mesh_quantization, donc pas les v2).
 *  · Chargement paresseux : ce fichier est léger ; kyma-three.js (151 Ko gzip) n'est injecté qu'au premier mount(),
 *    c.-à-d. quand une section arrive près de l'écran. Promesse partagée avec kyma-pstory.js (window.KYMAThreeP) :
 *    three.js n'est téléchargé et exécuté qu'une fois par page.
 *  · UN SEUL contexte WebGL pour tous les lecteurs de la page : un WebGLRenderer hors écran dessine chaque lecteur
 *    puis l'image est copiée dans le <canvas> 2D du lecteur. Les GLB sont téléchargés et analysés une fois par URL.
 *  · Mouvement « façon Spline » : rotation au glisser (souris, toucher, inertie), rotation lente automatique,
 *    inclinaison douce vers le pointeur, légère rotation liée au défilement, lévitation discrète, fondu « vague »
 *    de bas en haut au changement de coloris.
 *  · Pause hors écran (IntersectionObserver), onglet caché, bouton pause du site (html.kyma-motion-paused).
 *  · prefers-reduced-motion : modèle immobile (ni rotation auto, ni inclinaison, ni lévitation, ni fondu) ; le
 *    visiteur peut toujours le tourner lui-même (glisser, flèches).
 *  · Sans WebGL / three.js / fichier : onerror('webgl' | 'load') → la section affiche son repli (texte, aperçu).
 *  · Le texte équivalent reste sur le <canvas role="img" aria-label> de la section.
 *  API : var v = KYMAViewer.mount(canvas, { src, bg: 'none'|'beige', spin (°/s, 0 = non), idle (s), yaw (°), fit,
 *          onload(url), onerror(why), onframe(v), three: url });
 *        v.load(url) → Promise ; v.preset('face'|'profil'|'dos'|'detail') ; v.to(yaw, pitch, zoom, ms) ; v.zoom(1..1.7) ;
 *        v.face(deg) ; v.project([x,y,z], [nx,ny,nz]) → { x, y, front } (px CSS du canvas) ; v.anchor(nom) → [p, n, zoom] ;
 *        KYMAViewer.prefetch(url) ; KYMAViewer.supported() ; KYMAViewer.contexts() ; KYMAViewer.three() → Promise. */
(function (w, d) {
  'use strict';
  if (w.KYMAViewer) return;
  var RM = !!(w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var D2R = Math.PI / 180, PRE = { face: [0, 4, 1], profil: [90, 4, 1], dos: [180, 4, 1], detail: [0, 2, 1.7] };
  var me = d.currentScript, THREE_URL = (me && me.getAttribute('data-three')) || '';
  if (!THREE_URL && me && me.src) THREE_URL = me.src.replace(/kyma-viewer(\.min)?\.js(\?[^#]*)?/, 'kyma-three.js');
  var G = null, BUFS = {}, MODELS = {}, GLOK = null, VIEWERS = [];

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function paused() { return !!(w.KYMA3D && w.KYMA3D.paused && w.KYMA3D.paused()) || d.documentElement.classList.contains('kyma-motion-paused'); }
  function damp(a, b, k, dt) { return b + (a - b) * Math.exp(-dt / k); }

  /* ── three.js : une seule fois par page (promesse partagée avec kyma-pstory.js) ── */
  function three(url) {
    if (w.KYMAThree) return Promise.resolve(w.KYMAThree);
    if (w.KYMAThreeP) return w.KYMAThreeP;
    url = url || THREE_URL;
    if (!url) return Promise.reject(new Error('three'));
    w.KYMAThreeP = new Promise(function (res, rej) {
      var s = d.createElement('script'); s.src = url; s.async = true; s.setAttribute('data-kyma-three', '');
      s.onload = function () { if (w.KYMAThree) res(w.KYMAThree); else { w.KYMAThreeP = null; rej(new Error('three')); } };
      s.onerror = function () { w.KYMAThreeP = null; rej(new Error('three')); };
      d.head.appendChild(s);
    });
    return w.KYMAThreeP;
  }
  /* test WebGL sans garder de contexte ouvert */
  function supported() {
    if (GLOK !== null) return GLOK;
    GLOK = false;
    try {
      var c = d.createElement('canvas'), gl = c.getContext('webgl2') || c.getContext('webgl');
      if (gl) { GLOK = true; var x = gl.getExtension('WEBGL_lose_context'); if (x) x.loseContext(); }
    } catch (e) { GLOK = false; }
    return GLOK;
  }

  /* ── moteur partagé : un WebGLRenderer hors écran, un environnement studio ── */
  function shared(T) {
    if (G) return G.dead ? null : G;
    var cv = d.createElement('canvas'), r; cv.width = cv.height = 64;
    try { r = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, premultipliedAlpha: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' }); }
    catch (e) { G = { dead: true }; return null; }
    r.setPixelRatio(1); r.autoClear = false;
    r.toneMapping = T.ACESFilmicToneMapping; r.toneMappingExposure = 1.02; r.outputColorSpace = T.SRGBColorSpace;
    var pm = new T.PMREMGenerator(r), env = pm.fromScene(new T.RoomEnvironment(), 0.04).texture; pm.dispose();
    /* ombre de contact : ellipse floue (canvas 2D dessiné une fois) */
    var c = d.createElement('canvas'); c.width = c.height = 256;
    var g = c.getContext('2d'), gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    gr.addColorStop(0, 'rgba(74,59,50,.4)'); gr.addColorStop(0.45, 'rgba(74,59,50,.18)'); gr.addColorStop(1, 'rgba(74,59,50,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    var st = new T.CanvasTexture(c); st.colorSpace = T.SRGBColorSpace;
    /* un plan de coupe global, toujours présent (pas de recompilation des matériaux au fondu) ; le paquet vendorisé
       n'exporte pas THREE.Plane : WebGLClipping ne lit que .normal et .constant */
    var plane = { normal: new T.Vector3(0, -1, 0), constant: 1e6 };
    r.clippingPlanes = [plane];
    G = { T: T, r: r, cv: cv, env: env, shadowTex: st, plane: plane, W: 64, H: 64 };
    cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); G.dead = true; VIEWERS.forEach(function (v) { v.fail('lost'); }); });
    return G;
  }

  /* ── GLB : téléchargement (préchargeable avant three.js) puis analyse, une fois par URL ── */
  function fetchBuf(url) {
    if (!BUFS[url]) {
      BUFS[url] = fetch(url, { credentials: 'same-origin' }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.arrayBuffer(); });
      BUFS[url].catch(function () { delete BUFS[url]; });
    }
    return BUFS[url];
  }
  function model(url, T) {
    if (MODELS[url]) return MODELS[url];
    MODELS[url] = fetchBuf(url).then(function (ab) {
      return new Promise(function (res, rej) {
        var base = url.replace(/[^/]*(\?.*)?$/, '');
        new T.GLTFLoader().parse(ab, base, res, rej);
      });
    }).then(function (gltf) {
      var sc = gltf.scene, box = new T.Box3().setFromObject(sc);
      var ex = Object.assign({}, sc.userData || {}, (sc.children[0] && sc.children[0].userData) || {});
      sc.traverse(function (n) { if (n.isMesh) n.frustumCulled = false; });
      return { scene: sc, lo: box.min.toArray(), hi: box.max.toArray(), ex: ex };
    });
    MODELS[url].catch(function () { delete MODELS[url]; });
    return MODELS[url];
  }

  /* ── un lecteur ── */
  function Viewer(cv, o) {
    var s = this;
    s.cv = cv; s.o = o || {}; s.cur = null; s.old = null;
    s.yaw = (s.o.yaw || 0) * D2R; s.pitch = 4 * D2R; s.z = 1; s.vel = 0; s.idle = 0;
    s.auto = !RM && s.o.spin !== 0; s.spinRate = (s.o.spin || 7) * D2R; s.idleDelay = s.o.idle != null ? s.o.idle : 3;
    s.tw = null; s.vis = true; s.raf = 0; s.last = 0; s.ft = 1; s.t = 0;
    s.tx = 0; s.ty = 0; s.ptx = 0; s.pty = 0; s.sy = 0; s.psy = null; s.zg = 1;
    s.transparent = s.o.bg === 'none';
    try { s.ctx = cv.getContext('2d', { alpha: s.transparent }); } catch (e) { s.ctx = null; }
    if (!supported() || !s.ctx) { s.fail('webgl'); return; }
    VIEWERS.push(s);
    s.bind();
    if ('ResizeObserver' in w) new ResizeObserver(function () { s.size(); }).observe(cv); else w.addEventListener('resize', function () { s.size(); });
    /* n'anime que si au moins 20 % du lecteur est à l'écran */
    if ('IntersectionObserver' in w) new IntersectionObserver(function (es) {
      var e = es[es.length - 1]; s.vis = e.isIntersecting && e.intersectionRatio >= 0.2; if (s.vis) s.wake(); else s.last = 0;
    }, { threshold: [0, 0.2, 0.5] }).observe(cv);
    d.addEventListener('visibilitychange', function () { s.wake(); });
    d.addEventListener('kyma:motion', function () { s.wake(); });
    s.size();
    s.ready = three(s.o.three || cv.getAttribute('data-three')).then(function (T) {
      var g = shared(T); if (!g) throw new Error('webgl');
      s.T = T; s.init(); return T;
    });
    s.ready.catch(function () { s.fail('webgl'); });
    if (s.o.src) s.load(s.o.src).catch(function () { /* repli géré par onerror */ });
  }
  var V = Viewer.prototype;
  V.fail = function (why) { if (this.dead) return; this.dead = true; if (this.o.onerror) this.o.onerror(why); };
  V.init = function () {
    var s = this, T = s.T, sc = s.scene = new T.Scene();
    sc.environment = G.env; sc.environmentIntensity = 0.85;
    var key = new T.DirectionalLight(0xfff4ea, 1.25); key.position.set(-2.2, 3.2, 2.6); sc.add(key);
    var rim = new T.DirectionalLight(0xe6ecff, 0.45); rim.position.set(2.5, 1.2, -2.8); sc.add(rim);
    sc.add(new T.HemisphereLight(0xfff8f0, 0xd9c6b4, 0.35));
    s.cam = new T.PerspectiveCamera(28, 1, 0.01, 60);
    s.pivot = new T.Group(); sc.add(s.pivot);           /* rotation (lacet) autour du centre du modèle */
    s.float = new T.Group(); s.pivot.add(s.float);      /* lévitation */
    s.shadow = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ map: G.shadowTex, transparent: true, depthWrite: false, toneMapped: false }));
    s.shadow.rotation.x = -Math.PI / 2; s.shadow.renderOrder = -1; s.shadow.visible = false; s.pivot.add(s.shadow);
    s.tmp = new T.Vector3(); s.tmp2 = new T.Vector3();
  };
  V.size = function () {
    /* résolution interne plafonnée (DPR 1,5 au plus, × qualité adaptative) */
    var cv = this.cv, r = Math.min(w.devicePixelRatio || 1, 1.5) * (this.q || 1);
    var W = Math.max(64, Math.round((cv.clientWidth || 300) * r)), H = Math.max(64, Math.round((cv.clientHeight || 300) * r));
    if (W !== cv.width || H !== cv.height) { cv.width = W; cv.height = H; this.dirty = 1; this.wake(); }
  };
  V.load = function (url) {
    var s = this; if (s.dead) return Promise.reject(new Error('webgl'));
    s.want = url; s.cv.setAttribute('aria-busy', 'true');
    return s.ready.then(function (T) { return model(url, T); }).then(function (m) {
      s.cv.removeAttribute('aria-busy');
      if (s.want === url && !s.dead) s.swap(m);
      if (s.o.onload) s.o.onload(url);
    }, function (e) {
      s.cv.removeAttribute('aria-busy');
      if (w.console) console.warn('[KYMAViewer]', url, e && e.message);
      if (!s.cur) s.fail(e && e.message === 'webgl' ? 'webgl' : 'load');
      throw e;
    });
  };
  V.swap = function (m) {
    var s = this, T = s.T;
    if (s.cur && s.cur.m === m) return;
    var holder = new T.Group(), inst = m.scene.clone(true);
    var cx = (m.lo[0] + m.hi[0]) / 2, cz = (m.lo[2] + m.hi[2]) / 2;
    inst.position.set(-cx, 0, -cz); holder.add(inst);
    var c = { m: m, holder: holder, inst: inst, c: [cx, (m.lo[1] + m.hi[1]) / 2, cz],
      r: Math.max(m.hi[0] - m.lo[0], m.hi[1] - m.lo[1], m.hi[2] - m.lo[2]) / 2 };
    if (s.old) s.float.remove(s.old.holder);
    if (s.cur && !RM) { s.old = s.cur; s.ft = 0; } else { if (s.cur) s.float.remove(s.cur.holder); s.old = null; }
    s.cur = c; s.float.add(holder);
    s.shadow.visible = true;
    s.shadow.scale.set((m.hi[0] - m.lo[0]) * 1.25, (m.hi[2] - m.lo[2]) * 1.8 + 0.2, 1);
    s.shadow.position.set(0, m.lo[1] + 0.002, 0);
    s.dirty = 1; s.wake();
  };

  /* ── interaction : glisser, clavier, double-clic, pointeur, défilement ── */
  V.bind = function () {
    var s = this, cv = s.cv, drag = null;
    cv.style.touchAction = 'pan-y';
    cv.addEventListener('pointerdown', function (e) {
      drag = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId, type: e.pointerType, moved: 0 };
      s.vel = 0; s.idle = 0; s.tw = null; s.hold = true; s.wake();
    });
    w.addEventListener('pointermove', function (e) {
      if (!drag) {
        /* inclinaison douce vers le pointeur (souris seulement, quand le lecteur est survolé) */
        if (e.pointerType === 'mouse' && s.hover) {
          var b = cv.getBoundingClientRect();
          s.ptx = clamp(((e.clientX - b.left) / (b.width || 1) - 0.5) * 2, -1, 1);
          s.pty = clamp(((e.clientY - b.top) / (b.height || 1) - 0.5) * 2, -1, 1);
          s.wake();
        }
        return;
      }
      if (e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y, now = performance.now(), dt = Math.max(16, now - drag.t) / 1000;
      if (drag.type === 'touch' && !drag.moved && Math.abs(dy) > Math.abs(dx)) { drag = null; s.hold = false; return; }
      drag.moved += Math.abs(dx) + Math.abs(dy);
      if (drag.moved > 4 && !drag.cap) { drag.cap = 1; try { cv.setPointerCapture(e.pointerId); } catch (er) { /* */ } }
      var a = dx * 0.0085; s.yaw += a; s.vel = RM ? 0 : clamp(s.vel * 0.6 + 0.4 * a / dt, -5, 5);
      if (drag.type !== 'touch') s.pitch = clamp(s.pitch + dy * 0.004, -8 * D2R, 18 * D2R);
      drag.x = e.clientX; drag.y = e.clientY; drag.t = now; s.dirty = 1; s.wake();
    }, { passive: true });
    var up = function (e) { if (drag && (!e || e.pointerId === drag.id)) { drag = null; s.hold = false; s.idle = 0; s.wake(); } };
    w.addEventListener('pointerup', up); w.addEventListener('pointercancel', up);
    cv.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { s.hover = true; s.wake(); } });
    cv.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { s.hover = false; s.ptx = 0; s.pty = 0; s.wake(); } });
    cv.addEventListener('dblclick', function () { s.zoom(s.zg > 1.2 ? 1 : 1.35); });
    cv.addEventListener('keydown', function (e) {
      var k = e.key, pr = { 1: 'face', 2: 'profil', 3: 'dos', 4: 'detail' }[k];
      if (k === 'ArrowLeft' || k === 'ArrowRight') { e.preventDefault(); s.turn((k === 'ArrowLeft' ? -15 : 15) * D2R); }
      else if (pr) { e.preventDefault(); s.preset(pr); }
      else if (k === '+' || k === '=') s.zoom(1.35); else if (k === '-') s.zoom(1);
    });
    w.addEventListener('scroll', function () { if (s.vis && !RM) s.wake(); }, { passive: true });
  };
  V.to = function (yaw, pitch, z, ms) {
    this.vel = 0; this.idle = 0;
    var y0 = this.yaw, dy = ((yaw - y0) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
    this.tw = { t: 0, ms: RM ? 1 : (ms || 1100), y0: y0, y1: y0 + dy, p0: this.pitch, p1: pitch, z0: this.z, z1: z };
    this.zg = z; this.wake();
  };
  V.preset = function (n) { var p = PRE[n] || PRE.face; this.to(p[0] * D2R, p[1] * D2R, p[2]); };
  V.face = function (deg, z) { this.to(-deg * D2R, 4 * D2R, z || this.z, 1200); };
  V.turn = function (a) { this.to(this.yaw + a, this.pitch, this.z, 500); };
  V.zoom = function (z) { this.to(this.yaw, this.pitch, clamp(z, 1, 1.7), 700); };

  /* ── boucle (à la demande) ── */
  V.wake = function () { var s = this; if (!s.raf && !s.dead) s.raf = w.requestAnimationFrame(function (t) { s.tick(t); }); };
  V.tick = function (now) {
    var s = this; s.raf = 0;
    if (d.hidden || (!s.vis && s.shown && !s.dirty)) { s.last = 0; return; }
    if (!s.vis) { s.draw(); s.dirty = 0; s.last = 0; return; } /* hors champ : une image fixe */
    var real = s.last ? now - s.last : 0, dt = s.last ? Math.min(0.1, real / 1000) : 1 / 60, go = false; s.last = now;
    var calm = RM || paused();
    if (s.tw) {
      var T = s.tw; T.t += dt * 1000; var k = ease(Math.min(1, T.t / T.ms));
      s.yaw = T.y0 + (T.y1 - T.y0) * k; s.pitch = T.p0 + (T.p1 - T.p0) * k; s.z = T.z0 + (T.z1 - T.z0) * k;
      if (T.t >= T.ms) { s.tw = null; s.idle = 0; } go = true;
    } else if (!s.hold) {
      if (Math.abs(s.vel) > 0.01) { s.yaw += s.vel * dt; s.vel *= Math.exp(-dt / 0.55); go = true; } else s.vel = 0;
      s.idle += dt;
      if (s.auto && !calm && s.idle > s.idleDelay) {
        /* démarrage en douceur (rampe 1,2 s) ; ralentie de moitié sous la souris */
        var ramp = Math.min(1, (s.idle - s.idleDelay) / 1.2);
        s.yaw += s.spinRate * dt * ramp * ramp * (s.hover ? 0.35 : 1); go = true;
      }
    } else go = true;
    /* inclinaison vers le pointeur et rotation liée au défilement (amorties) */
    var wtx = calm ? 0 : s.ptx * 9 * D2R, wty = calm ? 0 : s.pty * 4 * D2R, wsy = 0;
    if (!calm) {
      var b = s.cv.getBoundingClientRect(), vh = w.innerHeight || 1;
      wsy = clamp((b.top + b.height / 2 - vh / 2) / vh, -1, 1) * -22 * D2R;
    }
    if (s.psy === null) s.sy = wsy; s.psy = wsy;
    var ntx = damp(s.tx, wtx, 0.35, dt), nty = damp(s.ty, wty, 0.35, dt), nsy = damp(s.sy, wsy, 0.28, dt);
    if (Math.abs(ntx - wtx) > 1e-4 || Math.abs(nty - wty) > 1e-4 || Math.abs(nsy - wsy) > 1e-4) go = true;
    s.tx = ntx; s.ty = nty; s.sy = nsy;
    if (!calm) { s.t += dt; go = true; } /* lévitation : rendu continu tant que le lecteur est visible */
    if (s.old) { s.ft += dt / 0.9; if (s.ft >= 1) { s.float.remove(s.old.holder); s.old = null; } go = true; }
    if (go || s.dirty) { s.draw(); if (real && go) s.adapt(real); }
    s.dirty = 0;
    if (go) s.wake(); else s.last = 0;
  };
  V.draw = function () {
    var s = this, g = G; if (!g || g.dead || s.dead || !s.scene) return;
    var r = g.r, W = s.cv.width, H = s.cv.height, asp = W / H, c = s.cur;
    if (g.W < W || g.H < H) { g.W = Math.max(g.W, W); g.H = Math.max(g.H, H); r.setSize(g.W, g.H, false); }
    r.setViewport(0, 0, W, H); r.setScissor(0, 0, W, H); r.setScissorTest(true);
    if (s.transparent) r.setClearColor(0x000000, 0); else r.setClearColor(0xf5ede4, 1);
    r.clear(true, true, true);
    if (c) {
      var fov = 28, dist = c.r / Math.sin(fov * D2R / 2) * (asp < 1 ? 1.05 / Math.max(0.62, asp) : 1.05) / s.z * (s.o.fit || 1);
      var ty = s.z > 1.05 ? c.c[1] + (c.m.hi[1] - c.c[1]) * 0.35 * (s.z - 1) / 0.7 : c.c[1];
      var pitch = s.pitch + s.ty;
      s.cam.fov = fov; s.cam.aspect = asp; s.cam.near = dist * 0.1; s.cam.far = dist * 4; s.cam.updateProjectionMatrix();
      s.cam.position.set(0, ty + Math.sin(pitch) * dist, Math.cos(pitch) * dist); s.cam.lookAt(0, ty, 0);
      s.pivot.rotation.y = s.yaw + s.tx + s.sy;
      var bob = RM || paused() ? 0 : Math.sin(s.t * 1.1) * c.r * 0.012;
      s.float.position.y = bob;
      s.shadow.material.opacity = 1 - Math.abs(bob) / (c.r * 0.05);
      s.scene.updateMatrixWorld();
      var P = g.plane;
      if (s.old) {
        /* fondu « vague » : le nouveau coloris monte de bas en haut, l'ancien s'efface au-dessus */
        var span = c.m.hi[1] - c.m.lo[1], cy = c.m.lo[1] + bob - 0.05 * span + ease(Math.min(1, s.ft)) * span * 1.1;
        s.old.holder.visible = false;
        P.normal.set(0, -1, 0); P.constant = cy; r.render(s.scene, s.cam);
        c.holder.visible = false; s.old.holder.visible = true; s.shadow.visible = false;
        P.normal.set(0, 1, 0); P.constant = -cy; r.render(s.scene, s.cam);
        c.holder.visible = true; s.shadow.visible = true;
      } else {
        P.normal.set(0, -1, 0); P.constant = 1e6; r.render(s.scene, s.cam);
      }
    }
    /* copie dans le canvas 2D du lecteur (la zone rendue occupe les H dernières lignes du canvas partagé) */
    try {
      if (s.transparent) s.ctx.clearRect(0, 0, W, H);
      s.ctx.drawImage(g.cv, 0, g.H - H, W, H, 0, 0, W, H);
    } catch (e) { /* contexte perdu */ }
    if (c && !s.shown) { s.shown = 1; s.cv.classList.add('is-drawn'); }
    if (s.o.onframe && c) s.o.onframe(s);
  };
  /* qualité adaptative (cible 60 i/s) : résolution interne de 50 à 100 % */
  V.adapt = function (ms) {
    this.acc = (this.acc || 0) + Math.min(ms, 400); this.n = (this.n || 0) + 1;
    if (this.n < 12 && this.acc < 600) return;
    var avg = this.acc / this.n, q = this.q || 1; this.acc = 0; this.n = 0;
    if (avg > 40) q *= 0.75; else if (avg > 22) q *= 0.88; else if (avg < 17.5) q *= 1.06;
    q = clamp(q, 0.5, 1);
    if (Math.abs(q - (this.q || 1)) > 0.02) { this.q = q; this.size(); }
  };
  /* projection d'un point du modèle (coordonnées du GLB, mètres) en px CSS du canvas ; front > 0 = face visible */
  V.project = function (p, n) {
    var s = this, c = s.cur; if (!c || !s.cam) return null;
    var wp = s.tmp.set(p[0], p[1], p[2]).applyMatrix4(c.inst.matrixWorld), front = 1;
    if (n) {
      var wn = s.tmp2.set(p[0] + n[0], p[1] + n[1], p[2] + n[2]).applyMatrix4(c.inst.matrixWorld).sub(wp);
      var ex = s.cam.position.x - wp.x, ey = s.cam.position.y - wp.y, ez = s.cam.position.z - wp.z;
      front = (wn.x * ex + wn.y * ey + wn.z * ez) / ((Math.hypot(ex, ey, ez) || 1) * (wn.length() || 1));
    }
    var q = wp.clone().project(s.cam);
    return { x: (q.x * 0.5 + 0.5) * s.cv.clientWidth, y: (0.5 - q.y * 0.5) * s.cv.clientHeight, front: front };
  };
  /* points chauds : [point, normale, zoom] calculés sur le modèle chargé (extras du GLB v2+, sinon boîte englobante) */
  V.anchor = function (name) {
    var c = this.cur; if (!c) return null;
    var lo = c.m.lo, hi = c.m.hi, ex = c.m.ex || {}, zp = ex.zipPath, poi = ex.poi || {};
    function f(x, y, z) { return [lo[0] + (hi[0] - lo[0]) * x, lo[1] + (hi[1] - lo[1]) * y, lo[2] + (hi[2] - lo[2]) * z]; }
    switch (name) {
      case 'tirette': return [zp ? [zp[0][0], zp[0][1] - 0.02, zp[0][2] + 0.01] : f(0.5, 0.72, 0.95), [0, 0.1, 1], 1.45];
      case 'zip': return [zp ? zp[Math.floor(zp.length / 2)] : f(0.5, 0.45, 0.95), [0, 0, 1], 1.15];
      case 'capuche': return [poi.hood ? poi.hood.target : f(0.6, 0.92, 0.4), [0.35, 0.7, 0.45], 1.2];
      case 'poches': return [f(0.66, 0.3, 0.88), [0.3, 0, 1], 1.25];
      case 'cotes': return [f(0.66, 0.04, 0.85), [0.15, -0.1, 1], 1.2];
      case 'poignet': return [f(0.94, 0.06, 0.55), [0.6, -0.3, 0.6], 1.2];
      case 'dos': return [f(0.5, 0.55, 0.02), [0, 0, -1], 1];
    }
    return null;
  };

  w.KYMAViewer = {
    mount: function (cv, o) { if (cv._kv) return cv._kv; var v = new Viewer(cv, o); cv._kv = v; return v; },
    prefetch: function (url) { if (url) fetchBuf(url).catch(function () { /* */ }); },
    supported: supported,
    contexts: function () { return G && !G.dead ? 1 : 0; },
    three: three
  };
})(window, document);
