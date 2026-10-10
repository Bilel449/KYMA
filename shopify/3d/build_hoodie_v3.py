#!/usr/bin/env python3
"""KYMA — hoodie zippé oversize « Ressac », modèle 3D v3 (panneaux de vêtement, drapé, matière).

Dérivé de build_hoodie_v2.py (le v2 reste intact). Même contrat de nœuds, de morph targets,
d'extras et de clip `ZipOpen` que le v2 : `kyma-pstory.js` charge le v3 sans changement.
Aucune image IA : géométrie, motif, maille, occlusion et tirette sont entièrement procéduraux.

Ce qui change par rapport au v2 (retour du fondateur : « vêtement Roblox / cube ») :
  * Silhouette : corps froncé dans le bord-côte et blousant au-dessus (plus de côtés droits),
    profondeur galbée, manches à coude doux (axe courbe, gauche et droite différentes),
    capuche détendue (sommet affaissé, ouverture en amande, plis de flanc).
  * Drapé : plis de gravité, plis d'aisselle, plis de compression au coude, tassement
    au-dessus du poignet, blousant et fronces à la taille — amplitudes 2 à 3 fois le v2.
  * Coutures en creux (épaules, emmanchures, côtés, ourlet, milieu de capuche) + surpiqûres ;
    poches biais à fente ouverte (passepoil en relief, fond d'ombre).
  * Bords-côtes 2×2 en relief marqué ; tranche du tissu visible (capuche double, 8 mm).
  * Occlusion ambiante cuite par lancer de rayons (COLOR_0) : creux des plis, intérieur
    de capuche, dessous de bras ; calculée fermé ET ouvert (l'intérieur reste clair ouvert).
  * Matière : normal map de jersey (endroit du french terry) et carte de rugosité en PNG
    tuilées (KHR_texture_transform), envers gratté (molleton) et doublure de capuche jersey
    séparés, reflet velouté du coton (KHR_materials_sheen) ; zip argent brossé, tirette
    laiton plaqué or brossé.

Construction (unités : mètres, Y vers le haut, face avant vers +Z, bas du bord-côte à y = 0) :
  * Corps : 3 panneaux comme un patronage réel (dos, demi-devant gauche, demi-devant droit).
  * Manches : loft de sections le long d'un axe courbe (épaule tombante, coude), raccord
    exact à l'emmanchure, resserrement froncé dans le poignet.
  * Capuche : 2 panneaux (couture milieu), rangées en arc de l'arête d'ouverture à la couture.
  * Bords-côtes 2×2 (taille, poignets) : profil plié (endroit, pli, envers), côtes en relief.
  * Articulation : morph targets `open`, `open_fold`, `unzip_1..4` ; `Zip_Slider` + `Zip_Pull`
    (tirette « Kyma », DM Serif Display en relief) ; extras `zipPath`, `zipPathQuat`,
    `sliderOpen`, `poi` ; clip d'animation `ZipOpen`.

Usage :
    python3 build_hoodie_v3.py --coloris all          # les 5 coloris -> ressac-v3-<coloris>.glb
    python3 build_hoodie_v3.py --coloris lilac-whirl --tex 2048 --textures textures-v3
Dépendances : numpy scipy pillow fonttools shapely mapbox_earcut trimesh
              (+ embreex conseillé : occlusion en ~30 s ; sans lui, repli plus lent sur trimesh).
Police de la tirette : --font (sinon @fontsource/dm-serif-display trouvé via NODE_PATH /
dossier courant, sinon DejaVu Serif du système).
"""
import argparse
import glob
import io
import json
import math
import os
import struct
import time

import numpy as np
from PIL import Image
from scipy import ndimage
from scipy.spatial import cKDTree

HERE = os.path.dirname(os.path.abspath(__file__))

# --------------------------------------------------------------------------------------
# Coloris (tech pack v3) : teinte A (fond), teinte B (volutes), doublure ton sur ton
# --------------------------------------------------------------------------------------
COLORIS = {
    "lilac-whirl":  {"name": "Lilac Whirl",  "a": "#E9D3C4", "b": "#C29CC4", "lining": "#EEE2D4", "seed": 11},
    "ivory-tide":   {"name": "Ivory Tide",   "a": "#EEE7DA", "b": "#D2C7B4", "lining": "#F4EFE6", "seed": 23},
    "silver-drift": {"name": "Silver Drift", "a": "#BDC6CD", "b": "#8D9399", "lining": "#E4E8EC", "seed": 37},
    "noir-absolu":  {"name": "Noir Absolu",  "a": "#1B1B1B", "b": "#2E333B", "lining": "#151515", "seed": 41},
    "crimson-flow": {"name": "Crimson Flow", "a": "#8A2620", "b": "#3F1411", "lining": "#2B0F0D", "seed": 53},
}

# --------------------------------------------------------------------------------------
# Gabarit (taille M, tech pack v3) — demi-mesures en 3D sur mannequin invisible
# --------------------------------------------------------------------------------------
Y0 = 0.060            # haut du bord-côte de taille (6 cm)
Y_SNP = 0.700         # point d'encolure côté (longueur dos 70 cm)
NW = 0.092            # demi-largeur d'encolure
DROP_F, DROP_B = 0.085, 0.022
ZN_F, ZN_B = 0.080, 0.068   # profondeur de l'anneau d'encolure devant / dos
Y_AP = 0.395          # dessous de bras (emmanchure profonde)
Y_SP = 0.612          # point d'épaule : ~4 cm plus bas qu'une coupe classique (épaule tombante)
W_HEM, W_CH, W_SH = 0.281, 0.270, 0.272
DF, DB = 0.110, 0.099   # demi-profondeurs devant / dos (v2 : 0,104 / 0,094)
ZA_F, ZA_B = 0.074, 0.070   # demi-profondeur d'emmanchure
XG = 0.0055           # demi-écart des lisières au milieu devant (sous le zip)
TH = 0.005            # épaisseur du molleton + doublure (5 mm)
TH_HOOD = 0.008       # v3 : capuche double épaisseur (molleton + jersey), tranche visible
ALPHA = math.radians(8.0)   # écart des manches (v2 : 9°)
PIVOT_X = 0.272       # axe d'ouverture (couture de côté)

POCKET = ((0.148, 0.300), (0.198, 0.128))   # haut, bas de la poche biais (côté gauche +X)


def smoothstep(a, b, x):
    t = np.clip((np.asarray(x, np.float64) - a) / (b - a), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def nrm(v, axis=-1):
    n = np.linalg.norm(v, axis=axis, keepdims=True)
    return v / np.maximum(n, 1e-12)


def hex_rgb(h):
    h = h.lstrip("#")
    return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], dtype=np.float64) / 255.0


def srgb_to_lin(c):
    c = np.asarray(c, dtype=np.float64)
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def lin_to_srgb(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * c ** (1 / 2.4) - 0.055)


# --------------------------------------------------------------------------------------
# Bruit de Perlin 3D vectorisé
# --------------------------------------------------------------------------------------
class Perlin:
    def __init__(self, seed):
        rng = np.random.default_rng(seed)
        p = rng.permutation(256)
        self.perm = np.concatenate([p, p, p]).astype(np.int64)
        g = rng.normal(size=(256, 3))
        self.grad = (g / np.linalg.norm(g, axis=1, keepdims=True)).astype(np.float64)

    def __call__(self, P):
        P = np.asarray(P, dtype=np.float64)
        Pf = np.floor(P)
        f = P - Pf
        Pi = Pf.astype(np.int64) & 255
        u = f * f * f * (f * (f * 6 - 15) + 10)
        X, Y, Z = Pi[:, 0], Pi[:, 1], Pi[:, 2]
        out = np.zeros(len(P))
        for dx in (0, 1):
            px = self.perm[X + dx]
            wx = u[:, 0] if dx else 1 - u[:, 0]
            for dy in (0, 1):
                py = self.perm[px + Y + dy]
                wy = u[:, 1] if dy else 1 - u[:, 1]
                for dz in (0, 1):
                    g = self.grad[self.perm[py + Z + dz] & 255]
                    n = g[:, 0] * (f[:, 0] - dx) + g[:, 1] * (f[:, 1] - dy) + g[:, 2] * (f[:, 2] - dz)
                    out += wx * wy * (u[:, 2] if dz else 1 - u[:, 2]) * n
        return out


def fbm(noise, P, octaves=4, lac=2.03, gain=0.5):
    a, b = 0.61, 0.83
    R = (np.array([[1, 0, 0], [0, math.cos(a), -math.sin(a)], [0, math.sin(a), math.cos(a)]]) @
         np.array([[math.cos(b), 0, math.sin(b)], [0, 1, 0], [-math.sin(b), 0, math.cos(b)]]))
    amp, tot, Q = 1.0, np.zeros(len(P)), np.asarray(P, np.float64)
    for _ in range(octaves):
        tot += amp * noise(Q)
        Q = (Q @ R.T) * lac + 17.3
        amp *= gain
    return tot


# --------------------------------------------------------------------------------------
# Outils de grilles (nappes paramétriques G[j, i] : j = rangée « v », i = colonne « u »)
# --------------------------------------------------------------------------------------
def grid_faces(nv, nu, flip=False):
    I, J = np.meshgrid(np.arange(nu - 1), np.arange(nv - 1))
    a = (J * nu + I).ravel()
    b, c = a + 1, a + nu
    d = c + 1
    F = np.concatenate([np.stack([a, b, d], 1), np.stack([a, d, c], 1)])
    return F[:, ::-1].copy() if flip else F


def resample_axis(G, n_out, axis, extra=None):
    """Rééchantillonne une grille (nv, nu, C) à abscisse curviligne 3D uniforme le long d'un axe.
    Les canaux 0..2 sont la position ; les autres canaux (paramètres) suivent."""
    if axis == 0:
        return resample_axis(G.transpose(1, 0, 2), n_out, 1).transpose(1, 0, 2)
    seg = np.linalg.norm(np.diff(G[:, :, :3], axis=1), axis=2)
    cum = np.concatenate([np.zeros((G.shape[0], 1)), np.cumsum(seg, 1)], 1)
    cum /= np.maximum(cum[:, -1:], 1e-12)
    tgt = np.linspace(0, 1, n_out)
    out = np.empty((G.shape[0], n_out, G.shape[2]))
    for r in range(G.shape[0]):
        for k in range(G.shape[2]):
            out[r, :, k] = np.interp(tgt, cum[r], G[r, :, k])
    return out


def grid_normals(G, flip=False):
    du = np.gradient(G, axis=1)
    dv = np.gradient(G, axis=0)
    n = np.cross(du, dv)
    if flip:
        n = -n
    return nrm(n)


def polyline_resample(P, n):
    seg = np.linalg.norm(np.diff(P, axis=0), axis=1)
    cum = np.concatenate([[0], np.cumsum(seg)])
    t = np.linspace(0, cum[-1], n)
    return np.stack([np.interp(t, cum, P[:, k]) for k in range(P.shape[1])], 1)


def catmull(P, n):
    """Spline de Catmull-Rom centripète passant par les points P, n échantillons."""
    P = np.asarray(P, np.float64)
    Q = np.concatenate([2 * P[:1] - P[1:2], P, 2 * P[-1:] - P[-2:-1]])
    out = []
    for i in range(1, len(Q) - 2):
        p0, p1, p2, p3 = Q[i - 1], Q[i], Q[i + 1], Q[i + 2]
        for t in np.linspace(0, 1, 24, endpoint=False):
            t2, t3 = t * t, t * t * t
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
                              (-p0 + 3 * p1 - 3 * p2 + p3) * t3))
    out.append(P[-1])
    return polyline_resample(np.array(out), n)


# --------------------------------------------------------------------------------------
# Corps : contours de patronage et profils de section
# --------------------------------------------------------------------------------------
W_HEM_IN = 0.270      # v3 : bas du corps froncé dans le bord-côte (plus de côtés droits)
W_BLOUSE = 0.278      # v3 : blousant au-dessus du bord-côte
Y_BL = 0.150          # hauteur du blousant maximal


def side_x(y):
    """Demi-largeur au côté. v3 : le bas est repris par le bord-côte (W_HEM_IN), le tissu
    blouse au-dessus (W_BLOUSE vers y = Y_BL), puis remonte vers la poitrine et l'emmanchure."""
    y = np.asarray(y, np.float64)
    t1 = np.clip((y - Y0) / (Y_BL - Y0), 0, 1)
    x1 = W_HEM_IN + (W_BLOUSE - W_HEM_IN) * np.sin(0.5 * np.pi * t1) ** 0.85
    t2 = np.clip((y - Y_BL) / (Y_AP - Y_BL), 0, 1)
    x2 = W_BLOUSE + (W_CH - W_BLOUSE) * t2 * t2 * (3 - 2 * t2)
    xs = np.where(y <= Y_BL, x1, x2)
    u = np.clip((y - Y_AP) / (Y_SP - Y_AP), 0, 1)
    xa = W_CH + (W_SH - W_CH) * u - 0.008 * np.sin(np.pi * u)
    return np.where(y <= Y_AP, xs, xa)


def depth_factor(y):
    """v3 : profondeur galbée (repris dans le bord-côte, blousant, poitrine)."""
    y = np.asarray(y, np.float64)
    t1 = np.clip((y - Y0) / (Y_BL - Y0), 0, 1)
    f1 = 0.94 + (1.02 - 0.94) * np.sin(0.5 * np.pi * t1) ** 0.8
    t2 = np.clip((y - Y_BL) / (Y_AP - Y_BL), 0, 1)
    f2 = 1.02 + (1.0 - 1.02) * t2 * t2 * (3 - 2 * t2)
    return np.where(y <= Y_BL, f1, f2)


def arm_e(y, back):
    ym, hh = 0.5 * (Y_AP + Y_SP), 0.5 * (Y_SP - Y_AP)
    q = np.clip(1 - ((np.asarray(y) - ym) / hh) ** 2, 0, 1)
    return (ZA_B if back else ZA_F) * q ** 0.5


def neck_point(gamma, back):
    """Anneau d'encolure, gamma = 0 au milieu (devant ou dos), pi/2 au point d'encolure côté."""
    x = NW * np.sin(gamma)
    if back:
        return x, Y_SNP - DROP_B * np.cos(gamma), -ZN_B * np.cos(gamma)
    return x, Y_SNP - DROP_F * np.cos(gamma), ZN_F * np.cos(gamma)


def top_curve(back, n=600):
    """Encolure (milieu -> point d'encolure) puis épaule (-> point d'épaule)."""
    x0 = 0.0 if back else XG
    g0 = math.asin(x0 / NW)
    g = np.linspace(g0, np.pi / 2, 200)
    xn, yn, zn = neck_point(g, back)
    xs = np.linspace(NW, W_SH, 300)[1:]
    ys = Y_SNP - (Y_SNP - Y_SP) * ((xs - NW) / (W_SH - NW)) ** 1.18
    X = np.concatenate([xn, xs])
    Y = np.concatenate([yn, ys])
    Z = np.concatenate([np.abs(zn), np.zeros_like(xs)])
    K = np.concatenate([np.ones_like(xn), np.zeros_like(xs)])   # 1 = encolure
    P = np.stack([X, Y, Z, K], 1)
    return polyline_resample(P, n)


def body_half(back, ns=260, nt=300, ns_out=48, nt_out=108):
    """Demi-panneau (x >= 0) : nappe de Coons (x, y) + profondeur z. Renvoie grille (nt, ns, C)
    avec canaux : x, y, z, s, t, dist_haut."""
    s = np.linspace(0, 1, ns)
    t = np.linspace(0, 1, nt)
    x0 = 0.0 if back else XG
    yl1 = Y_SNP - (DROP_B if back else DROP_F)
    TC = top_curve(back, ns)
    Tx, Ty, Tz, Tk = TC[:, 0], TC[:, 1], TC[:, 2], TC[:, 3]
    Lx, Ly = np.full(nt, x0), Y0 + t * (yl1 - Y0)
    Ry = Y0 + t * (Y_SP - Y0)
    Rx = side_x(Ry)
    Bx, By = x0 + s * (side_x(Y0) - x0), np.full(ns, Y0)
    S, Tt = np.meshgrid(s, t)
    def coons(Lc, Rc, Bc, Tc):
        return ((1 - Tt) * Bc[None, :] + Tt * Tc[None, :] + (1 - S) * Lc[:, None] + S * Rc[:, None]
                - ((1 - S) * (1 - Tt) * Bc[0] + S * (1 - Tt) * Bc[-1] + (1 - S) * Tt * Tc[0] + S * Tt * Tc[-1]))
    X = coons(Lx, Rx, Bx, Tx)
    Y = coons(Ly, Ry, By, Ty)
    # profondeur
    D = DB if back else DF
    xR = Rx[:, None] * np.ones_like(S)
    e = arm_e(Ry, back)[:, None] * np.ones_like(S)
    RS = 0.150            # v3 : arrondi de côté large (v2 : 9 cm, devant plat « boîte »)
    u = np.clip((X - (xR - RS)) / RS, 0, 1)
    pS = 2.0 - 0.75 * smoothstep(Y_AP - 0.01, Y_AP + 0.06, Ry)[:, None]
    rho_s = (1 - u ** pS) ** (1 / pS)
    z1 = e + (D - e) * rho_s
    z1 = e + (z1 - e) * (1 - 0.07 * np.clip(X / xR, 0, 1) ** 2)    # v3 : devant galbé
    RT = 0.065
    yT = Ty[None, :] * np.ones_like(S)
    zt = Tz[None, :] * np.ones_like(S)
    v = np.clip((Y - (yT - RT)) / RT, 0, 1)
    pT = 2.0 - 0.8 * Tk[None, :]
    rho_t = (1 - v ** pT) ** (1 / pT)
    Z = zt + (z1 - zt) * rho_t
    # léger galbe de poitrine / omoplates ; v3 : bas repris et blousant (depth_factor)
    Z = Z * (1 + 0.035 * np.exp(-((Y - 0.47) / 0.12) ** 2) * (1 - u))
    Z = Z * depth_factor(Y)
    G = np.stack([X, Y, Z, S, Tt], 2)
    G = resample_axis(G, ns_out, 1)
    G = resample_axis(G, nt_out, 0)
    if back:
        G[:, :, 2] *= -1
    return G


