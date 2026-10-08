#!/usr/bin/env python3
"""KYMA — hoodie zippé oversize « Ressac » : modèle 3D procédural (aucune image IA).

Géométrie : champ de distance signée (SDF) en union lisse -> marching cubes -> lissage
Taubin -> décimation quadrique -> UV (xatlas) -> texture baseColor « cuite » en 3D.
Motif KYMA Wave : bruit de Perlin 3D à domain warping, évalué au point de surface
(« solid texture »), en 2 tons tonals. Zip (métal argent) et tirette (laiton doré)
sont des maillages séparés avec leurs propres matériaux PBR.

Usage :
    python3 build_hoodie.py --coloris lilac-whirl
    python3 build_hoodie.py --coloris all            # les 5 coloris
Options : --res (taille de voxel en m, défaut 0.0028), --faces (cible triangles tissu),
          --tex (résolution texture), --out (dossier de sortie, défaut : ce dossier).

Dépendances : numpy scipy scikit-image trimesh fast-simplification xatlas pillow
Sortie : ressac-<coloris>.glb (glTF 2.0 binaire, PBR metallic-roughness standard,
aucune extension). Unités : mètres, Y vers le haut, face avant vers +Z, base à y = 0.
"""
import argparse
import io
import json
import os
import struct
import time

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))

# --------------------------------------------------------------------------------------
# Coloris (dominante, secondaire) — tech pack v3
# --------------------------------------------------------------------------------------
COLORIS = {
    "lilac-whirl":  {"name": "Lilac Whirl",  "dom": "#C8A2C8", "sec": "#F5EDE4", "seed": 11},
    "ivory-tide":   {"name": "Ivory Tide",   "dom": "#E8E0D8", "sec": "#C5BFB8", "seed": 23},
    "silver-drift": {"name": "Silver Drift", "dom": "#8E9EAB", "sec": "#C8CDD2", "seed": 37},
    "noir-absolu":  {"name": "Noir Absolu",  "dom": "#1A1A1A", "sec": "#3A3A4A", "seed": 41},
    "crimson-flow": {"name": "Crimson Flow", "dom": "#5C2032", "sec": "#C4878E", "seed": 53},
}


def hex_rgb(h):
    h = h.lstrip("#")
    return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], dtype=np.float32) / 255.0


def srgb_to_lin(c):
    c = np.asarray(c, dtype=np.float64)
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def lin_to_srgb(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * c ** (1 / 2.4) - 0.055)


# --------------------------------------------------------------------------------------
# Bruit de Perlin 3D vectorisé + fBm + domain warping
# --------------------------------------------------------------------------------------
class Perlin:
    def __init__(self, seed):
        rng = np.random.default_rng(seed)
        p = rng.permutation(256)
        self.perm = np.concatenate([p, p, p]).astype(np.int64)
        g = rng.normal(size=(256, 3))
        self.grad = (g / np.linalg.norm(g, axis=1, keepdims=True)).astype(np.float32)

    def __call__(self, P):
        P = np.asarray(P, dtype=np.float32)
        Pf = np.floor(P)
        f = P - Pf
        Pi = Pf.astype(np.int64) & 255
        u = f * f * f * (f * (f * 6 - 15) + 10)
        X, Y, Z = Pi[:, 0], Pi[:, 1], Pi[:, 2]
        perm, grad = self.perm, self.grad
        out = np.zeros(len(P), dtype=np.float32)
        for dx in (0, 1):
            px = perm[X + dx]
            wx = u[:, 0] if dx else 1 - u[:, 0]
            for dy in (0, 1):
                py = perm[px + Y + dy]
                wy = u[:, 1] if dy else 1 - u[:, 1]
                for dz in (0, 1):
                    h = perm[py + Z + dz] & 255
                    g = grad[h]
                    n = g[:, 0] * (f[:, 0] - dx) + g[:, 1] * (f[:, 1] - dy) + g[:, 2] * (f[:, 2] - dz)
                    wz = u[:, 2] if dz else 1 - u[:, 2]
                    out += wx * wy * wz * n
        return out


_ROT = None


def _rot():
    global _ROT
    if _ROT is None:
        a, b = 0.61, 0.83
        Rx = np.array([[1, 0, 0], [0, np.cos(a), -np.sin(a)], [0, np.sin(a), np.cos(a)]])
        Ry = np.array([[np.cos(b), 0, np.sin(b)], [0, 1, 0], [-np.sin(b), 0, np.cos(b)]])
        _ROT = (Rx @ Ry).astype(np.float32)
    return _ROT


def fbm(noise, P, octaves=5, lac=2.03, gain=0.5):
    R = _rot()
    amp, tot = 1.0, np.zeros(len(P), dtype=np.float32)
    Q = P.astype(np.float32)
    for _ in range(octaves):
        tot += amp * noise(Q)
        Q = (Q @ R.T) * lac + 17.3
        amp *= gain
    return tot


# --------------------------------------------------------------------------------------
# Primitives SDF
# --------------------------------------------------------------------------------------
def smoothstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def smin(a, b, k):
    h = np.clip(0.5 + 0.5 * (b - a) / k, 0.0, 1.0)
    return b + (a - b) * h - k * h * (1 - h)


def smax(a, b, k):
    return -smin(-a, -b, k)


def sd_round_box(x, y, z, c, h, r):
    qx = np.abs(x - c[0]) - (h[0] - r)
    qy = np.abs(y - c[1]) - (h[1] - r)
    qz = np.abs(z - c[2]) - (h[2] - r)
    out = np.sqrt(np.maximum(qx, 0) ** 2 + np.maximum(qy, 0) ** 2 + np.maximum(qz, 0) ** 2)
    return out + np.minimum(np.maximum(qx, np.maximum(qy, qz)), 0) - r


