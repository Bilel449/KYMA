/*! KYMA 3D v1.0 — moteur WebGL natif, sans dépendance (raymarching SDF, rendu « argile / satin » façon Spline).
 *  API : var s = KYMA3D.mount(canvas, { scene: 'hero' | 'swatch' | 'rings', colorway: 'lilac-whirl' });
 *        s.setColorway('noir-absolu');  s.set({ morph: 0..1, dive: 0..1, focus: -1|0|1, shift: [x, y] });
 *        KYMA3D.setColorway('Crimson Flow')  -> toutes les scènes « follow » (fondu 1,2 s).
 *  Robustesse : DPR <= 1,5, résolution adaptative au temps de frame, pause hors écran / onglet caché,
 *  prefers-reduced-motion = une seule image fixe, sans WebGL = repli CSS (classe .kyma3d-off sur l'hôte). */
(function (w, d) {
  'use strict';
  if (w.KYMA3D) return;

  /* [nom, nuance A, nuance B, veines (facultatif)] — « kyma » = palette du site (rose clair / beige / marron clair) */
  var CW = {
    'kyma': ['KYMA', '#E8C4C4', '#F5EDE4', '#C19E86'],
    'lilac-whirl': ['Lilac Whirl', '#C8A2C8', '#F5EDE4'],
    'ivory-tide': ['Ivory Tide', '#E8E0D8', '#C5BFB8'],
    'silver-drift': ['Silver Drift', '#8E9EAB', '#C8CDD2'],
    'noir-absolu': ['Noir Absolu', '#1A1A1A', '#3A3A4A'],
    'crimson-flow': ['Crimson Flow', '#5C2032', '#C4878E']
  };
  var SCENES = { hero: 0, swatch: 1, rings: 2 };
  var BG = '#F5EDE4', FADE = 1.2;
  var mq = w.matchMedia ? w.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduced = !!(mq && mq.matches);
  var list = [], raf = 0, last = 0;

  /* ── utilitaires ─────────────────────────────────────────────────────── */
  function key(n) {
    return String(n || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  function hex(h) {
    var n = parseInt(String(h).replace('#', ''), 16) || 0;
    return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
  }
  function lin(c) { return c.map(function (v) { return Math.pow(v, 2.2); }); }
  function pair(name) {
    var c = Array.isArray(name) ? [0, name[0], name[1], name[2]] : (CW[key(name)] || CW.kyma);
    var a = lin(hex(c[1])), b = lin(hex(c[2]));
    return [a, b, c[3] ? lin(hex(c[3])) : mix3(a, b, 0.35).map(function (v) { return v * 0.82; })];
  }
  function mix(a, b, t) { return a + (b - a) * t; }
  function mix3(a, b, t) { return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)]; }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function norm(v) { var l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  /* rotation Ry(y)·Rx(x)·Rz(z), aplatie ligne par ligne = transposée en colonne = rotation inverse pour GLSL */
  function rotm(y, x, z) {
    var cy = Math.cos(y), sy = Math.sin(y), cx = Math.cos(x), sx = Math.sin(x), cz = Math.cos(z), sz = Math.sin(z);
    var a = [cy, 0, sy, 0, 1, 0, -sy, 0, cy], b = [1, 0, 0, 0, cx, -sx, 0, sx, cx], c = [cz, -sz, 0, sz, cz, 0, 0, 0, 1];
    return mul(mul(a, b), c);
  }
  function mul(a, b) {
    var r = [], i, j;
    for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) r[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j];
    return r;
  }

  /* ── shaders ─────────────────────────────────────────────────────────── */
  var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FS = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH', 'precision highp float;', '#else', 'precision mediump float;', '#endif',
    'uniform vec2 uRes,uMouse,uShift;uniform float uT,uMorph,uFocus,uFloor,uHover,uPat;',
    'uniform vec3 uCo,uCr,uCu,uCf,uA,uB,uV,uA2,uB2,uV2,uBg;uniform float uFl;uniform mat3 uR,uR1,uR2;',
    'const vec3 LK=vec3(-.55,.78,.52);const vec3 LB=vec3(.75,.2,-.7);',
    'mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,s,-s,c);}',
    'float hash(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}',
    'float noise(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);',
    ' return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),',
    '  mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}',
    'const mat3 M3=mat3(0.,.8,.6,-.8,.36,-.48,-.6,-.48,.64);',
    'float fbm(vec3 p){float f=0.,a=.5;for(int i=0;i<4;i++){f+=a*noise(p);p=M3*p*2.03;a*=.5;}return f/.9375;}',
    'float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}',
    'float wob(vec3 p){return sin(p.x*2.1+uT*.7)*sin(p.y*2.4+uT*.9)*sin(p.z*1.8-uT*.6);}',
    /* ondulation sous la souris : projection écran du point, onde amortie */
    'float ripple(vec3 p){if(uHover<.01)return 0.;vec3 v=p-uCo;float z=max(dot(v,uCf),.1);',
    ' vec2 s=vec2(dot(v,uCr),dot(v,uCu))/z*uFl+uShift;float r=length(s-uMouse);',
    ' return uHover*.03*sin(r*16.-uT*4.)*exp(-r*r*5.);}',
    'float box(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);}',

    '#if SCENE==0',
    '#define BR 2.7',
    /* « La Vague » : tore torsadé à section elliptique + ruban ondulé, union lisse, bruit, respiration */
    'vec2 map(vec3 p){float br=1.+.025*sin(uT*.8);vec3 q=uR*p/br;',
    /* anneau-vague : tore torsadé (1,5 tour) à section elliptique, qui ondule comme une houle */
    ' float a=atan(q.z,q.x);float R=1.+.07*sin(2.*a+uT*.4);',
    ' vec2 c=vec2(length(q.xz)-R,q.y-.17*sin(3.*a-uT*.6)*(1.+uMorph));',
    ' c=rot(a*1.5+uT*.16+uMorph*1.5708)*c;vec2 e=vec2(.44+.06*sin(a*3.+uT*.5),.23-.04*uMorph);',
    ' float dd=(length(c/e)-1.)*e.y;float ac=uT*.32;',
    /* une crête (écume) voyage le long de l anneau et s y fond (union lisse) */
    ' vec3 cr=vec3(cos(ac)*1.12,.1+.17*sin(-3.*ac-uT*.6),sin(ac)*1.12);dd=smin(dd,length(q-cr)-.27,.42);',
    ' dd-=.03*wob(q*1.3);',
    ' return vec2((dd*br-ripple(p))*.7,0.);}',
    'vec3 opos(vec3 p,float id){return uR*p;}',
    '#elif SCENE==1',
    '#define BR 2.4',
    /* « Étoffe » : plaque fine drapée qui ondule (champ de hauteur borné) */
    'float hgt(vec2 x){return .14*sin(x.x*2.1+uT*1.1)*cos(x.y*1.5+uT*.7)+.09*sin((x.x+x.y)*1.7-uT*.9)-.2*dot(x,x)+.04*sin(x.y*4.-uT*1.3)+.25;}',
    'vec2 map(vec3 p){vec3 q=uR*p;float h=hgt(q.xz);float sl=abs(q.y-h)*.6-.014;',
    ' vec2 b=abs(q.xz)-vec2(1.25,1.25);float bx=length(max(b,0.))+min(max(b.x,b.y),0.);',
    ' vec2 u=vec2(bx,sl);float dd=min(max(u.x,u.y),0.)+length(max(u,0.))-.012;',
    ' return vec2(dd-ripple(p)*.7,0.);}',
    'vec3 opos(vec3 p,float id){vec3 q=uR*p;return vec3(q.x,q.y*.2,q.z)*1.1;}',
    '#else',
    '#define BR 2.6',
    /* « Cercle Waves » : deux anneaux entrelacés (INITIUM, ORIGINE) */
    'float tor(vec3 q,float R,float r){vec2 c=vec2(length(q.xz)-R,q.y);return length(c)-r;}',
    'vec2 map(vec3 p){vec3 g=uR*p;',
    ' vec3 q1=uR1*(g-vec3(-.48,0.,0.));vec3 q2=uR2*(g-vec3(.48,0.,0.));',
    ' float s1=.23+.05*(1.-step(.5,abs(uFocus))),s2=.23+.05*step(.5,uFocus);',
    ' float d1=tor(q1,.9,s1+.012*wob(q1*2.))-ripple(p);float d2=tor(q2,.9,s2+.012*wob(q2*2.+3.))-ripple(p);',
    ' return d1<d2?vec2(d1*.85,0.):vec2(d2*.85,1.);}',
    'vec3 opos(vec3 p,float id){vec3 g=uR*p;return id<.5?uR1*(g-vec3(-.48,0.,0.)):uR2*(g-vec3(.48,0.,0.));}',
    '#endif',

    'vec3 nrm(vec3 p){vec2 e=vec2(.0015,-.0015);return normalize(e.xyy*map(p+e.xyy).x+e.yyx*map(p+e.yyx).x+e.yxy*map(p+e.yxy).x+e.xxx*map(p+e.xxx).x);}',
    'float soft(vec3 ro,vec3 rd){float b=dot(ro,rd),c=dot(ro,ro)-BR*BR,h=b*b-c;if(h<0.)return 1.;h=sqrt(h);',
    ' float t=max(.02,-b-h),tx=-b+h,r=1.;if(tx<0.)return 1.;for(int i=0;i<28;i++){float d=map(ro+rd*t).x;r=min(r,7.*d/t);t+=clamp(d,.02,.25);if(r<.004||t>tx)break;}',
    ' return clamp(r,0.,1.);}',
    'float occl(vec3 p,vec3 n){float o=0.,s=1.;for(int i=0;i<4;i++){float h=.02+.11*float(i);o+=(h-map(p+n*h).x)*s;s*=.72;}return clamp(1.-1.8*o,0.,1.);}',
    /* motif KYMA Wave : fbm à domain warping, deux nuances tonales, s'écoule lentement */
    'vec3 wave(vec3 p,vec3 A,vec3 B,vec3 V){p*=uPat;float t=uT*.035;',
    ' vec2 q=vec2(fbm(p+vec3(0.,t,0.)),fbm(p+vec3(5.2,1.3,2.8)-t));',
    ' float f=fbm(p+3.4*vec3(q,q.x-q.y)+vec3(1.7,9.2,t*2.));',
    ' float m=smoothstep(.3,.7,f);float v=abs(fract(f*3.2+q.x*.8)-.5);',
    ' vec3 c=mix(B,A,m);return mix(c,V,(1.-smoothstep(.0,.11,v))*.34);}',
    'vec3 shade(vec3 p,vec3 n,vec3 rd,vec3 base){vec3 L=normalize(LK),Lb=normalize(LB),bg=pow(uBg,vec3(2.2));',
    ' float ndl=dot(n,L),dif=clamp(ndl,0.,1.),wrap=clamp((ndl+.4)/1.4,0.,1.);',
    ' float sh=dif>0.?soft(p+n*.012,L):0.;float oc=occl(p,n);',
    ' float fr=pow(clamp(1.+dot(n,rd),0.,1.),3.);vec3 h=normalize(L-rd);float nh=clamp(dot(n,h),0.,1.);',
    ' float sky=.55+.45*n.y,bac=clamp(dot(n,Lb),0.,1.);vec3 kc=vec3(1.,.97,.93);',
    ' vec3 li=kc*1.05*dif*mix(1.,sh,.9)+kc*.16*wrap+bg*.48*sky*oc+vec3(.85,.88,1.)*.4*bac*oc;',
    ' vec3 c=base*li*.93+base*sqrt(base)*.18*(1.-dif)*oc;',
    ' c+=kc*(pow(nh,48.)*.42+pow(nh,7.)*.07)*dif*sh;c+=bg*fr*.42*oc;return c;}',

    'void main(){vec2 uv=(2.*gl_FragCoord.xy-uRes)/uRes.y-uShift;',
    ' vec3 ro=uCo,rd=normalize(uv.x*uCr+uv.y*uCu+uFl*uCf);vec3 col=uBg;',
    ' float b=dot(ro,rd),c=dot(ro,ro)-BR*BR,hh=b*b-c;bool hit=false;float t=0.,id=0.;',
    ' if(hh>0.){hh=sqrt(hh);t=max(-b-hh,0.);float tx=-b+hh;',
    '  for(int i=0;i<80;i++){vec2 m=map(ro+rd*t);if(m.x<.0012*t){hit=true;id=m.y;break;}t+=m.x;if(t>tx)break;}}',
    ' if(hit){vec3 p=ro+rd*t;vec3 n=nrm(p);vec3 A=uA,B=uB,V=uV;',
    '  if(id>.5){A=uA2;B=uB2;V=uV2;}',
    '  vec3 c2=shade(p,n,rd,wave(opos(p,id),A,B,V));col=pow(clamp(c2,0.,1.),vec3(.4545));}',
    ' else if(rd.y<0.&&uFloor>-50.){float tf=(uFloor-ro.y)/rd.y;vec3 fp=ro+rd*tf;float dl=length(fp.xz);',
    '  if(dl<4.5){float s=soft(fp+vec3(0.,.01,0.),normalize(LK));float o=clamp(map(fp+vec3(0.,.35,0.)).x/.35,0.,1.);',
    '   float k=1.-smoothstep(1.6,3.4,dl);col=uBg*mix(1.,(1.-.17*(1.-s))*mix(.88,1.,o),k);}}',
    ' gl_FragColor=vec4(col,1.);}'
  ].join('\n');

  /* ── instance ────────────────────────────────────────────────────────── */
  function Scene(canvas, opts) {
    var self = this;
    opts = opts || {};
    self.canvas = canvas;
    self.host = opts.host || canvas.parentNode;
    self.kind = SCENES[opts.scene] != null ? opts.scene : 'hero';
    self.follow = opts.follow != null ? !!opts.follow : self.kind !== 'rings';
    self.interactive = opts.interactive !== false;
    self.p = { morph: 0, dive: 0, focus: -1, shift: opts.shift || null, pat: opts.pattern || (opts.scene === 'swatch' ? 1.05 : 1.5) };
    self.t = reduced ? 14.2 : 20 + Math.random() * 400; /* graine : le motif n'est jamais deux fois le même */
    self.name = key(opts.colorway || 'kyma');
    var c0 = pair(self.name);
    self.col = { a: c0[0], b: c0[1], v: c0[2], fa: c0[0], fb: c0[1], fv: c0[2], ta: c0[0], tb: c0[1], tv: c0[2], k: 1 };
    self.c2 = pair(['#4A3B32', '#6B5A4E', '#C19E86']); /* 2e anneau (ORIGINE) : brun */
    self.yaw = 0; self.pitch = 0; self.ty = 0; self.tp = 0; self.spin = Math.random() * 6;
    self.hov = 0; self.thov = 0; self.mouse = [0, 0];
    self.scale = w.innerWidth < 750 ? 0.7 : 0.9; self.acc = 0; self.n = 0;
    self.frames = 0; self.ftime = 0; self.visible = true; self.dirty = true;
    self.css();
    if (!self.init()) { self.fail(); return; }
    self.watch();
  }
  var S = Scene.prototype;

  S.css = function (arr) {
    var c = arr ? [0, arr[0], arr[1]] : (CW[this.name] || CW.kyma), h = this.host;
    if (h && h.style) { h.style.setProperty('--k3a', c[1]); h.style.setProperty('--k3b', c[2]); }
  };
  S.fail = function () {
    this.ok = false;
    if (this.host) this.host.classList.add('kyma3d-off');
    this.canvas.style.display = 'none';
  };
  S.init = function () {
    var cv = this.canvas, gl;
    try {
      gl = cv.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false }) ||
        cv.getContext('experimental-webgl');
    } catch (e) { gl = null; }
    if (!gl) return false;
    this.gl = gl;
    function sh(type, src) {
      var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS) && !gl.isContextLost()) {
        if (w.console) console.warn('[KYMA3D] shader :', gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    }
    var v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, '#define SCENE ' + SCENES[this.kind] + '\n' + FS);
    if (!v || !f) return false;
    var pr = gl.createProgram();
    gl.attachShader(pr, v); gl.attachShader(pr, f);
    gl.bindAttribLocation(pr, 0, 'p'); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return false;
    gl.useProgram(pr);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    var u = this.u = {};
    'uRes uMouse uShift uT uMorph uFocus uFloor uHover uPat uCo uCr uCu uCf uA uB uV uA2 uB2 uV2 uBg uFl uR uR1 uR2'.split(' ')
      .forEach(function (n) { u[n] = gl.getUniformLocation(pr, n); });
    gl.uniform3fv(u.uBg, hex(BG));
    this.ok = true;
    this.resize(true);
    return true;
  };
  S.watch = function () {
    var self = this, cv = this.canvas;
    cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); self.ok = false; }, false);
    cv.addEventListener('webglcontextrestored', function () { if (self.init()) { self.dirty = true; wake(); } }, false);
    if ('ResizeObserver' in w) new ResizeObserver(function () { self.resize(); }).observe(cv);
    else w.addEventListener('resize', function () { self.resize(); });
    if ('IntersectionObserver' in w) {
      new IntersectionObserver(function (es) {
        self.visible = es[es.length - 1].isIntersecting; if (self.visible) wake();
      }, { rootMargin: '80px 0px' }).observe(cv);
    }
    if (this.interactive && !reduced) {
      w.addEventListener('pointermove', function (e) { self.point(e.clientX, e.clientY, e.pointerType); }, { passive: true });
      d.addEventListener('pointerleave', function () { self.thov = 0; self.tp = 0; self.ty = 0; });
    }
  };
  S.point = function (x, y, type) {
    var r = this.canvas.getBoundingClientRect();
    if (!r.width || !r.height) return;
    var nx = (x - r.left) / r.width * 2 - 1, ny = (y - r.top) / r.height * 2 - 1;
    var inside = nx > -1 && nx < 1 && ny > -1 && ny < 1;
    var asp = r.width / r.height;
    this.mouse = [nx * asp, -ny];
    this.thov = inside && type !== 'touch' ? 1 : 0;
    if (inside) { this.ty = nx * 0.55; this.tp = ny * 0.3; } else { this.ty *= 0.5; this.tp *= 0.5; }
    wake();
  };
  S.resize = function (force) {
    if (!this.ok) return;
    var cv = this.canvas, dpr = Math.min(w.devicePixelRatio || 1, 1.5);
    var cw = cv.clientWidth || 300, ch = cv.clientHeight || 150;
    var k = dpr * this.scale, max = 1100000; /* plafond de pixels */
    if (cw * ch * k * k > max) k = Math.sqrt(max / (cw * ch));
    var W = Math.max(64, Math.round(cw * k)), H = Math.max(64, Math.round(ch * k));
    if (force || W !== cv.width || H !== cv.height) {
      cv.width = W; cv.height = H; this.gl.viewport(0, 0, W, H); this.dirty = true;
      if (reduced) this.draw(0);
    }
  };
  S.setColorway = function (name) {
    var arr = Array.isArray(name), k2 = arr ? 'custom' : key(name);
    if (!CW[k2] && !arr) return;
    this.name = k2; this.css(arr ? name : null);
    var c = pair(name), C = this.col;
    C.fa = C.a; C.fb = C.b; C.fv = C.v; C.ta = c[0]; C.tb = c[1]; C.tv = c[2]; C.k = reduced ? 1 : 0;
    if (reduced) { C.a = C.ta; C.b = C.tb; C.v = C.tv; }
    this.dirty = true;
    if (reduced) this.draw(0); else wake();
  };
  S.set = function (o) {
    for (var k in o) if (o.hasOwnProperty(k)) this.p[k] = o[k];
    this.dirty = true;
    if (reduced) this.draw(0); else wake();
  };
  S.active = function () { return this.ok && this.visible && !d.hidden && !reduced; };
  /* résolution adaptative : mesure du temps de frame, ajustée toutes les ~0,4 s (ou 20 frames) */
  S.adapt = function (dt) {
    this.acc += dt; this.n++;
    if (this.n < 20 && this.acc < 0.4) return;
    var avg = this.acc / this.n; this.acc = 0; this.n = 0;
    var s = this.scale;
    if (avg > 0.05) s *= 0.7; else if (avg > 0.024) s *= 0.85; else if (avg < 0.0175) s *= 1.1;
    s = Math.min(1, Math.max(w.KYMA3D_MIN_SCALE || 0.3, s)); /* KYMA3D_MIN_SCALE : plancher (tests / captures) */
    if (Math.abs(s - this.scale) > 0.01) { this.scale = s; this.resize(); }
  };
  S.frame = function (dt) {
    var C = this.col, f = 1 - Math.exp(-dt * 3.2), mobile = (this.canvas.clientWidth || 1) < 600;
    this.t += dt; this.frames++; this.ftime += dt;
    if (C.k < 1) {
      C.k = Math.min(1, C.k + dt / FADE);
      var e = ease(C.k); C.a = mix3(C.fa, C.ta, e); C.b = mix3(C.fb, C.tb, e); C.v = mix3(C.fv, C.tv, e);
    }
    this.yaw += (this.ty - this.yaw) * f; this.pitch += (this.tp - this.pitch) * f;
    this.hov += (this.thov - this.hov) * (1 - Math.exp(-dt * 4));
    this.spin += dt * (this.kind === 'rings' ? 0.22 + this.hov * 0.35 : 0.11);
    this.adapt(dt);
    this.draw(dt, mobile);
  };
  S.draw = function (dt, mobile) {
    if (!this.ok) return;
    var gl = this.gl, u = this.u, P = this.p, C = this.col, cv = this.canvas;
    if (mobile == null) mobile = (cv.clientWidth || 1) < 600;
    var ro, ta, fl = 1.9, fy = -1.55, R, R1 = null, R2 = null, sh = P.shift;
    var t = this.t, m = P.morph || 0, dv = ease(Math.min(1, Math.max(0, P.dive || 0)));
    if (this.kind === 'hero') {
      var dist = (mobile ? 5.6 : 4.4) + m * 0.9, orb = m * 0.7;
      ro = [Math.sin(orb) * dist, 0.62 + m * 0.5, Math.cos(orb) * dist]; ta = [0, -0.05, 0];
      /* plongée : la caméra rejoint la surface marbrée */
      ro = mix3(ro, [0.05, 0.12, 1.92], dv); ta = mix3(ta, [0, 0.02, 1.0], dv); fl = mix(1.9, 2.2, dv);
      if (dv > 0.5) fy = -99;
      R = rotm(this.spin + this.yaw + m * 0.8, 0.5 + this.pitch + Math.sin(t * 0.21) * 0.07 - m * 0.3 - dv * 0.25, 0.18 + Math.sin(t * 0.17) * 0.06);
      if (!sh) sh = mobile ? [0, 0.42] : [0.62, 0.02];
      sh = [sh[0] * (1 - dv), sh[1] * (1 - dv)];
    } else if (this.kind === 'swatch') {
      ro = [0, 1.75, 3.3]; ta = [0, -0.12, 0]; fy = -1.05; fl = mobile ? 1.6 : 1.9;
      R = rotm(0.5 + Math.sin(t * 0.23) * 0.18 + this.yaw * 0.6, -0.18 + this.pitch * 0.5, Math.sin(t * 0.31) * 0.06);
      sh = sh || [0, 0];
    } else {
      ro = [0, 0.55, mobile ? 6.4 : 5.3]; ta = [0, -0.05, 0]; fy = -1.6;
      R = rotm(this.spin * 0.6 + this.yaw * 0.8, 0.35 + this.pitch * 0.6, 0.12);
      R1 = rotm(this.spin * 0.7, 1.5708, 0); R2 = rotm(-this.spin * 0.5, 0.15, 0);
      sh = sh || [0, 0];
    }
    var fw = norm([ta[0] - ro[0], ta[1] - ro[1], ta[2] - ro[2]]), rt = norm(cross(fw, [0, 1, 0])), up = cross(rt, fw);
    gl.uniform2f(u.uRes, cv.width, cv.height);
    gl.uniform2f(u.uMouse, this.mouse[0], this.mouse[1]);
    gl.uniform2f(u.uShift, sh[0], sh[1]);
    gl.uniform1f(u.uT, this.t); gl.uniform1f(u.uMorph, m); gl.uniform1f(u.uFocus, P.focus == null ? -1 : P.focus);
    gl.uniform1f(u.uFloor, fy); gl.uniform1f(u.uHover, this.hov * (1 - dv)); gl.uniform1f(u.uPat, (P.pat || 1) * (1 + dv * 0.6));
    gl.uniform3fv(u.uCo, ro); gl.uniform3fv(u.uCr, rt); gl.uniform3fv(u.uCu, up); gl.uniform3fv(u.uCf, fw);
    gl.uniform1f(u.uFl, fl);
    gl.uniform3fv(u.uA, C.a); gl.uniform3fv(u.uB, C.b);
    gl.uniform3fv(u.uV, C.v); gl.uniform3fv(u.uA2, this.c2[0]); gl.uniform3fv(u.uB2, this.c2[1]); gl.uniform3fv(u.uV2, this.c2[2]);
    gl.uniformMatrix3fv(u.uR, false, R);
    gl.uniformMatrix3fv(u.uR1, false, R1 || R); gl.uniformMatrix3fv(u.uR2, false, R2 || R);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    this.dirty = false;
    if (!this.shown) { this.shown = true; cv.classList.add('k3d-ready'); }
  };
  S.destroy = function () {
    this.ok = false; list.splice(list.indexOf(this), 1);
    var ext = this.gl && this.gl.getExtension('WEBGL_lose_context');
    if (ext) ext.loseContext();
  };

  /* ── boucle commune ──────────────────────────────────────────────────── */
  function loop(now) {
    raf = 0;
    var dt = last ? Math.min(0.25, (now - last) / 1000) : 1 / 60, any = false;
    last = now;
    for (var i = 0; i < list.length; i++) if (list[i].active()) { list[i].frame(dt); any = true; }
    if (any) raf = w.requestAnimationFrame(loop); else last = 0;
  }
  function wake() { if (!raf && !reduced) raf = w.requestAnimationFrame(loop); }
  d.addEventListener('visibilitychange', function () { if (!d.hidden) wake(); });

  function supported() {
    try { var c = d.createElement('canvas'); return !!(w.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); }
    catch (e) { return false; }
  }

  w.KYMA3D = {
    colorways: CW,
    reduced: reduced,
    supported: supported,
    key: key,
    mount: function (canvas, opts) {
      if (!canvas) return null;
      if (canvas._k3d) return canvas._k3d;
      var s = new Scene(canvas, opts);
      canvas._k3d = s;
      if (s.ok) {
        list.push(s);
        if (reduced) s.draw(0); else wake();
      }
      return s;
    },
    setColorway: function (name) { list.forEach(function (s) { if (s.follow) s.setColorway(name); }); },
    stats: function () {
      return list.map(function (s) {
        return { scene: s.kind, fps: s.ftime ? Math.round(s.frames / s.ftime * 10) / 10 : 0, scale: Math.round(s.scale * 100) / 100, w: s.canvas.width, h: s.canvas.height };
      });
    },
    instances: list
  };
})(window, document);