def mirror_x(G):
    H = G.copy()
    H[:, :, 0] *= -1
    return H


# --------------------------------------------------------------------------------------
# Manches
# --------------------------------------------------------------------------------------
SLV_C1 = np.array([0.337, 0.376, 0.004])
SLV_LEN = 0.345
SLV_D = np.array([math.sin(ALPHA), -math.cos(ALPHA), 0.0])
SLV_OUT = np.array([math.cos(ALPHA), math.sin(ALPHA), 0.0])
CUFF_LEN = 0.060
CUFF_R = 0.041
# v3 : coude doux, différent à gauche et à droite (pas de pose symétrique « mannequin »).
#   elbow = position du coude (fraction de SLV_LEN), bend = flexion vers l'avant,
#   inward = rentrée de l'avant-bras vers le corps, twist = rotation des sections (rad).
SLV_POSE = {1: {"elbow": 0.47, "bend": math.radians(17.0), "inward": math.radians(3.5), "twist": 0.10},
            -1: {"elbow": 0.50, "bend": math.radians(11.0), "inward": math.radians(1.5), "twist": -0.06}}


def _axis_table(pose, n=600):
    s = np.linspace(-0.6, 1.05, n) * SLV_LEN
    d1 = SLV_D
    # avant-bras : rotation de d1 vers +Z (flexion) puis vers l'intérieur (-X)
    cb, sb = math.cos(pose["bend"]), math.sin(pose["bend"])
    d2 = nrm(d1 * cb + np.array([0, 0, 1.0]) * sb)
    d2 = nrm(d2 - np.array([math.tan(pose["inward"]), 0.0, 0.0]) * abs(d2[1]))
    se = pose["elbow"] * SLV_LEN
    w = smoothstep(se - 0.055, se + 0.055, s)[:, None]
    D = nrm(d1[None] * (1 - w) + d2[None] * w)
    C = np.zeros((n, 3))
    i0 = np.argmin(np.abs(s))
    ds = np.diff(s)[:, None]
    seg = 0.5 * (D[1:] + D[:-1]) * ds
    cum = np.concatenate([np.zeros((1, 3)), np.cumsum(seg, 0)])
    C = SLV_C1[None] + cum - cum[i0][None]
    return s, C, D


_AXIS_CACHE = {}


def sleeve_axis(v, side=1):
    """Centre de section de la manche (v in [0,1] de la 1re section au poignet, v < 0 vers
    l'épaule). v3 : axe courbe (coude), propre à chaque côté (repère du côté gauche +X)."""
    if side not in _AXIS_CACHE:
        _AXIS_CACHE[side] = _axis_table(SLV_POSE[side])
    s, C, _ = _AXIS_CACHE[side]
    sv = np.asarray(v, np.float64) * SLV_LEN
    return np.stack([np.interp(sv, s, C[:, k]) for k in range(3)], 1)


def sleeve_dir(v, side=1):
    if side not in _AXIS_CACHE:
        _AXIS_CACHE[side] = _axis_table(SLV_POSE[side])
    s, _, D = _AXIS_CACHE[side]
    sv = np.asarray(v, np.float64) * SLV_LEN
    return nrm(np.stack([np.interp(sv, s, D[:, k]) for k in range(3)], 1))


def armhole_loop(Gf, Gb, n):
    """Boucle d'emmanchure : point d'épaule -> devant -> dessous de bras -> dos -> épaule.
    Gf/Gb : demi-grilles (x >= 0) devant et dos ; on prend la dernière colonne (côté)."""
    def edge(G):
        col = G[:, -1, :3]
        m = col[:, 1] >= Y_AP - 1e-9
        c = col[m]
        # point exact au dessous de bras
        k = np.argmax(m)
        if k > 0:
            a, b = col[k - 1], col[k]
            f = (Y_AP - a[1]) / (b[1] - a[1])
            c = np.concatenate([[a + f * (b - a)], c])
        return c          # du dessous de bras vers l'épaule
    ef = edge(Gf)[::-1]   # épaule -> dessous de bras
    eb = edge(Gb)         # dessous de bras -> épaule
    loop = np.concatenate([ef, eb[1:]])
    lf = np.sum(np.linalg.norm(np.diff(ef, axis=0), axis=1))
    lb = np.sum(np.linalg.norm(np.diff(eb, axis=0), axis=1))
    # paramètre phi : [0, pi] devant, [pi, 2pi] dos (proportionnel à l'abscisse sur chaque bord)
    def at(phi):
        phi = np.mod(phi, 2 * np.pi)
        out = np.empty((len(phi), 3))
        fr = phi <= np.pi
        out[fr] = polyline_at(ef, phi[fr] / np.pi)
        out[~fr] = polyline_at(eb, (phi[~fr] - np.pi) / np.pi)
        return out
    return at


def polyline_at(P, f):
    seg = np.linalg.norm(np.diff(P, axis=0), axis=1)
    cum = np.concatenate([[0], np.cumsum(seg)])
    cum /= cum[-1]
    return np.stack([np.interp(f, cum, P[:, k]) for k in range(3)], 1)


def sleeve_grid(Gf, Gb, nphi=60, nv=104, side=1):
    """Manche (repère du côté gauche +X ; la droite est construite avec sa pose puis miroir).
    Grille (nv, nphi+1, C) : x,y,z, phi, v. Couture sous le bras (phi = pi)."""
    pose = SLV_POSE[side]
    phi = np.pi + np.linspace(0, 2 * np.pi, nphi + 1)
    A = armhole_loop(Gf, Gb, nphi)(phi)
    # tangente sortante du corps au bord d'emmanchure
    def out_tan(G):
        col, prev = G[:, -1, :3], G[:, -3, :3]
        return col, nrm(col - prev)
    cf, tf = out_tan(Gf)
    cb, tb = out_tan(Gb)
    tree = cKDTree(np.concatenate([cf, cb]))
    TA = np.concatenate([tf, tb])[tree.query(A)[1]]
    wpit = np.exp(-((np.mod(phi, 2 * np.pi) - np.pi) / 0.9) ** 2)
    TA = nrm(TA * (1 - wpit[:, None]) + SLV_D[None] * wpit[:, None])

    def frame(T):
        O = nrm(SLV_OUT - np.dot(SLV_OUT, T) * T)
        Z = nrm(np.cross(T, O))
        return O, Z

    def ring(C, T, rx, rz, tw=0.0):
        O, Z = frame(T)
        c, s_ = np.cos(phi + tw), np.sin(phi + tw)
        # section légèrement aplatie côté corps (le bras pend contre le flanc)
        flat = 1.0 - 0.10 * np.clip(-np.cos(phi), 0, 1) ** 2
        return C[None] + (c * rx * flat)[:, None] * O[None] + (s_ * rz)[:, None] * Z[None]

    # 1re section
    rx1, rz1 = 0.077, 0.072
    R1 = ring(SLV_C1, SLV_D, rx1, rz1)
    n1 = 34
    rows = []
    b = np.linspace(0, 1, n1)[:-1]
    L = np.linalg.norm(R1 - A, axis=1)[:, None]
    m0 = TA * L * 0.97     # v3 : tête de manche un peu moins bombée (v2 : 1,05)
    m1 = SLV_D[None] * L * 1.0
    for bb in b:
        h00, h10, h01, h11 = 2 * bb ** 3 - 3 * bb ** 2 + 1, bb ** 3 - 2 * bb ** 2 + bb, -2 * bb ** 3 + 3 * bb ** 2, bb ** 3 - bb ** 2
        rows.append(np.concatenate([h00 * A + h10 * m0 + h01 * R1 + h11 * m1,
                                    np.stack([phi, np.full_like(phi, -1 + bb)], 1)], 1))
    # sections le long de l'axe courbe, jusqu'à l'entrée du poignet (froncé)
    n2 = 130
    vv = np.linspace(0, 1, n2)
    C = sleeve_axis(vv, side)
    D = sleeve_dir(vv, side)
    for k, v in enumerate(vv):
        g = smoothstep(0.90, 1.0, v)
        # haut de bras ample, avant-bras plus fin, blousant au-dessus du poignet
        rx = 0.077 - 0.013 * smoothstep(0.0, 0.80, v) + 0.008 * np.exp(-((v - 0.86) / 0.055) ** 2)
        rz = 0.072 - 0.010 * smoothstep(0.0, 0.80, v) + 0.008 * np.exp(-((v - 0.86) / 0.055) ** 2)
        # coude : léger gonflement à l'arrière (le tissu se tend sur le coude)
        rz += 0.004 * np.exp(-((v - pose["elbow"]) / 0.08) ** 2)
        rx = rx * (1 - g) + (CUFF_R + 0.002) * g
        rz = rz * (1 - g) + (CUFF_R + 0.002) * g
        tw = pose["twist"] * smoothstep(0.2, 1.0, v)
        rows.append(np.concatenate([ring(C[k], D[k], rx, rz, tw), np.stack([phi, np.full_like(phi, v)], 1)], 1))
    G = np.array(rows)
    G = resample_axis(G, nv, 0)
    return G


# --------------------------------------------------------------------------------------
# Capuche
# --------------------------------------------------------------------------------------
HC = np.array([0.0, 0.745, -0.042])
HR = np.array([0.143, 0.153, 0.140])


HP = 2.7   # exposant de superellipsoïde : flancs de capuche plus plats, base plus large


def r_ell(d):
    return np.sum(np.abs(d / HR[None]) ** HP, axis=1) ** (-1.0 / HP)


def slerp(a, b, f):
    a, b = nrm(a), nrm(b)
    dot = np.clip(np.sum(a * b, -1, keepdims=True), -1, 1)
    om = np.arccos(dot)
    so = np.sin(om)
    f = np.asarray(f)[..., None] if np.ndim(f) else f
    small = so < 1e-6
    w1 = np.where(small, 1 - f, np.sin((1 - f) * om) / np.where(small, 1, so))
    w2 = np.where(small, f, np.sin(f * om) / np.where(small, 1, so))
    return nrm(w1 * a + w2 * b)


def hood_grid(na=84, nb=52):
    """Capuche (2 panneaux) : rangée b (0 = encolure, 1 = sommet de l'ouverture F), colonne a
    (0 = arête d'ouverture droite, 0.5 = couture milieu, 1 = arête gauche)."""
    # arête d'ouverture (côté droit, -X), de l'encolure au front F
    xg0 = XG
    _, yn0, zn0 = neck_point(math.asin(xg0 / NW), False)
    ctrl = np.array([[-xg0, yn0, zn0], [-0.046, 0.650, 0.086], [-0.082, 0.705, 0.077],
                     [-0.104, 0.768, 0.058], [-0.096, 0.828, 0.038], [-0.056, 0.866, 0.022],
                     [0.0, 0.882, 0.016]])
    ER = catmull(ctrl, 400)
    # couture milieu : du milieu dos de l'encolure au front F, par l'arrière du crâne
    _, ynb, znb = neck_point(0.0, True)
    NB = np.array([0.0, ynb, znb])
    F = ER[-1]
    bN = math.atan2((NB - HC)[1], (NB - HC)[2]) % (2 * np.pi)
    bF = math.atan2((F - HC)[1], (F - HC)[2]) % (2 * np.pi)
    beta = np.linspace(bN, bF, 400)
    dQ = np.stack([np.zeros_like(beta), np.sin(beta), np.cos(beta)], 1)
    Q = HC[None] + r_ell(dQ)[:, None] * dQ
    w = smoothstep(0.0, 0.25, np.linspace(0, 1, 400))[:, None]
    Q = NB[None] * (1 - w) + Q * w
    Q[-1] = F
    b = np.linspace(0, 1, nb)
    bE = b ** 1.0
    E_R = polyline_at(ER, bE)
    Qb = polyline_at(polyline_resample(Q, 400), b)
    # points de côté (le plus large) : de l'encolure côté au front
    _, yns, zns = neck_point(np.pi / 2, False)
    NS = np.array([-NW, yns, 0.0])
    dS0 = nrm(NS - HC)
    dSm = nrm(np.array([-1.0, 0.0, -0.18]))
    dF = nrm(F - HC)
    dS = np.where((b < 0.5)[:, None], slerp(np.repeat(dS0[None], nb, 0), np.repeat(dSm[None], nb, 0), np.clip(2 * b, 0, 1)),
                  slerp(np.repeat(dSm[None], nb, 0), np.repeat(dF[None], nb, 0), np.clip(2 * b - 1, 0, 1)))
    RS0 = np.linalg.norm(NS - HC)
    S_R = HC[None] + dS * (r_ell(dS) * smoothstep(0, 0.16, b) + RS0 * (1 - smoothstep(0, 0.16, b)))[:, None]
    S_R[-1] = F
    # anneau d'encolure complet (a in [0, 1])
    a = np.linspace(0, 1, na)
    g0 = math.asin(xg0 / NW)
    gam = g0 + (np.pi - g0) * np.clip(np.where(a <= 0.5, a, 1 - a) / 0.5, 0, 1)
    xn_f, yn_f, zn_f = neck_point(gam, False)
    xn_b, yn_b, zn_b = neck_point(gam, True)
    front = gam <= np.pi / 2
    # gam > pi/2 : arrière, utiliser le dos avec gamma' = pi - gam
    xb2, yb2, zb2 = neck_point(np.pi - gam, True)
    NX = np.where(front, xn_f, xb2) * np.where(a <= 0.5, -1, 1)
    NY = np.where(front, yn_f, yb2)
    NZ = np.where(front, zn_f, zb2)
    N = np.stack([NX, NY, NZ], 1)
    rows = []
    for j in range(nb):
        P1 = E_R[j]
        P2 = S_R[j]
        P3 = Qb[j]
        P4 = S_R[j] * np.array([-1, 1, 1])
        P5 = E_R[j] * np.array([-1, 1, 1])
        anchors = [P1, P2, P3, P4, P5]
        row = np.empty((na, 3))
        for k in range(na):
            seg = min(int(a[k] * 4), 3)
            f = a[k] * 4 - seg
            p, q = anchors[seg], anchors[seg + 1]
            dp, dq = nrm(p - HC), nrm(q - HC)
            d = slerp(dp[None], dq[None], f)[0]
            rp, rq = np.linalg.norm(p - HC), np.linalg.norm(q - HC)
            ep, eq = r_ell(dp[None])[0], r_ell(dq[None])[0]
            R = (1 - f) * rp + f * rq + (r_ell(d[None])[0] - ((1 - f) * ep + f * eq))
            row[k] = HC + R * d
        rows.append(row)
    G = np.array(rows)
    # correction exacte à l'encolure, s'estompant vers le haut
    corr = N - G[0]
    G += corr[None] * ((1 - b) ** 3)[:, None, None]
    A_, B_ = np.meshgrid(a, b)
    G = np.concatenate([G, A_[..., None], B_[..., None]], 2)
    G = resample_axis(G, na, 1)
    G = resample_axis(G, nb, 0)
    return G


# --------------------------------------------------------------------------------------
# Maillages : normales, coques épaisses, lisières
# --------------------------------------------------------------------------------------
def vertex_normals(V, F):
    fn = np.cross(V[F[:, 1]] - V[F[:, 0]], V[F[:, 2]] - V[F[:, 0]])
    N = np.zeros_like(V)
    for k in range(3):
        np.add.at(N, F[:, k], fn)
    ln = np.linalg.norm(N, axis=1, keepdims=True)
    bad = ln[:, 0] < 1e-14
    N = N / np.maximum(ln, 1e-14)
    N[bad] = (0, 1, 0)
    return N


def arc_coords(G):
    """Abscisses cumulées le long des rangées (ulen) et des colonnes (vlen), en mètres."""
    du = np.linalg.norm(np.diff(G[:, :, :3], axis=1), axis=2)
    dv = np.linalg.norm(np.diff(G[:, :, :3], axis=0), axis=2)
    ulen = np.concatenate([np.zeros((G.shape[0], 1)), np.cumsum(du, 1)], 1)
    vlen = np.concatenate([np.zeros((1, G.shape[1])), np.cumsum(dv, 0)], 0)
    return ulen, vlen


def sub_idx(n, k=2):
    return np.unique(np.r_[0:n:k, n - 1])