def seg_param(x, y, z, a, b):
    ba = np.array(b, np.float32) - np.array(a, np.float32)
    L2 = float(ba @ ba)
    t = ((x - a[0]) * ba[0] + (y - a[1]) * ba[1] + (z - a[2]) * ba[2]) / L2
    return t, ba, np.sqrt(L2)


def sd_round_cone(x, y, z, a, b, ra, rb):
    """Capsule à rayon variable (approximation douce, suffisante pour de faibles conicités)."""
    t, ba, L = seg_param(x, y, z, a, b)
    tc = np.clip(t, 0, 1)
    dx = x - (a[0] + ba[0] * tc)
    dy = y - (a[1] + ba[1] * tc)
    dz = z - (a[2] + ba[2] * tc)
    return np.sqrt(dx * dx + dy * dy + dz * dz) - (ra + (rb - ra) * tc), t


def sd_capped_cyl(x, y, z, a, b, r, rr):
    """Cylindre arrondi (bords rr) entre a et b."""
    t, ba, L = seg_param(x, y, z, a, b)
    px = x - (a[0] + ba[0] * t)
    py = y - (a[1] + ba[1] * t)
    pz = z - (a[2] + ba[2] * t)
    d_rad = np.sqrt(px * px + py * py + pz * pz)
    d_ax = np.abs((t - 0.5) * L)
    qx = d_rad - (r - rr)
    qy = d_ax - (L / 2 - rr)
    return np.sqrt(np.maximum(qx, 0) ** 2 + np.maximum(qy, 0) ** 2) + np.minimum(np.maximum(qx, qy), 0) - rr, t


def sd_ellipsoid(px, py, pz, r):
    k0 = np.sqrt((px / r[0]) ** 2 + (py / r[1]) ** 2 + (pz / r[2]) ** 2)
    k1 = np.sqrt((px / r[0] ** 2) ** 2 + (py / r[1] ** 2) ** 2 + (pz / r[2] ** 2) ** 2)
    return k0 * (k0 - 1.0) / np.maximum(k1, 1e-6)


def rot_x(py, pz, ang):
    c, s = np.cos(ang), np.sin(ang)
    return c * py - s * pz, s * py + c * pz


POCKET = ((0.168, 0.108), (0.098, 0.290))   # poches biais : (bas, côté) -> (haut, milieu), en (|x|, y)

