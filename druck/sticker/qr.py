"""QR-Code für pizzeriaolala.de im O-la-la-Stil – WEISS auf grünem Sticker (ohne weiße Fläche),
runde Punkte, abgerundete Augen, Logo frei in der Mitte.
Aufruf: python3 qr.py [Logo-Breite in Modulen, Standard 11.5]  → qr-pizzeriaolala-weiss.svg
Fehlerkorrektur H (bis 30 %), damit das Logo in der Mitte nicht stört."""
import base64, pathlib, sys, segno
from PIL import Image
HERE = pathlib.Path(__file__).resolve().parent
URL = "https://www.pizzeriaolala.de"
FG = "#ffffff"
q = segno.make(URL, error="h", micro=False)
M = [list(r) for r in q.matrix]; N = len(M)
LOGO_W = float(sys.argv[1]) if len(sys.argv) > 1 else 11.5    # Logo-Breite in Modulen (getestet: größer = weniger Reserve)
OUT = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else HERE / "qr-pizzeriaolala-weiss.svg"

def in_finder(r, c):
    return any(r0 <= r < r0 + 7 and c0 <= c < c0 + 7 for r0, c0 in [(0, 0), (0, N - 7), (N - 7, 0)])
pos = {2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30], 6: [6, 34]}.get(q.version, [])
align = [(r, c) for r in pos for c in pos if (r, c) not in [(6, 6), (6, pos[-1]), (pos[-1], 6)]] if pos else []
def in_align(r, c): return any(abs(r - ar) <= 2 and abs(c - ac) <= 2 for ar, ac in align)

# Logo (heller Schriftzug für dunklen Grund) – auf den sichtbaren Bereich zugeschnitten
logo = Image.open(HERE / "../../img/logo-hell.png").convert("RGBA")
logo = logo.crop(logo.getchannel("A").point(lambda a: 255 if a > 24 else 0).getbbox())
ar = logo.height / logo.width
lw, lh = LOGO_W, LOGO_W * ar
cx = cy = N / 2
pad = 0.7                                                      # freier Rand um das Logo (Module)
fx0, fx1, fy0, fy1 = cx - lw / 2 - pad, cx + lw / 2 + pad, cy - lh / 2 - pad, cy + lh / 2 + pad
def in_logo(r, c):  # Modul liegt (auch nur teilweise) im freien Feld
    return c + 1 > fx0 and c < fx1 and r + 1 > fy0 and r < fy1

out = [f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {N} {N}" shape-rendering="geometricPrecision">']
removed = 0
for r in range(N):
    for c in range(N):
        if not M[r][c] or in_finder(r, c) or in_align(r, c): continue
        if in_logo(r, c): removed += 1; continue
        out.append(f'<circle cx="{c + .5}" cy="{r + .5}" r=".44" fill="{FG}"/>')
for r0, c0 in [(0, 0), (0, N - 7), (N - 7, 0)]:               # Augen
    out.append(f'<rect x="{c0 + .5}" y="{r0 + .5}" width="6" height="6" rx="1.8" fill="none" stroke="{FG}" stroke-width="1"/>')
    out.append(f'<rect x="{c0 + 2}" y="{r0 + 2}" width="3" height="3" rx=".9" fill="{FG}"/>')
for ar_, ac in align:
    out.append(f'<rect x="{ac - 1.5}" y="{ar_ - 1.5}" width="4" height="4" rx="1.1" fill="none" stroke="{FG}" stroke-width="1"/>')
    out.append(f'<circle cx="{ac + .5}" cy="{ar_ + .5}" r=".5" fill="{FG}"/>')
import io
buf = io.BytesIO(); logo.save(buf, "PNG", optimize=True)
b64 = base64.b64encode(buf.getvalue()).decode()
out.append(f'<image x="{cx - lw / 2:.3f}" y="{cy - lh / 2:.3f}" width="{lw:.3f}" height="{lh:.3f}" href="data:image/png;base64,{b64}" xlink:href="data:image/png;base64,{b64}"/>')
out.append('</svg>')
OUT.write_text("\n".join(out))
data_modules = sum(1 for r in range(N) for c in range(N) if not in_finder(r, c) and not in_align(r, c))
print(f"QR {URL} · Version {q.version}-{q.error} · {N}×{N} Module · Logo {lw:.1f}×{lh:.1f} Module · "
      f"freigestellt {sum(1 for r in range(N) for c in range(N) if in_logo(r, c))} Felder "
      f"({sum(1 for r in range(N) for c in range(N) if in_logo(r, c)) / data_modules:.0%} der Datenfläche)")