class Mesh:
    """Primitive : V, F, N, UV0 (atlas ou None), UV1 (coordonnées de maille, mètres)."""
    def __init__(self, V, F, material, UV0=None, UV1=None, N=None):
        self.V = np.asarray(V, np.float64)
        self.F = np.asarray(F, np.int64)
        self.material = material
        self.UV0 = UV0
        self.UV1 = UV1
        self.N = vertex_normals(self.V, self.F) if N is None else N

    @staticmethod
    def merge(ms, material=None):
        V, F, U0, U1, off = [], [], [], [], 0
        for m in ms:
            V.append(m.V)
            F.append(m.F + off)
            off += len(m.V)
            U0.append(m.UV0 if m.UV0 is not None else np.zeros((len(m.V), 2)))
            U1.append(m.UV1 if m.UV1 is not None else np.zeros((len(m.V), 2)))
        out = Mesh(np.concatenate(V), np.concatenate(F), material or ms[0].material,
                   np.concatenate(U0) if any(m.UV0 is not None for m in ms) else None,
                   np.concatenate(U1))
        out.N = np.concatenate([m.N for m in ms])
        return out


def shell_from_grid(G, out_ref, uv0, uv1, closed_u=False, lining_step=2, rims=("l", "r", "b", "t"),
                    th=TH, fabric="fabric", lining="lining", apex=False):
    """Coque épaisse à partir d'une nappe extérieure G (nv, nu, 3).
    out_ref : fonction(P) -> direction extérieure approximative (pour orienter).
    Renvoie (outer Mesh [+ lisières], inner Mesh)."""
    nv, nu = G.shape[:2]
    V = G.reshape(-1, 3)
    F = grid_faces(nv, nu)
    N = vertex_normals(V, F)
    if np.mean(np.sum(N * out_ref(V), 1)) < 0:
        F = F[:, ::-1].copy()
        N = -N
    if closed_u:   # normales continues sur la couture de la grille
        Ng = N.reshape(nv, nu, 3)
        avg = nrm(Ng[:, 0] + Ng[:, -1])
        Ng[:, 0] = avg
        Ng[:, -1] = avg
        N = Ng.reshape(-1, 3)
    if apex:
        # v3 : pointe de capuche (rangées qui se referment en un point) — normale commune,
        # sinon l'envers des deux arêtes se croise et la lisière fait un « X »
        Ng = N.reshape(nv, nu, 3)
        rowlen = np.linalg.norm(np.diff(G, axis=1), axis=2).sum(1)
        w = smoothstep(0.10, 0.03, rowlen)
        avg = nrm(Ng.mean(1))
        Ng[:] = nrm(Ng * (1 - w)[:, None, None] + avg[:, None, :] * w[:, None, None])
        N = Ng.reshape(-1, 3)
        th_rows = th * (1 - smoothstep(0.045, 0.012, rowlen))     # la pointe se referme
    else:
        th_rows = np.full(nv, th)
    outer = Mesh(V, F, fabric, uv0.reshape(-1, 2), uv1.reshape(-1, 2), N)
    # envers (sous-échantillonné)
    jj, ii = sub_idx(nv, lining_step), sub_idx(nu, lining_step)
    Gi = (G - th_rows[:, None, None] * N.reshape(nv, nu, 3))[np.ix_(jj, ii)]
    Fi = grid_faces(len(jj), len(ii))
    Vi = Gi.reshape(-1, 3)
    Ni = vertex_normals(Vi, Fi)
    if np.mean(np.sum(Ni * out_ref(Vi), 1)) > 0:
        Fi = Fi[:, ::-1].copy()
        Ni = -Ni
    if apex:   # pointe : l'envers s'arrête où l'épaisseur s'annule (sinon il perce l'endroit)
        rowi = Fi.max(1) // len(ii)
        Fi = Fi[rowlen[jj][rowi] > 0.08]
    U1i = uv1[np.ix_(jj, ii)].reshape(-1, 2)
    inner = Mesh(Vi, Fi, lining, None, U1i, Ni)
    # lisières (bord roulé) : rangée extérieure -> milieu bombé -> rangée intérieure
    rim_meshes = []
    Gn = N.reshape(nv, nu, 3)
    def rim(o_idx, i_idx, outward):
        # o_idx : (k,) indices (j, i) dans la grille fine ; i_idx : idem grille de l'envers
        P0 = G[o_idx[0], o_idx[1]]
        n0 = Gn[o_idx[0], o_idx[1]]
        P2 = Gi[i_idx[0], i_idx[1]]
        # rééchantillonner P2 sur la longueur de P0
        f = np.linspace(0, 1, len(P0))
        g = np.linspace(0, 1, len(P2))
        P2 = np.stack([np.interp(f, g, P2[:, k]) for k in range(3)], 1)
        sc = (th_rows / th)[o_idx[0]][:, None]            # 0 à la pointe de capuche
        P1 = 0.5 * (P0 + P2) + outward * th * 0.62 * sc
        Vr = np.concatenate([P0, P1, P2])
        Fr = grid_faces(3, len(P0))
        uvr = np.tile(uv0[o_idx[0], o_idx[1]], (3, 1))
        u1r = np.tile(uv1[o_idx[0], o_idx[1]], (3, 1))
        m = Mesh(Vr, Fr, fabric, uvr, u1r)
        cen = np.concatenate([P1 + outward * 0.01])
        if np.mean(np.sum(m.N[len(P0):2 * len(P0)] * outward, 1)) < 0:
            m.F = m.F[:, ::-1].copy()
            m.N = -m.N
        rim_meshes.append(m)
    J, I = np.arange(nv), np.arange(nu)
    def tang(a, b):
        # v3 : aux sommets dégénérés (pointe de la capuche, où les deux arêtes se rejoignent)
        # la direction est nulle ; on reprend la plus proche valide (sinon la lisière fait un rabat)
        v = a - b
        ln = np.linalg.norm(v, axis=1)
        ok = ln > 0.25 * np.median(ln)
        if not ok.all() and ok.any():
            idx = np.where(ok)[0]
            near = idx[np.abs(np.arange(len(v))[:, None] - idx[None]).argmin(1)]
            v = v[near]
        return nrm(v)
    if "l" in rims and not closed_u:
        rim((J, np.zeros(nv, int)), (np.arange(len(jj)), np.zeros(len(jj), int)), tang(G[:, 0], G[:, 2]))
    if "r" in rims and not closed_u:
        rim((J, np.full(nv, nu - 1)), (np.arange(len(jj)), np.full(len(jj), len(ii) - 1)), tang(G[:, -1], G[:, -3]))
    if "b" in rims:
        rim((np.zeros(nu, int), I), (np.zeros(len(ii), int), np.arange(len(ii))), tang(G[0], G[2]))
    if "t" in rims:
        rim((np.full(nu, nv - 1), I), (np.full(len(ii), len(jj) - 1), np.arange(len(ii))), tang(G[-1], G[-3]))
    if rim_meshes:
        outer = Mesh.merge([outer] + rim_meshes)
    return outer, inner


# --------------------------------------------------------------------------------------
# Drapé : déplacements le long de la normale
# --------------------------------------------------------------------------------------
NOISE = Perlin(7)


def fold_wave(ph):
    """Profil de pli asymétrique : crête large et arrondie, creux plus pincé (tissu réel)."""
    return np.sin(ph) + 0.32 * np.sin(2 * ph + 0.9)


def wrap_pi(a):
    return (a + np.pi) % (2 * np.pi) - np.pi


def body_disp(G):
    """Corps (x, y, z au repos). v3 : amplitudes 2 à 3 fois le v2.
    Plis de gravité (périodiques autour du corps : pas de fente au milieu dos), plis d'aisselle,
    blousant et plis horizontaux de taille, fronces dans le bord-côte, bosse des sacs de poche,
    coutures en creux (côtés, emmanchures, épaules, ourlet). Toutes les fonctions ne dépendent
    que de la position : deux panneaux voisins se déplacent pareil sur leur couture commune."""
    x, y, z = G[..., 0], G[..., 1], G[..., 2]
    P = G[..., :3].reshape(-1, 3)
    ax = np.abs(x)
    shape = x.shape
    th = np.arctan2(x, z)                       # 0 milieu devant, ±pi/2 côtés, ±pi milieu dos
    # bosses basse fréquence (le molleton n'est jamais tendu comme une coque)
    d = 0.0050 * fbm(NOISE, P * np.array([3.2, 1.8, 3.2]) + 41.0, 3).reshape(shape)
    # plis de gravité : ondes verticales larges, phase déformée par le bruit, plus fortes en bas
    warp = 2.2 * fbm(NOISE, P * np.array([2.4, 0.8, 2.4]) + 5.0, 2).reshape(shape)
    amp = 0.55 + 0.45 * fbm(NOISE, P * np.array([2.0, 1.0, 2.0]) + 61.0, 2).reshape(shape)
    gv = fold_wave(9 * th + warp) + 0.6 * np.sin(5 * th + 1.3 * warp + 1.0)
    d += 0.0085 * gv * amp * smoothstep(0.66, 0.28, y) * smoothstep(Y0 + 0.02, Y0 + 0.10, y)
    # petites rides secondaires (le molleton ondule partout, jamais lisse comme une coque)
    d += 0.0016 * fbm(NOISE, P * np.array([16.0, 7.0, 16.0]) + 77.0, 2).reshape(shape)
    # plis d'aisselle : diagonales du dessous de bras vers le bas et le milieu (devant et dos)
    px, py = ax - W_CH, y - Y_AP
    ang = math.radians(40)
    perp = px * math.sin(ang) - py * math.cos(ang)
    dist = np.sqrt(px ** 2 + py ** 2)
    ph = fbm(NOISE, P * 4.0 + 31.0, 2).reshape(shape)
    d += 0.0120 * fold_wave(2 * np.pi * perp / 0.066 + 2.0 * ph) * np.exp(-dist / 0.13) * smoothstep(0.0, 0.05, -py + 0.04)
    # blousant : plis horizontaux irréguliers au-dessus du bord-côte (ils se cassent, se relaient)
    hw = fbm(NOISE, P * np.array([3.0, 0.6, 3.0]) + 7.0, 2).reshape(shape)
    br = 0.45 + 0.55 * smoothstep(-0.35, 0.35, fbm(NOISE, P * np.array([5.0, 2.0, 5.0]) + 13.0, 2).reshape(shape))
    hz = fold_wave(2 * np.pi * (y - 0.09) / 0.052 + 2.8 * hw)
    d += 0.0034 * hz * br * np.exp(-((y - (Y0 + 0.075)) / 0.045) ** 2)
    d += 0.0030 * np.exp(-((y - (Y0 + 0.040)) / 0.030) ** 2)
    # fronces dans le bord-côte (le corps est plus large que la côte : il fronce)
    gw = 1.8 * fbm(NOISE, P * 6 + 3.0, 2).reshape(shape)
    d += 0.0042 * np.sin(36 * th + gw) * smoothstep(Y0 + 0.055, Y0 + 0.004, y)
    d -= 0.0035 * smoothstep(Y0 + 0.012, Y0, y)          # rentre dans la couture
    # sacs de poche : légère bosse sous la poche biais
    front = smoothstep(-0.01, 0.02, z)
    d += 0.0030 * np.exp(-((ax - 0.150) / 0.055) ** 2 - ((y - 0.205) / 0.070) ** 2) * front
    # atténuations : zip (milieu devant), emmanchure, encolure / épaules
    d *= 1 - front * smoothstep(0.040, 0.010, ax)
    arm = np.clip((side_x(y) - ax) / 0.035, 0, 1) * (y > Y_AP - 0.02) + (y <= Y_AP - 0.02)
    d *= np.where(y > Y_AP - 0.03, smoothstep(0, 1, arm), 1.0)
    ysh = np.where(ax < NW, Y_SNP, Y_SNP - (Y_SNP - Y_SP) * np.clip((ax - NW) / (W_SH - NW), 0, 1) ** 1.18)
    d *= smoothstep(0.0, 0.07, ysh - y)
    # coutures en creux (même valeur des deux côtés de chaque couture)
    top_sh = smoothstep(NW + 0.005, NW + 0.02, ax)
    s_side = np.exp(-(z / 0.007) ** 2) * smoothstep(0.18, 0.23, ax) * smoothstep(Y_AP + 0.012, Y_AP - 0.004, y)
    s_arm = np.exp(-((side_x(y) - ax) / 0.007) ** 2) * smoothstep(Y_AP - 0.012, Y_AP + 0.004, y)
    s_sh = np.exp(-((ysh - y) / 0.006) ** 2) * top_sh
    s_hem = np.exp(-((y - Y0) / 0.006) ** 2)
    d -= SEAM_DIP * np.maximum.reduce([s_side, s_arm, s_sh, s_hem])
    return d


SEAM_DIP = 0.0022     # creux des coutures (m)


def sleeve_disp(G):
    """Manche. v3 : drapé en spirale, plis d'aisselle, plis de compression au pli du coude
    (face avant, l'avant-bras fléchit vers l'avant), tassement en accordéon au-dessus du poignet,
    fronces dans le poignet, coutures en creux (emmanchure, dessous de bras)."""
    x, y, z = G[..., 0], G[..., 1], G[..., 2]
    phi, v = G[..., 3], G[..., 4]
    P = G[..., :3].reshape(-1, 3)
    shape = x.shape
    side = 1 if np.mean(x) > 0 else -1
    ve = SLV_POSE[side]["elbow"]
    _, vlen = arc_coords(G)
    d = 0.0045 * fbm(NOISE, P * np.array([5.0, 1.6, 5.0]) + 11.0, 3).reshape(shape)
    d += 0.0014 * fbm(NOISE, P * np.array([18.0, 8.0, 18.0]) + 71.0, 2).reshape(shape)
    ph = fbm(NOISE, P * 5.0 + 5.0, 2).reshape(shape)
    # drapé en spirale le long de la manche
    d += 0.0045 * fold_wave(3 * phi + 2 * np.pi * vlen / 0.30 + 2.0 * ph) * smoothstep(-0.6, 0.1, v) * smoothstep(0.95, 0.72, v)
    # plis d'aisselle (face interne, haut de manche)
    dp = wrap_pi(phi - np.pi)
    c40, s40 = math.cos(math.radians(40)), math.sin(math.radians(40))
    pit = np.exp(-(dp / 0.95) ** 2) * np.exp(-((v + 0.45) / 0.40) ** 2)
    d += 0.0080 * fold_wave(2 * np.pi * (vlen * c40 + dp * 0.08 * s40) / 0.055 + 1.5 * ph) * pit
    # pli du coude : arcs de compression sur la face avant
    face = (0.5 + 0.5 * np.cos(phi - np.pi / 2)) ** 1.5
    cc = vlen + 0.035 * np.cos(phi - np.pi / 2)
    d += 0.0100 * fold_wave(2 * np.pi * cc / 0.042 + 1.6 * ph) * np.exp(-((v - ve) / 0.13) ** 2) * face
    # tassement en accordéon au-dessus du poignet (manche longue sur un bras au repos)
    zig = 2.6 * np.sin(2 * phi + 1.5 * ph) + 1.2 * np.sin(3 * phi + 0.7)
    stack = fold_wave(2 * np.pi * vlen / 0.050 + zig + 2.0 * ph)
    amp = 0.6 + 0.4 * smoothstep(-0.3, 0.3, fbm(NOISE, P * 9.0 + 19.0, 2).reshape(shape))
    d += 0.0065 * stack * amp * smoothstep(0.62, 0.78, v) * smoothstep(0.975, 0.90, v)
    # fronces dans le poignet
    d += 0.0035 * np.sin(13 * phi + 3 * ph) * smoothstep(0.92, 0.985, v)
    # nul à l'emmanchure et à la jonction du poignet
    d *= smoothstep(-1.0, -0.72, v)
    d *= smoothstep(1.0, 0.985, v)
    # coutures en creux : emmanchure (même valeur que le corps) et dessous de bras
    s_arm = np.exp(-(vlen / 0.007) ** 2)
    s_under = np.exp(-((dp * 0.075) / 0.006) ** 2) * smoothstep(1.0, 0.97, v)
    d -= SEAM_DIP * np.maximum(s_arm, s_under)
    return d


def hood_relax(G):
    """v3 : capuche détendue (aucune tête dedans). Le sommet s'affaisse, le bord d'ouverture
    tombe vers l'avant et se resserre (ouverture en amande), légère rotation asymétrique.
    La rangée d'encolure (b = 0) ne bouge pas : elle est cousue au corps."""
    G = G.copy()
    a, b = G[..., 3], G[..., 4]
    P = G[..., :3]
    wb = smoothstep(0.04, 0.40, b)
    x, y, z = P[..., 0].copy(), P[..., 1].copy(), P[..., 2].copy()
    # sommet affaissé
    y = y - 3.2 * np.maximum(y - 0.770, 0) ** 2 * wb
    # bord d'ouverture : tombe vers l'avant et vers le bas, se resserre au milieu de la hauteur
    de = np.minimum(a, 1 - a)
    we = np.exp(-(de / 0.16) ** 2) * smoothstep(0.35, 1.0, b)
    z = z + 0.010 * we
    y = y - 0.016 * we * smoothstep(0.55, 1.0, b)
    x = x * (1 - 0.13 * np.exp(-(de / 0.20) ** 2) * np.sin(np.pi * np.clip(b, 0, 1)) ** 1.5 * wb)
    # arrière de la capuche : le poids la fait pencher un peu en arrière et vers le bas
    back = smoothstep(0.25, 0.5, 0.5 - np.abs(a - 0.5)) * wb
    z = z - 0.012 * back * smoothstep(0.3, 0.8, b)
    # légère rotation (asymétrie naturelle) autour d'un axe vertical passant par la nuque
    ang = math.radians(3.0) * wb
    cx, cz = 0.0, -0.06
    xr = cx + (x - cx) * np.cos(ang) + (z - cz) * np.sin(ang)
    zr = cz - (x - cx) * np.sin(ang) + (z - cz) * np.cos(ang)
    G[..., 0], G[..., 1], G[..., 2] = xr, y, zr
    return G