# --------------------------------------------------------------------------------------
# Le vêtement
# --------------------------------------------------------------------------------------
class Hoodie:
    # Points de la manche (côté +x ; l'autre côté par symétrie |x| avec plis décalés)
    S0 = (0.215, 0.648, -0.008)   # entrée d'épaule (dans le torse : épaule tombante)
    S1 = (0.398, 0.372, 0.012)    # coude
    S2 = (0.452, 0.136, 0.040)    # haut du poignet (blousant)
    S3 = (0.460, 0.057, 0.046)    # bas du bord-côte
    R0, R1, R2, RC = 0.090, 0.075, 0.068, 0.045
    HEM = 0.062                   # hauteur du bord-côte de taille (6 cm)
    T = 0.011                     # épaisseur visible aux ouvertures
    NECK_C = (0.0, 0.762, 0.004)  # centre de l'encolure
    NECK_TILT = 0.62              # pente de l'encolure (devant plus bas)
    HOOD_C = (0.0, 0.655, -0.150)

    def __init__(self):
        self.noise = Perlin(7)
        S2, S3 = np.array(self.S2), np.array(self.S3)
        d = (S3 - S2) / np.linalg.norm(S3 - S2)
        self.CUFF_A = tuple(S3 - d * 0.060)   # bord-côte de 6 cm
        self.CUFF_B = tuple(S3)

    # ---- torse ----------------------------------------------------------------------
    def torso(self, x, y, z):
        ax = np.abs(x)
        wtop = smoothstep(0.42, 0.72, y)
        ys = y + 0.50 * ax * ax * wtop                          # pente d'épaule
        bul = 0.022 * (1 - np.clip(ax / 0.30, 0, 1) ** 2)       # léger gonflé avant/dos
        zc = -0.004
        hz = 0.118 + bul * smoothstep(0.03, 0.25, y)
        main = sd_round_box(x, ys, z, (0, 0.400, zc), (0.300, 0.372, 1.0), 0.085)
        main = smax(main, np.abs(z - zc) - hz, 0.06)            # profondeur variable, arêtes douces
        rib = sd_round_box(x, y, z, (0, self.HEM / 2, zc), (0.295, self.HEM / 2, 0.113), 0.022)
        rib = np.maximum(rib, sd_round_box(x, y, z, (0, self.HEM / 2, zc), (0.40, self.HEM / 2, 0.40), 0.008))
        return smin(main, rib, 0.012)

    # ---- manches --------------------------------------------------------------------
    def sleeves(self, x, y, z):
        ax = np.abs(x)
        side = np.sign(x) + (x == 0)
        a, t1 = sd_round_cone(ax, y, z, self.S0, self.S1, self.R0, self.R1)
        b, t2 = sd_round_cone(ax, y, z, self.S1, self.S2, self.R1, self.R2)
        s = smin(a, b, 0.03)
        # plis doux : vagues le long de l'avant-bras et au coude, asymétriques G/D
        ph = np.where(side > 0, 0.0, 1.7)
        fold = (0.0034 * np.sin(t2 * 13.0 + ph) * smoothstep(0.0, 0.25, t2) * smoothstep(1.05, 0.75, t2)
                + 0.0028 * np.sin(t1 * 9.0 + 2 * ph) * smoothstep(0.55, 0.9, t1))
        s = s + fold
        cuff, tc = sd_capped_cyl(ax, y, z, self.CUFF_A, self.CUFF_B, self.RC, 0.012)
        return smin(s, cuff, 0.016), s, t1

    # ---- capuche couchée + col --------------------------------------------------------
    def neck_frame(self, x, y, z):
        c = self.NECK_C
        yl = (y - c[1]) + np.tan(self.NECK_TILT) * (z - c[2])
        return x - c[0], yl, z - c[2]

    def hood(self, x, y, z):
        lx, ly, lz = self.neck_frame(x, y, z)
        # col : tore elliptique autour de l'encolure
        R = 0.100
        rxz = np.sqrt((lx / 0.116) ** 2 + (lz / 0.100) ** 2) * R - R
        rr = 0.034 + 0.014 * smoothstep(0.03, -0.09, lz) - 0.004 * smoothstep(0.0, 0.09, lz)
        collar = np.sqrt(rxz * rxz + (ly * 0.85) ** 2) - rr      # col roulé : plus épais derrière (capuche)
        # masse de la capuche reposant dans le dos
        hc = self.HOOD_C
        py, pz = rot_x(y - hc[1], z - hc[2], -0.30)
        mass = sd_ellipsoid(x - hc[0], py, pz, (0.180, 0.165, 0.060))
        py2, pz2 = rot_x(y - 0.500, z - (-0.150), -0.15)
        tip = sd_ellipsoid(x, py2, pz2, (0.085, 0.075, 0.042))
        h = smin(mass, tip, 0.05)
        # couture centrale de la capuche
        h = h + 0.0028 * np.exp(-(x / 0.0055) ** 2) * smoothstep(-0.12, -0.17, z)
        # bord d'ouverture de la capuche (bourrelet double épaisseur)
        py3, pz3 = rot_x(y - 0.762, z - (-0.112), -0.95)
        edge = np.sqrt((np.sqrt((x / 0.150) ** 2 + (pz3 / 0.060) ** 2) * 0.1 - 0.1) ** 2 + (py3 * 1.0) ** 2) - 0.016
        h = smin(h, edge, 0.02)
        return smin(collar, h, 0.035)

    # ---- champ complet -----------------------------------------------------------------
    def body(self, x, y, z, details=True):
        sl, sl_raw, t1 = self.sleeves(x, y, z)
        d = smin(self.torso(x, y, z), sl, 0.045)
        d = smin(d, self.hood(x, y, z), 0.030)
        if details:
            ax = np.abs(x)
            # couture d'emmanchure (épaule tombante)
            L1 = np.linalg.norm(np.subtract(self.S1, self.S0))
            d = d + 0.0017 * np.exp(-(((t1 - 0.20) * L1) / 0.0035) ** 2) * smoothstep(0.012, 0.0, np.abs(sl_raw))
            front = smoothstep(0.02, 0.09, z)
            # sillon de zip
            d = d + 0.0032 * np.exp(-(x / 0.0065) ** 2) * front * smoothstep(0.80, 0.70, y)
            # poches biais : passepoil légèrement en relief + ligne d'ouverture creusée
            A, B = np.array(POCKET[0]), np.array(POCKET[1])
            ba = B - A
            tt = np.clip(((ax - A[0]) * ba[0] + (y - A[1]) * ba[1]) / (ba @ ba), 0, 1)
            dd = np.sqrt((ax - A[0] - ba[0] * tt) ** 2 + (y - A[1] - ba[1] * tt) ** 2)
            nrm = np.array([ba[1], -ba[0]]) / np.linalg.norm(ba)
            sd_line = (ax - A[0]) * nrm[0] + (y - A[1]) * nrm[1]
            welt = smoothstep(0.010, 0.006, dd) * front
            d = d - 0.0024 * welt + 0.0022 * np.exp(-((sd_line - 0.0085) / 0.0028) ** 2) * welt
            # couture bord-côte / corps
            d = d + 0.0018 * np.exp(-((y - self.HEM) / 0.004) ** 2) * smoothstep(0.30, 0.25, ax)
            # drapé basse fréquence
            P = np.stack([x, y, z], -1).reshape(-1, 3) * 5.0
            d = d + 0.0030 * self.noise(P).reshape(np.shape(x))
        return d

    def cavity(self, x, y, z):
        """Volumes creusés aux ouvertures : taille, poignets, encolure."""
        t = self.T
        hem = sd_round_box(x, y, z, (0, -0.05, -0.004), (0.295 - t, 0.095, 0.113 - t), 0.022 - 0.004)
        ax = np.abs(x)
        A, B = np.array(self.CUFF_A), np.array(self.CUFF_B)
        dvec = (B - A) / np.linalg.norm(B - A)
        cuff, _ = sd_capped_cyl(ax, y, z, tuple(A + dvec * 0.015), tuple(B + dvec * 0.08), self.RC - t, 0.004)
        lx, ly, lz = self.neck_frame(x, y, z)
        ell = (np.sqrt((lx / 0.080) ** 2 + (lz / 0.068) ** 2) - 1.0) * 0.068
        neck = np.maximum(ell, -(ly + 0.10))
        return np.minimum(np.minimum(hem, cuff), neck)

    def sdf(self, x, y, z):
        return smax(self.body(x, y, z), -self.cavity(x, y, z), 0.005)

    def sdf_p(self, P):
        P = np.asarray(P, np.float32)
        return self.sdf(P[:, 0], P[:, 1], P[:, 2])

    def grad(self, P, eps=0.0012):
        g = np.zeros_like(P)
        for i in range(3):
            e = np.zeros(3, np.float32)
            e[i] = eps
            g[:, i] = self.sdf_p(P + e) - self.sdf_p(P - e)
        return g / np.maximum(np.linalg.norm(g, axis=1, keepdims=True), 1e-9)


