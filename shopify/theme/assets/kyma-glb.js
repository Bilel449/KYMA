/*! KYMA GLB v2.0 — lecteur glTF binaire (.glb) maison, WebGL natif, sans dépendance.
 *  UN SEUL contexte WebGL pour tous les lecteurs de la page : chaque lecteur dessine dans le contexte partagé
 *  (hors écran) puis copie l'image dans son propre <canvas> 2D. Les modèles sont téléchargés et analysés une
 *  seule fois par URL (cache commun) : le hoodie de l'accueil, de la section « La pièce » et de la collection
 *  partagent les mêmes tampons et textures.
 *  Lit JSON + BIN, maillages indexés (16/32 bits), POSITION / NORMAL / TEXCOORD_0, matériaux PBR
 *  (baseColorFactor, baseColorTexture JPEG/PNG via Blob, metallic, roughness), hiérarchie de nœuds.
 *  Éclairage studio (clé haut-gauche, contre-jour froid, ciel beige), ombre de contact douce, fond beige ou
 *  transparent (option bg: 'none'). Rotation au glisser (souris, toucher, inertie), rotation lente automatique
 *  (option spin en °/s, après `idle` s d'inactivité), zoom léger (double-clic, + / -), clavier (flèches = 15°,
 *  1 à 4 = Face / Profil / Dos / Détail). Changement de coloris = nouveau GLB, fondu « vague » de bas en haut.
 *  Points chauds : v.project([x,y,z], [nx,ny,nz]) -> { x, y, front } en px CSS du canvas, appelé après chaque
 *  image via o.onframe(v). Pause hors écran / onglet caché / bouton pause ; prefers-reduced-motion : image fixe.
 *  API : var v = KYMAGLB.mount(canvas, { src, bg, spin, idle, yaw, onload, onerror, onframe }); v.load(url);
 *        v.preset('face'|'profil'|'dos'|'detail'); v.zoom(1..1.7); v.face(yawDeg); KYMAGLB.contexts() */