def hood_disp(G):
    """Capuche. v3 : plis de flanc (le tissu se creuse entre le bord et la couture milieu),
    creux au sommet de part et d'autre de la couture, tassement autour de la nuque."""
    P = G[..., :3].reshape(-1, 3)
    shape = G.shape[:2]
    a, b = G[..., 3], G[..., 4]
    ulen, _ = arc_coords(G)
    rowL = ulen[:, -1:]
    d = 0.0035 * fbm(NOISE, P * np.array([7.0, 3.0, 7.0]) + 21.0, 3).reshape(shape)
    win = smoothstep(0.12, 0.40, b) * smoothstep(1.0, 0.72, b)
    ac1 = 0.27 + 0.05 * (b - 0.5)
    ac2 = 0.745 - 0.04 * (b - 0.5)
    d -= 0.0120 * np.exp(-((a - ac1) / 0.045) ** 2) * win
    d -= 0.0095 * np.exp(-((a - ac2) / 0.050) ** 2) * win
    d += 0.0050 * np.exp(-((a - 0.36) / 0.05) ** 2) * win + 0.0045 * np.exp(-((a - 0.64) / 0.05) ** 2) * win
    # creux de part et d'autre de la couture au sommet
    d -= 0.0055 * (np.exp(-((a - 0.44) / 0.03) ** 2) + np.exp(-((a - 0.56) / 0.03) ** 2)) * smoothstep(0.55, 0.85, b)
    # couture milieu légèrement en relief
    ds = np.abs(ulen - rowL / 2)
    d += 0.0020 * np.exp(-(ds / 0.004) ** 2)
    # tassement à la base (plis horizontaux autour de la nuque)
    d += 0.0060 * fold_wave(2 * np.pi * b / 0.09 + 3 * fbm(NOISE, P * 5 + 2, 2).reshape(shape)) * np.exp(-((b - 0.15) / 0.08) ** 2)
    d *= smoothstep(0.0, 0.06, b)
    return d


def apply_disp(G, d, flip_ref):
    """Déplace G[..., :3] de d le long de la normale de nappe orientée vers l'extérieur."""
    nv, nu = G.shape[:2]
    V = G[..., :3].reshape(-1, 3)
    N = vertex_normals(V, grid_faces(nv, nu))
    if np.mean(np.sum(N * flip_ref(V), 1)) < 0:
        N = -N
    out = G.copy()
    out[..., :3] = (V + N * d.reshape(-1, 1)).reshape(nv, nu, 3)
    return out


# --------------------------------------------------------------------------------------
# Bords-côtes 2×2 (taille et poignets) : profil plié, côtes en relief
# --------------------------------------------------------------------------------------
RIB_P = 0.0110   # période d'une côte 2×2 (2 mailles endroit + 2 envers)
RIB_AMP = 0.0014  # v3 : relief des côtes (v2 : 0,85 mm), lisible à distance


def rib_profile(height, inset, depth=0.0056, r=0.0028):
    """Profil (o, h) : o = décalage radial (négatif vers l'intérieur), h = hauteur depuis le bas
    du bord-côte. Endroit (haut -> bas), pli, envers (bas -> haut). Renvoie aussi le côté (+1/-1)."""
    hb = r + 0.0008
    ho = np.array([height, height * 0.62, height * 0.28, hb])
    oo = -inset * (1 - ho / height) ** 0.9
    th = np.linspace(0, -np.pi, 6)[1:-1]
    oc = oo[-1] - r
    fo, fh = oc + r * np.cos(th), hb + r * np.sin(th)
    hi = np.array([hb, height * 0.40, height - 0.003])
    oi = -inset * (1 - hi / height) ** 0.9 - 2 * r
    o = np.concatenate([oo, fo, oi])
    h = np.concatenate([ho, fh, hi])
    side = np.concatenate([np.ones(4), np.zeros(4), -np.ones(3)])
    return o, h, side


def rib_wave(ulen):
    return np.tanh(2.2 * np.sin(2 * np.pi * ulen / RIB_P + np.pi / 4)) / np.tanh(2.2)


def hem_band(ring):
    """ring : (n, 3) bas du corps (y = Y0), de la lisière droite (milieu devant) à la gauche.
    Renvoie la grille (nprof, nu, 3) et ses coordonnées (ulen, h)."""
    ring = polyline_resample(ring, 400)
    ring = np.concatenate([ring[:1], ndimage.gaussian_filter1d(ring, 3, axis=0, mode="nearest")[1:-1], ring[-1:]])
    L = np.sum(np.linalg.norm(np.diff(ring, axis=0), axis=1))
    nu = 4 * int(round(L / RIB_P)) + 1
    R = polyline_resample(ring, nu)
    T = np.gradient(R, axis=0)
    nh = nrm(np.stack([T[:, 2], np.zeros(nu), -T[:, 0]], 1))
    if np.mean(np.sum(nh * np.stack([R[:, 0], np.zeros(nu), R[:, 2] + 0.005], 1), 1)) < 0:
        nh = -nh
    o, h, side = rib_profile(Y0, 0.0080)
    ulen = np.linspace(0, L, nu)
    rw = rib_wave(ulen)
    G = (R[None, :, :] * np.array([1, 0, 1])[None, None] + np.array([0, 1, 0])[None, None] * h[:, None, None]
         + nh[None] * (o[:, None] + RIB_AMP * side[:, None] * rw[None, :])[:, :, None])
    return G, ulen, h


def cuff_band(ring, axis_dir):
    """Poignet : ring = dernière section de manche (fermée, n+1 points), axis_dir = sens du bras."""
    C = ring[:-1].mean(0)
    L = np.sum(np.linalg.norm(np.diff(ring, axis=0), axis=1))
    nu = 4 * int(round(L / RIB_P))
    R = polyline_resample(ring, nu + 1)
    R[-1] = R[0]
    d = nrm(axis_dir)
    radial = R - C[None]
    radial -= np.sum(radial * d[None], 1, keepdims=True) * d[None]
    rr = np.linalg.norm(radial, axis=1, keepdims=True)
    nh = radial / rr
    o, h, side = rib_profile(CUFF_LEN, 0.0050)
    ulen = np.linspace(0, L, nu + 1)
    rw = rib_wave(ulen)
    base = C[None] + nh * rr                    # anneau de départ
    # h : hauteur depuis l'extrémité du poignet ; le poignet descend le long de d
    G = (base[None] + d[None, None] * (CUFF_LEN - h)[:, None, None]
         + nh[None] * (o[:, None] + RIB_AMP * side[:, None] * rw[None, :])[:, :, None])
    return G, ulen, h


def band_mesh(G, uv0, uv1, closed, out_ref):
    nv, nu = G.shape[:2]
    V = G.reshape(-1, 3)
    F = grid_faces(nv, nu)
    N = vertex_normals(V, F)
    # orientation : la face endroit (rangée 1) doit regarder vers l'extérieur
    if np.mean(np.sum(N.reshape(nv, nu, 3)[1] * out_ref(G[1]), 1)) < 0:
        F = F[:, ::-1].copy()
        N = -N
    if closed:
        Ng = N.reshape(nv, nu, 3)
        avg = nrm(Ng[:, 0] + Ng[:, -1])
        Ng[:, 0] = avg
        Ng[:, -1] = avg
    m = Mesh(V, F, "fabric", uv0.reshape(-1, 2), uv1.reshape(-1, 2), N)
    if not closed:   # bouchons aux lisières du milieu devant
        caps = []
        for i in (0, nu - 1):
            P = G[:, i]
            c = P.mean(0)
            Vc = np.concatenate([[c], P])
            Fc = np.array([[0, k + 1, k + 2] for k in range(nv - 1)] + [[0, nv, 1]])
            mc = Mesh(Vc, Fc, "fabric", np.tile(uv0[0, i], (nv + 1, 1)), np.tile(uv1[0, i], (nv + 1, 1)))
            outward = nrm(G[1, i] - G[1, 1 if i == 0 else nu - 2])
            if np.mean(mc.N @ outward) < 0:
                mc.F = mc.F[:, ::-1].copy()
                mc.N = -mc.N
            caps.append(mc)
        m = Mesh.merge([m] + caps)
    return m


# --------------------------------------------------------------------------------------
# Zip : chemin, dents, rubans, butées ; curseur ; tirette « Kyma »
# --------------------------------------------------------------------------------------
def box(c, ex, ey, ez, hx, hy, hz, taper=1.0):
    """Pavé (8 sommets) centré c, axes ex/ey/ez ; taper < 1 rétrécit la face +x (tête de dent)."""
    V = []
    for sx in (-1, 1):
        k = taper if sx > 0 else 1.0
        for sy in (-1, 1):
            for sz in (-1, 1):
                V.append(c + sx * hx * ex + sy * hy * k * ey + sz * hz * k * ez)
    F = [[0, 1, 3], [0, 3, 2], [4, 6, 7], [4, 7, 5], [0, 4, 5], [0, 5, 1],
         [2, 3, 7], [2, 7, 6], [0, 2, 6], [0, 6, 4], [1, 5, 7], [1, 7, 3]]
    return np.array(V), np.array(F)


def frames_on_path(P):
    T = nrm(np.gradient(P, axis=0))          # vers le bas
    ey = -T
    ex = np.tile(np.array([1.0, 0, 0]), (len(P), 1))
    ez = nrm(np.cross(ex, ey))
    ex = nrm(np.cross(ey, ez))
    return ex, ey, ez


def zip_parts(path):
    """Dents, ruban et butées pour chaque côté (sigma = +1 gauche, -1 droite)."""
    seg = np.linalg.norm(np.diff(path, axis=0), axis=1)
    cum = np.concatenate([[0], np.cumsum(seg)])
    ex, ey, ez = frames_on_path(path)
    at = lambda s, A: np.stack([np.interp(s, cum, A[:, k]) for k in range(3)], 1)
    pitch = 0.0066
    out = {}
    for sg in (1, -1):
        s0 = 0.004 + (0 if sg > 0 else pitch / 2)
        ss = np.arange(s0, cum[-1] - 0.004, pitch)
        P, X, Y, Z = at(ss, path), nrm(at(ss, ex)), nrm(at(ss, ey)), nrm(at(ss, ez))
        TV, TF = [], []
        for k in range(len(ss)):
            c = P[k] + X[k] * sg * 0.0011
            v, f = box(c, X[k] * sg, Y[k], Z[k], 0.0028, 0.00195, 0.00120, taper=0.80)
            TF.append(f + len(TV) * 8)
            TV.append(v)
        V = np.concatenate(TV)
        F = np.concatenate(TF)
        # butées haut (et boîtier / goupille en bas)
        extra = [box(path[0] + ey[0] * -0.0045 + ex[0] * sg * 0.0040, ex[0] * sg, ey[0], ez[0], 0.0026, 0.0018, 0.0016)]
        pb = path[-1] + ey[-1] * 0.0055
        if sg < 0:
            extra.append(box(pb + ex[-1] * -0.0030, ex[-1], ey[-1], ez[-1], 0.0062, 0.0055, 0.0018))
        else:
            extra.append(box(pb + ex[-1] * 0.0030, ex[-1], ey[-1], ez[-1], 0.0040, 0.0060, 0.0014))
        for v, f in extra:
            F = np.concatenate([F, f + len(V)])
            V = np.concatenate([V, v])
        teeth = Mesh(V, F, "zip")
        # ruban : sous les dents, de 0.8 mm à 13.5 mm du milieu
        n = len(path)
        a = path + ex * sg * 0.0008 - ez * 0.0010
        b = path + ex * sg * 0.0088 - ez * 0.0012
        a2, b2 = a - ez * 0.0008, b - ez * 0.0008
        G = np.stack([a2, a, b, b2], 0)            # (4, n, 3) section fermée par les bouts
        V = G.reshape(-1, 3)
        F = grid_faces(4, n)
        F = np.concatenate([F, grid_faces(2, n)[:, ::-1] + 0])  # fond (a2 -> b2 repli)
        Fb = []
        for k in range(n - 1):
            Fb += [[3 * n + k, 3 * n + k + 1, k + 1], [3 * n + k, k + 1, k]]
        F = np.concatenate([grid_faces(4, n), np.array(Fb)])
        tape = Mesh(V, F, "tape")
        if np.mean(tape.N[n:2 * n] @ np.array([0, 0, 1.0])) < 0:
            tape.F = tape.F[:, ::-1].copy()
            tape.N = -tape.N
        out[sg] = (teeth, tape)
    return out


def loft_closed(sections, material):
    """sections : liste de (k, 3) boucles fermées -> tube bouché aux deux bouts."""
    S = np.array(sections)
    ns, k = S.shape[:2]
    G = np.concatenate([S, S[:, :1]], 1)
    V = G.reshape(-1, 3)
    F = grid_faces(ns, k + 1)
    caps = []
    for j, sgn in ((0, -1), (ns - 1, 1)):
        c = S[j].mean(0)
        base = len(V) + len(caps) * (k + 1)
        caps.append(np.concatenate([[c], S[j]]))
    Vc = np.concatenate([V] + caps)
    Fc = [F]
    for ci, j in enumerate((0, ns - 1)):
        base = len(V) + ci * (k + 1)
        f = np.array([[base, base + 1 + i, base + 1 + (i + 1) % k] for i in range(k)])
        Fc.append(f if ci == 1 else f[:, ::-1])
    m = Mesh(Vc, np.concatenate(Fc), material)
    c = S.reshape(-1, 3).mean(0)
    if np.mean(np.sum(m.N * (m.V - c), 1)) < 0:
        m.F = m.F[:, ::-1].copy()
        m.N = -m.N
    return m


def rounded_rect(w, t, n=16, p=4.0):
    a = np.linspace(0, 2 * np.pi, n, endpoint=False)
    c, s = np.cos(a), np.sin(a)
    return np.stack([w * np.sign(c) * np.abs(c) ** (2 / p), t * np.sign(s) * np.abs(s) ** (2 / p)], 1)


def slider_mesh():
    """Curseur dans son repère local : X en travers, Y vers le haut du zip, Z vers l'extérieur."""
    secs = []
    ys = np.linspace(0.0085, -0.0075, 12)
    for y in ys:
        f = (0.0085 - y) / 0.016
        w = 0.0060 - 0.0019 * f
        end = min((0.0085 - y) / 0.0015, (y + 0.0075) / 0.0015, 1.0)
        k = 0.6 + 0.4 * min(end, 1.0)
        rr = rounded_rect(w * k, 0.0024 * k)
        secs.append(np.stack([rr[:, 0], np.full(len(rr), y), rr[:, 1] + 0.0006], 1))
    body = loft_closed(secs, "zip")
    # pont (anse) où s'accroche la tirette
    t = np.linspace(0, np.pi, 14)
    ctr = np.stack([np.zeros_like(t), 0.0005 + 0.0042 * np.cos(t), 0.0030 + 0.0026 * np.sin(t)], 1)
    T = nrm(np.gradient(ctr, axis=0))
    secs = []
    for k in range(len(t)):
        u = np.array([1.0, 0, 0])
        v = nrm(np.cross(T[k], u))
        a = np.linspace(0, 2 * np.pi, 8, endpoint=False)
        secs.append(ctr[k] + 0.00085 * (np.cos(a)[:, None] * u + np.sin(a)[:, None] * v))
    lug = loft_closed(secs, "zip")
    return Mesh.merge([body, lug]), np.array([0.0, 0.0005 - 0.0042, 0.0030])


def find_font(path=None):
    cands = [path] if path else []
    roots = [os.getcwd(), HERE] + os.environ.get("NODE_PATH", "").split(os.pathsep)
    for r in roots:
        if r:
            cands += glob.glob(os.path.join(r, "**/dm-serif-display-latin-400-normal.woff"), recursive=True)
    cands += ["/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"]
    for c in cands:
        if c and os.path.exists(c):
            return c
    raise SystemExit("police introuvable : passer --font")


