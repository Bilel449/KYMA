"""Génère frise-2027.html à partir de feuille-de-route-2027.md (source unique).
Usage : python3 feuille-de-route/build_frise.py"""
import html, json, re, pathlib

D = pathlib.Path(__file__).parent
md = (D / 'feuille-de-route-2027.md').read_text(encoding='utf-8')

def sec(start, end=None):
    a = md.index(start)
    b = md.index(end, a) if end else len(md)
    return md[a:b]

def inline(s):
    s = html.escape(s.strip(), quote=False)
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    return re.sub(r'`(.+?)`', r'<code>\1</code>', s)

def rows(block):
    out = []
    for line in block.splitlines():
        if line.startswith('|') and not re.match(r'^\|[-| ]+\|$', line):
            out.append([c.strip() for c in line.strip().strip('|').split('|')])
    return out[1:]  # sans l'en-tête

phases = [{'name': re.sub(r'\*\*|\d+\.\s*', '', r[0]), 'dates': r[1], 'goal': inline(r[2]), 'out': inline(r[3])}
          for r in rows(sec('| Phase |', '\nJalons communs'))]

jalons = []
for line in sec('## 2. Jalons', '## 3.').splitlines():
    m = re.match(r'^(\d{4}-\d{2}-\d{2}) \| (.+?) \| (.+?) \|\s*(★)?', line)
    if m:
        jalons.append({'d': m[1], 't': inline(m[2]), 'dom': m[3].strip(), 'major': bool(m[4])})

months = []
for block in re.split(r'\n### ', sec('## 3. Missions', '## 4.'))[1:]:
    title, *lines = block.split('\n')
    items = []
    for l in lines:
        m = re.match(r'^- \[(.+?)\] (.+)$', l)
        if not m:
            continue
        parts = m[2].rsplit(' — ', 2)
        mission, qui, livr = (parts + ['', ''])[:3] if len(parts) == 3 else (m[2], '', '')
        items.append({'dom': m[1], 'm': inline(mission), 'qui': inline(qui), 'l': inline(livr)})
    months.append({'title': title.strip(), 'items': items})

critique = [inline(re.sub(r'^\d+\.\s*', '', l)) for l in sec('## 4. Chemin', '## 5.').splitlines() if re.match(r'^\d+\.', l)]
decisions = [{'id': r[0], 'what': inline(r[1]), 'when': r[2], 'who': inline(r[3])} for r in rows(sec('| Dxx | Décision', '## 6.'))]

dossier, group = [], None
for r in rows(sec('| # | Document', '## 7.')):
    if r[0].startswith('**'):
        group = {'name': r[0].strip('*'), 'docs': []}
        dossier.append(group)
    else:
        group['docs'].append({'id': r[0], 'doc': inline(r[1]), 'by': inline(r[2]), 'when': inline(r[3])})

arbitrages = [{'n': r[0], 'sujet': inline(r[1]), 'choix': inline(r[2])} for r in rows(sec('| # | Écart |', '### 7.2'))]

data = dict(phases=phases, jalons=jalons, months=months, critique=critique,
            decisions=decisions, dossier=dossier, arbitrages=arbitrages)
assert len(jalons) >= 30 and len(months) >= 13 and decisions and dossier and len(phases) == 5, {k: len(v) for k, v in data.items()}

tpl = (D / 'frise.tpl.html').read_text(encoding='utf-8')
(D / 'frise-2027.html').write_text(tpl.replace('/*DATA*/null', json.dumps(data, ensure_ascii=False)), encoding='utf-8')
print({k: len(v) for k, v in data.items()}, sum(len(m['items']) for m in months), 'missions')
