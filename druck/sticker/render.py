"""Sticker „10 % Rabatt“ als Druck-PDF (180 × 100 mm + 3 mm Beschnitt) und Vorschaubilder erzeugen.
Aufruf (im Ordner druck/sticker/):  python3 qr.py && python3 render.py [Ausgabeordner] [Varianten, z. B. b,b1,b2]
Die Varianten stehen in sticker.html (VARIANTS)."""
import asyncio, sys, re, pathlib
from playwright.async_api import async_playwright
HERE = pathlib.Path(__file__).resolve().parent
OUT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else HERE / "ausgabe"); OUT.mkdir(parents=True, exist_ok=True)
VARS = (sys.argv[2] if len(sys.argv) > 2 else "b,b1,b2,b3,b4,b5").split(",")

async def load(pg, v, guides=False):
    await pg.goto((HERE / "sticker.html").as_uri() + f"?v={v}" + ("&guides" if guides else ""))
    await pg.evaluate("window.ready"); await pg.wait_for_timeout(250)
    return await pg.evaluate("window.metrics")

def fname(m):  # „B1 · Oswald + Satisfy“ → „B1-Oswald-Satisfy“
    return re.sub(r"[^A-Za-z0-9]+", "-", m["variant"].replace("·", "")).strip("-")

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pdf = await b.new_page()
        img = await b.new_page(device_scale_factor=300 / 96)        # 300 dpi
        errs = []; [x.on("pageerror", lambda e: errs.append(str(e))) for x in (pdf, img)]
        for v in VARS:
            m = await load(pdf, v); n = fname(m)
            await pdf.pdf(path=str(OUT / f"OlaLa-Sticker-{n}-180x100mm-Druck.pdf"), prefer_css_page_size=True, print_background=True)
            await load(img, v)
            await (await img.query_selector("#page")).screenshot(path=str(OUT / f"OlaLa-Sticker-{n}.png"))
            await load(img, v, guides=True)
            await (await img.query_selector("#page")).screenshot(path=str(OUT / f"OlaLa-Sticker-{n}-mit-Schnittlinie.png"))
            print(n, m)
        qr = await b.new_page(viewport={"width": 2000, "height": 2000})
        await qr.set_content('<!doctype html><style>body{margin:0;width:2000px;height:2000px;display:grid;place-items:center;'
                             'background:#1b5b3d}</style><img src="' + (HERE / "qr-pizzeriaolala-weiss.svg").as_uri() + '" style="width:1640px;height:1640px">')
        await qr.wait_for_timeout(300); await qr.screenshot(path=str(OUT / "QR-pizzeriaolala-weiss-auf-gruen-2000px.png"))
        print("Fehler:", errs or "keine")
        await b.close()
asyncio.run(main())