def text_polygons(text, font_path, tol=0.004):
    """Contours des glyphes (unités em) -> MultiPolygon shapely (trous gérés pair-impair)."""
    from fontTools.ttLib import TTFont
    from fontTools.pens.basePen import BasePen
    from shapely.geometry import Polygon
    from shapely.ops import unary_union
    font = TTFont(font_path)
    gs = font.getGlyphSet()
    cmap = font.getBestCmap()
    upm = font["head"].unitsPerEm

    class Flat(BasePen):
        def __init__(self, gs):
            super().__init__(gs)
            self.contours, self.cur = [], []
        def _moveTo(self, p):
            self.cur = [p]
        def _lineTo(self, p):
            self.cur.append(p)
        def _curveToOne(self, p1, p2, p3):
            p0 = self.cur[-1]
            for t in np.linspace(0, 1, 9)[1:]:
                a = (1 - t) ** 3; b = 3 * (1 - t) ** 2 * t; c = 3 * (1 - t) * t * t; d = t ** 3
                self.cur.append((a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]))
        def _qCurveToOne(self, p1, p2):
            p0 = self.cur[-1]
            for t in np.linspace(0, 1, 7)[1:]:
                a = (1 - t) ** 2; b = 2 * (1 - t) * t; c = t * t
                self.cur.append((a * p0[0] + b * p1[0] + c * p2[0], a * p0[1] + b * p1[1] + c * p2[1]))
        def _closePath(self):
            if len(self.cur) > 2:
                self.contours.append(self.cur)
            self.cur = []
        _endPath = _closePath

    x = 0.0
    shapes = []
    hmtx = font["hmtx"]
    for ch in text:
        gname = cmap[ord(ch)]
        pen = Flat(gs)
        gs[gname].draw(pen)
        geom = None
        for c in pen.contours:
            poly = Polygon([((px + x) / upm, py / upm) for px, py in c]).buffer(0)
            geom = poly if geom is None else geom.symmetric_difference(poly)
        if geom is not None:
            shapes.append(geom)
        x += hmtx[gname][0]
    return unary_union(shapes).simplify(tol * 0.05)


def extrude_polygons(geom, z0, z1, material):
    import mapbox_earcut as earcut
    polys = list(geom.geoms) if hasattr(geom, "geoms") else [geom]
    V, F = [], []
    def add(v, f):
        F.append(np.asarray(f) + sum(len(a) for a in V))
        V.append(np.asarray(v))
    for pg in polys:
        rings = [np.asarray(pg.exterior.coords)[:-1]] + [np.asarray(r.coords)[:-1] for r in pg.interiors]
        verts = np.concatenate(rings)
        ends = np.cumsum([len(r) for r in rings]).astype(np.uint32)
        tri = earcut.triangulate_float64(verts, ends).reshape(-1, 3)
        top = np.c_[verts, np.full(len(verts), z1)]
        bot = np.c_[verts, np.full(len(verts), z0)]
        add(top, tri)                     # face +z (orientation corrigée plus bas)
        add(bot, tri[:, ::-1])
        for r in rings:
            n = len(r)
            Vs = np.concatenate([np.c_[r, np.full(n, z0)], np.c_[r, np.full(n, z1)]])
            fs = []
            for i in range(n):
                j = (i + 1) % n
                fs += [[i, j, n + j], [i, n + j, n + i]]
            add(Vs, fs)
    m = Mesh(np.concatenate(V), np.concatenate(F), material)
    # orientation : chaque face doit pointer hors du solide (test par centre local)
    fc = m.V[m.F].mean(1)
    fn = np.cross(m.V[m.F[:, 1]] - m.V[m.F[:, 0]], m.V[m.F[:, 2]] - m.V[m.F[:, 0]])
    zc = 0.5 * (z0 + z1)
    from shapely.geometry import Point
    flip = np.zeros(len(m.F), bool)
    vert = np.abs(fn[:, 2]) > 0.5 * np.linalg.norm(fn, axis=1)
    flip[vert] = np.sign(fn[vert, 2]) != np.sign(fc[vert, 2] - zc)
    side = ~vert
    if side.any():
        probe = fc[side, :2] + 1e-5 * nrm(fn[side, :2])
        inside = np.array([geom.contains(Point(p)) for p in probe])
        flip[side] = inside
    m.F[flip] = m.F[flip][:, ::-1]
    m.N = vertex_normals(m.V, m.F)
    return m


def pull_mesh(font_path):
    """Tirette en laiton : plaque oblongue suspendue (axe -Y), anneau en tête, « Kyma » en relief.
    Repère local : origine = axe d'accroche ; plaque dans le plan XY, face avant +Z."""
    from shapely.geometry import Point, LineString
    from shapely import affinity
    w, L = 0.0052, 0.036
    plate = LineString([(0, -0.0045), (0, -L + w)]).buffer(w, quad_segs=10)
    plate = plate.union(Point(0, 0).buffer(0.0036, quad_segs=10)).difference(Point(0, 0).buffer(0.0014, quad_segs=10))
    t = 0.0008
    m_plate = extrude_polygons(plate, -t, t, "brass")
    txt = text_polygons("Kyma", font_path)
    minx, miny, maxx, maxy = txt.bounds
    # lecture de haut en bas : rotation -90°, mise à l'échelle sur la largeur utile
    txt = affinity.rotate(txt, 90, origin=(0, 0))
    minx, miny, maxx, maxy = txt.bounds
    sc = min(0.0074 / (maxx - minx), 0.024 / (maxy - miny))
    txt = affinity.scale(txt, sc, sc, origin=(0, 0))
    minx, miny, maxx, maxy = txt.bounds
    txt = affinity.translate(txt, -(minx + maxx) / 2, -0.0215 - (miny + maxy) / 2)
    m_txt = extrude_polygons(txt, t - 0.0001, t + 0.00055, "brass")
    # filet gravé en bordure (cadre en relief)
    frame = LineString([(0, -0.0068), (0, -L + w)]).buffer(w - 0.0006, quad_segs=10).difference(
        LineString([(0, -0.0068), (0, -L + w)]).buffer(w - 0.0011, quad_segs=10))
    m_fr = extrude_polygons(frame, t - 0.0001, t + 0.00035, "brass")
    return Mesh.merge([m_plate, m_txt, m_fr])


# --------------------------------------------------------------------------------------
# Motif KYMA Wave : marbrure à tourbillons (volutes) évaluée dans le volume au repos
# --------------------------------------------------------------------------------------
def make_vortices(surface_pts, seed, n=72):
    rng = np.random.default_rng(seed)
    idx = rng.choice(len(surface_pts), n, replace=False)
    C = surface_pts[idx]
    axis = nrm(np.stack([C[:, 0], np.zeros(n), C[:, 2] - np.where(C[:, 1] > 0.66, -0.06, 0.0)], 1) + 1e-6)
    R = rng.uniform(0.040, 0.095, n)
    A = rng.choice([-1, 1], n) * rng.uniform(2.6, 4.6, n)
    return C, axis, R, A


def kyma_wave(P, vort, seed):
    Q = np.asarray(P, np.float64).copy()
    C, AX, R, A = vort
    for c, k, r, a in zip(C, AX, R, A):
        d = Q - c
        w = np.exp(-np.sum(d * d, 1) / (r * r))
        th = a * w
        ct, st = np.cos(th)[:, None], np.sin(th)[:, None]
        kd = (d @ k)[:, None]
        Q = c + d * ct + np.cross(k[None], d) * st + k[None] * kd * (1 - ct)
    nz = Perlin(seed)
    flow = nrm(np.array([0.42, 0.88, 0.22]))
    f = Q @ flow + 0.055 * fbm(nz, Q * 3.2, 3)
    band = np.sin(2 * np.pi * f / 0.095)
    grain = 0.18 * fbm(nz, Q * 22.0 + 9.0, 2)
    m = smoothstep(-0.62, 0.62, band + grain)          # bords « aérographe »
    return m


# --------------------------------------------------------------------------------------
# Maille : normal map de molleton (jersey endroit), tuile répétable
# --------------------------------------------------------------------------------------
KNIT_TILE = 0.024   # m


def _height_to_normal(h, strength):
    gy, gx = np.gradient(np.pad(h, 1, mode="wrap"))
    gx, gy = gx[1:-1, 1:-1], gy[1:-1, 1:-1]
    N = nrm(np.stack([-gx * strength, gy * strength, np.ones_like(h)], 2))
    return Image.fromarray(((N * 0.5 + 0.5) * 255 + 0.5).astype(np.uint8))


def knit_height(n=512, wales=20, courses=24, seed=3):
    """Hauteur de l'endroit du french terry (jersey) : colonnes de mailles en V, chaque boucle
    légèrement différente (hauteur, décalage, inclinaison), fibres fines dans le sens du fil.
    Tuile répétable (bruit périodique), 24 mm de côté."""
    rng = np.random.default_rng(seed)
    u = (np.arange(n) + 0.5) / n
    U, V = np.meshgrid(u, u)
    cu, cv = U * wales, V * courses
    iu, iv = np.floor(cu).astype(int) % wales, np.floor(cv).astype(int) % courses
    fu, fv = cu - np.floor(cu), cv - np.floor(cv)
    jit = rng.normal(0, 1, (courses, wales, 4))
    hgt = 1.0 + 0.13 * jit[iv, iu, 0]
    dx = 0.035 * jit[iv, iu, 1]
    tilt = 0.06 * jit[iv, iu, 2]
    h = np.zeros_like(U)
    for sgn, cx in ((1, 0.29), (-1, 0.71)):        # deux jambes de la maille en V
        x = fu - cx - dx
        y = fv - 0.5
        a = sgn * 0.47 + tilt
        xr = x * np.cos(a) - y * np.sin(a)
        yr = x * np.sin(a) + y * np.cos(a)
        h = np.maximum(h, hgt * np.exp(-(xr / 0.165) ** 2 - (yr / 0.43) ** 2))
    # fibres : bruit fin étiré dans l'axe des jambes (périodique : filtrage en mode « wrap »)
    fib = ndimage.gaussian_filter(rng.normal(size=(n, n)), (2.2, 0.7), mode="wrap")
    fib2 = ndimage.gaussian_filter(rng.normal(size=(n, n)), 6, mode="wrap")
    h = h + 0.06 * fib / fib.std() + 0.05 * fib2 / fib2.std()
    return (h - h.min()) / (h.max() - h.min())


def knit_normal_tile(n=512):
    return _height_to_normal(knit_height(n), 2.6)


def knit_roughness_tile(n=256):
    """Rugosité (canal G de metallicRoughness, B = 0 : non métallique). Les creux entre les
    mailles sont plus mats que le dessus des boucles ; jamais en dessous de 0,74 : le coton
    ne brille pas."""
    h = np.asarray(Image.fromarray((knit_height(512) * 255).astype(np.uint8)).resize((n, n), Image.BILINEAR), np.float64) / 255
    rng = np.random.default_rng(9)
    nz = ndimage.gaussian_filter(rng.normal(size=(n, n)), 1.2, mode="wrap")
    r = 0.95 - 0.17 * h + 0.025 * nz / nz.std()
    r = np.clip(r, 0.74, 1.0)
    img = np.zeros((n, n, 3), np.uint8)
    img[..., 0] = 255
    img[..., 1] = (r * 255 + 0.5).astype(np.uint8)
    return Image.fromarray(img)


def fleece_normal_tile(n=256, seed=5):
    """Envers gratté (molleton brossé) : duvet de fibres, aucune structure de maille lisible."""
    rng = np.random.default_rng(seed)
    h = (ndimage.gaussian_filter(rng.normal(size=(n, n)), 1.0, mode="wrap") * 0.5
         + ndimage.gaussian_filter(rng.normal(size=(n, n)), 3.0, mode="wrap") * 2.0
         + ndimage.gaussian_filter(rng.normal(size=(n, n)), 9.0, mode="wrap") * 5.0)
    h = (h - h.min()) / (h.max() - h.min())
    return _height_to_normal(h, 1.3)


