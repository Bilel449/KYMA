#!/usr/bin/env node
// KYMA — rendu de contrôle three.js des GLB v2 / v3 (Chromium headless, WebGL SwiftShader), éclairage proche de kyma-pstory.js.
// node render_three.cjs <glb> <dossier_sortie> <prefixe> [plans.json] [taille]
// THREE_DIR = dossier du paquet npm « three » (sinon ./node_modules/three). Un plan : {name, pos, target, fov, mixerTime (temps du clip ZipOpen), open, zip, unzip, only, hide}
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { chromium } = require(execSync('npm root -g').toString().trim() + '/playwright');

const glb = path.resolve(process.argv[2]);
const outDir = path.resolve(process.argv[3] || '.');
const prefix = process.argv[4] || path.basename(glb, '.glb');
const shotsFile = process.argv[5];
const size = parseInt(process.argv[6] || '900', 10);
const T = process.env.THREE_DIR || path.join(__dirname, 'node_modules/three');

const DEFAULT = [
  { name: 'face', pos: [0, 0.55, 2.35], target: [0, 0.43, 0], fov: 30 },
  { name: 'trois-quarts', pos: [1.45, 0.62, 1.85], target: [0, 0.43, 0], fov: 30 },
  { name: 'dos', pos: [0, 0.6, -2.35], target: [0, 0.43, 0], fov: 30 },
  { name: 'profil', pos: [2.35, 0.55, 0], target: [0, 0.43, 0], fov: 30 },
];
const shots = shotsFile ? JSON.parse(fs.readFileSync(shotsFile, 'utf8')) : DEFAULT;

