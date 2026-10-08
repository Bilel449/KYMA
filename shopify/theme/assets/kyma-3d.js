/*! KYMA 3D v2.0 — moteur WebGL natif, sans dépendance, UN SEUL contexte WebGL par page.
 *  Toutes les scènes partagent un canvas WebGL hors écran : chaque scène y est rendue puis copiée
 *  (drawImage) dans son propre <canvas> 2D. Au plus MAX_ACTIVE (2) scènes s'animent en même temps
 *  (les plus visibles) ; les autres gardent leur dernière image, figée. Les scènes ne sont créées
 *  qu'à l'approche de l'écran (instanciation à la demande).
 *  Scènes : 'hero' (V, La Vague), 'swatch' (E, étoffe), 'rings' (A, anneaux), 'pattern' (E à plat,
 *           motif KYMA Wave plein cadre + tourbillon au pointeur), 'ripple' (R, ondes concentriques).
 *  API : var s = KYMA3D.mount(canvas, { scene, colorway, follow, interactive, pattern, shift, host });
 *        s.setColorway('noir-absolu' | ['#A','#B']);  s.set({ morph, dive, focus, sep, c1, c2, swirl, ... });
 *        s.ripple(x, y, amp)  (scène ripple, coordonnées client) ;  KYMA3D.setColorway(nom) (scènes « follow ») ;
 *        KYMA3D.pause(true|false) (bouton « Mettre le mouvement en pause ») ; KYMA3D.external(el) : déclare un
 *        autre canvas WebGL (ex. lecteur 3D Shopify) pour que le total des canvas actifs reste <= 2 ;
 *        KYMA3D.snapshot({ scene, colorway, width, height, pattern }) -> URL data:image (image fixe, sans canvas actif).
 *  Robustesse : DPR <= 1,75 (bureau) / 1,5 (mobile), résolution adaptative au temps d'image, pause hors écran et
 *  onglet caché, prefers-reduced-motion = image fixe (redessinée seulement à la demande), sans WebGL = repli CSS. */
