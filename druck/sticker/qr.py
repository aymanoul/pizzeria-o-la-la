"""QR-Code für pizzeriaolala.de im O-la-la-Stil (runde Punkte, runde Augen, Logo in der Mitte).
Aufruf: python3 qr.py   → qr-pizzeriaolala.svg (Vektor) im selben Ordner"""
import base64, pathlib, segno
HERE = pathlib.Path(__file__).resolve().parent
URL = "https://www.pizzeriaolala.de"
INK, EYE, DOT = "#123f2a", "#e30613", "#123f2a"      # Dunkelgrün, Rot
q = segno.make(URL, error="h", micro=False)          # Fehlerkorrektur H (30 %) wegen Logo in der Mitte
M = [list(r) for r in q.matrix]; N = len(M); QZ = 3   # Ruhezone 3 Module
def in_finder(r, c):
    return any(r0 <= r < r0 + 7 and c0 <= c < c0 + 7 for r0, c0 in [(0, 0), (0, N - 7), (N - 7, 0)])
# Ausrichtungsmuster (ab Version 2)
from segno import consts  # noqa
align = []
if q.version >= 2:
    pos = {2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30], 6: [6, 34]}[q.version]
    align = [(r, c) for r in pos for c in pos if not ((r == 6 and c == 6) or (r == 6 and c == pos[-1]) or (r == pos[-1] and c == 6))]
def in_align(r, c): return any(abs(r - ar) <= 2 and abs(c - ac) <= 2 for ar, ac in align)
L = 9                                                # Logo-Feld 9×9 Module in der Mitte
c0 = (N - L) // 2
def in_logo(r, c): return c0 - 0.5 <= r < c0 + L + 0.5 and c0 - 0.5 <= c < c0 + L + 0.5
S = N + 2 * QZ
out = [f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {S} {S}" shape-rendering="geometricPrecision">',
       f'<rect width="{S}" height="{S}" fill="#fff"/>']
for r in range(N):
    for c in range(N):
        if M[r][c] and not in_finder(r, c) and not in_align(r, c) and not in_logo(r, c):
            out.append(f'<circle cx="{c + QZ + .5}" cy="{r + QZ + .5}" r=".46" fill="{DOT}"/>')
for r0, c0f in [(0, 0), (0, N - 7), (N - 7, 0)]:      # Augen: abgerundetes Quadrat, roter Kern
    x, y = c0f + QZ, r0 + QZ
    out.append(f'<rect x="{x + .5}" y="{y + .5}" width="6" height="6" rx="2.1" fill="none" stroke="{INK}" stroke-width="1"/>')
    out.append(f'<rect x="{x + 2}" y="{y + 2}" width="3" height="3" rx="1" fill="{EYE}"/>')
for ar, ac in align:
    x, y = ac - 2 + QZ, ar - 2 + QZ
    out.append(f'<rect x="{x + .5}" y="{y + .5}" width="4" height="4" rx="1.3" fill="none" stroke="{INK}" stroke-width="1"/>')
    out.append(f'<circle cx="{x + 2.5}" cy="{y + 2.5}" r=".55" fill="{EYE}"/>')
icon = base64.b64encode((HERE / "../../img/icon-512.png").read_bytes()).decode()
lx = c0 + QZ + .3; lw = L - .6
out.append(f'<defs><clipPath id="lc"><rect x="{lx}" y="{lx}" width="{lw}" height="{lw}" rx="1.9"/></clipPath></defs>')
out.append(f'<image x="{lx}" y="{lx}" width="{lw}" height="{lw}" clip-path="url(#lc)" href="data:image/png;base64,{icon}" xlink:href="data:image/png;base64,{icon}"/>')
out.append('</svg>')
(HERE / "qr-pizzeriaolala.svg").write_text("\n".join(out))
print("QR", URL, "Version", q.version, q.error, f"{N}×{N} Module")