# --------------------------------------------------------------------------------------
# Occlusion ambiante cuite (v3) : lancer de rayons sur le maillage complet, par sommet
# --------------------------------------------------------------------------------------
def bake_ao(layout, nrays=64, rmax=0.30, eps=6e-4, verbose=True):
    """Occlusion par sommet (1 = dégagé). Calculée sur 3 états (fermé, ouvert, ouvert + revers) :
    on garde la valeur la plus claire, pour que l'intérieur reste lisible une fois ouvert
    tandis que l'intérieur de capuche, les dessous de bras et les creux de plis restent sombres.
    Résultat stocké dans m.AO (multiplicateur COLOR_0)."""
    import trimesh
    t0 = time.time()
    if not trimesh.ray.has_embree:
        nrays = min(nrays, 12)
        print("  (embreex absent : occlusion réduite à", nrays, "rayons par sommet — pip install embreex)")
    prims = [(nd, m) for nd in layout["nodes"] for m in nd["prims"]]
    ft = layout["fold_table"]
    no_ao = ("zip", "tape", "brass")          # métal et ruban : occultants, mais pas assombris
    def state_open(m, sg):
        return open_field(m.V, sg)
    def state_fold(m, sg):
        return open_field(fold_field(m.V, ft, sg), sg, rest=m.V)
    states = [None, state_open, state_fold]
    k = np.arange(nrays) + 0.5
    r = np.sqrt(k / nrays)
    ang = k * 2.399963229728653
    local = np.stack([r * np.cos(ang), r * np.sin(ang), np.sqrt(np.maximum(1 - r * r, 0))], 1)
    rng = np.random.default_rng(1)
    best = [np.zeros(len(m.V)) for _, m in prims]
    closed = [None] * len(prims)
    for st in states:
        Vs, Ns = [], []
        for nd, m in prims:
            if st is None or not nd["morphs"]:
                Vs.append(m.V)
                Ns.append(m.N)
            else:
                Vd = st(m, nd["sigma"])
                Vs.append(Vd)
                Ns.append(vertex_normals(Vd, m.F))
        offs = np.cumsum([0] + [len(v) for v in Vs])
        allV = np.concatenate(Vs)
        allF = np.concatenate([m.F + offs[i] for i, (_, m) in enumerate(prims)])
        tm = trimesh.Trimesh(allV, allF, process=False)
        N = nrm(np.concatenate(Ns))
        # repère tangent par sommet, motif tourné au hasard (pas de bandes)
        t1 = nrm(np.cross(N, np.where(np.abs(N[:, 1:2]) < 0.9, [[0, 1, 0]], [[1, 0, 0]])))
        t2 = np.cross(N, t1)
        rot = rng.uniform(0, 2 * np.pi, len(N))
        c, s_ = np.cos(rot)[:, None], np.sin(rot)[:, None]
        t1, t2 = t1 * c + t2 * s_, -t1 * s_ + t2 * c
        occ = np.zeros(len(allV))
        chunk = max(1, 600000 // nrays)
        for i0 in range(0, len(allV), chunk):
            sl = slice(i0, min(i0 + chunk, len(allV)))
            nv = sl.stop - sl.start
            D = (local[None, :, 0:1] * t1[sl, None] + local[None, :, 1:2] * t2[sl, None]
                 + local[None, :, 2:3] * N[sl, None]).reshape(-1, 3)
            O = np.repeat(allV[sl] + N[sl] * eps, nrays, 0)
            loc, iray, _ = tm.ray.intersects_location(O, D, multiple_hits=False)
            dist = np.linalg.norm(loc - O[iray], axis=1)
            w = np.clip(1 - dist / rmax, 0, 1) ** 0.7
            hit = np.zeros(len(O))
            hit[iray] = w
            occ[sl] = hit.reshape(nv, nrays).mean(1)
        ao = 1 - occ
        for i, (_, m) in enumerate(prims):
            best[i] = np.maximum(best[i], ao[offs[i]:offs[i + 1]])
            if st is None:
                closed[i] = ao[offs[i]:offs[i + 1]]
        if verbose:
            print(f"  occlusion : état {states.index(st) + 1}/3 ({time.time() - t0:.0f} s)")
    # lissage léger sur le maillage (le bruit des 64 rayons disparaît, les creux restent)
    for i, (_, m) in enumerate(prims):
        if m.material in no_ao:
            continue
        a = 0.7 * best[i] + 0.3 * closed[i]      # ouvert : intérieur lisible mais pas plat
        for _ in range(2):
            acc = np.zeros(len(a))
            cnt = np.zeros(len(a))
            for e in ((0, 1), (1, 2), (2, 0)):
                np.add.at(acc, m.F[:, e[0]], a[m.F[:, e[1]]])
                np.add.at(cnt, m.F[:, e[0]], 1)
            a = 0.5 * a + 0.5 * acc / np.maximum(cnt, 1)
        ex = {"hoodlining": 2.0, "lining": 1.4}.get(m.material, 1.15)   # intérieurs : plus d'ombre
        m.AO = np.clip(0.14 + 0.86 * a ** ex, 0, 1)


# --------------------------------------------------------------------------------------
# Atlas : un rectangle par nappe, densité de texels uniforme
# --------------------------------------------------------------------------------------
def pack_atlas(sizes, S, pad=6):
    """sizes : liste (largeur_m, hauteur_m). Renvoie (densité px/m, [(x0, y0, w, h)])."""
    lo, hi = 100.0, 20000.0
    best = None
    for _ in range(40):
        k = 0.5 * (lo + hi)
        rects, x, y, rowh, ok = [], pad, pad, 0, True
        order = np.argsort([-h for w, h in sizes])
        tmp = [None] * len(sizes)
        for i in order:
            w = max(8, int(sizes[i][0] * k))
            h = max(8, int(sizes[i][1] * k))
            if x + w + pad > S:
                x, y, rowh = pad, y + rowh + pad, 0
            if w + 2 * pad > S or y + h + pad > S:
                ok = False
                break
            tmp[i] = (x, y, w, h)
            x += w + pad
            rowh = max(rowh, h)
        if ok:
            best, lo = (k, tmp), k
        else:
            hi = k
    return best


def grid_uv(nv, nu, rect, S):
    x0, y0, w, h = rect
    i = np.arange(nu) / (nu - 1)
    j = np.arange(nv) / (nv - 1)
    I, J = np.meshgrid(i, j)
    return np.stack([(x0 + 0.5 + I * (w - 1)) / S, (y0 + 0.5 + J * (h - 1)) / S], 2)


def stitch(dist, along, at, width=0.00045, dash=0.0042):
    line = np.exp(-((dist - at) / width) ** 2)
    return line * smoothstep(-0.3, 0.3, np.sin(2 * np.pi * along / dash))


# --------------------------------------------------------------------------------------
# Ouverture : champs de déformation (morph targets)
# --------------------------------------------------------------------------------------
BETA = math.radians(36.0)
ZIP_TOP = None   # renseigné à l'assemblage
UNZIP_APEX = (0.25, 0.50, 0.75, 1.0)


def shoulder_y(ax):
    return np.where(ax < NW, Y_SNP, Y_SNP - (Y_SNP - Y_SP) * np.clip((ax - NW) / (W_SH - NW), 0, 1) ** 1.18)


def open_field(P, sigma=None, rest=None):
    """Position ouverte (open = 1) : chaque demi-devant pivote autour de la couture de côté,
    d'autant plus qu'on s'éloigne du côté et du haut de l'épaule (le tissu se plie, pas de trou).
    rest : positions au repos servant aux poids (si P est déjà déformé par le revers)."""
    P = np.asarray(P, np.float64)
    W = P if rest is None else np.asarray(rest, np.float64)
    x0, y0_, z0 = W[:, 0], W[:, 1], W[:, 2]
    x, y, z = P[:, 0], P[:, 1], P[:, 2]
    sg = np.sign(x0) if sigma is None else np.full(len(P), float(sigma))
    sg[sg == 0] = 1
    ax = sg * x0
    w = (smoothstep(PIVOT_X, PIVOT_X * 0.42, ax) * smoothstep(0.0, 0.20, shoulder_y(np.abs(x0)) - y0_)
         * smoothstep(-0.03, 0.02, z0))
    g = sg * BETA * w
    rx, rz = x - sg * PIVOT_X, z
    xo = rx * np.cos(g) + rz * np.sin(g)
    zo = -rx * np.sin(g) + rz * np.cos(g)
    # le bas s'ouvre un peu plus que l'encolure ; léger affaissement vers le bas
    out = P.copy()
    out[:, 0] = xo + sg * PIVOT_X
    out[:, 2] = zo
    out[:, 1] -= 0.006 * w * smoothstep(0.5, 0.1, y0_)
    return out


FOLD_W, FOLD_R, FOLD_MAX = 0.085, 0.020, math.radians(125)


def fold_field(P, zf_table, sigma=None):
    """Revers : la bande de 8,5 cm le long du zip s'enroule vers l'extérieur (doublure visible
    de face), pleinement sous la poitrine, nul à l'encolure. Appliqué AVANT open_field."""
    P = np.asarray(P, np.float64)
    x, y, z = P[:, 0], P[:, 1], P[:, 2]
    sg = np.sign(x) if sigma is None else np.full(len(P), float(sigma))
    sg[sg == 0] = 1
    xf = XG + FOLD_W
    s = xf - sg * x
    zf = np.interp(y, zf_table[0], zf_table[1])
    h = z - zf
    tm = FOLD_MAX * smoothstep(0.62, 0.42, y) * smoothstep(0.075, 0.24, y)
    act = (s > 0) & (z > -0.03)
    th = np.minimum(np.maximum(s, 0) / FOLD_R, tm)
    rest = np.maximum(s - FOLD_R * tm, 0)
    # repère : t vers le milieu devant (-sg x), nn = +z
    tx = -sg
    cx, cz = sg * xf, zf + FOLD_R
    r = FOLD_R - h
    px = cx + r * np.sin(th) * tx + rest * np.cos(th) * tx
    pz = cz - r * np.cos(th) + rest * np.sin(th)
    out = P.copy()
    out[act, 0] = px[act]
    out[act, 2] = pz[act]
    return out


def unzip_field(P, k, zip_top, zip_len, sigma=None):
    """V d'ouverture derrière le curseur : sommet du V à la fraction UNZIP_APEX[k] du zip."""
    P = np.asarray(P, np.float64)
    x, y, z = P[:, 0], P[:, 1], P[:, 2]
    sg = np.sign(x) if sigma is None else np.full(len(P), float(sigma))
    sg[sg == 0] = 1
    ya = zip_top - UNZIP_APEX[k] * zip_len
    g = 0.034 * np.clip((y - ya) / 0.24, 0, 1) ** 1.5
    w = smoothstep(0.13, 0.0, sg * x) * smoothstep(-0.03, 0.03, z) * smoothstep(0.0, 0.06, shoulder_y(np.abs(x)) - y + 0.03)
    out = P.copy()
    out[:, 0] += sg * g * w
    out[:, 2] += 0.25 * g * w
    return out


# --------------------------------------------------------------------------------------
# Écriture GLB (glTF 2.0 + KHR_mesh_quantization pour normales/UV, KHR_texture_transform)
# --------------------------------------------------------------------------------------
class GLB:
    def __init__(self):
        self.bin = bytearray()
        self.g = {"asset": {"version": "2.0", "generator": "KYMA build_hoodie_v3.py (panneaux procéduraux, drapé, occlusion cuite)"},
                  "extensionsUsed": ["KHR_mesh_quantization", "KHR_texture_transform"],
                  "extensionsRequired": ["KHR_mesh_quantization"],
                  "scene": 0, "scenes": [{"nodes": []}], "nodes": [], "meshes": [], "materials": [],
                  "accessors": [], "bufferViews": [], "buffers": [], "samplers": [], "images": [], "textures": []}

    def view(self, data, target=None, stride=None):
        while len(self.bin) % 4:
            self.bin.append(0)
        bv = {"buffer": 0, "byteOffset": len(self.bin), "byteLength": len(data)}
        if target:
            bv["target"] = target
        if stride:
            bv["byteStride"] = stride
        self.bin += data
        self.g["bufferViews"].append(bv)
        return len(self.g["bufferViews"]) - 1

    def acc(self, d):
        self.g["accessors"].append(d)
        return len(self.g["accessors"]) - 1

    def f32(self, arr, kind, target=34962, minmax=False):
        arr = np.ascontiguousarray(arr, np.float32)
        a = {"bufferView": self.view(arr.tobytes(), target), "componentType": 5126, "count": len(arr), "type": kind}
        if minmax:
            a["min"] = [float(v) for v in arr.min(0)]
            a["max"] = [float(v) for v in arr.max(0)]
        return self.acc(a)

    def normals_i8(self, N):
        q = np.clip(np.round(nrm(N) * 127), -127, 127).astype(np.int8)
        q4 = np.zeros((len(q), 4), np.int8)
        q4[:, :3] = q
        return self.acc({"bufferView": self.view(q4.tobytes(), 34962, 4), "componentType": 5120,
                         "normalized": True, "count": len(q), "type": "VEC3"})

    def color_u8(self, ao):
        """COLOR_0 (RGBA, octets normalisés) : occlusion cuite, multipliée à la couleur de base."""
        q = np.clip(np.round(np.asarray(ao) * 255), 0, 255).astype(np.uint8)
        c = np.stack([q, q, q, np.full_like(q, 255)], 1)
        return self.acc({"bufferView": self.view(c.tobytes(), 34962), "componentType": 5121,
                         "normalized": True, "count": len(c), "type": "VEC4"})

    def uv_u16(self, UV, scale=1.0):
        q = np.clip(np.round(np.asarray(UV) / scale * 65535), 0, 65535).astype(np.uint16)
        return self.acc({"bufferView": self.view(q.tobytes(), 34962), "componentType": 5123,
                         "normalized": True, "count": len(q), "type": "VEC2"})

    def indices(self, F, nverts):
        it, ct = (np.uint16, 5123) if nverts < 65535 else (np.uint32, 5125)
        a = np.ascontiguousarray(F, it).reshape(-1)
        return self.acc({"bufferView": self.view(a.tobytes(), 34963), "componentType": ct, "count": len(a), "type": "SCALAR"})

    def sparse(self, D, kind, quant_i8=False, minmax=False, quant_i16=False):
        """Accesseur de morph target creux (seuls les sommets déplacés sont stockés)."""
        D = np.asarray(D, np.float64)
        n = len(D)
        nz = np.nonzero(np.abs(D).max(1) > (1e-6 if not quant_i8 else 0.5 / 127))[0]
        a = {"count": n, "type": kind}
        if quant_i8:
            a.update({"componentType": 5120, "normalized": True})
        elif quant_i16:
            a.update({"componentType": 5122, "normalized": True})
        else:
            a["componentType"] = 5126
        if minmax:
            Dz = np.zeros_like(D, dtype=np.float32)
            if quant_i16:
                Dz[nz] = np.clip(np.round(D[nz] * 32767), -32767, 32767)
                a["min"] = [int(v) for v in Dz.min(0)]
                a["max"] = [int(v) for v in Dz.max(0)]
            else:
                Dz[nz] = D[nz].astype(np.float32)
                a["min"] = [float(v) for v in Dz.min(0)]
                a["max"] = [float(v) for v in Dz.max(0)]
        if len(nz):
            it, ct = (np.uint16, 5123) if n < 65535 else (np.uint32, 5125)
            iv = self.view(np.ascontiguousarray(nz, it).tobytes())
            if quant_i8:
                vals = np.clip(np.round(D[nz] * 127), -127, 127).astype(np.int8)
            elif quant_i16:
                vals = np.clip(np.round(D[nz] * 32767), -32767, 32767).astype(np.int16)
            else:
                vals = D[nz].astype(np.float32)
            vv = self.view(np.ascontiguousarray(vals).tobytes())
            a["sparse"] = {"count": int(len(nz)), "indices": {"bufferView": iv, "componentType": ct},
                           "values": {"bufferView": vv}}
        return self.acc(a)

    def image(self, img, mime="image/jpeg", quality=88):
        b = io.BytesIO()
        if mime == "image/jpeg":
            img.save(b, "JPEG", quality=quality, optimize=True, subsampling=0)
        else:
            img.save(b, "PNG", optimize=True)
        self.g["images"].append({"bufferView": self.view(b.getvalue()), "mimeType": mime})
        return len(self.g["images"]) - 1

    def texture(self, image, wrap):
        self.g["samplers"].append({"magFilter": 9729, "minFilter": 9987, "wrapS": wrap, "wrapT": wrap})
        self.g["textures"].append({"sampler": len(self.g["samplers"]) - 1, "source": image})
        return len(self.g["textures"]) - 1

    def save(self, path):
        while len(self.bin) % 4:
            self.bin.append(0)
        self.g["buffers"] = [{"byteLength": len(self.bin)}]
        js = json.dumps(self.g, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
        while len(js) % 4:
            js += b" "
        with open(path, "wb") as f:
            f.write(struct.pack("<III", 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(self.bin)))
            f.write(struct.pack("<II", len(js), 0x4E4F534A))
            f.write(js)
            f.write(struct.pack("<II", len(self.bin), 0x004E4942))
            f.write(self.bin)


def quat_from_frame(ex, ey, ez):
    m = np.stack([ex, ey, ez], 1)     # colonnes
    tr = m[0, 0] + m[1, 1] + m[2, 2]
    if tr > 0:
        s = math.sqrt(tr + 1.0) * 2
        w, x, y, z = 0.25 * s, (m[2, 1] - m[1, 2]) / s, (m[0, 2] - m[2, 0]) / s, (m[1, 0] - m[0, 1]) / s
    elif m[0, 0] > m[1, 1] and m[0, 0] > m[2, 2]:
        s = math.sqrt(1.0 + m[0, 0] - m[1, 1] - m[2, 2]) * 2
        w, x, y, z = (m[2, 1] - m[1, 2]) / s, 0.25 * s, (m[0, 1] + m[1, 0]) / s, (m[0, 2] + m[2, 0]) / s
    elif m[1, 1] > m[2, 2]:
        s = math.sqrt(1.0 + m[1, 1] - m[0, 0] - m[2, 2]) * 2
        w, x, y, z = (m[0, 2] - m[2, 0]) / s, (m[0, 1] + m[1, 0]) / s, 0.25 * s, (m[1, 2] + m[2, 1]) / s
    else:
        s = math.sqrt(1.0 + m[2, 2] - m[0, 0] - m[1, 1]) * 2
        w, x, y, z = (m[1, 0] - m[0, 1]) / s, (m[0, 2] + m[2, 0]) / s, (m[1, 2] + m[2, 1]) / s, 0.25 * s
    q = np.array([x, y, z, w])
    return q / np.linalg.norm(q)


def quat_mul(a, b):
    ax, ay, az, aw = a
    bx, by, bz, bw = b
    return np.array([aw * bx + ax * bw + ay * bz - az * by, aw * by - ax * bz + ay * bw + az * bx,
                     aw * bz + ax * by - ay * bx + az * bw, aw * bw - ax * bx - ay * by - az * bz])


def quat_rotate(q, v):
    x, y, z, w = q
    u = np.array([x, y, z])
    return 2 * np.dot(u, v) * u + (w * w - np.dot(u, u)) * v + 2 * w * np.cross(u, v)


# --------------------------------------------------------------------------------------
# Assemblage de la géométrie (commune aux 5 coloris)
# --------------------------------------------------------------------------------------
def radial_out(V):
    return nrm(np.stack([V[:, 0], np.zeros(len(V)), V[:, 2] + 0.01], 1))


def hood_out(V):
    return nrm(V - HC[None])


def with_ulen(G):
    ulen, _ = arc_coords(G)
    return np.concatenate([G, ulen[..., None]], 2)


def surface_sampler(G, extra):
    """Interpolateur (x, y) -> canaux, pour poser poches sur un demi-devant."""
    from scipy.interpolate import LinearNDInterpolator
    XY = G[..., :2].reshape(-1, 2)
    vals = np.concatenate([G[..., 2:3].reshape(-1, 1)] + [e.reshape(len(XY), -1) for e in extra], 1)
    return LinearNDInterpolator(XY, vals)


def pocket_parts(sampler, sigma):
    (xt, yt), (xb, yb) = POCKET
    T = np.array([sigma * xt, yt])
    B = np.array([sigma * xb, yb])
    dl = nrm(B - T)
    cdir = np.array([-dl[1], dl[0]])
    if cdir[0] * sigma > 0:
        cdir = -cdir                      # vers le milieu devant
    W = 0.018
    nl, nc = 40, 9
    l = np.linspace(0, 1, nl)
    c = np.concatenate([[-0.34, -0.21, -0.07], np.linspace(0, 1, nc)])
    Lg, Cg = np.meshgrid(l, c)
    XY = T[None, None] + (B - T)[None, None] * Lg[..., None] + cdir[None, None] * (Cg * W)[..., None]
    S = sampler(XY.reshape(-1, 2)).reshape(len(c), nl, -1)
    P = np.concatenate([XY, S[..., :1]], 2)
    N = nrm(S[..., 1:4])
    uv0, uv1 = S[..., 4:6], S[..., 6:8]
    # hauteur du passepoil : arête franche côté fente, couture à plat côté milieu
    cc = Cg
    # v3 : fente ouverte — bord arrière à fleur, fond en creux (ombre), lèvre du passepoil
    # en surplomb puis passepoil bombé, cousu à plat côté milieu devant
    lip = 0.0034 + 0.0024 * smoothstep(-0.07, 0.14, cc) * smoothstep(1.0, 0.72, cc)
    h = np.where(cc < -0.30, 0.0004, np.where(cc < -0.10, -0.0040, np.where(cc < 0.5, lip, lip * smoothstep(1.0, 0.5, cc) + 0.0005)))
    gap = smoothstep(0, 0.10, Lg) * smoothstep(1, 0.90, Lg)       # la fente se referme aux extrémités
    h = np.where(cc < 0, h * gap + 0.0004 * (1 - gap), h * (0.7 + 0.3 * gap))
    G = P + N * h[..., None]
    welt = G[2:]
    nv, nu = welt.shape[:2]
    Vw = welt.reshape(-1, 3)
    m_w = Mesh(Vw, grid_faces(nv, nu), "fabric", uv0[2:].reshape(-1, 2), uv1[2:].reshape(-1, 2))
    if np.mean(m_w.N[:, 2]) < 0:
        m_w.F = m_w.F[:, ::-1].copy()
        m_w.N = -m_w.N
    slot = G[:3]
    m_s = Mesh(slot.reshape(-1, 3), grid_faces(3, nl), "pocket")
    if np.mean(m_s.N[:, 2]) < 0:
        m_s.F = m_s.F[:, ::-1].copy()
        m_s.N = -m_s.N
    return [m_w, m_s], (T, B, cdir, W)


def build_geometry(font_path, verbose=True):
    t0 = time.time()
    geo = {"grids": {}, "parts": {}}
    Gf = body_half(False)
    Gb = body_half(True)
    GfL = with_ulen(Gf)
    GfR = with_ulen(mirror_x(Gf)[:, :, :])
    Gbk = np.concatenate([mirror_x(Gb)[:, ::-1][:, :-1], Gb], 1)
    Gbk = with_ulen(Gbk)
    Sl = sleeve_grid(Gf, Gb, side=1)
    Sr = mirror_x(sleeve_grid(Gf, Gb, side=-1))
    Hd = hood_relax(hood_grid())
    grids = {"Panel_Left": (GfL, body_disp, radial_out), "Panel_Right": (GfR, body_disp, radial_out),
             "Body_Back": (Gbk, body_disp, radial_out),
             "Sleeve_Left": (Sl, sleeve_disp, None), "Sleeve_Right": (Sr, sleeve_disp, None),
             "Hood": (Hd, hood_disp, hood_out)}
    disp = {}
    for k, (G, fn, ref) in grids.items():
        d = fn(G)
        if ref is None:
            ax = sleeve_axis(np.linspace(-0.6, 1.0, 400), -1 if k == "Sleeve_Right" else 1)
            if k == "Sleeve_Right":
                ax[:, 0] *= -1
            ref = (lambda A, T: (lambda V: nrm(V - A[T.query(V)[1]])))(ax, cKDTree(ax))
            grids[k] = (G, fn, ref)
        disp[k] = d
        G2 = apply_disp(G, d, ref)
        geo["grids"][k] = {"G": G2, "rest": G, "d": d, "ref": ref}
    if verbose:
        print(f"  nappes + drapé ({time.time() - t0:.0f} s)")
    # bord-côte de taille : anneau bas (milieu devant droit -> dos -> milieu devant gauche)
    gl, gr, gb = (geo["grids"][k]["G"] for k in ("Panel_Left", "Panel_Right", "Body_Back"))
    # v3 (correctif du v2) : le dos va de -X à +X ; le v2 le prenait à l'envers, et l'anneau
    # traversait le corps deux fois (bandes cachées à l'intérieur, normales faussées).
    ring = np.concatenate([gr[0, :, :3], gb[0, :, :3][1:], gl[0, ::-1, :3][1:]])
    if ring[0, 0] > 0:
        ring = ring[::-1]
    Ghem, hem_u, hem_h = hem_band(ring)
    geo["grids"]["Hem"] = {"G": Ghem, "ulen": hem_u, "h": hem_h}
    # poignets
    for side, k in ((1, "Sleeve_Left"), (-1, "Sleeve_Right")):
        G = geo["grids"][k]["G"]
        axv = sleeve_axis(np.array([0.97, 1.0]), side)
        d = axv[1] - axv[0]
        d[0] *= side
        Gc, cu, ch = cuff_band(G[-1, :, :3], d)
        geo["grids"]["Cuff_" + k.split("_")[1]] = {"G": Gc, "ulen": cu, "h": ch}
    # chemin du zip
    yn0 = neck_point(math.asin(XG / NW), False)[1]
    pts = [gl[:, 0, :3], gr[:, 0, :3]]
    hem_front = np.concatenate([Ghem[:4, 0], Ghem[:4, -1]])
    allp = np.concatenate(pts + [hem_front])
    ys = np.linspace(yn0 - 0.002, 0.0032, 170)
    zz = []
    for y in ys:
        m = np.abs(allp[:, 1] - y) < 0.006
        zz.append(allp[m, 2].max() if m.any() else np.nan)
    zz = np.array(zz)
    zz = np.interp(ys, ys[~np.isnan(zz)][::-1], zz[~np.isnan(zz)][::-1])
    zz = ndimage.gaussian_filter1d(zz, 3, mode="nearest") + 0.0021
    path = np.stack([np.zeros_like(ys), ys, zz], 1)
    path = polyline_resample(path, 170)
    geo["zip_path"] = path
    geo["zip"] = zip_parts(path)
    if verbose:
        print(f"  bords-côtes, zip ({time.time() - t0:.0f} s)")
    geo["slider"], geo["pull_pivot"] = slider_mesh()
    geo["pull"] = pull_mesh(font_path)
    return geo


def finish_geometry(geo, S=2048):
    """UV d'atlas, UV de maille, coques, poches. Renvoie la liste des nœuds avec primitives."""
    g = geo["grids"]
    names = ["Panel_Left", "Panel_Right", "Body_Back", "Sleeve_Left", "Sleeve_Right", "Hood", "Hem", "Cuff_Left", "Cuff_Right"]
    sizes = []
    for k in names:
        G = g[k]["G"][..., :3]
        ulen, vlen = arc_coords(G)
        if "ulen" in g[k]:                     # bords-côtes : abscisse lisse (sans le relief des côtes)
            ulen = np.tile(g[k]["ulen"][None], (G.shape[0], 1))
        g[k]["ul"], g[k]["vl"] = ulen, vlen
        sizes.append((float(np.mean(ulen[:, -1])), float(np.mean(vlen[-1, :]))))
    dens, rects = pack_atlas(sizes, S)
    geo["atlas"] = {"density": dens, "rects": dict(zip(names, rects)), "S": S}
    for k, r in zip(names, rects):
        G = g[k]["G"]
        g[k]["uv0"] = grid_uv(G.shape[0], G.shape[1], r, S)
        g[k]["uv1"] = np.stack([g[k]["ul"], g[k]["vl"]], 2)
    nodes = {}
    # corps, manches, capuche : coques
    for k in ("Panel_Left", "Panel_Right", "Body_Back", "Sleeve_Left", "Sleeve_Right", "Hood"):
        G = g[k]["G"][..., :3]
        closed = k.startswith("Sleeve")
        outer, inner = shell_from_grid(G, g[k]["ref"], g[k]["uv0"], g[k]["uv1"], closed_u=closed,
                                       rims=("b", "t") if closed else ("l", "r", "b", "t"),
                                       th=TH_HOOD if k == "Hood" else TH,
                                       lining="hoodlining" if k == "Hood" else "lining", apex=(k == "Hood"))
        nodes[k] = [outer, inner]
    # poches
    for k, sg in (("Panel_Left", 1), ("Panel_Right", -1)):
        G = g[k]["G"]
        N = nodes[k][0].N[:G.shape[0] * G.shape[1]].reshape(G.shape[0], G.shape[1], 3)
        smp = surface_sampler(G[..., :3], [N, g[k]["uv0"], g[k]["uv1"]])
        nodes["Pocket_" + k.split("_")[1]], geo["pocket_" + k.split("_")[1]] = pocket_parts(smp, sg)
    for k in ("Hem", "Cuff_Left", "Cuff_Right"):
        G = g[k]["G"]
        if k == "Hem":
            ref = lambda P: nrm(np.stack([P[..., 0], np.zeros(P.shape[:-1]), P[..., 2] + 0.005], -1))
        else:
            c = G.reshape(-1, 3).mean(0)
            ref = (lambda c: (lambda P: nrm((P - c) * np.array([1, 0.15, 1]))))(c)
        uv1 = np.stack([np.tile(g[k]["ulen"][None], (G.shape[0], 1)), np.tile(np.cumsum(np.r_[0, np.linalg.norm(np.diff(G[:, 0], axis=0), axis=1)])[:, None], (1, G.shape[1]))], 2)
        nodes[k] = [band_mesh(G, g[k]["uv0"], uv1, k != "Hem", ref)]
    return nodes


# --------------------------------------------------------------------------------------
# Texture d'atlas (baseColor) : motif + coutures surpiquées + ombrage des plis
# --------------------------------------------------------------------------------------
def bake_atlas(geo, col, verbose=True):
    S = geo["atlas"]["S"]
    g = geo["grids"]
    A, B = srgb_to_lin(hex_rgb(col["a"])), srgb_to_lin(hex_rgb(col["b"]))
    lum = 0.2126 * A[0] + 0.7152 * A[1] + 0.0722 * A[2]
    dark = lum < 0.05
    thread = 0.5 * (A + B) * (1.45 if dark else 0.80)
    img = np.zeros((S, S, 3))
    mask = np.zeros((S, S), bool)
    allpts = np.concatenate([g[k]["G"][..., :3].reshape(-1, 3) for k in ("Panel_Left", "Panel_Right", "Body_Back", "Sleeve_Left", "Sleeve_Right", "Hood")])
    vort = make_vortices(allpts, col["seed"])
    for k, rect in geo["atlas"]["rects"].items():
        x0, y0, w, h = rect
        G = g[k]["G"]
        nv, nu = G.shape[:2]
        fi = np.linspace(0, nu - 1, w)
        fj = np.linspace(0, nv - 1, h)
        FI, FJ = np.meshgrid(fi, fj)
        coords = np.stack([FJ.ravel(), FI.ravel()])
        sample = lambda arr: ndimage.map_coordinates(np.asarray(arr, np.float64), coords, order=1, mode="nearest")
        P = np.stack([sample(G[..., c]) for c in range(3)], 1)
        m = kyma_wave(P, vort, col["seed"])
        c = A[None] * (1 - m[:, None]) + B[None] * m[:, None]
        shade = np.ones(len(P))
        st = np.zeros(len(P))
        seam = np.zeros(len(P))
        if k in g and "d" in g[k]:
            shade *= 1 + 5.0 * np.clip(sample(g[k]["d"]), -0.02, 0.02)
        ul, vl = sample(g[k]["ul"]), sample(g[k]["vl"])
        rowL = sample(np.tile(g[k]["ul"][:, -1:], (1, nu)))
        colL = sample(np.tile(g[k]["vl"][-1:, :], (nv, 1)))
        x, y, z = P[:, 0], P[:, 1], P[:, 2]
        if k in ("Panel_Left", "Panel_Right", "Body_Back"):
            dt, dr, db, dlft = colL - vl, rowL - ul, vl, ul
            top_sh = smoothstep(NW + 0.005, NW + 0.02, np.abs(x))
            st += stitch(dt, ul, 0.0065) * top_sh
            st += stitch(dr, vl, 0.0065) * (y > Y_AP - 0.005)
            st += stitch(db, ul, 0.0070)
            seam += np.exp(-(dt / 0.0016) ** 2) * top_sh + np.exp(-(db / 0.0018) ** 2)
            shade *= 1 - 0.10 * np.exp(-db / 0.010)
            # creux d'aisselle et sous la capuche
            dpit = np.sqrt((np.abs(x) - W_CH) ** 2 + (y - Y_AP) ** 2)
            shade *= 1 - 0.16 * np.exp(-dpit / 0.035)
            shade *= 1 - 0.20 * np.exp(-dt / 0.020) * (1 - top_sh)
            if k != "Body_Back":
                st += stitch(dlft, vl, 0.0085) * (y > Y0 + 0.004)
                sg = 1 if k == "Panel_Left" else -1
                T, Bq, cdir, W = geo["pocket_" + k.split("_")[1]]
                dl = Bq - T
                Ll = np.linalg.norm(dl)
                rel = np.stack([x, y], 1) - T[None]
                lm = rel @ (dl / Ll)
                cm = rel @ cdir
                inside = (lm > -0.002) & (lm < Ll + 0.002)
                box_d = np.minimum.reduce([np.abs(cm - 0.0015), np.abs(cm - (W - 0.0015))])
                st += stitch(np.abs(cm - (W - 0.0016)), lm, 0.0) * inside
                st += stitch(np.abs(lm - 0.0016), cm, 0.0) * (cm > 0) * (cm < W)
                st += stitch(np.abs(lm - (Ll - 0.0016)), cm, 0.0) * (cm > 0) * (cm < W)
                shade *= 1 - 0.45 * np.exp(-((cm + 0.0015) / 0.0020) ** 2) * inside
                shade *= 1 - 0.18 * np.exp(-((cm + 0.004) / 0.004) ** 2) * inside
        elif k.startswith("Sleeve"):
            st += stitch(vl, ul, 0.0065)
            seam += np.exp(-(vl / 0.0016) ** 2)
            shade *= 1 - 0.12 * np.exp(-(colL - vl) / 0.012)
        elif k == "Hood":
            half = rowL / 2
            dsm = np.abs(ul - half)
            st += stitch(dsm, vl, 0.0045)
            st += stitch(ul, vl, 0.012) + stitch(rowL - ul, vl, 0.012)
            seam += np.exp(-(dsm / 0.0012) ** 2)
            shade *= 1 - 0.18 * np.exp(-vl / 0.03)
        else:   # bords-côtes : légère vibration des côtes, ombre à la couture
            rw = rib_wave(ul)
            shade *= 1 + 0.05 * rw
            shade *= 1 - 0.12 * np.exp(-vl / 0.006)
        c = c * shade[:, None] * (1 - 0.22 * np.clip(seam, 0, 1))[:, None]
        sm = np.clip(st, 0, 1)[:, None] * 0.8
        c = c * (1 - sm) + thread[None] * sm
        img[y0:y0 + h, x0:x0 + w] = lin_to_srgb(c).reshape(h, w, 3)
        mask[y0:y0 + h, x0:x0 + w] = True
    _, (iy, ix) = ndimage.distance_transform_edt(~mask, return_indices=True)
    img = img[iy, ix]
    return Image.fromarray((np.clip(img, 0, 1) * 255 + 0.5).astype(np.uint8))


# --------------------------------------------------------------------------------------
# Export d'un coloris : matériaux, nœuds, morph targets, animation, extras
# --------------------------------------------------------------------------------------
TARGETS = ["open", "open_fold", "unzip_1", "unzip_2", "unzip_3", "unzip_4"]
MAT = {"fabric": 0, "lining": 1, "zip": 2, "brass": 3, "tape": 4, "pocket": 5, "hoodlining": 6}


def fold_table(geo):
    g = geo["grids"]
    xf = XG + FOLD_W
    pts = np.concatenate([g["Panel_Left"]["G"][..., :3].reshape(-1, 3), g["Hem"]["G"][:4].reshape(-1, 3)])
    pts = pts[(np.abs(pts[:, 0] - xf) < 0.008) & (pts[:, 2] > 0)]
    ys = np.linspace(-0.01, 0.72, 147)
    zs = []
    for y in ys:
        m = np.abs(pts[:, 1] - y) < 0.01
        zs.append(pts[m, 2].max() if m.any() else np.nan)
    zs = np.array(zs)
    ok = ~np.isnan(zs)
    zs = np.interp(ys, ys[ok], zs[ok])
    return ys, ndimage.gaussian_filter1d(zs, 2, mode="nearest")


def frame_after(fn, p, q, eps=0.002):
    """Position et quaternion d'un repère (p, q) transporté par un champ de déformation fn."""
    ex, ey, ez = quat_rotate(q, np.array([1.0, 0, 0])), quat_rotate(q, np.array([0, 1.0, 0])), quat_rotate(q, np.array([0, 0, 1.0]))
    P = np.array([p, p + ex * eps, p + ey * eps, p + ez * eps])
    D = fn(P)
    a, b = nrm(D[1] - D[0]), nrm(D[2] - D[0])
    c = nrm(np.cross(a, b))
    b = nrm(np.cross(c, a))
    return D[0], quat_from_frame(a, b, c)


def build_layout(geo, nodes):
    """Calcule une fois (indépendant du coloris) : nœuds, morphs, chemin du zip, animation."""
    path = geo["zip_path"]
    seg = np.linalg.norm(np.diff(path, axis=0), axis=1)
    cum = np.concatenate([[0], np.cumsum(seg)])
    ex, ey, ez = frames_on_path(path)
    s_top, s_bot = 0.0105, cum[-1] - 0.0125
    ss = np.linspace(s_top, s_bot, 41)
    at = lambda A: np.stack([np.interp(ss, cum, A[:, k]) for k in range(3)], 1)
    zp, X, Y, Z = at(path), nrm(at(ex)), nrm(at(ey)), nrm(at(ez))
    zq = np.array([quat_from_frame(X[i], Y[i], Z[i]) for i in range(len(ss))])
    zip_top, zip_len = float(zp[0, 1]), float(zp[0, 1] - zp[-1, 1])
    ft = fold_table(geo)
    fields = {
        "open": lambda V, sg: open_field(V, sg),
        "open_fold": lambda V, sg: open_field(fold_field(V, ft, sg), sg, rest=V) - open_field(V, sg) + V,
    }
    for k in range(4):
        fields[f"unzip_{k + 1}"] = (lambda k: (lambda V, sg: unzip_field(V, k, zip_top, zip_len, sg)))(k)
    # curseur ouvert (reste sur le côté droit du porteur)
    so_p, so_q = frame_after(lambda P: open_field(P, -1), zp[-1], zq[-1])
    sf_p, sf_q = frame_after(lambda P: open_field(fold_field(P, ft, -1), -1, rest=P), zp[-1], zq[-1])
    layout = {
        "zipPath": zp, "zipPathQuat": zq, "zipTop": zip_top, "zipLen": zip_len,
        "sliderOpen": (so_p, so_q), "sliderOpenFold": (sf_p, sf_q), "fields": fields, "fold_table": ft,
    }
    # nœuds : (nom, parent, primitives, sigma, morph?)
    L = [("Body_Back", None, nodes["Body_Back"], None),
         ("Panel_Left", None, [nodes["Panel_Left"][0]], 1), ("Lining_Left", "Panel_Left", [nodes["Panel_Left"][1]], 1),
         ("Pocket_Left", "Panel_Left", nodes["Pocket_Left"], 1), ("Zip_Teeth_Left", "Panel_Left", list(geo["zip"][1]), 1),
         ("Panel_Right", None, [nodes["Panel_Right"][0]], -1), ("Lining_Right", "Panel_Right", [nodes["Panel_Right"][1]], -1),
         ("Pocket_Right", "Panel_Right", nodes["Pocket_Right"], -1), ("Zip_Teeth_Right", "Panel_Right", list(geo["zip"][-1]), -1),
         ("Hood_Outer", None, [nodes["Hood"][0]], None), ("Hood_Inner", None, [nodes["Hood"][1]], None),
         ("Sleeve_Left", None, nodes["Sleeve_Left"], 1), ("Sleeve_Right", None, nodes["Sleeve_Right"], -1),
         ("Cuff_Left", None, nodes["Cuff_Left"], 1), ("Cuff_Right", None, nodes["Cuff_Right"], -1),
         ("Hem", None, nodes["Hem"], None)]
    out = []
    for name, parent, prims, sg in L:
        morphs = []
        mx = 0.0
        for m in prims:
            ds = {}
            for t in TARGETS:
                Vd = fields[t](m.V, sg)
                dP = Vd - m.V
                mx = max(mx, float(np.abs(dP).max()))
                dN = None
                if t in ("open", "open_fold"):
                    base = m.V if t == "open" else open_field(m.V, sg)
                    tgt = open_field(m.V, sg) if t == "open" else Vd
                    dN = np.clip(vertex_normals(tgt, m.F) - vertex_normals(base, m.F), -1, 1)
                ds[t] = (dP, dN)
            morphs.append(ds)
        use = mx > 2.5e-3
        out.append({"name": name, "parent": parent, "prims": prims, "sigma": sg, "morphs": morphs if use else None,
                    "maxdisp": mx})
    layout["nodes"] = out
    return layout


def export_glb(path, col, geo, layout, atlas_img, tiles):
    g = GLB()
    g.g["extensionsUsed"].append("KHR_materials_sheen")
    tex_atlas = g.texture(g.image(atlas_img, quality=84), 33071)
    tex_knit = g.texture(g.image(tiles["knit_normal"], mime="image/png"), 10497)
    tex_rough = g.texture(g.image(tiles["knit_rough"], mime="image/png"), 10497)
    tex_fleece = g.texture(g.image(tiles["fleece_normal"], mime="image/png"), 10497)
    # échelle des UV de maille quantifiées
    lmax = 0.0
    for nd in layout["nodes"]:
        for m in nd["prims"]:
            if m.UV1 is not None and m.material in ("fabric", "lining", "hoodlining"):
                lmax = max(lmax, float(np.max(m.UV1)))
    lmax = math.ceil(lmax * 100) / 100 + 0.01
    ksc = lmax / KNIT_TILE
    A, B = hex_rgb(col["a"]), hex_rgb(col["b"])
    lin = srgb_to_lin(hex_rgb(col["lining"]))
    tape = srgb_to_lin(B) * 0.82
    pocket = srgb_to_lin(0.5 * (A + B)) * 0.10
    mid = srgb_to_lin(0.5 * (A + B))
    # reflet velouté du coton : teinte de la fibre, éclaircie, jamais blanche
    sheen_f = [float(v) for v in np.clip(0.55 * mid + 0.05, 0, 1)]
    sheen_l = [float(v) for v in np.clip(0.60 * lin + 0.05, 0, 1)]
    tr = {"KHR_texture_transform": {"scale": [ksc, ksc]}}
    trf = {"KHR_texture_transform": {"scale": [ksc * 0.5, ksc * 0.5]}}   # duvet : tuile de 48 mm
    g.g["materials"] = [
        {"name": f"French terry KYMA Wave — {col['name']}", "pbrMetallicRoughness": {
            "baseColorTexture": {"index": tex_atlas, "texCoord": 0}, "metallicFactor": 1.0, "roughnessFactor": 1.0,
            "metallicRoughnessTexture": {"index": tex_rough, "texCoord": 1, "extensions": tr}},
         "normalTexture": {"index": tex_knit, "texCoord": 1, "scale": 0.60, "extensions": tr},
         "extensions": {"KHR_materials_sheen": {"sheenColorFactor": sheen_f, "sheenRoughnessFactor": 0.62}}},
        {"name": f"Envers molleton gratté — {col['name']}", "pbrMetallicRoughness": {
            "baseColorFactor": [*map(float, lin), 1.0], "metallicFactor": 0.0, "roughnessFactor": 0.96},
         "normalTexture": {"index": tex_fleece, "texCoord": 0, "scale": 0.55, "extensions": trf},
         "extensions": {"KHR_materials_sheen": {"sheenColorFactor": sheen_l, "sheenRoughnessFactor": 0.80}}},
        {"name": "Zip métal argent brossé", "pbrMetallicRoughness": {
            "baseColorFactor": [0.80, 0.81, 0.83, 1.0], "metallicFactor": 1.0, "roughnessFactor": 0.40}},
        {"name": "Tirette Kyma laiton plaqué or brossé", "pbrMetallicRoughness": {
            "baseColorFactor": [0.93, 0.74, 0.40, 1.0], "metallicFactor": 1.0, "roughnessFactor": 0.34}},
        {"name": "Ruban de zip", "pbrMetallicRoughness": {
            "baseColorFactor": [*map(float, tape), 1.0], "metallicFactor": 0.0, "roughnessFactor": 0.9}},
        {"name": "Fond de poche", "pbrMetallicRoughness": {
            "baseColorFactor": [*map(float, pocket), 1.0], "metallicFactor": 0.0, "roughnessFactor": 1.0}},
        {"name": f"Doublure de capuche jersey ton sur ton — {col['name']}", "pbrMetallicRoughness": {
            "baseColorFactor": [*map(float, lin), 1.0], "metallicFactor": 0.0, "roughnessFactor": 0.90},
         "normalTexture": {"index": tex_knit, "texCoord": 0, "scale": 0.45, "extensions": tr},
         "extensions": {"KHR_materials_sheen": {"sheenColorFactor": sheen_l, "sheenRoughnessFactor": 0.65}}},
    ]
    nodes_js = g.g["nodes"]
    index = {}

    def add_mesh(name, prims, morphs, offset):
        P = []
        for pi, m in enumerate(prims):
            V = m.V - offset[None]
            attrs = {"POSITION": g.f32(V, "VEC3", minmax=True), "NORMAL": g.normals_i8(m.N)}
            if m.material == "fabric":
                attrs["TEXCOORD_0"] = g.uv_u16(np.clip(m.UV0, 0, 1))
                attrs["TEXCOORD_1"] = g.uv_u16(np.clip(m.UV1, 0, None), lmax)
            elif m.material in ("lining", "hoodlining"):
                attrs["TEXCOORD_0"] = g.uv_u16(np.clip(m.UV1, 0, None), lmax)
            ao = getattr(m, "AO", None)
            if ao is not None:
                attrs["COLOR_0"] = g.color_u8(ao)
            prim = {"attributes": attrs, "indices": g.indices(m.F, len(V)), "material": MAT[m.material], "mode": 4}
            if morphs:
                tl = []
                for t in TARGETS:
                    dP, dN = morphs[pi][t]
                    tgt = {"POSITION": g.sparse(dP, "VEC3", minmax=True, quant_i16=True)}
                    if dN is not None:
                        tgt["NORMAL"] = g.sparse(dN, "VEC3", quant_i8=True)
                    else:
                        tgt["NORMAL"] = g.acc({"componentType": 5120, "normalized": True, "count": len(V), "type": "VEC3"})
                    tl.append(tgt)
                prim["targets"] = tl
            P.append(prim)
        mesh = {"name": name, "primitives": P}
        if morphs:
            mesh["extras"] = {"targetNames": TARGETS}
        g.g["meshes"].append(mesh)
        return len(g.g["meshes"]) - 1

    root = {"name": "KYMA_Hoodie", "children": []}
    nodes_js.append(root)
    index["KYMA_Hoodie"] = 0
    for nd in layout["nodes"]:
        sg = nd["sigma"]
        pivoted = nd["name"].startswith(("Panel_", "Lining_", "Pocket_", "Zip_Teeth_"))
        off = np.array([sg * PIVOT_X, 0, 0]) if pivoted else np.zeros(3)
        mi = add_mesh(nd["name"], nd["prims"], nd["morphs"], off)
        js = {"name": nd["name"], "mesh": mi}
        if nd["morphs"]:
            js["weights"] = [0.0] * len(TARGETS)
        if nd["name"].startswith("Panel_"):
            js["translation"] = [float(v) for v in off]
            js["extras"] = {"hinge": "origine du nœud = couture de côté ; rotation Y possible mais préférer le morph `open`"}
        nodes_js.append(js)
        index[nd["name"]] = len(nodes_js) - 1
        parent = index[nd["parent"]] if nd["parent"] else 0
        nodes_js[parent].setdefault("children", []).append(index[nd["name"]])
    # curseur + tirette
    zp, zq = layout["zipPath"], layout["zipPathQuat"]
    mi = add_mesh("Zip_Slider", [geo["slider"]], None, np.zeros(3))
    slider = {"name": "Zip_Slider", "mesh": mi, "translation": [float(v) for v in zp[0]],
              "rotation": [float(v) for v in zq[0]],
              "extras": {"zipPath": [[round(float(c), 5) for c in p] for p in zp],
                         "zipPathQuat": [[round(float(c), 6) for c in q] for q in zq]}}
    nodes_js.append(slider)
    index["Zip_Slider"] = len(nodes_js) - 1
    root["children"].append(index["Zip_Slider"])
    mi = add_mesh("Zip_Pull", [geo["pull"]], None, np.zeros(3))
    tilt = -math.radians(12)
    nodes_js.append({"name": "Zip_Pull", "mesh": mi, "translation": [float(v) for v in geo["pull_pivot"]],
                     "rotation": [math.sin(tilt / 2), 0.0, 0.0, math.cos(tilt / 2)],
                     "extras": {"description": "Tirette « Kyma » (laiton doré), pivote autour de X sur l'anse du curseur"}})
    index["Zip_Pull"] = len(nodes_js) - 1
    nodes_js[index["Zip_Slider"]]["children"] = [index["Zip_Pull"]]
    g.g["scenes"][0]["nodes"] = [0]
    # animation ZipOpen : 0–3 s curseur + V, 3–5 s ouverture, 5–6 s revers
    times = np.round(np.arange(0, 6.0001, 0.05), 4)
    W = np.zeros((len(times), len(TARGETS)))
    Tr, Rt = [], []
    so_p, so_q = layout["sliderOpen"]
    sf_p, sf_q = layout["sliderOpenFold"]
    for i, t in enumerate(times):
        s = min(t / 3.0, 1.0)
        k = 4 * s
        for j in range(4):
            W[i, 2 + j] = max(0.0, 1 - abs(k - (j + 1))) if k < 4 else (1.0 if j == 3 else 0.0)
        o = float(np.clip((t - 3.0) / 2.0, 0, 1))
        o = o * o * (3 - 2 * o)
        f = float(np.clip(t - 5.0, 0, 1))
        f = f * f * (3 - 2 * f)
        W[i, 0], W[i, 1] = o, f
        W[i, 5] *= (1 - o)
        z = s * (len(zp) - 1)
        a = min(int(z), len(zp) - 2)
        fr = z - a
        p = zp[a] * (1 - fr) + zp[a + 1] * fr
        q = slerp(zq[a][None], zq[a + 1][None], fr)[0]
        if o > 0:
            p = p * (1 - o) + so_p * o
            q = slerp(q[None], so_q[None], o)[0]
        if f > 0:
            p = p * (1 - f) + sf_p * f
            q = slerp(q[None], sf_q[None], f)[0]
        Tr.append(p)
        Rt.append(q)
    tin = g.acc({"bufferView": g.view(times.astype(np.float32).tobytes()), "componentType": 5126, "count": len(times),
                 "type": "SCALAR", "min": [0.0], "max": [float(times[-1])]})
    samplers, channels = [], []
    def chan(node, pathname, data, kind):
        a = g.acc({"bufferView": g.view(np.ascontiguousarray(data, np.float32).tobytes()), "componentType": 5126,
                   "count": len(data) if kind != "SCALAR" else data.size, "type": kind})
        samplers.append({"input": tin, "output": a, "interpolation": "LINEAR"})
        channels.append({"sampler": len(samplers) - 1, "target": {"node": node, "path": pathname}})
    chan(index["Zip_Slider"], "translation", np.array(Tr), "VEC3")
    chan(index["Zip_Slider"], "rotation", np.array(Rt), "VEC4")
    morph_nodes = [nd["name"] for nd in layout["nodes"] if nd["morphs"]]
    for n in morph_nodes:
        chan(index[n], "weights", W.reshape(-1), "SCALAR")
    g.g["animations"] = [{"name": "ZipOpen", "samplers": samplers, "channels": channels}]
    root["extras"] = {
        "kyma": "Hoodie zippé oversize Ressac v3 — " + col["name"],
        "units": "m", "up": "+Y", "front": "+Z", "hemBottomY": 0.0,
        "left": "Left = gauche du porteur = +X (à droite de l'écran en vue de face)",
        "zipPath": slider["extras"]["zipPath"], "zipPathQuat": slider["extras"]["zipPathQuat"],
        "sliderOpen": {"position": [float(v) for v in so_p], "quaternion": [float(v) for v in so_q]},
        "sliderOpenFold": {"position": [float(v) for v in sf_p], "quaternion": [float(v) for v in sf_q]},
        "morphTargets": TARGETS, "morphNodes": morph_nodes, "unzipApex": list(UNZIP_APEX),
        "animation": {"name": "ZipOpen", "zip": [0, 3], "open": [3, 5], "fold": [5, 6]},
        "poi": POI(layout),
    }
    g.save(path)


def POI(layout):
    zp = layout["zipPath"]
    top = zp[0]
    return {
        "overview": {"target": [0, 0.43, 0], "position": [0, 0.55, 2.35], "fov": 30},
        "hood": {"target": [0, 0.79, -0.04], "position": [0.62, 0.98, 1.10], "fov": 30},
        "hood_inside": {"target": [0, 0.77, -0.10], "position": [0.0, 0.84, 0.75], "fov": 30},
        "back": {"target": [0, 0.47, 0], "position": [0, 0.62, -2.3], "fov": 30},
        "pull": {"target": [round(float(top[0]), 4), round(float(top[1] - 0.022), 4), round(float(top[2]), 4)],
                 "position": [0.07, round(float(top[1] + 0.02), 4), round(float(top[2] + 0.30), 4)], "fov": 22},
        "inside_left": {"target": [0.10, 0.36, 0.06], "position": [-0.70, 0.55, 1.45], "fov": 30},
        "inside_right": {"target": [-0.10, 0.36, 0.06], "position": [0.70, 0.55, 1.45], "fov": 30},
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--coloris", default="all", choices=list(COLORIS) + ["all"])
    ap.add_argument("--tex", type=int, default=2048)
    ap.add_argument("--out", default=HERE)
    ap.add_argument("--font", default=None)
    ap.add_argument("--atlas-png", default=None, help="dossier où écrire aussi la texture d'atlas (contrôle)")
    ap.add_argument("--textures", default=None, help="dossier où écrire aussi les tuiles PNG (maille, rugosité, envers gratté)")
    ap.add_argument("--ao-rays", type=int, default=64, help="rayons d'occlusion par sommet (0 = sans occlusion cuite)")
    a = ap.parse_args()
    t0 = time.time()
    font = find_font(a.font)
    print("police tirette :", font)
    geo = build_geometry(font)
    nodes = finish_geometry(geo, a.tex)
    layout = build_layout(geo, nodes)
    for nd in layout["nodes"]:
        print(f"  {nd['name']:16s} morph={'oui' if nd['morphs'] else 'non'}  dépl. max {nd['maxdisp'] * 100:.1f} cm")
    if a.ao_rays > 0:
        bake_ao(layout, nrays=a.ao_rays)
    tiles = {"knit_normal": knit_normal_tile(), "knit_rough": knit_roughness_tile(), "fleece_normal": fleece_normal_tile()}
    if a.textures:
        os.makedirs(a.textures, exist_ok=True)
        for k, im in tiles.items():
            im.save(os.path.join(a.textures, f"{k.replace('_', '-')}.png"), optimize=True)
    for c in (COLORIS if a.coloris == "all" else [a.coloris]):
        col = COLORIS[c]
        img = bake_atlas(geo, col)
        if a.atlas_png:
            img.save(os.path.join(a.atlas_png, f"atlas-{c}.jpg"), quality=85)
        p = os.path.join(a.out, f"ressac-v3-{c}.glb")
        export_glb(p, col, geo, layout, img, tiles)
        ntri = sum(len(m.F) for nd in layout["nodes"] for m in nd["prims"]) + len(geo["slider"].F) + len(geo["pull"].F)
        print(f"  -> {p} : {os.path.getsize(p) / 1e6:.2f} Mo, {ntri} triangles ({time.time() - t0:.0f} s)")


if __name__ == "__main__":
    main()