(function (w, d) {
  'use strict';
  if (w.KYMA3D) return;

  /* [nom, nuance A, nuance B, veines (facultatif)] — « kyma » = palette du site (rose clair / beige / marron clair) */
  var CW = {
    'kyma': ['KYMA', '#E8C4C4', '#F5EDE4', '#C19E86'],
    'kyma-camel': ['KYMA', '#C19E86', '#E8C4C4', '#A88670'],
    'lilac-whirl': ['Lilac Whirl', '#C8A2C8', '#F5EDE4'],
    'ivory-tide': ['Ivory Tide', '#E8E0D8', '#C5BFB8'],
    'silver-drift': ['Silver Drift', '#8E9EAB', '#C8CDD2'],
    'noir-absolu': ['Noir Absolu', '#1A1A1A', '#3A3A4A'],
    'crimson-flow': ['Crimson Flow', '#5C2032', '#C4878E']
  };
  var BG = '#F5EDE4', FADE = 1.2, MAX_ACTIVE = 2;
  var mq = w.matchMedia ? w.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduced = !!(mq && mq.matches), paused = false;
  var list = [], raf = 0, last = 0, G = null, externals = [];
  var hasIO = 'IntersectionObserver' in w;

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
  function mix(a, b, t) { return a + (b - a) * t; }
  function mix3(a, b, t) { return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)]; }
  function pair(name) {
    var c = Array.isArray(name) ? [0, name[0], name[1], name[2]] : (CW[key(name)] || CW.kyma);
    var a = lin(hex(c[1])), b = lin(hex(c[2]));
    return [a, b, c[3] ? lin(hex(c[3])) : mix3(a, b, 0.35).map(function (v) { return v * 0.82; })];
  }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function norm(v) { var l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
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
  function isMobile() { return (w.innerWidth || 1024) < 750; }

  /* ── shaders ─────────────────────────────────────────────────────────── */
  var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var HEAD = ['#ifdef GL_FRAGMENT_PRECISION_HIGH', 'precision highp float;', '#else', 'precision mediump float;', '#endif'];
  /* grain : ±2,5 % de luminance, bruit haché mis à jour à 12 i/s (section 6 du cahier des charges) */
  var GRAIN = 'float gr(vec2 f,float t){return fract(sin(dot(f+floor(t*12.)*vec2(7.3,3.1),vec2(12.9898,78.233)))*43758.5453)-.5;}';

  /* Scènes volumiques (raymarching SDF) : V, E, A */
  var FS_SDF = HEAD.concat([
    'uniform vec2 uRes,uMouse,uShift,uC;uniform float uT,uMorph,uFocus,uFloor,uHover,uPat,uGrain;',
    'uniform vec3 uCo,uCr,uCu,uCf,uA,uB,uV,uA2,uB2,uV2,uBg;uniform float uFl;uniform mat3 uR,uR1,uR2;',
    'const vec3 LK=vec3(-.55,.78,.52);const vec3 LB=vec3(.75,.2,-.7);', GRAIN,
    'mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,s,-s,c);}',
    'float hash(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}',
    'float noise(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);',
    ' return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),',
    '  mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}',
    'const mat3 M3=mat3(0.,.8,.6,-.8,.36,-.48,-.6,-.48,.64);',
    'float fbm(vec3 p){float f=0.,a=.5;for(int i=0;i<4;i++){f+=a*noise(p);p=M3*p*2.03;a*=.5;}return f/.9375;}',
    'float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}',
    'float wob(vec3 p){return sin(p.x*2.1+uT*.7)*sin(p.y*2.4+uT*.9)*sin(p.z*1.8-uT*.6);}',
    'float ripple(vec3 p){if(uHover<.01)return 0.;vec3 v=p-uCo;float z=max(dot(v,uCf),.1);',
    ' vec2 s=vec2(dot(v,uCr),dot(v,uCu))/z*uFl+uShift;float r=length(s-uMouse);',
    ' return uHover*.03*sin(r*16.-uT*4.)*exp(-r*r*5.);}',
    '#if SCENE==0',
    '#define BR 2.7',
    'vec2 map(vec3 p){float br=1.+.012*sin(uT*1.047);vec3 q=uR*p/br;',
    ' float a=atan(q.z,q.x);float R=1.+.07*sin(2.*a+uT*.4);',
    ' vec2 c=vec2(length(q.xz)-R,q.y-.17*sin(3.*a-uT*.6)*(1.+uMorph));',
    ' c=rot(a*1.5+uT*.16+uMorph*1.5708)*c;vec2 e=vec2(.44+.06*sin(a*3.+uT*.5),.23-.04*uMorph);',
    ' float dd=(length(c/e)-1.)*e.y;float ac=uT*.32;',
    ' vec3 cr=vec3(cos(ac)*1.12,.1+.17*sin(-3.*ac-uT*.6),sin(ac)*1.12);dd=smin(dd,length(q-cr)-.27,.42);',
    ' dd-=.03*wob(q*1.3);',
    ' return vec2((dd*br-ripple(p))*.7,0.);}',
    'vec3 opos(vec3 p,float id){return uR*p;}',
    '#elif SCENE==1',
    '#define BR 2.4',
    'float hgt(vec2 x){return .14*sin(x.x*2.1+uT*1.1)*cos(x.y*1.5+uT*.7)+.09*sin((x.x+x.y)*1.7-uT*.9)-.2*dot(x,x)+.04*sin(x.y*4.-uT*1.3)+.25;}',
    'vec2 map(vec3 p){vec3 q=uR*p;float h=hgt(q.xz);float sl=abs(q.y-h)*.6-.014;',
    ' vec2 b=abs(q.xz)-vec2(1.25,1.25);float bx=length(max(b,0.))+min(max(b.x,b.y),0.);',
    ' vec2 u=vec2(bx,sl);float dd=min(max(u.x,u.y),0.)+length(max(u,0.))-.012;',
    ' return vec2(dd-ripple(p)*.7,0.);}',
    'vec3 opos(vec3 p,float id){vec3 q=uR*p;return vec3(q.x,q.y*.2,q.z)*1.1;}',
    '#else',
    '#define BR 3.6',
    'float tor(vec3 q,float R,float r){vec2 c=vec2(length(q.xz)-R,q.y);return length(c)-r;}',
    'vec2 map(vec3 p){vec3 g=uR*p;',
    ' vec3 q1=uR1*(g-vec3(uC.x,0.,0.));vec3 q2=uR2*(g-vec3(uC.y,0.,0.));',
    ' float s1=.16+.04*(1.-step(.5,abs(uFocus))),s2=.16+.04*step(.5,uFocus);',
    ' float d1=tor(q1,.9,s1+.01*wob(q1*2.))-ripple(p);float d2=tor(q2,.9,s2+.01*wob(q2*2.+3.))-ripple(p);',
    ' return d1<d2?vec2(d1*.85,0.):vec2(d2*.85,1.);}',
    'vec3 opos(vec3 p,float id){vec3 g=uR*p;return id<.5?uR1*(g-vec3(uC.x,0.,0.)):uR2*(g-vec3(uC.y,0.,0.));}',
    '#endif',
    'vec3 nrm(vec3 p){vec2 e=vec2(.0015,-.0015);return normalize(e.xyy*map(p+e.xyy).x+e.yyx*map(p+e.yyx).x+e.yxy*map(p+e.yxy).x+e.xxx*map(p+e.xxx).x);}',
    'float soft(vec3 ro,vec3 rd){float b=dot(ro,rd),c=dot(ro,ro)-BR*BR,h=b*b-c;if(h<0.)return 1.;h=sqrt(h);',
    ' float t=max(.02,-b-h),tx=-b+h,r=1.;if(tx<0.)return 1.;for(int i=0;i<28;i++){float d=map(ro+rd*t).x;r=min(r,7.*d/t);t+=clamp(d,.02,.25);if(r<.004||t>tx)break;}',
    ' return clamp(r,0.,1.);}',
    'float occl(vec3 p,vec3 n){float o=0.,s=1.;for(int i=0;i<4;i++){float h=.02+.11*float(i);o+=(h-map(p+n*h).x)*s;s*=.72;}return clamp(1.-1.8*o,0.,1.);}',
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
    '  vec3 c2=shade(p,n,rd,wave(opos(p,id),A,B,V));col=pow(clamp(c2,0.,1.),vec3(.4545));',
    '  col+=gr(gl_FragCoord.xy,uT)*uGrain;}',
    ' else if(rd.y<0.&&uFloor>-50.){float tf=(uFloor-ro.y)/rd.y;vec3 fp=ro+rd*tf;float dl=length(fp.xz);',
    '  if(dl<4.5){float s=soft(fp+vec3(0.,.01,0.),normalize(LK));float o=clamp(map(fp+vec3(0.,.35,0.)).x/.35,0.,1.);',
    '   float k=1.-smoothstep(1.6,3.4,dl);col=uBg*mix(1.,(1.-.17*(1.-s))*mix(.88,1.,o),k);}}',
    ' gl_FragColor=vec4(col,1.);}'
  ]).join('\n');

  /* E à plat : motif KYMA Wave plein cadre (bruit fractal + déformation de domaine), tourbillon au pointeur */
  var FS_PAT = HEAD.concat([
    'uniform vec2 uRes,uMouse,uShift;uniform float uT,uSwirl,uPat,uGrain,uWarp,uSheen;uniform vec3 uA,uB,uV;', GRAIN,
    'float h2(vec2 p){p=fract(p*vec2(.1031,.1030));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}',
    'float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
    ' return mix(mix(h2(i),h2(i+vec2(1,0)),f.x),mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x),f.y);}',
    'float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*n2(p);p=m*p;a*=.5;}return v/.96875;}',
    'void main(){vec2 uv=gl_FragCoord.xy/uRes.y;vec2 d=uv-uMouse;float r=length(d);',
    ' float a=uSwirl*2.2*exp(-r*r/.0484);float c=cos(a),s=sin(a);uv=uMouse+mat2(c,s,-s,c)*d;',
    ' vec2 p=uv*2.2*uPat+uShift;float t=uT*.045;',
    ' vec2 q=vec2(fbm(p+vec2(0.,t)),fbm(p+vec2(5.2,1.3)-t));',
    ' vec2 rr=vec2(fbm(p+3.*q*uWarp+vec2(1.7,9.2)+.15*t),fbm(p+3.*q*uWarp+vec2(8.3,2.8)-.126*t));',
    ' float f=fbm(p+3.*rr);float k=smoothstep(.25,.75,f);vec3 col=mix(uB,uA,k);',
    ' float v=abs(fract(f*3.2+q.x*.8)-.5);col=mix(col,uV,(1.-smoothstep(0.,.1,v))*.3);',
    ' col*=1.+uSheen*(q.y-.5);col=pow(clamp(col,0.,1.),vec3(.4545));col+=gr(gl_FragCoord.xy,uT)*uGrain;',
    ' gl_FragColor=vec4(col,1.);}'
  ]).join('\n');

  /* R : plan beige satiné, ondes concentriques analytiques A·exp(-1,2·âge)·sin(k·(r - c·âge)) */
  var FS_RIP = HEAD.concat([
    'uniform vec2 uRes;uniform float uT,uGrain;uniform vec4 uW[6];uniform vec3 uA,uB,uV;', GRAIN,
    'float hg(vec2 p){float z=0.;for(int i=0;i<6;i++){vec4 R=uW[i];if(R.w>0.){float d=length(p-R.xy);float fr=.45*R.z;',
    '  float env=smoothstep(fr+.02,fr-.35,d)*smoothstep(-.05,.08,fr-d+.08);',
    '  z+=R.w*.03*exp(-1.2*R.z)*sin(22.*(d-fr))*env/(1.+2.5*d);}}return z;}',
    'void main(){vec2 p=gl_FragCoord.xy/uRes.y;float e=1.5/uRes.y;float z=hg(p);',
    ' vec3 n=normalize(vec3(-(hg(p+vec2(e,0.))-z)/e,-(hg(p+vec2(0.,e))-z)/e,1.));',
    ' vec3 L=normalize(vec3(-.5,.6,.65));float dif=clamp(dot(n,L),0.,1.);vec3 H=normalize(L+vec3(0.,0.,1.));',
    ' float sp=pow(clamp(dot(n,H),0.,1.),36.)*.35;vec3 base=uB;',
    ' base=mix(base,uA,clamp(-z*28.,0.,1.));base=mix(base,uV,clamp(z*30.,0.,1.)*.4);',
    ' vec3 col=base*(.82+.22*dif)+vec3(1.,.97,.93)*sp;col=pow(clamp(col,0.,1.),vec3(.4545));',
    ' col+=gr(gl_FragCoord.xy,uT)*uGrain;gl_FragColor=vec4(col,1.);}'
  ]).join('\n');

  var KINDS = {
    hero: { fs: FS_SDF, def: 0, sdf: true },
    swatch: { fs: FS_SDF, def: 1, sdf: true },
    rings: { fs: FS_SDF, def: 2, sdf: true },
    pattern: { fs: FS_PAT },
    ripple: { fs: FS_RIP }
  };
  var UNI = 'uRes uMouse uShift uC uT uMorph uFocus uFloor uHover uPat uGrain uCo uCr uCu uCf uA uB uV uA2 uB2 uV2 uBg uFl uR uR1 uR2 uSwirl uWarp uSheen uW'.split(' ');

  /* ── contexte WebGL partagé (un seul par page) ───────────────────────── */
  function shared() {
    if (G) return G.lost ? null : G;
    var cv = d.createElement('canvas'), gl = null;
    cv.width = 64; cv.height = 64;
    try {
      gl = cv.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, premultipliedAlpha: false, preserveDrawingBuffer: false, powerPreference: 'high-performance' }) ||
        cv.getContext('experimental-webgl');
    } catch (e) { gl = null; }
    if (!gl) { G = { lost: true, failed: true }; return null; }
    G = { cv: cv, gl: gl, progs: {}, lost: false };
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); G.lost = true; }, false);
    cv.addEventListener('webglcontextrestored', function () { G = null; list.forEach(function (s) { s.dirty = true; }); wake(); }, false);
    return G;
  }
  function program(kind) {
    var g = shared(); if (!g) return null;
    if (g.progs[kind]) return g.progs[kind];
    var gl = g.gl, K = KINDS[kind];
    function sh(type, src) {
      var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS) && !gl.isContextLost()) {
        if (w.console) console.warn('[KYMA3D] shader ' + kind + ' :', gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    }
    var v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, (K.sdf ? '#define SCENE ' + K.def + '\n' : '') + K.fs);
    if (!v || !f) return (g.progs[kind] = null);
    var pr = gl.createProgram();
    gl.attachShader(pr, v); gl.attachShader(pr, f);
    gl.bindAttribLocation(pr, 0, 'p'); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return (g.progs[kind] = null);
    var u = {};
    UNI.forEach(function (n) { u[n] = gl.getUniformLocation(pr, n); });
    return (g.progs[kind] = { pr: pr, u: u });
  }

  /* ── scène ───────────────────────────────────────────────────────────── */
  function Scene(canvas, opts) {
    var self = this;
    opts = opts || {};
    self.canvas = canvas;
    self.host = opts.host || canvas.parentNode;
    self.kind = KINDS[opts.scene] ? opts.scene : 'hero';
    self.follow = opts.follow != null ? !!opts.follow : (self.kind !== 'rings' && self.kind !== 'ripple');
    self.interactive = opts.interactive !== false;
    self.p = {
      morph: 0, dive: 0, focus: -1, shift: opts.shift || null, c1: -0.45, c2: 0.45, swirl: 0,
      pat: opts.pattern || (self.kind === 'swatch' ? 1.05 : self.kind === 'pattern' ? 1 : 1.5),
      warp: 1, grain: self.kind === 'pattern' ? 0.02 : 0.025
    };
    if (opts.grain != null) self.p.grain = opts.grain;
    self.t = reduced ? 14.2 : 20 + Math.random() * 400; /* graine : le motif n'est jamais deux fois le même */
    self.name = Array.isArray(opts.colorway) ? 'custom' : key(opts.colorway || 'kyma');
    var c0 = pair(opts.colorway || 'kyma');
    self.col = { a: c0[0], b: c0[1], v: c0[2], fa: c0[0], fb: c0[1], fv: c0[2], ta: c0[0], tb: c0[1], tv: c0[2], k: 1 };
    self.c2 = pair(['#C19E86', '#E8C4C4', '#A88670']); /* 2e anneau (ORIGINE) : marron clair */
    self.yaw = 0; self.pitch = 0; self.ty = 0; self.tp = 0; self.spin = Math.random() * 6;
    self.hov = 0; self.thov = 0; self.mouse = [0, 0]; self.pm = [0.5, 0.5]; self.tpm = [0.5, 0.5]; self.sw = 0; self.tsw = 0;
    self.waves = []; self.autoT = 2.2; self.prio = 0;
    self.scale = isMobile() ? 0.7 : 0.9; self.acc = 0; self.n = 0;
    self.frames = 0; self.ftime = 0; self.visible = false; self.area = 0; self.drawn = false; self.dirty = true; self.active = false;
    try { self.ctx = canvas.getContext('2d', { alpha: false }); } catch (e) { self.ctx = null; }
    self.css();
    self.ok = !!(self.ctx && program(self.kind));
    if (!self.ok) { self.fail(); return; }
    if (opts.bare) return;
    self.resize(true);
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
  S.watch = function () {
    var self = this, cv = this.canvas;
    if ('ResizeObserver' in w) new ResizeObserver(function () { self.resize(); }).observe(cv);
    else w.addEventListener('resize', function () { self.resize(); });
    if (hasIO) {
      new IntersectionObserver(function (es) {
        var e = es[es.length - 1];
        self.visible = e.isIntersecting;
        self.area = e.isIntersecting ? e.intersectionRect.width * e.intersectionRect.height : 0;
        if (self.visible) wake();
      }, { rootMargin: '40px 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }).observe(cv);
    } else { self.visible = true; self.area = 1; }
    if (self.interactive && self.kind !== 'ripple') {
      cv.addEventListener('pointerenter', function () { self.prio = performance.now(); wake(); });
    }
  };
  S.point = function (x, y, type) {
    var r = this.canvas.getBoundingClientRect();
    if (!r.width || !r.height) return;
    var nx = (x - r.left) / r.width * 2 - 1, ny = (y - r.top) / r.height * 2 - 1;
    var inside = nx > -1 && nx < 1 && ny > -1 && ny < 1, asp = r.width / r.height;
    this.mouse = [nx * asp, -ny];
    this.tpm = [(nx + 1) / 2 * asp, (1 - ny) / 2];
    this.thov = inside && type !== 'touch' ? 1 : 0;
    this.tsw = inside ? 0.6 : 0;
    if (inside) { this.ty = nx * 0.55; this.tp = ny * 0.3; } else { this.ty *= 0.5; this.tp *= 0.5; }
    if (inside && this.kind === 'ripple' && type !== 'touch') {
      var dx = x - (this._lx || -9999), dy = y - (this._ly || -9999);
      if (Math.hypot(dx, dy) > 180) { this._lx = x; this._ly = y; this.ripple(x, y, 1); }
    }
    if (inside) wake();
  };
  /* onde de la scène R (coordonnées client) */
  S.ripple = function (x, y, amp) {
    if (this.kind !== 'ripple' || reduced) return;
    var r = this.canvas.getBoundingClientRect(); if (!r.height) return;
    this.waves.push({ x: (x - r.left) / r.height, y: (r.bottom - y) / r.height, age: 0, amp: amp || 1 });
    if (this.waves.length > 6) this.waves.shift();
    this.prio = performance.now(); this.autoT = 4; wake();
  };
  S.resize = function (force) {
    if (!this.ok) return;
    var cv = this.canvas, dpr = Math.min(w.devicePixelRatio || 1, isMobile() ? 1.5 : 1.75);
    var cw = cv.clientWidth || 300, ch = cv.clientHeight || 150, flat = this.kind === 'pattern' || this.kind === 'ripple';
    var k = dpr * this.scale * (flat ? 0.75 : 1), max = flat ? 700000 : 1100000; /* plafond de pixels */
    if (cw * ch * k * k > max) k = Math.sqrt(max / (cw * ch));
    var W = Math.max(48, Math.round(cw * k)), H = Math.max(48, Math.round(ch * k));
    if (force || W !== cv.width || H !== cv.height) {
      cv.width = W; cv.height = H; this.dirty = true; this.drawn = false;
      if (reduced || paused) this.draw(0); else wake();
    }
  };
  S.setColorway = function (name) {
    var arr = Array.isArray(name), k2 = arr ? 'custom' : key(name);
    if (!CW[k2] && !arr) return;
    this.name = k2; this.css(arr ? name : null);
    var c = pair(name), C = this.col;
    C.fa = C.a; C.fb = C.b; C.fv = C.v; C.ta = c[0]; C.tb = c[1]; C.tv = c[2]; C.k = (reduced || paused) ? 1 : 0;
    if (reduced || paused) { C.a = C.ta; C.b = C.tb; C.v = C.tv; }
    this.dirty = true; this.prio = performance.now();
    if (reduced || paused) this.draw(0); else wake();
  };
  S.set = function (o) {
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) this.p[k] = o[k];
    this.dirty = true;
    if (reduced || paused) this.draw(0); else wake();
  };
  S.adapt = function (dt) {
    this.acc += dt; this.n++;
    if (this.n < 20 && this.acc < 0.4) return;
    var avg = this.acc / this.n; this.acc = 0; this.n = 0;
    var s = this.scale;
    if (avg > 0.05) s *= 0.7; else if (avg > 0.024) s *= 0.85; else if (avg < 0.0175) s *= 1.1;
    s = Math.min(1, Math.max(w.KYMA3D_MIN_SCALE || 0.3, s));
    if (Math.abs(s - this.scale) > 0.01) { this.scale = s; this.resize(); }
  };
  S.frame = function (dt) {
    var C = this.col, f = 1 - Math.exp(-dt * 5); /* lissage du pointeur : taux 5/s, indépendant des i/s */
    this.t += dt * (this.p.speed == null ? 1 : this.p.speed); this.frames++; this.ftime += dt;
    if (C.k < 1) {
      C.k = Math.min(1, C.k + dt / FADE);
      var e = ease(C.k); C.a = mix3(C.fa, C.ta, e); C.b = mix3(C.fb, C.tb, e); C.v = mix3(C.fv, C.tv, e);
    }
    this.yaw += (this.ty - this.yaw) * f; this.pitch += (this.tp - this.pitch) * f;
    this.hov += (this.thov - this.hov) * (1 - Math.exp(-dt * 4));
    this.pm[0] += (this.tpm[0] - this.pm[0]) * f; this.pm[1] += (this.tpm[1] - this.pm[1]) * f;
    this.sw += (this.tsw - this.sw) * (1 - Math.exp(-dt / 1.2 * 3));
    this.spin += dt * (this.kind === 'rings' ? 0.07 + this.hov * 0.1 : 0.11);
    if (this.kind === 'ripple') {
      for (var i = this.waves.length - 1; i >= 0; i--) { this.waves[i].age += dt; if (this.waves[i].age > 4.5) this.waves.splice(i, 1); }
      this.autoT -= dt;
      if (this.autoT < 0) { /* onde ambiante discrète quand personne n'interagit */
        var r = this.canvas.getBoundingClientRect();
        this.waves.push({ x: (0.2 + Math.random() * 0.6) * (r.width / (r.height || 1)), y: 0.25 + Math.random() * 0.5, age: 0, amp: 0.55 });
        this.autoT = 3.2 + Math.random() * 2;
      }
    }
    this.adapt(dt);
    this.draw(dt);
  };
  /* rendu dans le contexte partagé, puis copie dans le canvas 2D de la scène */
  S.draw = function () {
    if (!this.ok) return;
    var g = shared(); if (!g) return;
    var P = program(this.kind); if (!P) return;
    var gl = g.gl, u = P.u, p = this.p, C = this.col, cv = this.canvas, W = cv.width, H = cv.height;
    if (g.cv.width < W || g.cv.height < H) { g.cv.width = Math.max(g.cv.width, W); g.cv.height = Math.max(g.cv.height, H); }
    gl.useProgram(P.pr);
    gl.viewport(0, 0, W, H);
    var mobile = (cv.clientWidth || 1) < 600, t = this.t;
    gl.uniform2f(u.uRes, W, H); gl.uniform1f(u.uT, t);
    gl.uniform3fv(u.uA, C.a); gl.uniform3fv(u.uB, C.b); gl.uniform3fv(u.uV, C.v);
    gl.uniform1f(u.uGrain, (reduced || paused) ? p.grain * 0.6 : p.grain);
    if (this.kind === 'pattern') {
      gl.uniform2f(u.uMouse, this.pm[0], this.pm[1]); gl.uniform1f(u.uSwirl, this.sw * (p.swirlK == null ? 1 : p.swirlK));
      gl.uniform1f(u.uPat, p.pat || 1); gl.uniform1f(u.uWarp, p.warp == null ? 1 : p.warp); gl.uniform1f(u.uSheen, 0.08);
      var sh0 = p.shift || [0, 0]; gl.uniform2f(u.uShift, sh0[0], sh0[1]);
    } else if (this.kind === 'ripple') {
      var arr = new Float32Array(24);
      for (var i = 0; i < 6; i++) { var wv = this.waves[i]; if (wv) { arr[i * 4] = wv.x; arr[i * 4 + 1] = wv.y; arr[i * 4 + 2] = wv.age; arr[i * 4 + 3] = wv.amp; } }
      gl.uniform4fv(u.uW, arr);
    } else {
      this.sdf(gl, u, p, C, mobile, t);
    }
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    /* WebGL : origine en bas à gauche -> la zone rendue occupe les H dernières lignes de l'image */
    try { this.ctx.drawImage(g.cv, 0, g.cv.height - H, W, H, 0, 0, W, H); } catch (e) { /* contexte perdu */ }
    this.dirty = false; this.drawn = true;
    if (!this.shown) { this.shown = true; cv.classList.add('k3d-ready'); }
  };
  S.sdf = function (gl, u, P, C, mobile, t) {
    var ro, ta, fl = 1.9, fy = -1.55, R, R1 = null, R2 = null, sh = P.shift;
    var m = P.morph || 0, dv = ease(Math.min(1, Math.max(0, P.dive || 0)));
    if (this.kind === 'hero') {
      var dist = (mobile ? 7.4 : 4.4) + m * 0.9, orb = m * 0.7;
      ro = [Math.sin(orb) * dist, 0.62 + m * 0.5, Math.cos(orb) * dist]; ta = [0, -0.05, 0];
      ro = mix3(ro, [0.05, 0.12, 1.92], dv); ta = mix3(ta, [0, 0.02, 1.0], dv); fl = mix(1.9, mobile ? 3.4 : 2.3, dv);
      if (dv > 0.5) fy = -99;
      R = rotm(this.spin + this.yaw + m * 0.8, 0.5 + this.pitch + Math.sin(t * 0.21) * 0.07 - m * 0.3 - dv * 0.25, 0.18 + Math.sin(t * 0.17) * 0.06);
      if (!sh) sh = mobile ? [0, 0.56] : [0.62, 0.02];
      sh = [sh[0] * (1 - dv), sh[1] * (1 - dv)];
    } else if (this.kind === 'swatch') {
      ro = [0, 1.75, 3.3]; ta = [0, -0.12, 0]; fy = -1.05; fl = mobile ? 1.6 : 1.9;
      R = rotm(0.5 + Math.sin(t * 0.23) * 0.18 + this.yaw * 0.6 + (P.turn || 0), -0.18 + this.pitch * 0.5 + (P.tilt || 0), Math.sin(t * 0.31) * 0.06);
      sh = sh || [0, 0];
    } else {
      ro = [0, 0.55, mobile ? 6.2 : 5.2]; ta = [0, -0.05, 0]; fy = -1.45;
      R = rotm(this.yaw * 0.35, 0.3 + this.pitch * 0.35, 0.08);
      /* deux anneaux qui tournent à ~4°/s, en sens opposés, axes inclinés l'un par rapport à l'autre */
      R1 = rotm(this.spin, 1.5708, 0); R2 = rotm(-this.spin, 0.35, 0);
      sh = sh || [0, 0];
    }
    var fw = norm([ta[0] - ro[0], ta[1] - ro[1], ta[2] - ro[2]]), rt = norm(cross(fw, [0, 1, 0])), up = cross(rt, fw);
    gl.uniform2f(u.uMouse, this.mouse[0], this.mouse[1]);
    gl.uniform2f(u.uShift, sh[0], sh[1]);
    gl.uniform2f(u.uC, P.c1, P.c2);
    gl.uniform1f(u.uMorph, m); gl.uniform1f(u.uFocus, P.focus == null ? -1 : P.focus);
    gl.uniform1f(u.uFloor, fy); gl.uniform1f(u.uHover, this.hov * (1 - dv)); gl.uniform1f(u.uPat, (P.pat || 1) * (1 + dv * 0.6));
    gl.uniform3fv(u.uCo, ro); gl.uniform3fv(u.uCr, rt); gl.uniform3fv(u.uCu, up); gl.uniform3fv(u.uCf, fw);
    gl.uniform1f(u.uFl, fl);
    var bgc = hex(BG), tint = C.b.map(function (v) { return Math.pow(v, 1 / 2.2); });
    gl.uniform3fv(u.uBg, dv > 0 ? mix3(bgc, tint, dv * 0.9) : bgc);
    gl.uniform3fv(u.uA2, this.c2[0]); gl.uniform3fv(u.uB2, this.c2[1]); gl.uniform3fv(u.uV2, this.c2[2]);
    gl.uniformMatrix3fv(u.uR, false, R);
    gl.uniformMatrix3fv(u.uR1, false, R1 || R); gl.uniformMatrix3fv(u.uR2, false, R2 || R);
  };
  S.destroy = function () { this.ok = false; var i = list.indexOf(this); if (i > -1) list.splice(i, 1); };

  /* ── boucle commune : au plus MAX_ACTIVE scènes animées, choisies par surface visible ─────────── */
  function budget() {
    var n = MAX_ACTIVE;
    externals.forEach(function (x) { if (x.on) n--; });
    return Math.max(1, n);
  }
  function loop(now) {
    raf = 0;
    var dt = last ? Math.min(0.25, (now - last) / 1000) : 1 / 60, any = false, i;
    last = now;
    var vis = [];
    for (i = 0; i < list.length; i++) {
      var s = list[i]; s.active = false;
      if (s.ok && s.visible && !d.hidden) vis.push(s);
    }
    vis.sort(function (a, b) { return (b.area + (now - b.prio < 2500 ? 1e9 : 0)) - (a.area + (now - a.prio < 2500 ? 1e9 : 0)); });
    var nb = budget();
    for (i = 0; i < vis.length; i++) {
      if (i < nb) { vis[i].active = true; vis[i].frame(dt); any = true; }
      else if (!vis[i].drawn || vis[i].dirty) vis[i].draw(); /* figée : une image, puis plus rien */
    }
    if (any && !reduced && !paused) raf = w.requestAnimationFrame(loop); else last = 0;
  }
  function wake() {
    if (raf) return;
    if (reduced || paused) {
      list.forEach(function (s) { if (s.ok && s.visible && (!s.drawn || s.dirty)) s.draw(); });
      return;
    }
    raf = w.requestAnimationFrame(loop);
  }
  d.addEventListener('visibilitychange', function () { if (!d.hidden) wake(); });
  w.addEventListener('pointermove', function (e) {
    if (reduced) return;
    for (var i = 0; i < list.length; i++) if (list[i].interactive && list[i].visible) list[i].point(e.clientX, e.clientY, e.pointerType);
  }, { passive: true });
  d.addEventListener('pointerleave', function () { list.forEach(function (s) { s.thov = 0; s.tp = 0; s.ty = 0; s.tsw = 0; }); });

  function supported() {
    var g = shared();
    return !!g;
  }

  /* instanciation à la demande : la scène n'est créée qu'à l'approche de l'écran */
  var lazy = hasIO ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      lazy.unobserve(e.target);
      var o = e.target._k3dOpts; e.target._k3dOpts = null;
      if (o) create(e.target, o);
    });
  }, { rootMargin: '60% 0px' }) : null;

  function create(canvas, opts) {
    if (!shared()) { var h = opts.host || canvas.parentNode; if (h) h.classList.add('kyma3d-off'); canvas.style.display = 'none'; return null; }
    var s = new Scene(canvas, opts);
    canvas._k3d = s;
    if (s.ok) { list.push(s); wake(); }
    return s;
  }

  w.KYMA3D = {
    colorways: CW,
    reduced: reduced,
    MAX_ACTIVE: MAX_ACTIVE,
    supported: supported,
    key: key,
    mount: function (canvas, opts) {
      if (!canvas) return null;
      if (canvas._k3d) return canvas._k3d;
      opts = opts || {};
      if (lazy && !opts.eager) { canvas._k3dOpts = opts; lazy.observe(canvas); return null; }
      return create(canvas, opts);
    },
    get: function (canvas) { return canvas && canvas._k3d && canvas._k3d.ok ? canvas._k3d : null; },
    setColorway: function (name) { list.forEach(function (s) { if (s.follow) s.setColorway(name); }); },
    pause: function (on) {
      paused = !!on;
      if (paused) { if (raf) { w.cancelAnimationFrame(raf); raf = 0; } last = 0; list.forEach(function (s) { s.active = false; }); }
      else wake();
    },
    paused: function () { return paused; },
    /* déclare un autre canvas WebGL (ex. <model-viewer>) : quand il est visible, le moteur n'anime qu'une scène */
    external: function (el) {
      if (!el || el._k3dExt) return; var x = { el: el, on: false }; el._k3dExt = x; externals.push(x);
      if (hasIO) new IntersectionObserver(function (es) { x.on = es[es.length - 1].isIntersecting; }).observe(el);
      else x.on = true;
    },
    snapshot: function (o) {
      o = o || {};
      if (!shared()) return null;
      var c = d.createElement('canvas'); c.width = o.width || 480; c.height = o.height || 480;
      c.style.width = c.width + 'px'; c.style.height = c.height + 'px';
      var s = new Scene(c, { scene: o.scene || 'pattern', colorway: o.colorway || 'kyma', pattern: o.pattern, host: d.createElement('div'), interactive: false, grain: o.grain, bare: true });
      if (!s.ok) return null;
      if (o.seed != null) s.t = o.seed;
      if (o.shift) s.p.shift = o.shift;
      s.draw();
      try { return c.toDataURL('image/jpeg', 0.86); } catch (e) { return null; }
    },
    stats: function () {
      return list.map(function (s) {
        return { scene: s.kind, active: s.active, visible: s.visible, fps: s.ftime ? Math.round(s.frames / s.ftime * 10) / 10 : 0, scale: Math.round(s.scale * 100) / 100, w: s.canvas.width, h: s.canvas.height };
      });
    },
    contexts: function () { return G && !G.failed ? 1 : 0; },
    activeCount: function () { return list.filter(function (s) { return s.active; }).length; },
    instances: list
  };
})(window, document);