(function (w, d) {
  'use strict';
  if (w.KYMAGLB) return;
  var RM = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var D2R = Math.PI / 180, PRE = { face: [0, 4, 1], profil: [90, 4, 1], dos: [180, 4, 1], detail: [0, 2, 1.7] };
  var G = null, MODELS = {}, BUFS = {};

  /* ── mat4 (colonnes) ── */
  function m4() { return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }
  function mul(a, b) {
    var r = [], i, j;
    for (i = 0; i < 4; i++) for (j = 0; j < 4; j++) r[j * 4 + i] = a[i] * b[j * 4] + a[4 + i] * b[j * 4 + 1] + a[8 + i] * b[j * 4 + 2] + a[12 + i] * b[j * 4 + 3];
    return r;
  }
  function trs(n) {
    if (n.matrix) return n.matrix.slice();
    var t = n.translation || [0, 0, 0], q = n.rotation || [0, 0, 0, 1], s = n.scale || [1, 1, 1];
    var x = q[0], y = q[1], z = q[2], ww = q[3];
    return [(1 - 2 * (y * y + z * z)) * s[0], 2 * (x * y + z * ww) * s[0], 2 * (x * z - y * ww) * s[0], 0,
      2 * (x * y - z * ww) * s[1], (1 - 2 * (x * x + z * z)) * s[1], 2 * (y * z + x * ww) * s[1], 0,
      2 * (x * z + y * ww) * s[2], 2 * (y * z - x * ww) * s[2], (1 - 2 * (x * x + y * y)) * s[2], 0, t[0], t[1], t[2], 1];
  }
  function persp(f, a, n, fa) { var t = 1 / Math.tan(f / 2); return [t / a, 0, 0, 0, 0, t, 0, 0, 0, 0, (fa + n) / (n - fa), -1, 0, 0, 2 * fa * n / (n - fa), 0]; }
  function rotY(a) { var c = Math.cos(a), s = Math.sin(a); return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]; }
  function rotX(a) { var c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]; }
  function tr(x, y, z) { var m = m4(); m[12] = x; m[13] = y; m[14] = z; return m; }
  function xf(m, p) { return [m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12], m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13], m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14]]; }
  function xf4(m, p) { return [m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12], m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13], m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14], m[3] * p[0] + m[7] * p[1] + m[11] * p[2] + m[15]]; }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function paused() { return !!(w.KYMA3D && w.KYMA3D.paused && w.KYMA3D.paused()) || d.documentElement.classList.contains('kyma-motion-paused'); }

  /* ── shaders ── */
  var VS = 'attribute vec3 aP,aN;attribute vec2 aU;uniform mat4 uP,uV,uM;varying vec3 vN,vW;varying vec2 vU;' +
    'void main(){vec4 p=uM*vec4(aP,1.);vW=p.xyz;vN=mat3(uM)*aN;vU=aU;gl_Position=uP*uV*p;}';
  var FS = 'precision highp float;varying vec3 vN,vW;varying vec2 vU;uniform sampler2D uT;uniform vec4 uB;' +
    'uniform float uHT,uMe,uRo,uCy,uCs;uniform vec3 uE;' +
    'float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}' +
    'void main(){float e=uCy+.025*(h(floor(vW.xz*60.))-.5);if(uCs*(vW.y-e)>0.)discard;' +
    'vec3 b=uB.rgb;if(uHT>.5)b*=pow(texture2D(uT,vU).rgb,vec3(2.2));' +
    'vec3 N=normalize(vN);if(!gl_FrontFacing)N=-N;vec3 V=normalize(uE-vW);' +
    'vec3 L=normalize(vec3(-.55,.78,.52)),Lb=normalize(vec3(.75,.2,-.7)),bg=vec3(.913,.846,.776);' +
    'float nl=dot(N,L),dif=clamp(nl,0.,1.),wr=clamp((nl+.4)/1.4,0.,1.),nv=clamp(dot(N,V),0.,1.);' +
    'vec3 H=normalize(L+V);float sh=exp2(10.*(1.-uRo)+1.);float sp=pow(clamp(dot(N,H),0.,1.),sh)*(sh+2.)/8.;' +
    'vec3 kc=vec3(1.,.97,.93),sky=mix(vec3(.62,.55,.5),bg,.5+.5*N.y);' +
    'vec3 R=reflect(-V,N);vec3 env=mix(vec3(.42,.36,.32),vec3(1.,.98,.95),smoothstep(-.3,.6,R.y))+kc*.6*pow(clamp(dot(R,L),0.,1.),16.);' +
    'vec3 F0=mix(vec3(.04),b,uMe);vec3 F=F0+(1.-F0)*pow(1.-nv,5.)*(1.-uRo)*.6;' +
    'vec3 c=b*(1.-uMe)*(kc*.95*dif+kc*.16*wr+sky*.42+vec3(.85,.88,1.)*.3*clamp(dot(N,Lb),0.,1.));' +
    'c+=kc*F*sp*dif*.9+F*env*mix(.15,1.,uMe)*(1.-.5*uRo);' +
    'c+=b*(1.-uMe)*pow(1.-nv,3.)*.22;' +
    'c=c/(1.+c*.18);gl_FragColor=vec4(pow(clamp(c,0.,1.),vec3(.4545)),1.);}';
  var VSS = 'attribute vec3 aP;uniform mat4 uP,uV,uM;varying vec2 vQ;void main(){vQ=aP.xz;gl_Position=uP*uV*uM*vec4(aP,1.);}';
  var FSS = 'precision mediump float;varying vec2 vQ;uniform float uA;void main(){float r=length(vQ);' +
    'gl_FragColor=vec4(.29,.23,.2,uA*.16*(1.-smoothstep(.15,1.,r)));}';

  /* ── contexte partagé (un seul par page) ── */
  function shared() {
    if (G) return G.dead ? null : G;
    var cv = d.createElement('canvas'), gl = null; cv.width = cv.height = 64;
    try { gl = cv.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' }); } catch (e) { gl = null; }
    if (!gl) { G = { dead: true }; return null; }
    G = { cv: cv, gl: gl, u32: gl.getExtension('OES_element_index_uint'), viewers: [] };
    G.pr = prog(gl, VS, FS); G.ps = prog(gl, VSS, FSS);
    if (!G.pr || !G.ps) { G.dead = true; return null; }
    var sq = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, sq);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, 1]), gl.STATIC_DRAW); G.sq = sq;
    gl.enable(gl.DEPTH_TEST);
    cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); G.dead = true; G.viewers.forEach(function (v) { v.fail('lost'); }); });
    return G;
  }
  function prog(gl, vs, fs) {
    var p = gl.createProgram();
    [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]].forEach(function (s) {
      var sh = gl.createShader(s[0]); gl.shaderSource(sh, s[1]); gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS) && w.console) console.warn('[KYMAGLB]', gl.getShaderInfoLog(sh));
      gl.attachShader(p, sh);
    });
    gl.bindAttribLocation(p, 0, 'aP'); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null;
    var u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS), i, a;
    for (i = 0; i < n; i++) { a = gl.getActiveUniform(p, i); u[a.name] = gl.getUniformLocation(p, a.name); }
    return { p: p, u: u, aN: gl.getAttribLocation(p, 'aN'), aU: gl.getAttribLocation(p, 'aU') };
  }

  /* ── chargement + analyse du GLB (une fois par URL pour toute la page) ── */
  function model(url) {
    if (MODELS[url]) return MODELS[url];
    if (!BUFS[url]) BUFS[url] = fetch(url).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.arrayBuffer(); });
    MODELS[url] = BUFS[url].then(parse);
    MODELS[url].catch(function () { delete MODELS[url]; delete BUFS[url]; });
    return MODELS[url];
  }
  function prefetch(url) { if (url && !BUFS[url]) { BUFS[url] = fetch(url).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.arrayBuffer(); }); BUFS[url].catch(function () { delete BUFS[url]; }); } }
  function parse(ab) {
    var g = shared(); if (!g) throw new Error('webgl');
    var gl = g.gl, dv = new DataView(ab);
    if (dv.getUint32(0, true) !== 0x46546C67) throw new Error('pas un GLB');
    var off = 12, json = null, bin = null, pend = [];
    while (off < ab.byteLength) {
      var len = dv.getUint32(off, true), typ = dv.getUint32(off + 4, true);
      if (typ === 0x4E4F534A) json = JSON.parse(new TextDecoder().decode(new Uint8Array(ab, off + 8, len)));
      else if (typ === 0x004E4942) bin = new Uint8Array(ab, off + 8, len);
      off += 8 + len;
    }
    if (!json || !bin) throw new Error('GLB incomplet');
    var J = json, bufs = {}, tex = {};
    function view(i) { var b = J.bufferViews[i]; return bin.subarray(b.byteOffset || 0, (b.byteOffset || 0) + b.byteLength); }
    function vbo(ai, idx) {
      var a = J.accessors[ai], k = a.bufferView + (idx ? 'i' : 'v');
      if (!bufs[k]) { var b = gl.createBuffer(), T = idx ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER; gl.bindBuffer(T, b); gl.bufferData(T, view(a.bufferView), gl.STATIC_DRAW); bufs[k] = b; }
      return { b: bufs[k], a: a, st: J.bufferViews[a.bufferView].byteStride || 0, n: { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[a.type] };
    }
    function texture(ti) {
      if (tex[ti] !== undefined) return tex[ti];
      var t = J.textures[ti], im = J.images[t.source], gt = gl.createTexture();
      tex[ti] = gt;
      gl.bindTexture(gl.TEXTURE_2D, gt);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([200, 190, 185]));
      var blob = new Blob([view(im.bufferView)], { type: im.mimeType || 'image/jpeg' });
      var done = function (img) {
        gl.bindTexture(gl.TEXTURE_2D, gt);
        gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        var pot = !(img.width & (img.width - 1)) && !(img.height & (img.height - 1));
        if (pot) gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, pot ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        var an = gl.getExtension('EXT_texture_filter_anisotropic'); if (an) gl.texParameterf(gl.TEXTURE_2D, an.TEXTURE_MAX_ANISOTROPY_EXT, 4);
        if (img.close) img.close();
      };
      var p = w.createImageBitmap ? createImageBitmap(blob) : new Promise(function (ok, ko) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = ko; i.src = URL.createObjectURL(blob); });
      pend.push(p.then(done));
      return gt;
    }
    var draws = [], lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
    function node(ni, pm) {
      var n = J.nodes[ni], m = mul(pm, trs(n));
      if (n.mesh != null) J.meshes[n.mesh].primitives.forEach(function (pr) {
        if (pr.mode != null && pr.mode !== 4) return;
        var A = pr.attributes, mat = J.materials && pr.material != null ? J.materials[pr.material] : {}, pb = mat.pbrMetallicRoughness || {};
        var P = vbo(A.POSITION), it = pr.indices != null ? vbo(pr.indices, 1) : null;
        if (it && it.a.componentType === 5125 && !g.u32) return;
        var pa = J.accessors[A.POSITION];
        if (pa.min) for (var c = 0; c < 8; c++) {
          var q = xf(m, [c & 1 ? pa.max[0] : pa.min[0], c & 2 ? pa.max[1] : pa.min[1], c & 4 ? pa.max[2] : pa.min[2]]);
          for (var k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], q[k]); hi[k] = Math.max(hi[k], q[k]); }
        }
        draws.push({ m: m, P: P, N: A.NORMAL != null ? vbo(A.NORMAL) : null, U: A.TEXCOORD_0 != null ? vbo(A.TEXCOORD_0) : null, I: it,
          cnt: it ? it.a.count : pa.count, base: pb.baseColorFactor || [1, 1, 1, 1], tex: pb.baseColorTexture ? texture(pb.baseColorTexture.index) : null,
          me: pb.metallicFactor != null ? pb.metallicFactor : 1, ro: pb.roughnessFactor != null ? pb.roughnessFactor : 1 });
      });
      (n.children || []).forEach(function (c) { node(c, m); });
    }
    (J.scenes[J.scene || 0].nodes).forEach(function (n) { node(n, m4()); });
    var ctr = [(lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2, (lo[2] + hi[2]) / 2];
    var rad = Math.max(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]) / 2;
    return Promise.all(pend).then(function () { return { draws: draws, c: ctr, r: rad, lo: lo, hi: hi }; });
  }

  /* ── lecteur ── */
  function Viewer(cv, o) {
    var self = this;
    self.cv = cv; self.o = o || {}; self.cur = null; self.old = null;
    self.yaw = (self.o.yaw || 0) * D2R; self.pitch = 4 * D2R; self.z = 1; self.vel = 0; self.idle = 0; self.auto = !RM && self.o.spin !== 0;
    self.spinRate = (self.o.spin || 7) * D2R; self.idleDelay = self.o.idle != null ? self.o.idle : 3;
    self.tw = null; self.vis = true; self.raf = 0; self.last = 0; self.ft = 1;
    self.clear = self.o.bg === 'none' ? [0, 0, 0, 0] : [0.961, 0.929, 0.894, 1];
    var g = shared();
    try { self.ctx = cv.getContext('2d', { alpha: self.o.bg === 'none' }); } catch (e) { self.ctx = null; }
    if (!g || !self.ctx) { self.fail('webgl'); return; }
    g.viewers.push(self);
    self.bind();
    if ('ResizeObserver' in w) new ResizeObserver(function () { self.size(); }).observe(cv); else w.addEventListener('resize', function () { self.size(); });
    if ('IntersectionObserver' in w) new IntersectionObserver(function (es) { self.vis = es[es.length - 1].isIntersecting; self.wake(); }, { rootMargin: '60px 0px' }).observe(cv);
    d.addEventListener('visibilitychange', function () { self.wake(); });
    d.addEventListener('kyma:motion', function () { self.wake(); });
    self.size();
    if (self.o.src) self.load(self.o.src).catch(function () { /* repli géré par onerror */ });
  }
  var V = Viewer.prototype;
  V.fail = function (why) { if (this.dead) return; this.dead = true; if (this.o.onerror) this.o.onerror(why); };
  V.size = function () {
    /* résolution interne plafonnée (1,5 au plus) : la copie 2D est agrandie par le navigateur */
    var cv = this.cv, r = Math.min(w.devicePixelRatio || 1, 1.5) * (this.q || 1);
    var W = Math.max(64, Math.round((cv.clientWidth || 300) * r)), H = Math.max(64, Math.round((cv.clientHeight || 300) * r));
    if (W !== cv.width || H !== cv.height) { cv.width = W; cv.height = H; this.dirty = 1; this.wake(); }
  };
  V.load = function (url) {
    var self = this; if (self.dead) return Promise.reject(new Error('webgl'));
    self.want = url; self.cv.setAttribute('aria-busy', 'true');
    return model(url).then(function (m) {
      self.cv.removeAttribute('aria-busy');
      if (self.want === url) self.swap(m);
      if (self.o.onload) self.o.onload(url);
    }, function (e) { self.cv.removeAttribute('aria-busy'); if (w.console) console.warn('[KYMAGLB]', url, e && e.message); if (!self.cur) self.fail('load'); throw e; });
  };
  V.swap = function (m) {
    if (this.cur === m) return;
    if (this.cur && !RM) { this.old = this.cur; this.ft = 0; } else this.old = null;
    this.cur = m; this.dirty = 1; this.wake();
    if (this.o.onswap) this.o.onswap();
  };

  /* ── interaction ── */
  V.bind = function () {
    var self = this, cv = self.cv, drag = null;
    cv.style.touchAction = 'pan-y';
    cv.addEventListener('pointerdown', function (e) {
      drag = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId, type: e.pointerType, moved: 0 };
      self.vel = 0; self.idle = 0; self.tw = null; self.hold = true; self.wake();
    });
    w.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y, now = performance.now(), dt = Math.max(16, now - drag.t) / 1000;
      if (drag.type === 'touch' && !drag.moved && Math.abs(dy) > Math.abs(dx)) { drag = null; self.hold = false; return; }
      drag.moved += Math.abs(dx) + Math.abs(dy);
      if (drag.moved > 4 && !drag.cap) { drag.cap = 1; try { cv.setPointerCapture(e.pointerId); } catch (er) { /* */ } }
      var a = dx * 0.0085; self.yaw += a; self.vel = RM ? 0 : Math.max(-5, Math.min(5, self.vel * 0.6 + 0.4 * a / dt));
      if (drag.type !== 'touch') self.pitch = Math.min(18 * D2R, Math.max(-8 * D2R, self.pitch + dy * 0.004));
      drag.x = e.clientX; drag.y = e.clientY; drag.t = now; self.dirty = 1; self.wake();
    }, { passive: true });
    var up = function (e) { if (drag && (!e || e.pointerId === drag.id)) { drag = null; self.hold = false; self.idle = 0; self.wake(); } };
    w.addEventListener('pointerup', up); w.addEventListener('pointercancel', up);
    cv.addEventListener('dblclick', function () { self.zoom(self.zg > 1.2 ? 1 : 1.35); });
    cv.addEventListener('keydown', function (e) {
      var k = e.key, pr = { 1: 'face', 2: 'profil', 3: 'dos', 4: 'detail' }[k];
      if (k === 'ArrowLeft' || k === 'ArrowRight') { e.preventDefault(); self.turn((k === 'ArrowLeft' ? -15 : 15) * D2R); }
      else if (pr) { e.preventDefault(); self.preset(pr); }
      else if (k === '+' || k === '=') self.zoom(1.35); else if (k === '-') self.zoom(1);
    });
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
  V.zoom = function (z) { this.to(this.yaw, this.pitch, Math.max(1, Math.min(1.7, z)), 700); };

  /* ── boucle ── */
  V.wake = function () { var s = this; if (!s.raf && !s.dead) s.raf = w.requestAnimationFrame(function (t) { s.tick(t); }); };
  V.tick = function (now) {
    var s = this; s.raf = 0;
    if (!s.vis || d.hidden) { s.last = 0; return; }
    var dt = s.last ? Math.min(0.1, (now - s.last) / 1000) : 1 / 60, go = false; s.last = now;
    if (s.tw) {
      var T = s.tw; T.t += dt * 1000; var k = ease(Math.min(1, T.t / T.ms));
      s.yaw = T.y0 + (T.y1 - T.y0) * k; s.pitch = T.p0 + (T.p1 - T.p0) * k; s.z = T.z0 + (T.z1 - T.z0) * k;
      if (T.t >= T.ms) { s.tw = null; s.idle = 0; } go = true;
    } else if (!s.hold) {
      if (Math.abs(s.vel) > 0.01) { s.yaw += s.vel * dt; s.vel *= Math.exp(-dt / 0.55); go = true; } else s.vel = 0;
      s.idle += dt;
      if (s.auto && !paused() && !s.hover && s.idle > s.idleDelay) {
        /* démarrage en douceur de la rotation automatique (rampe de 1,2 s) */
        var ramp = Math.min(1, (s.idle - s.idleDelay) / 1.2);
        s.yaw += s.spinRate * dt * ramp * ramp; go = true;
      }
    } else go = true;
    if (s.old) { s.ft += dt / (RM ? 0.01 : 0.9); if (s.ft >= 1) s.old = null; go = true; }
    if (go || s.dirty) s.draw(dt);
    s.dirty = 0;
    if (go || (s.auto && !s.hold && !paused() && !s.hover)) s.wake(); else s.last = 0;
  };
  V.draw = function (dt) {
    var s = this, g = shared(), m = s.cur; if (!g || s.dead) return;
    var gl = g.gl, W = s.cv.width, H = s.cv.height, asp = W / H, t0 = performance.now();
    if (g.cv.width < W || g.cv.height < H) { g.cv.width = Math.max(g.cv.width, W); g.cv.height = Math.max(g.cv.height, H); }
    gl.viewport(0, 0, W, H);
    gl.clearColor(s.clear[0], s.clear[1], s.clear[2], s.clear[3]);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if (m) {
      var fov = 28 * D2R, dist = m.r / Math.sin(fov / 2) * (asp < 1 ? 1.05 / Math.max(0.62, asp) : 1.05) / s.z * (s.o.fit || 1);
      var ty = s.z > 1.05 ? m.c[1] + (m.hi[1] - m.c[1]) * 0.35 * (s.z - 1) / 0.7 : m.c[1];
      var P = persp(fov, asp, dist * 0.1, dist * 4), Vw = mul(tr(0, 0, -dist), mul(rotX(s.pitch), tr(-m.c[0], -ty, -m.c[2])));
      var M = mul(tr(m.c[0], 0, m.c[2]), mul(rotY(s.yaw), tr(-m.c[0], 0, -m.c[2])));
      var inv = mul(rotX(-s.pitch), tr(0, 0, dist)), eye = [inv[12] + m.c[0], inv[13] + ty, inv[14] + m.c[2]];
      s.mats = { P: P, V: Vw, M: M, eye: eye };
      /* ombre de contact (alpha prémultiplié correct sur fond transparent) */
      var S = g.ps; gl.useProgram(S.p); gl.enable(gl.BLEND); gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(false);
      var ex = (m.hi[0] - m.lo[0]) * 0.62, ez = (m.hi[2] - m.lo[2]) * 0.9 + 0.1;
      gl.uniformMatrix4fv(S.u.uP, false, P); gl.uniformMatrix4fv(S.u.uV, false, Vw);
      gl.uniformMatrix4fv(S.u.uM, false, mul(M, mul(tr(m.c[0], m.lo[1] + 0.002, m.c[2]), [ex, 0, 0, 0, 0, 1, 0, 0, 0, 0, ez, 0, 0, 0, 0, 1])));
      gl.uniform1f(S.u.uA, 1); gl.bindBuffer(gl.ARRAY_BUFFER, g.sq); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0); gl.enableVertexAttribArray(0);
      gl.disableVertexAttribArray(1); gl.disableVertexAttribArray(2);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); gl.disable(gl.BLEND); gl.depthMask(true);
      var R = g.pr; gl.useProgram(R.p);
      gl.uniformMatrix4fv(R.u.uP, false, P); gl.uniformMatrix4fv(R.u.uV, false, Vw); gl.uniform3fv(R.u.uE, eye); gl.uniform1i(R.u.uT, 0);
      var span = m.hi[1] - m.lo[1], cy = m.lo[1] - 0.05 * span + ease(Math.min(1, s.ft || 0)) * span * 1.1;
      s.mesh(g, m, M, s.old ? cy : 1e6, 1);
      if (s.old) s.mesh(g, s.old, M, cy, -1);
    }
    /* copie dans le canvas 2D du lecteur (la zone rendue occupe les H dernières lignes) */
    try {
      if (s.clear[3] === 0) s.ctx.clearRect(0, 0, W, H);
      s.ctx.drawImage(g.cv, 0, g.cv.height - H, W, H, 0, 0, W, H);
    } catch (e) { /* contexte perdu */ }
    if (m && !s.shown) { s.shown = 1; s.cv.classList.add('is-drawn'); }
    s.adapt(performance.now() - t0, dt);
    if (s.o.onframe && m) s.o.onframe(s);
  };
  /* qualité adaptative : si une image coûte plus de 20 ms, on réduit la résolution interne (jusqu'à 55 %) */
  V.adapt = function (ms, dt) {
    if (!dt) return;
    this.acc = (this.acc || 0) + ms; this.n = (this.n || 0) + 1;
    if (this.n < 24) return;
    var avg = this.acc / this.n, q = this.q || 1; this.acc = 0; this.n = 0;
    if (avg > 20) q *= 0.85; else if (avg < 8) q *= 1.08;
    q = Math.max(0.55, Math.min(1, q));
    if (Math.abs(q - (this.q || 1)) > 0.02) { this.q = q; this.size(); }
  };
  V.mesh = function (g, m, M, cy, cs) {
    var gl = g.gl, R = g.pr;
    gl.uniform1f(R.u.uCy, cy); gl.uniform1f(R.u.uCs, cs);
    m.draws.forEach(function (q) {
      gl.uniformMatrix4fv(R.u.uM, false, mul(M, q.m));
      gl.uniform4fv(R.u.uB, q.base); gl.uniform1f(R.u.uMe, q.me); gl.uniform1f(R.u.uRo, q.ro); gl.uniform1f(R.u.uHT, q.tex ? 1 : 0);
      if (q.tex) { gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, q.tex); }
      function at(loc, B) {
        if (loc < 0) return;
        if (!B) { gl.disableVertexAttribArray(loc); gl.vertexAttrib3f(loc, 0, 1, 0); return; }
        gl.bindBuffer(gl.ARRAY_BUFFER, B.b); gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, B.n, B.a.componentType, !!B.a.normalized, B.st, B.a.byteOffset || 0);
      }
      at(0, q.P); at(R.aN, q.N); at(R.aU, q.U);
      if (q.I) { gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, q.I.b); gl.drawElements(gl.TRIANGLES, q.cnt, q.I.a.componentType, q.I.a.byteOffset || 0); }
      else gl.drawArrays(gl.TRIANGLES, 0, q.cnt);
    });
  };
  /* projection d'un point du modèle (coordonnées du GLB) en px CSS du canvas ; front = la face regarde la caméra */
  V.project = function (p, n) {
    var s = this, k = s.mats; if (!k) return null;
    var wp = xf(k.M, p), c = xf4(k.P, xf4(k.V, wp));
    var x = (c[0] / c[3] * 0.5 + 0.5) * s.cv.clientWidth, y = (0.5 - c[1] / c[3] * 0.5) * s.cv.clientHeight, front = 1;
    if (n) {
      var wn = xf(k.M, [p[0] + n[0], p[1] + n[1], p[2] + n[2]]), nn = [wn[0] - wp[0], wn[1] - wp[1], wn[2] - wp[2]];
      var e = [k.eye[0] - wp[0], k.eye[1] - wp[1], k.eye[2] - wp[2]], le = Math.hypot(e[0], e[1], e[2]) || 1, ln = Math.hypot(nn[0], nn[1], nn[2]) || 1;
      front = (nn[0] * e[0] + nn[1] * e[1] + nn[2] * e[2]) / (le * ln);
    }
    return { x: x, y: y, front: front };
  };

  w.KYMAGLB = {
    mount: function (cv, o) { if (cv._glb) return cv._glb; var v = new Viewer(cv, o); cv._glb = v; return v; },
    prefetch: prefetch,
    contexts: function () { return G && !G.dead ? 1 : 0; },
    supported: function () { return !!shared(); }
  };
})(window, document);