# --------------------------------------------------------------------------------------
# Maillage tissu
# --------------------------------------------------------------------------------------
BOUNDS = (np.array([-0.57, -0.012, -0.26], np.float32), np.array([0.57, 0.90, 0.21], np.float32))


def fabric_mesh(H, res, target_faces):
    from skimage import measure
    import trimesh
    import fast_simplification

    lo, hi = BOUNDS
    n = np.ceil((hi - lo) / res).astype(int) + 1
    xs = lo[0] + np.arange(n[0], dtype=np.float32) * res
    ys = lo[1] + np.arange(n[1], dtype=np.float32) * res
    zs = lo[2] + np.arange(n[2], dtype=np.float32) * res
    vol = np.empty((n[0], n[1], n[2]), np.float32)
    Y, Z = np.meshgrid(ys, zs, indexing="ij")
    for i, xv in enumerate(xs):
        vol[i] = H.sdf(np.full_like(Y, xv), Y, Z)
    verts, faces, _, _ = measure.marching_cubes(vol, 0.0, spacing=(res, res, res))
    verts = verts + lo
    m = trimesh.Trimesh(verts, faces, process=True)
    m.update_faces(m.nondegenerate_faces())
    m.remove_unreferenced_vertices()
    # garder la plus grande composante
    comps = m.split(only_watertight=False)
    m = max(comps, key=lambda c: len(c.faces))
    if m.volume < 0:
        m.invert()
    trimesh.smoothing.filter_taubin(m, lamb=0.5, nu=-0.53, iterations=12)
    v2, f2 = fast_simplification.simplify(np.asarray(m.vertices, np.float32), np.asarray(m.faces, np.int32),
                                          target_reduction=1.0 - target_faces / len(m.faces))
    m = trimesh.Trimesh(v2, f2, process=True)
    m.update_faces(m.nondegenerate_faces())
    m.remove_unreferenced_vertices()
    # re-projection douce sur la surface implicite (2 pas de Newton)
    V = np.asarray(m.vertices, np.float32)
    for _ in range(2):
        d = H.sdf_p(V)
        V = V - d[:, None] * H.grad(V)
    m.vertices = V
    return m


# --------------------------------------------------------------------------------------
# UV + cuisson de la texture
# --------------------------------------------------------------------------------------
def unwrap(V, F, tex):
    import xatlas
    atlas = xatlas.Atlas()
    atlas.add_mesh(V, F)
    co = xatlas.ChartOptions()
    co.max_iterations = 2
    po = xatlas.PackOptions()
    po.resolution = tex
    po.padding = 6
    po.bilinear = True
    po.bruteForce = False
    atlas.generate(co, po)
    vmap, idx, uv = atlas[0]
    return vmap, idx, uv