const html = `<!doctype html><html><head><meta charset="utf-8">
<script type="importmap">{"imports":{"three":"http://k.local/three/build/three.module.js","three/addons/":"http://k.local/three/examples/jsm/"}}</script>
<style>html,body{margin:0;background:#F5EDE4}canvas{display:block}</style></head><body>
<script type="module">
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
const S=${size};
const renderer = new THREE.WebGLRenderer({antialias:true, preserveDrawingBuffer:true});
renderer.setPixelRatio(1); renderer.setSize(S,S);
renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color('#F5EDE4');
const pm = new THREE.PMREMGenerator(renderer);
scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.75;
const key = new THREE.DirectionalLight(0xfff4ea, 1.5); key.position.set(1.2, 2.4, 2.0); key.castShadow = true;
key.shadow.mapSize.set(2048,2048); key.shadow.camera.left=-1; key.shadow.camera.right=1; key.shadow.camera.top=1.4; key.shadow.camera.bottom=-0.6;
key.shadow.bias=-0.0004; key.shadow.normalBias=0.004; key.shadow.radius=4; scene.add(key);
const rim = new THREE.DirectionalLight(0xeef2ff, 0.5); rim.position.set(-1.8, 1.5, -1.6); scene.add(rim);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(8,8), new THREE.ShadowMaterial({opacity:0.16}));
ground.rotation.x = -Math.PI/2; ground.position.y = -0.08; ground.receiveShadow = true; scene.add(ground);
const cam = new THREE.PerspectiveCamera(30, 1, 0.01, 50);
window.go = async () => {
  const g = await new GLTFLoader().loadAsync('http://k.local/model.glb');
  const root = g.scene; scene.add(root);
  root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  let lo = Infinity; root.updateMatrixWorld(true);
  new THREE.Box3().setFromObject(root); const bb = new THREE.Box3().setFromObject(root); ground.position.y = bb.min.y - 0.002;
  const rootNode = root.getObjectByName('KYMA_Hoodie') || root;
  const ex = rootNode.userData || {};
  window.__ex = ex;
  const morphMeshes = []; root.traverse(o => { if (o.isMesh && o.morphTargetDictionary) morphMeshes.push(o); });
  const slider = root.getObjectByName('Zip_Slider');
  window.shot = (s) => {
    root.traverse(o => { if (o.name) o.visible = !(s.hide || []).includes(o.name); });
    if (s.only) { root.traverse(o => { if (o.isMesh) o.visible = false; }); for (const n of s.only) { const o = root.getObjectByName(n); if (o) o.traverse(c => { c.visible = true; }); let p = o && o.parent; while (p) { p.visible = true; p = p.parent; } } }
    for (const m of morphMeshes) {
      const d = m.morphTargetDictionary;
      if (d.open !== undefined) m.morphTargetInfluences[d.open] = s.open || 0; if (d.open_fold !== undefined) m.morphTargetInfluences[d.open_fold] = s.fold || 0;
      for (let k = 1; k <= 4; k++) if (d['unzip_' + k] !== undefined) m.morphTargetInfluences[d['unzip_' + k]] = (s.unzip || [0,0,0,0])[k-1] || 0;
    }
    if (slider && ex.zipPath) {
      const P = ex.zipPath, n = P.length - 1, z = Math.min(Math.max(s.zip || 0, 0), 1) * n;
      const i = Math.min(Math.floor(z), n - 1), f = z - i;
      const a = P[i], b = P[i + 1];
      slider.position.set(a[0] + (b[0]-a[0])*f, a[1] + (b[1]-a[1])*f, a[2] + (b[2]-a[2])*f);
      if (ex.zipPathQuat) { const qa = new THREE.Quaternion(...ex.zipPathQuat[i]), qb = new THREE.Quaternion(...ex.zipPathQuat[i+1]); slider.quaternion.copy(qa.slerp(qb, f)); }
      if (s.open && ex.sliderOpen) { const o = (s.fold && ex.sliderOpenFold) ? ex.sliderOpenFold : ex.sliderOpen; slider.position.lerp(new THREE.Vector3(...o.position), s.open); slider.quaternion.slerp(new THREE.Quaternion(...o.quaternion), s.open); }
    }
    if (s.mixerTime !== undefined && g.animations.length) {
      const mixer = new THREE.AnimationMixer(root); const a = mixer.clipAction(g.animations[0]); a.setLoop(THREE.LoopOnce); a.clampWhenFinished = true; a.play(); mixer.setTime(s.mixerTime);
    }
    cam.fov = s.fov || 30; cam.position.set(...s.pos); cam.lookAt(new THREE.Vector3(...s.target)); cam.updateProjectionMatrix();
    renderer.render(scene, cam);
    return renderer.domElement.toDataURL('image/png');
  };
  const dbg=[]; root.traverse(o=>{ if(o.isMesh){ const pa=o.geometry.attributes.position; o.geometry.computeBoundingSphere(); const wb=new THREE.Box3().setFromObject(o); dbg.push('W['+wb.min.toArray().map(v=>v.toFixed(2))+'|'+wb.max.toArray().map(v=>v.toFixed(2))+'] vis='+o.visible+' mat='+o.material.name.slice(0,8)+' '+o.name+' n='+pa.count+' bs='+o.geometry.boundingSphere.radius.toFixed(3)+' c='+o.geometry.boundingSphere.center.toArray().map(v=>v.toFixed(2))+' mt='+(o.morphTargetInfluences||[]).length);} });
  const pl=root.getObjectByName('Panel_Left'); dbg.unshift('PL pos '+pl.position.toArray()+' q '+pl.quaternion.toArray()+' s '+pl.scale.toArray()+' type '+pl.type+' bb '+JSON.stringify(pl.geometry.boundingBox));
  return {anims: g.animations.map(a => a.name), extras: Object.keys(ex), dbg};
};
</script></body></html>`;

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.error('[page]', m.text()); });
  page.on('pageerror', e => console.error('[pageerror]', e.message));
  await page.route('http://k.local/**', route => {
    const u = new URL(route.request().url()).pathname;
    if (u === '/index.html') return route.fulfill({ body: html, contentType: 'text/html' });
    if (u === '/model.glb') return route.fulfill({ body: fs.readFileSync(glb), contentType: 'model/gltf-binary' });
    if (u.startsWith('/three/')) return route.fulfill({ body: fs.readFileSync(path.join(T, u.slice(7))), contentType: 'application/javascript' });
    return route.fulfill({ status: 404, body: '' });
  });
  await page.goto('http://k.local/index.html');
  await page.waitForFunction(() => typeof window.go === 'function');
  const info = await page.evaluate(() => window.go());
  console.log('info', JSON.stringify(info));
  for (const s of shots) {
    const url = await page.evaluate(s => window.shot(s), s);
    const file = path.join(outDir, `${prefix}-${s.name}.png`);
    fs.writeFileSync(file, Buffer.from(url.split(',')[1], 'base64'));
    console.log(file);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
