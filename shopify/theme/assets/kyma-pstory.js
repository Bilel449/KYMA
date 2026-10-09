/*! KYMA Story v1.0 — « La pièce » pilotée par le défilement (section kyma-product-story-scroll).
 *  La progression du défilement dans la section épinglée (0 → 1) est amortie puis pilote une timeline de clés
 *  caméra / modèle (rotation, cible, direction, distance, tirette, ouverture, mise au point). three.js
 *  (assets/kyma-three.js, MIT) n'est chargé qu'à l'approche de la section ; rendu à la demande (rien quand rien ne
 *  bouge), pixelRatio ≤ 1,5, RoomEnvironment + tone mapping ACES, ombre de contact douce.
 *  Modèle v2 (contrat Izaac) : Panel_Left/Right (morph « open » ou pivots), Zip_Slider/Zip_Pull, extras zipPath/poi.
 *  Repli v1 (un seul maillage) : ouverture du devant calculée dans le shader (charnières aux coutures, découpe au
 *  zip derrière le curseur), doublure = faces arrière teintées.
 *  Mouvement réduit / pause / sans WebGL / éditeur sans JS → section statique (texte complet, modèle immobile). */
(function (w, d) {
  'use strict';
  if (w.KYMAStory) return;
  var root = d.documentElement;
  var RM = !!(w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var PI = Math.PI;
  function paused() { return root.classList.contains('kyma-motion-paused'); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function sstep(t) { t = clamp(t, 0, 1); return t * t * t * (t * (t * 6 - 15) + 10); }
  function mix(a, b, t) { return a + (b - a) * t; }
  function mix3(a, b, t) { return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)]; }
  function norm(v) { var l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* ── chargement différé de three.js (une seule fois par page) ── */
  var threeP = null;
  function loadThree(url) {
    if (w.KYMAThree) return Promise.resolve(w.KYMAThree);
    if (threeP) return threeP;
    threeP = new Promise(function (res, rej) {
      var s = d.createElement('script'); s.src = url; s.async = true;
      s.onload = function () { w.KYMAThree ? res(w.KYMAThree) : rej(new Error('three')); };
      s.onerror = function () { threeP = null; rej(new Error('three')); };
      d.head.appendChild(s);
    });
    return threeP;
  }
  function webgl() {
    try { var c = d.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; }
  }

  /* ── timeline : moments (texte) et clés caméra, en unités « hauteur du modèle = 1 » ── */
  var RANGES = { intro: [0, 0.1], hood: [0.1, 0.25], back: [0.25, 0.36], pull: [0.36, 0.475], zip: [0.475, 0.645],
    open_left: [0.645, 0.775], open_right: [0.775, 0.88], outro: [0.88, 1.01] };
  var POI = { /* cibles / directions par défaut (GLB v1 normalisé) ; remplacées par extras.poi du GLB v2 */
    full: { t: [0, 0.5, 0], dir: [0, 0.1, 1], fit: 1, world: 1 },
    hood_outer: { t: [0, 0.78, -0.14], dir: [0.6, 0.38, -0.7], dist: 1.3 },
    hood_inner: { t: [0, 0.84, -0.07], dir: [0.1, 0.62, 0.78], dist: 0.82 },
    pull: { t: [0, 0.83, 0.16], dir: [0.2, 0.1, 1], dist: 0.34 },
    open_left: { t: [-0.16, 0.5, 0.02], dir: [0.5, 0.14, 0.86], dist: 1.75 },
    open_right: { t: [0.16, 0.5, 0.02], dir: [-0.5, 0.14, 0.86], dist: 1.75 }
  };
  function keys(P) {
    function k(p, o) { o.p = p; return o; }
    var F = P.full;
    return [
      k(0, { yaw: -0.7, poi: F, fit: 1.08, rise: 0.3 }),
      k(0.085, { yaw: 0.1, poi: F, fit: 1.0, rise: 0 }),
      k(0.125, { yaw: 0, poi: P.hood_outer }),
      k(0.165, { yaw: 0.12, poi: P.hood_outer, dk: 0.92 }),
      k(0.205, { yaw: 0.05, poi: P.hood_inner }),
      k(0.245, { yaw: 0, poi: P.hood_inner, dk: 0.92 }),
      k(0.295, { yaw: PI, poi: F, fit: 0.98 }),
      k(0.35, { yaw: PI + 0.14, poi: F, fit: 0.96 }),
      k(0.405, { yaw: 2 * PI, poi: P.pull, focus: 1 }),
      k(0.462, { yaw: 2 * PI, poi: P.pull, dk: 0.86, focus: 1 }),
      k(0.485, { yaw: 2 * PI, poi: P.pull, follow: 1, dk: 1.25, focus: 0.7, slider: 0 }),
      k(0.625, { yaw: 2 * PI + 0.08, poi: P.pull, follow: 1, dk: 1.6, focus: 0, slider: 1, open: 0.6 }),
      k(0.665, { yaw: 2 * PI, poi: F, fit: 0.92, slider: 1, open: 1 }),
      k(0.7, { yaw: 2 * PI, poi: P.open_left, slider: 1, open: 1 }),
      k(0.765, { yaw: 2 * PI + 0.06, poi: P.open_left, dk: 0.95, slider: 1, open: 1 }),
      k(0.805, { yaw: 2 * PI, poi: P.open_right, slider: 1, open: 1 }),
      k(0.87, { yaw: 2 * PI - 0.06, poi: P.open_right, dk: 0.95, slider: 1, open: 1 }),
      k(0.935, { yaw: 2 * PI + 0.32, poi: F, fit: 1.5, slider: 1, open: 0.55, outro: 1 }),
      k(1, { yaw: 2 * PI + 0.5, poi: F, fit: 1.56, slider: 1, open: 0.55, outro: 1 })
    ];
  }
  /* valeur d'une clé (les champs absents prennent des valeurs neutres) */
  function kv(k, n) {
    switch (n) {
      case 'rise': case 'focus': case 'follow': case 'slider': case 'open': case 'outro': return k[n] || 0;
      case 'dk': return k.dk || 1;
    }
    return k[n];
  }

  /* ── shader de repli (GLB v1) : ouverture du devant + doublure ── */
  function patchOpen(mat, U) {
    mat.side = 2; /* DoubleSide */
    mat.onBeforeCompile = function (sh) {
      sh.uniforms.kyOpen = U.open; sh.uniforms.kySlider = U.slider; sh.uniforms.kyHinge = U.hinge;
      sh.uniforms.kyLining = U.lining; sh.uniforms.kyTop = U.top;
      var head = 'uniform float kyOpen,kySlider,kyHinge,kyTop;varying float kySide,kyW;\n' +
        /* poids : devant (z > 0), sous le curseur de la tirette déjà passé, sous le col */
        'float kyWeight(vec3 p){float f=smoothstep(-.005,.05,p.z);' +
        'float y=smoothstep(kySlider-.03,kySlider+.12,p.y)*(1.-smoothstep(kyTop+.02,kyTop+.08,p.y));return f*y*kyOpen;}\n' +
        /* le devant s'écarte vers les côtés (le tissu se tasse vers la couture) puis pivote un peu vers l'avant */
        'vec3 kyDef(vec3 p,float a){float s=p.x<0.?-1.:1.;float wx=1.-smoothstep(0.,kyHinge,abs(p.x));' +
        'float wr=1.-smoothstep(kyHinge-.07,kyHinge+.01,abs(p.x));p.x+=s*.17*a*wx;float an=a*.62*s*wr;vec2 r=vec2(p.x-s*kyHinge,p.z);' +
        'float c=cos(an),n=sin(an);return vec3(s*kyHinge+r.x*c+r.y*n,p.y,-r.x*n+r.y*c);}\n' +
        'vec3 kyRotN(vec3 v,vec3 p,float a){float s=p.x<0.?-1.:1.;float wr=1.-smoothstep(kyHinge-.07,kyHinge+.01,abs(p.x));float an=a*.62*s*wr;float c=cos(an),n=sin(an);return vec3(v.x*c+v.z*n,v.y,-v.x*n+v.z*c);}\n';
      sh.vertexShader = head + sh.vertexShader
        .replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\nfloat kyA=kyWeight(position);objectNormal=kyRotN(objectNormal,position,kyA);')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed=kyDef(transformed,kyA);kySide=position.x<0.?-1.:1.;kyW=kyA;');
      sh.fragmentShader = 'uniform vec3 kyLining;varying float kySide,kyW;\n' + sh.fragmentShader
        .replace('#include <clipping_planes_fragment>', '#include <clipping_planes_fragment>\nif(kyW>.002&&abs(kySide)<.999)discard;')
        .replace('#include <color_fragment>', '#include <color_fragment>\nif(!gl_FrontFacing)diffuseColor.rgb=kyLining*.92;');
    };
    mat.customProgramCacheKey = function () { return 'kyma-open'; };
    mat.needsUpdate = true;
  }

  /* ── une section ── */
  function Story(sec) {
    var self = this; self.sec = sec;
    self.stage = sec.querySelector('[data-story-stage]');
    self.canvas = sec.querySelector('[data-story-canvas]');
    self.focusEl = sec.querySelector('[data-story-focus]');
    self.loadingEl = sec.querySelector('[data-story-loading]');
    self.bar = sec.querySelector('[data-story-bar]');
    self.steps = [].slice.call(sec.querySelectorAll('[data-step]'));
    self.tints = [].slice.call(sec.querySelectorAll('[data-story-tints] button'));
    self.src = sec.getAttribute('data-src'); self.lining = sec.getAttribute('data-lining') || '#F3EBDD';
    self.live = !(RM || paused()) && webgl() && !!self.src;
    self.p = 0; self.pp = -1; self.t0 = 0; self.cache = {}; self.inview = false; self.dirty = true;
    self.sx = 0; self.sy = 0; self.side = 'left';
    sec.classList.add(self.live ? 'is-live' : 'is-static');
    self.tints.forEach(function (b) { b.addEventListener('click', function () { self.pick(b); }); });
    /* clavier : un bouton de fin de section reçoit le focus → on amène la fin de la présentation à l'écran */
    sec.addEventListener('focusin', function (e) {
      if (!self.live) return;
      var st = e.target.closest && e.target.closest('[data-step]');
      if (!st) return;
      var r = RANGES[st.getAttribute('data-step')]; if (r) self.goto(Math.min(1, (r[0] + r[1]) / 2 + (st.getAttribute('data-step') === 'outro' ? 0.1 : 0)));
    });
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        self.inview = e.isIntersecting;
        if (e.isIntersecting) { self.boot(); self.wake(); }
      });
    }, { rootMargin: '120% 0px 120% 0px' });
    io.observe(sec);
    self.io = io;
    self.onScroll = function () { self.wake(); };
    w.addEventListener('scroll', self.onScroll, { passive: true });
    w.addEventListener('resize', function () { self.resize(); self.wake(); });
    d.addEventListener('visibilitychange', function () { if (!d.hidden) self.wake(); });
    if (self.live) self.texts(0);
  }
  Story.prototype.goto = function (p) {
    var r = this.sec.getBoundingClientRect(), span = this.sec.offsetHeight - w.innerHeight;
    w.scrollTo({ top: w.scrollY + r.top + span * p, behavior: 'auto' });
  };
  Story.prototype.boot = function () {
    var self = this;
    if (self.booted) return; self.booted = true;
    loadThree(self.sec.getAttribute('data-three')).then(function (T) { self.T = T; self.init(); self.load(self.src); })
      .catch(function () { self.fail(); });
  };
  Story.prototype.fail = function () {
    this.live = false; this.sec.classList.remove('is-live'); this.sec.classList.add('is-static', 'is-nogl');
    if (this.loadingEl) this.loadingEl.hidden = true;
  };
  Story.prototype.init = function () {
    var T = this.T, self = this;
    var r;
    try { r = new T.WebGLRenderer({ canvas: self.canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); }
    catch (e) { self.fail(); return; }
    self.r = r;
    r.setPixelRatio(Math.min(w.devicePixelRatio || 1, 1.5));
    r.toneMapping = T.ACESFilmicToneMapping; r.toneMappingExposure = 1.02; r.outputColorSpace = T.SRGBColorSpace;
    r.setClearColor(0x000000, 0);
    var sc = self.scene = new T.Scene();
    var pm = new T.PMREMGenerator(r);
    sc.environment = pm.fromScene(new T.RoomEnvironment(), 0.04).texture; pm.dispose();
    sc.environmentIntensity = 0.85;
    var key = new T.DirectionalLight(0xfff4ea, 1.25); key.position.set(-2.2, 3.2, 2.6); sc.add(key);
    var rim = new T.DirectionalLight(0xe6ecff, 0.45); rim.position.set(2.5, 1.2, -2.8); sc.add(rim);
    sc.add(new T.HemisphereLight(0xfff8f0, 0xd9c6b4, 0.35));
    self.cam = new T.PerspectiveCamera(30, 1, 0.03, 60);
    self.pivot = new T.Group(); sc.add(self.pivot);
    /* ombre de contact : ellipse floue sous le modèle (dessinée une fois sur un canvas 2D) */
    var c = d.createElement('canvas'); c.width = c.height = 256;
    var g = c.getContext('2d'), gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    gr.addColorStop(0, 'rgba(74,59,50,.42)'); gr.addColorStop(0.45, 'rgba(74,59,50,.2)'); gr.addColorStop(1, 'rgba(74,59,50,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    var tex = new T.CanvasTexture(c); tex.colorSpace = T.SRGBColorSpace;
    self.shadow = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }));
    self.shadow.rotation.x = -PI / 2; self.shadow.scale.set(1.35, 0.62, 1); self.shadow.position.y = 0.002; self.shadow.renderOrder = -1;
    self.pivot.add(self.shadow);
    self.U = { open: { value: 0 }, slider: { value: 1 }, hinge: { value: 0.36 }, lining: { value: new T.Color(self.lining) }, top: { value: 0.9 } };
    self.resize();
  };
  Story.prototype.resize = function () {
    if (!this.r) return;
    var W = this.stage.clientWidth, H = this.stage.clientHeight;
    if (!W || !H) return;
    this.W = W; this.H = H; this.r.setSize(W, H, false); this.cam.aspect = W / H; this.cam.updateProjectionMatrix();
    this.dirty = true;
  };
  Story.prototype.load = function (url) {
    var self = this, T = self.T;
    if (!url || !self.r) return;
    self.want = url;
    if (self.loadingEl) self.loadingEl.hidden = false;
    var p = self.cache[url] || (self.cache[url] = new Promise(function (res, rej) { new T.GLTFLoader().load(url, res, null, rej); }));
    p.then(function (gltf) { if (self.want === url) self.use(gltf); })
      .catch(function () { if (!self.model) self.fail(); });
  };
  function find(rootObj, name) {
    var o = rootObj.getObjectByName(name); if (o) return o;
    var lo = name.toLowerCase(), hit = null;
    rootObj.traverse(function (n) { if (!hit && n.name && n.name.toLowerCase().indexOf(lo) === 0) hit = n; });
    return hit;
  }
  Story.prototype.use = function (gltf) {
    var self = this, T = self.T;
    if (self.model) self.pivot.remove(self.model);
    var m = gltf.scene.clone(true);
    /* normalisation : hauteur 1, base à y = 0, centré en x / z */
    var box = new T.Box3().setFromObject(m), size = box.getSize(new T.Vector3());
    var H = size.y || 1, s = 1 / H;
    var holder = new T.Group(); holder.add(m);
    m.scale.setScalar(s);
    m.position.set(-(box.min.x + size.x / 2) * s, -box.min.y * s, -(box.min.z + size.z / 2) * s);
    self.model = holder; self.pivot.add(holder);
    self.scale = s; self.off = m.position.clone();
    var ex = Object.assign({}, gltf.scene.userData || {}, (gltf.scene.children[0] && gltf.scene.children[0].userData) || {});
    /* POI du GLB v2 (mètres, espace modèle) → unités normalisées */
    var P = JSON.parse(JSON.stringify(POI));
    var toN = function (v) { return [v[0] * s + m.position.x, v[1] * s + m.position.y, v[2] * s + m.position.z]; };
    if (ex.poi) Object.keys(ex.poi).forEach(function (k) {
      var q = ex.poi[k]; if (!q || !q.target) return;
      P[k] = { t: toN(q.target), dir: q.dir || (P[k] && P[k].dir) || [0, 0.1, 1], dist: q.dist ? q.dist * s : (P[k] && P[k].dist) || 0.6 };
      if (k === 'full') { P.full.fit = 1; delete P.full.dist; }
    });
    self.K = keys(P);
    /* nœuds du contrat v2 */
    var nodes = { pl: find(m, 'Panel_Left'), pr: find(m, 'Panel_Right'), slider: find(m, 'Zip_Slider'), pull: find(m, 'Zip_Pull') };
    var morphs = [];
    m.traverse(function (n) {
      if (n.isMesh) {
        n.frustumCulled = false;
        if (n.morphTargetDictionary && n.morphTargetDictionary.open != null) morphs.push(n);
      }
    });
    self.morphs = morphs; self.panels = (!morphs.length && nodes.pl && nodes.pr) ? [nodes.pl, nodes.pr] : null;
    if (self.panels) self.panelRot = self.panels.map(function (n) { return n.rotation.y; });
    /* tirette : Zip_Slider (v2) ou maillage dont le matériau s'appelle « Tirette… » (v1) */
    var mover = nodes.slider || nodes.pull, zipMesh = null;
    m.traverse(function (n) {
      if (!n.isMesh || !n.material) return;
      var nm = (n.material.name || '').toLowerCase();
      if (!mover && nm.indexOf('tirette') >= 0) mover = n;
      if (!zipMesh && nm.indexOf('zip') >= 0) zipMesh = n;
    });
    self.mover = mover; self.moverPos = mover ? mover.position.clone() : null;
    /* chemin du zip : extras.zipPath (v2) ou sommets du maillage du zip (point le plus en avant par tranche) */
    var path = null;
    if (ex.zipPath && ex.zipPath.length > 1) path = ex.zipPath.map(function (v) { return new T.Vector3(v[0], v[1], v[2]); });
    else if (zipMesh) {
      var pos = zipMesh.geometry.attributes.position, bins = {}, i, y, b;
      for (i = 0; i < pos.count; i++) {
        y = pos.getY(i); b = Math.round(y * 40);
        if (!bins[b] || pos.getZ(i) > bins[b].z) bins[b] = { x: 0, y: y, z: pos.getZ(i) };
      }
      path = Object.keys(bins).map(Number).sort(function (a, c) { return c - a; }).map(function (k) { return new T.Vector3(bins[k].x, bins[k].y, bins[k].z); });
    }
    if (path && path.length > 1) {
      /* le chemin commence à la position actuelle du curseur (haut du zip) */
      self.curve = new T.CatmullRomCurve3(path);
      var top = path[0], bot = path[path.length - 1];
      self.zipTop = top.y * s + m.position.y; self.zipBot = bot.y * s + m.position.y;
    } else { self.curve = null; self.zipTop = 0.86; self.zipBot = 0.02; }
    /* pas de morph ni de pivots : ouverture dans le shader (v1) */
    self.shaderOpen = !morphs.length && !self.panels;
    if (self.shaderOpen) {
      /* uniformes en unités du maillage (avant normalisation) : charnière ≈ couture latérale du buste */
      self.U.hinge.value = size.x * 0.31;
      self.U.top.value = path && path.length > 1 ? path[0].y : box.max.y * 0.95;
      m.traverse(function (n) {
        if (!n.isMesh || n === mover) return;
        n.material = n.material.clone(); patchOpen(n.material, self.U);
      });
    }
    self.loadedOnce = true; self.dirty = true;
    if (self.loadingEl) self.loadingEl.hidden = true;
    self.sec.classList.add('is-ready');
    self.wake();
  };
  Story.prototype.pick = function (b) {
    this.tints.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    var g = b.getAttribute('data-glb'); if (!g) return;
    this.lining = b.getAttribute('data-lining') || this.lining;
    if (this.U) this.U.lining.value.set(this.lining);
    if (this.r) this.load(g); else { this.src = g; this.sec.setAttribute('data-src', g); }
  };
  Story.prototype.wake = function () {
    var self = this;
    if (self.raf) return;
    self.raf = w.requestAnimationFrame(function (t) { self.raf = 0; self.frame(t); });
  };
  Story.prototype.progress = function () {
    var r = this.sec.getBoundingClientRect(), span = this.sec.offsetHeight - w.innerHeight;
    return span > 0 ? clamp(-r.top / span, 0, 1) : 0;
  };
  Story.prototype.texts = function (p) {
    var act = null, k;
    for (k in RANGES) if (p >= RANGES[k][0] && p < RANGES[k][1]) act = k;
    if (act === this.act) return;
    this.act = act;
    var self = this;
    this.steps.forEach(function (s) {
      var on = s.getAttribute('data-step') === act;
      s.classList.toggle('is-active', on);
      if (on && s.getAttribute('data-side')) self.side = s.getAttribute('data-side');
    });
    if (act === 'outro') this.side = 'center';
    this.sec.classList.toggle('is-outro', act === 'outro');
  };
  Story.prototype.state = function (p) {
    var K = this.K, i = 0;
    while (i < K.length - 2 && p > K[i + 1].p) i++;
    var a = K[i], b = K[i + 1], t = sstep((p - a.p) / (b.p - a.p || 1));
    var o = { yaw: mix(a.yaw, b.yaw, t) };
    ['rise', 'focus', 'follow', 'slider', 'open', 'outro', 'dk'].forEach(function (n) { o[n] = mix(kv(a, n), kv(b, n), t); });
    o.a = a; o.b = b; o.t = t;
    return o;
  };
  /* position caméra d'une clé, en espace normalisé tourné (yaw), selon l'écran */
  Story.prototype.camOf = function (k, yaw, sliderPt, follow) {
    var cam = this.cam, asp = cam.aspect, tanH = Math.tan(cam.fov * PI / 360);
    var P = k.poi, t = P.t.slice(), dir = norm(P.dir), dist;
    var portrait = asp < 1 ? Math.pow(1 / asp, 0.55) : 1;
    if (P.fit || !P.dist) {
      var hFit = 0.5 * 1.18 / tanH, wFit = 0.5 * 1.28 / (tanH * asp);
      dist = Math.max(hFit, wFit) * (k.fit || 1);
    } else dist = P.dist * portrait * kv(k, 'dk');
    if (follow > 0 && sliderPt) t = mix3(t, [sliderPt[0], sliderPt[1] - 0.02, sliderPt[2]], follow);
    var c = Math.cos(yaw), s = Math.sin(yaw);
    function ry(v) { return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]; }
    t = ry(t); if (!P.world) dir = ry(dir);
    return { t: t, pos: [t[0] + dir[0] * dist, t[1] + dir[1] * dist, t[2] + dir[2] * dist], dist: dist };
  };
  Story.prototype.frame = function (now) {
    var self = this;
    if (!self.live) return;
    var target = self.progress();
    self.texts(self.pp < 0 ? target : self.pp);
    if (self.bar) self.bar.style.transform = 'scaleY(' + target.toFixed(4) + ')';
    if (!self.r || !self.model || !self.K) { if (self.inview) self.wake(); return; }
    var dt = self.t0 ? Math.min(0.1, (now - self.t0) / 1000) : 1 / 60; self.t0 = now;
    if (self.pp < 0) self.pp = target;
    var pp = self.pp + (target - self.pp) * (1 - Math.exp(-dt * 4.2));
    if (Math.abs(target - pp) < 0.0004) pp = target;
    var moving = Math.abs(pp - self.pp) > 1e-6; self.pp = pp;
    self.texts(pp);
    /* décalage du cadrage selon le côté du texte (ordinateur) ou le bas de l'écran (portrait) */
    var portrait = self.cam.aspect < 0.9, wantSx = 0, wantSy = 0;
    if (portrait) wantSy = self.side === 'center' ? 0.2 : 0.14;
    else if (self.side === 'left') wantSx = 0.15; else if (self.side === 'right') wantSx = -0.15; else wantSy = 0.17;
    var ka = 1 - Math.exp(-dt * 3.2);
    self.sx += (wantSx - self.sx) * ka; self.sy += (wantSy - self.sy) * ka;
    var framing = Math.abs(wantSx - self.sx) + Math.abs(wantSy - self.sy) > 0.0006;
    var S = self.state(pp), time = now / 1000;
    /* rotation lente au début et à la fin (sauf pause) */
    var idle = 0, breathing = (pp < 0.1 || pp > 0.9) && self.inview && !paused() && !d.hidden;
    if (breathing) idle = Math.sin(time * 0.35) * 0.12 * (pp < 0.1 ? 1 - pp / 0.1 : (pp - 0.9) / 0.1);
    var yaw = S.yaw + idle;
    /* tirette */
    var sl = S.slider, spt = null;
    if (self.curve) {
      var cp = self.curve.getPointAt(clamp(sl, 0, 1)), c0 = self.curve.getPointAt(0);
      spt = [cp.x * self.scale + self.off.x, cp.y * self.scale + self.off.y, cp.z * self.scale + self.off.z];
      if (self.mover) self.mover.position.set(self.moverPos.x + cp.x - c0.x, self.moverPos.y + cp.y - c0.y, self.moverPos.z + cp.z - c0.z);
    } else spt = [0, mix(self.zipTop, self.zipBot, sl), 0.16];
    /* ouverture */
    var op = S.open;
    if (self.morphs.length) self.morphs.forEach(function (n) { n.morphTargetInfluences[n.morphTargetDictionary.open] = op; });
    else if (self.panels) { self.panels[0].rotation.y = self.panelRot[0] - op * 1.15; self.panels[1].rotation.y = self.panelRot[1] + op * 1.15; }
    else { self.U.open.value = op; self.U.slider.value = (spt[1] - self.off.y) / self.scale; }
    /* caméra : interpolation des deux clés voisines (positions déjà calculées pour l'écran courant) */
    var A = self.camOf(S.a, yaw, spt, kv(S.a, 'follow')), B = self.camOf(S.b, yaw, spt, kv(S.b, 'follow'));
    var tt = mix3(A.t, B.t, S.t), pos = mix3(A.pos, B.pos, S.t);
    /* trajectoire : on garde la distance (interpolation en coordonnées sphériques autour de la cible) */
    var dA = Math.log(A.dist), dB = Math.log(B.dist), dd = Math.exp(mix(dA, dB, S.t));
    var v = norm([pos[0] - tt[0], pos[1] - tt[1], pos[2] - tt[2]]);
    self.cam.position.set(tt[0] + v[0] * dd, tt[1] + v[1] * dd, tt[2] + v[2] * dd);
    self.cam.lookAt(tt[0], tt[1], tt[2]);
    var rr = this.sec.getBoundingClientRect(), pre = clamp(rr.top / (w.innerHeight || 1), 0, 1), rise = Math.max(S.rise, pre);
    if (pre > 0) moving = true;
    self.pivot.rotation.y = yaw; self.pivot.position.y = -rise * 0.12;
    self.canvas.style.opacity = (1 - rise * 0.92).toFixed(3);
    if (self.W) self.cam.setViewOffset(self.W, self.H, -self.sx * self.W, self.sy * self.H, self.W, self.H);
    if (self.focusEl) self.focusEl.style.opacity = (S.focus * 0.9).toFixed(3);
    self.sec.style.setProperty('--story-outro', S.outro.toFixed(3));
    if (moving || framing || breathing || self.dirty) { self.r.render(self.scene, self.cam); self.dirty = false; }
    if ((moving || framing || breathing) && self.inview && !d.hidden) self.wake(); else self.t0 = 0;
  };

  /* ── mode statique : modèle immobile (une image) ── */
  function still(sec) {
    var src = sec.getAttribute('data-src'), cv = sec.querySelector('[data-story-canvas]');
    if (!src || !cv || !webgl()) { sec.classList.add('is-nogl'); return; }
    var io = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return; io.disconnect();
      loadThree(sec.getAttribute('data-three')).then(function (T) {
        var s = new Story._Still(T, sec, cv, src);
        sec._kymaStill = s;
      }).catch(function () { sec.classList.add('is-nogl'); });
    }, { rootMargin: '50% 0px' });
    io.observe(sec);
  }
  Story._Still = function (T, sec, cv, src) {
    var o = Object.create(Story.prototype);
    o.sec = sec; o.stage = cv.parentNode; o.canvas = cv; o.T = T; o.live = false; o.cache = {}; o.lining = sec.getAttribute('data-lining') || '#F3EBDD';
    o.loadingEl = sec.querySelector('[data-story-loading]'); o.tints = [].slice.call(sec.querySelectorAll('[data-story-tints] button'));
    o.init();
    o.wake = function () {
      if (!o.model || !o.r) return;
      o.resize();
      var A = o.camOf({ poi: POI.full, fit: 1.04 }, 0.35, null, 0);
      o.cam.clearViewOffset(); o.cam.position.set(A.pos[0], A.pos[1], A.pos[2]); o.cam.lookAt(A.t[0], A.t[1], A.t[2]);
      o.pivot.rotation.y = 0.35; o.r.render(o.scene, o.cam);
    };
    o.tints.forEach(function (b) { b.addEventListener('click', function () { o.pick(b); }); });
    w.addEventListener('resize', function () { o.wake(); });
    o.load(src);
    return o;
  };

  function mount(sec) {
    if (sec._kyma) return; sec._kyma = 1;
    var st = new Story(sec);
    if (!st.live) { w.removeEventListener('scroll', st.onScroll); st.io.disconnect(); still(sec); }
    sec._kymaStory = st;
  }
  function all() { [].forEach.call(d.querySelectorAll('[data-kyma-pstory]'), mount); }
  w.KYMAStory = { mount: mount, ranges: RANGES };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', all); else all();
  d.addEventListener('shopify:section:load', all);
  /* éditeur : sélectionner un bloc « Étape » amène la présentation à ce moment */
  d.addEventListener('shopify:block:select', function (e) {
    var st = e.target.closest && e.target.closest('[data-kyma-pstory]'), key = e.target.getAttribute && e.target.getAttribute('data-step');
    if (st && st._kymaStory && st._kymaStory.live && RANGES[key]) st._kymaStory.goto((RANGES[key][0] + RANGES[key][1]) / 2);
  });
})(window, document);
