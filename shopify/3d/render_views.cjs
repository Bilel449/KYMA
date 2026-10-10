#!/usr/bin/env node
// KYMA — rendu de contrôle des GLB avec <model-viewer> (le même composant que Shopify).
// Usage : node render_views.cjs <fichier.glb> <dossier_sortie> [prefixe] [taille]
// Prérequis : Playwright installé globalement, et @google/model-viewer installé par npm ;
// MODEL_VIEWER_JS pointe vers dist/model-viewer.min.js (sinon recherche dans ./node_modules).
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { chromium } = require(execSync('npm root -g').toString().trim() + '/playwright');

const glb = path.resolve(process.argv[2]);
const outDir = path.resolve(process.argv[3] || '.');
const prefix = process.argv[4] || path.basename(glb, '.glb');
const size = parseInt(process.argv[5] || '1024', 10);
const mvJs = process.env.MODEL_VIEWER_JS ||
  path.resolve(__dirname, 'node_modules/@google/model-viewer/dist/model-viewer.min.js');

// Vues : face, trois-quarts, dos. theta = azimut, phi = angle depuis la verticale, [rayon].
// Variables : VIEWS="nom:theta phi [rayon],...", TARGET="x y z" (cible caméra), FOV, BG.
const VIEWS = (process.env.VIEWS || 'face:0deg 82deg,trois-quarts:38deg 78deg,dos:180deg 80deg')
  .split(',').map(v => { const [n, o] = v.split(':'); return { n, o: o.split(' ').length < 3 ? o + ' 105%' : o }; });
const TARGET = process.env.TARGET || 'auto auto auto';
const FOV = process.env.FOV || '26deg';
const BG = process.env.BG || '#F5EDE4';

const html = `<!doctype html><html><head><meta charset="utf-8">
<script type="module" src="http://kyma.local/mv.js"></script>
<style>html,body{margin:0;background:${BG}}model-viewer{width:${size}px;height:${size}px;--poster-color:transparent;background:${BG}}</style>
</head><body>
<model-viewer id="mv" src="http://kyma.local/model.glb" camera-orbit="0deg 82deg 105%" field-of-view="${FOV}" camera-target="${TARGET}"
  shadow-intensity="1" shadow-softness="1" exposure="1.0" tone-mapping="neutral" environment-image="neutral"
  interaction-prompt="none" disable-zoom></model-viewer></body></html>`;

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
  });
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  page.on('console', m => { if (m.type() === 'error') console.error('[page]', m.text()); });
  await page.route('http://kyma.local/**', route => {
    const u = route.request().url();
    if (u.endsWith('/mv.js')) return route.fulfill({ body: fs.readFileSync(mvJs), contentType: 'application/javascript' });
    if (u.endsWith('/model.glb')) return route.fulfill({ body: fs.readFileSync(glb), contentType: 'model/gltf-binary' });
    if (u.endsWith('/index.html')) return route.fulfill({ body: html, contentType: 'text/html' });
    return route.fulfill({ status: 404, body: '' });
  });
  await page.goto('http://kyma.local/index.html');
  await page.waitForFunction(() => { const mv = document.getElementById('mv'); return mv && mv.loaded; }, null, { timeout: 120000 });
  for (const v of VIEWS) {
    await page.evaluate(o => { const mv = document.getElementById('mv'); mv.cameraOrbit = o; mv.jumpCameraToGoal(); }, v.o);
    await page.waitForTimeout(1500);
    const file = path.join(outDir, `${prefix}-${v.n}.png`);
    await page.locator('#mv').screenshot({ path: file });
    console.log(file);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