def rasterize(UV, F, tex, attrs):
    """Rasterise les triangles en espace UV. attrs : liste de (Nv, k). Renvoie mask + attributs."""
    P = UV * tex - 0.5                      # centres de texels sur entiers
    tri = P[F]                              # (Nf,3,2)
    mn = np.floor(tri.min(1)).astype(int)
    mx = np.ceil(tri.max(1)).astype(int)
    size = (mx - mn).max(1) + 1
    mask = np.zeros((tex, tex), bool)
    outs = [np.zeros((tex, tex, a.shape[1]), np.float32) for a in attrs]
    order = np.argsort(size)
    for S in np.unique(np.minimum(size, 4096)):
        sel = order[size[order] == S]
        for c0 in range(0, len(sel), max(1, 2_000_000 // (S * S))):
            ids = sel[c0:c0 + max(1, 2_000_000 // (S * S))]
            gx, gy = np.meshgrid(np.arange(S), np.arange(S), indexing="xy")
            px = mn[ids, 0, None, None] + gx[None]
            py = mn[ids, 1, None, None] + gy[None]
            a, b, c = tri[ids, 0], tri[ids, 1], tri[ids, 2]
            v0 = b - a
            v1 = c - a
            den = v0[:, 0] * v1[:, 1] - v1[:, 0] * v0[:, 1]
            den = np.where(np.abs(den) < 1e-12, 1e-12, den)
            wx = px - a[:, 0, None, None]
            wy = py - a[:, 1, None, None]
            l1 = (wx * v1[:, 1, None, None] - v1[:, 0, None, None] * wy) / den[:, None, None]
            l2 = (v0[:, 0, None, None] * wy - wx * v0[:, 1, None, None]) / den[:, None, None]
            l0 = 1 - l1 - l2
            e = -1e-3
            ins = (l0 >= e) & (l1 >= e) & (l2 >= e) & (px >= 0) & (py >= 0) & (px < tex) & (py < tex)
            ti, gy_, gx_ = np.nonzero(ins)
            X = px[ti, gy_, gx_]
            Yp = py[ti, gy_, gx_]
            w = np.stack([l0[ti, gy_, gx_], l1[ti, gy_, gx_], l2[ti, gy_, gx_]], 1)
            fi = F[ids[ti]]
            mask[Yp, X] = True
            for o, at in zip(outs, attrs):
                o[Yp, X] = (at[fi] * w[:, :, None]).sum(1)
    return mask, outs


def kyma_wave(P, seed, scale=1.6, share=0.38):
    """Motif marbré KYMA Wave : bandes de « courant » déformées par fBm 3D à double domain
    warping, évaluées au point de surface. Renvoie (m, veine) dans [0, 1]."""
    nz = Perlin(seed)
    Q = (P * scale).astype(np.float32)
    off = [np.array(o, np.float32) for o in ((0, 0, 0), (5.2, 1.3, 2.8), (1.7, 9.2, 4.1), (8.3, 2.8, 7.7),
                                              (3.1, 6.6, 0.9), (4.4, 0.7, 6.2))]
    q = np.stack([fbm(nz, Q + off[i], 2) for i in range(3)], 1)
    r = np.stack([fbm(nz, Q + 1.8 * q + off[i + 3], 3) for i in range(3)], 1)
    flow = np.array([0.35, 0.94, 0.0], np.float32)          # courant ascendant en diagonale
    f = Q @ flow + 1.1 * fbm(nz, Q + 2.0 * r, 3)
    band = np.sin(9.0 * f)
    t = float(np.quantile(band, 1.0 - share))                 # part exacte de la teinte secondaire
    m = smoothstep(t - 0.28, t + 0.28, band)
    vein = np.exp(-((band - t) / 0.10) ** 2)
    return m.astype(np.float32), vein.astype(np.float32)


def bake_texture(H, V, N, UV, F, col, tex):
    mask, (Pt, Nt) = rasterize(UV, F, tex, [V, N])
    ii = np.nonzero(mask)
    P = Pt[ii]
    Nn = Nt[ii]
    Nn /= np.maximum(np.linalg.norm(Nn, axis=1, keepdims=True), 1e-9)
    x, y, z = P[:, 0], P[:, 1], P[:, 2]

    dom = srgb_to_lin(hex_rgb(col["dom"]))
    sec = srgb_to_lin(hex_rgb(col["sec"]))
    m, vein = kyma_wave(P, col["seed"])
    base = dom[None] * (1 - m[:, None]) + sec[None] * m[:, None]
    mid = 0.5 * (dom + sec)
    base = base * (1 - 0.35 * vein[:, None]) + mid[None] * 0.35 * vein[:, None]

    # zones : doublure (intérieur des ouvertures), bord-côtes (taille, poignets)
    body = H.body(x, y, z)
    lining = smoothstep(-0.0015, -0.0040, body)
    ax = np.abs(x)
    A, B = np.array(H.CUFF_A), np.array(H.CUFF_B)
    ab = B - A
    L = np.linalg.norm(ab)
    tcf = ((ax - A[0]) * ab[0] + (y - A[1]) * ab[1] + (z - A[2]) * ab[2]) / (L * L)
    rad = np.sqrt((ax - A[0] - ab[0] * tcf) ** 2 + (y - A[1] - ab[1] * tcf) ** 2 + (z - A[2] - ab[2] * tcf) ** 2)
    cuff = (smoothstep(-0.03, 0.005, tcf) * (rad < H.RC + 0.02)).astype(np.float32)
    hem = smoothstep(H.HEM + 0.003, H.HEM - 0.002, y) * (y > -1)
    rib = np.maximum(cuff, hem) * (1 - lining)
    # côtes 2x2 : ombrage de stries
    u_hem = x + np.sign(z) * 0.0 + z * np.sign(x + 1e-6)
    e1 = np.cross(ab / L, np.array([0, 0, 1.0]))
    e1 /= np.linalg.norm(e1)
    e2 = np.cross(ab / L, e1)
    rx = (ax - A[0]) * e1[0] + (y - A[1]) * e1[1] + (z - A[2]) * e1[2]
    ry = (ax - A[0]) * e2[0] + (y - A[1]) * e2[1] + (z - A[2]) * e2[2]
    u_cuff = np.arctan2(ry, rx) * H.RC
    u = np.where(cuff > 0.5, u_cuff, u_hem)
    stripes = 0.5 + 0.5 * np.sin(2 * np.pi * u / 0.0052)
    ribcol = dom[None] * (0.93 + 0.07 * stripes[:, None])
    color = base * (1 - rib[:, None]) + ribcol * rib[:, None]
    color = color * (1 - lining[:, None]) + sec[None] * 0.92 * lining[:, None]

    # ligne d'ouverture des poches (ombre fine)
    front = smoothstep(0.02, 0.09, z)
    Aq, Bq = np.array(POCKET[0]), np.array(POCKET[1])
    ba = Bq - Aq
    tq = ((ax - Aq[0]) * ba[0] + (y - Aq[1]) * ba[1]) / (ba @ ba)
    nrm = np.array([ba[1], -ba[0]]) / np.linalg.norm(ba)
    sl = (ax - Aq[0]) * nrm[0] + (y - Aq[1]) * nrm[1]
    pocket = np.exp(-((sl - 0.0085) / 0.0016) ** 2) * smoothstep(-0.02, 0.0, tq) * smoothstep(1.02, 1.0, tq) * front
    color = color * (1 - 0.45 * pocket[:, None])

    # occlusion ambiante douce estimée par le SDF (creux : aisselles, capuche, poches)
    ao = np.zeros(len(P), np.float32)
    for k, dist in enumerate((0.006, 0.014, 0.028, 0.050)):
        ao += (dist - H.sdf_p(P + Nn * dist)) / dist * (0.5 ** k)
    ao = np.clip(1 - 0.32 * ao, 0.55, 1.0)
    color = color * ao[:, None]

    img = np.zeros((tex, tex, 3), np.float32)
    img[ii] = lin_to_srgb(color)
    # dilatation : chaque texel vide prend la valeur du texel rempli le plus proche
    from scipy import ndimage
    _, (iy, ix) = ndimage.distance_transform_edt(~mask, return_indices=True)
    img = img[iy, ix]
    # xatlas : v croît avec la ligne d'image -> même convention que glTF (v=0 en haut)
    return Image.fromarray((np.clip(img, 0, 1) * 255 + 0.5).astype(np.uint8))


# --------------------------------------------------------------------------------------
# Zip, curseur, tirette
# --------------------------------------------------------------------------------------
def zip_curve(H):
    ys = np.arange(0.004, 0.80, 0.0008, dtype=np.float32)
    z = np.full_like(ys, 0.30)
    x = np.zeros_like(ys)
    hit = np.zeros(len(ys), bool)
    for _ in range(700):
        d = H.sdf(x, ys, z)
        newhit = (d < 0) & ~hit
        hit |= newhit
        z = np.where(hit, z, z - 0.001)
    # affinage par bissection
    lo, hi = z, z + 0.001
    for _ in range(12):
        mid = 0.5 * (lo + hi)
        d = H.sdf(x, ys, mid)
        lo = np.where(d < 0, mid, lo)
        hi = np.where(d < 0, hi, mid)
    z = 0.5 * (lo + hi)
    ok = hit & (z > 0.0)
    # on coupe à l'encolure : là où la surface plonge (ouverture du col)
    P = np.stack([x, ys, z], 1)[ok]
    dz = np.diff(P[:, 2])
    top = len(P)
    jump = np.nonzero(dz < -0.010)[0]
    if len(jump):
        top = jump[0] + 1
    P = P[:top]
    # lissage
    k = 15
    ker = np.ones(k) / k
    for i in (1, 2):
        pad = np.pad(P[:, i], (k // 2, k // 2), mode="edge")
        P[:, i] = np.convolve(pad, ker, mode="valid")
    Nn = H.grad(P)
    Nn[:, 0] = 0
    Nn /= np.linalg.norm(Nn, axis=1, keepdims=True)
    T = np.gradient(P, axis=0)
    T /= np.linalg.norm(T, axis=1, keepdims=True)
    s = np.concatenate([[0], np.cumsum(np.linalg.norm(np.diff(P, axis=0), axis=1))])
    return P, Nn, T, s


def box_mesh(center, ex, ey, ez, size):
    """Boîte orientée : axes ex, ey, ez (unitaires), demi-tailles size."""
    signs = np.array([[i, j, k] for i in (-1, 1) for j in (-1, 1) for k in (-1, 1)], np.float32)
    V = center + (signs[:, 0:1] * size[0]) * ex + (signs[:, 1:2] * size[1]) * ey + (signs[:, 2:3] * size[2]) * ez
    F = np.array([[0, 1, 3], [0, 3, 2], [4, 6, 7], [4, 7, 5], [0, 4, 5], [0, 5, 1],
                  [2, 3, 7], [2, 7, 6], [0, 2, 6], [0, 6, 4], [1, 5, 7], [1, 7, 3]])
    return V, F


def zip_teeth(P, Nn, T, s, stop):
    Vs, Fs, off = [], [], 0
    pitch = 0.0031
    k = 0
    for side in (-1, 1):
        for sv in np.arange(0.006 + (pitch / 2 if side > 0 else 0), stop, pitch):
            i = int(np.searchsorted(s, sv))
            if i >= len(P):
                break
            t, n = T[i], Nn[i]
            b = np.cross(t, n)
            b /= np.linalg.norm(b)
            c = P[i] + n * 0.0016 + b * side * 0.0011
            V, F = box_mesh(c, b, t, n, (0.0029, 0.0011, 0.0013))
            Vs.append(V)
            Fs.append(F + off)
            off += 8
            k += 1
    return np.concatenate(Vs), np.concatenate(Fs)


def local_sdf_mesh(fn, half, res, target=None):
    """Petit maillage SDF local (curseur, tirette)."""
    from skimage import measure
    n = np.ceil(2 * np.array(half) / res).astype(int) + 1
    g = [np.linspace(-h, h, k, dtype=np.float32) for h, k in zip(half, n)]
    X, Y, Z = np.meshgrid(*g, indexing="ij")
    vol = fn(X, Y, Z)
    sp = tuple(2 * h / (k - 1) for h, k in zip(half, n))
    V, F, _, _ = measure.marching_cubes(vol, 0.0, spacing=sp)
    V = V - np.array(half)
    if target and len(F) > target:
        import fast_simplification
        V, F = fast_simplification.simplify(V.astype(np.float32), F.astype(np.int32),
                                            target_reduction=1.0 - target / len(F))
    return V.astype(np.float32), F


def slider_sdf(x, y, z):
    # x : travers, y : le long du zip (vers le haut), z : normale
    body = sd_round_box(x, y, z, (0, 0, 0.0018), (0.0068, 0.0115, 0.0030), 0.0016)
    taper = sd_round_box(x, y, z, (0, -0.002, 0.0018), (0.0068 - 0.0022 * 0, 0.0115, 0.0030), 0.0016)
    lug = sd_round_box(x, y, z, (0, -0.002, 0.0055), (0.0022, 0.0060, 0.0016), 0.0010)
    return smin(np.maximum(body, taper), lug, 0.0015)


def puller_sdf(x, y, z):
    # tirette « Kyma » : goutte allongée façon crête de vague, gravée d'une ligne ondulée
    # y = 0 en haut (anneau), descend vers -0.040
    yy = -y
    w = 0.0042 + 0.0030 * smoothstep(0.004, 0.034, yy) - 0.0016 * smoothstep(0.034, 0.042, yy)
    sway = 0.0018 * np.sin(yy * 95.0)
    d2 = np.abs(x - sway * smoothstep(0.006, 0.03, yy)) - w
    dy = np.maximum(-yy - 0.0, yy - 0.041)
    d2 = np.sqrt(np.maximum(d2, 0) ** 2 + np.maximum(dy, 0) ** 2) + np.minimum(np.maximum(d2, dy), 0)
    th = 0.0016
    tab = np.sqrt(np.maximum(d2 + 0.0012, 0) ** 2 + np.maximum(np.abs(z) - th + 0.0012, 0) ** 2) \
        + np.minimum(np.maximum(d2 + 0.0012, np.abs(z) - th + 0.0012), 0) - 0.0012
    # anneau d'attache
    ring_c = np.sqrt(x * x + (y - 0.0005) ** 2) - 0.0028
    ring = np.sqrt(ring_c * ring_c + z * z) - 0.0011
    tab = np.maximum(tab, -(np.sqrt(x * x + (y + 0.0035) ** 2) - 0.0016) * 1.0)   # oeil
    # gravure : ligne de vague sur la face avant
    wave_y = -0.012 - 0.016 * smoothstep(-0.006, 0.006, x) + 0.0035 * np.sin(x * 900.0)
    groove = np.sqrt((y - wave_y) ** 2 + (z - th) ** 2) - 0.00055
    tab = smax(tab, -groove, 0.0004)
    return smin(tab, ring, 0.0008)


def hardware(H, P, Nn, T, s):
    top = s[-1]
    ts, tv = zip_teeth(P, Nn, T, s, top - 0.006)
    i = int(np.searchsorted(s, top - 0.028))
    t, n = T[i], Nn[i]
    b = np.cross(t, n)
    b /= np.linalg.norm(b)
    Ms = np.stack([b, t, n], 1)  # local -> monde
    sv, sf = local_sdf_mesh(slider_sdf, (0.010, 0.015, 0.010), 0.00035, 2500)
    sv = P[i] + n * 0.0014 + sv @ Ms.T
    # tirette : pend vers le bas, légèrement décollée du buste
    j = int(np.searchsorted(s, top - 0.031))
    tj, nj = T[j], Nn[j]
    ang = 0.22
    tt = tj * np.cos(ang) + nj * np.sin(ang)
    nn = nj * np.cos(ang) - tj * np.sin(ang)
    bb = np.cross(tt, nn)
    bb /= np.linalg.norm(bb)
    Mp = np.stack([bb, tt, nn], 1)
    pv, pf = local_sdf_mesh(puller_sdf, (0.010, 0.046, 0.004), 0.00030, 4000)
    pv = P[j] + nj * 0.0072 + pv @ Mp.T
    sil_v = np.concatenate([ts, sv])
    sil_f = np.concatenate([tv, sf + len(ts)])
    return (sil_v, sil_f), (pv, pf)


# --------------------------------------------------------------------------------------
# Écriture GLB (glTF 2.0, sans extension)
# --------------------------------------------------------------------------------------
class GLB:
    def __init__(self):
        self.bin = bytearray()
        self.g = {"asset": {"version": "2.0", "generator": "KYMA build_hoodie.py (procédural, SDF)"},
                  "scene": 0, "scenes": [{"nodes": [0]}], "nodes": [], "meshes": [], "materials": [],
                  "accessors": [], "bufferViews": [], "buffers": []}

    def view(self, data, target=None):
        while len(self.bin) % 4:
            self.bin.append(0)
        bv = {"buffer": 0, "byteOffset": len(self.bin), "byteLength": len(data)}
        if target:
            bv["target"] = target
        self.bin += data
        self.g["bufferViews"].append(bv)
        return len(self.g["bufferViews"]) - 1

    def accessor(self, arr, kind, target, minmax=False, normalized=False):
        arr = np.ascontiguousarray(arr)
        ct = {np.dtype(np.float32): 5126, np.dtype(np.uint16): 5123, np.dtype(np.uint32): 5125,
              np.dtype(np.uint8): 5121}[arr.dtype]
        bv = self.view(arr.tobytes(), target)
        acc = {"bufferView": bv, "componentType": ct, "count": int(arr.shape[0]), "type": kind}
        if normalized:
            acc["normalized"] = True
        if minmax:
            acc["min"] = [float(v) for v in arr.min(0)]
            acc["max"] = [float(v) for v in arr.max(0)]
        self.g["accessors"].append(acc)
        return len(self.g["accessors"]) - 1

    def primitive(self, V, N, F, material, UV=None):
        attrs = {"POSITION": self.accessor(V.astype(np.float32), "VEC3", 34962, minmax=True),
                 "NORMAL": self.accessor(N.astype(np.float32), "VEC3", 34962)}
        if UV is not None:
            attrs["TEXCOORD_0"] = self.accessor(UV.astype(np.float32), "VEC2", 34962)
        it = np.uint16 if len(V) < 65535 else np.uint32
        ind = self.accessor(F.astype(it).reshape(-1), "SCALAR", 34963)
        return {"attributes": attrs, "indices": ind, "material": material, "mode": 4}

    def image(self, img, quality=90):
        b = io.BytesIO()
        img.save(b, "JPEG", quality=quality, optimize=True, progressive=False, subsampling=0)
        bv = self.view(b.getvalue())
        self.g.setdefault("images", []).append({"bufferView": bv, "mimeType": "image/jpeg"})
        self.g.setdefault("samplers", []).append({"magFilter": 9729, "minFilter": 9987, "wrapS": 33071, "wrapT": 33071})
        self.g.setdefault("textures", []).append({"sampler": 0, "source": len(self.g["images"]) - 1})
        return len(self.g["textures"]) - 1

    def save(self, path):
        while len(self.bin) % 4:
            self.bin.append(0)
        self.g["buffers"] = [{"byteLength": len(self.bin)}]
        js = json.dumps(self.g, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
        while len(js) % 4:
            js += b" "
        total = 12 + 8 + len(js) + 8 + len(self.bin)
        with open(path, "wb") as f:
            f.write(struct.pack("<III", 0x46546C67, 2, total))
            f.write(struct.pack("<II", len(js), 0x4E4F534A))
            f.write(js)
            f.write(struct.pack("<II", len(self.bin), 0x004E4942))
            f.write(self.bin)


def mesh_normals(V, F):
    import trimesh
    return np.asarray(trimesh.Trimesh(V, F, process=False).vertex_normals, np.float32)


# --------------------------------------------------------------------------------------
def build_geometry(res, faces, tex, cache=None):
    if cache and os.path.exists(cache):
        z = np.load(cache, allow_pickle=True)
        return {k: z[k] for k in z.files}
    H = Hoodie()
    t0 = time.time()
    m = fabric_mesh(H, res, faces)
    V = np.asarray(m.vertices, np.float32)
    F = np.asarray(m.faces, np.int64)
    Ns = H.grad(V, eps=0.0015)
    Nm = mesh_normals(V, F)
    N = Ns * 0.6 + Nm * 0.4
    N /= np.linalg.norm(N, axis=1, keepdims=True)
    print(f"  tissu : {len(F)} triangles ({time.time() - t0:.0f} s)")
    vmap, idx, uv = unwrap(V, F.astype(np.uint32), tex)
    print(f"  UV : {len(vmap)} sommets ({time.time() - t0:.0f} s)")
    P, Nz, T, s = zip_curve(H)
    (sv, sf), (pv, pf) = hardware(H, P, Nz, T, s)
    out = dict(V=V[vmap], N=N[vmap], F=idx.astype(np.int64), UV=uv.astype(np.float32),
               sv=sv.astype(np.float32), sf=sf.astype(np.int64), pv=pv.astype(np.float32), pf=pf.astype(np.int64))
    if cache:
        np.savez(cache, **out)
    return out


def build(coloris, geo, tex, outdir):
    col = COLORIS[coloris]
    H = Hoodie()
    t0 = time.time()
    img = bake_texture(H, geo["V"], geo["N"], geo["UV"], geo["F"], col, tex)
    print(f"  texture {coloris} ({time.time() - t0:.0f} s)")
    g = GLB()
    g.g["materials"] = [
        {"name": f"KYMA French terry — {col['name']}", "pbrMetallicRoughness": {
            "baseColorTexture": {"index": 0}, "metallicFactor": 0.0, "roughnessFactor": 0.62}},
        {"name": "Zip métal argent brossé", "pbrMetallicRoughness": {
            "baseColorFactor": [0.80, 0.80, 0.82, 1.0], "metallicFactor": 1.0, "roughnessFactor": 0.34}},
        {"name": "Tirette Kyma laiton doré", "pbrMetallicRoughness": {
            "baseColorFactor": [0.86, 0.62, 0.30, 1.0], "metallicFactor": 1.0, "roughnessFactor": 0.28}},
    ]
    g.image(img, quality=88)
    prims = [g.primitive(geo["V"], geo["N"], geo["F"], 0, geo["UV"])]
    prims.append(g.primitive(geo["sv"], mesh_normals(geo["sv"], geo["sf"]), geo["sf"], 1))
    prims.append(g.primitive(geo["pv"], mesh_normals(geo["pv"], geo["pf"]), geo["pf"], 2))
    g.g["meshes"] = [{"name": "Ressac", "primitives": prims}]
    g.g["nodes"] = [{"name": f"KYMA Ressac — {col['name']} (visuel de présentation 3D)", "mesh": 0}]
    path = os.path.join(outdir, f"ressac-{coloris}.glb")
    g.save(path)
    ntri = sum(len(geo[k]) for k in ("F", "sf", "pf"))
    print(f"  -> {path} : {os.path.getsize(path) / 1e6:.2f} Mo, {ntri} triangles")
    return path


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--coloris", default="all", choices=list(COLORIS) + ["all"])
    ap.add_argument("--res", type=float, default=0.0028)
    ap.add_argument("--faces", type=int, default=82000)
    ap.add_argument("--tex", type=int, default=2048)
    ap.add_argument("--out", default=HERE)
    ap.add_argument("--cache", default=None, help="fichier .npz pour réutiliser la géométrie")
    a = ap.parse_args()
    geo = build_geometry(a.res, a.faces, a.tex, a.cache)
    for c in (COLORIS if a.coloris == "all" else [a.coloris]):
        build(c, geo, a.tex, a.out)


if __name__ == "__main__":
    main()
