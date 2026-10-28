"""Sticker als Druck-PDF (mit 3 mm Beschnitt) und Vorschaubilder erzeugen.
Aufruf (im Ordner druck/sticker/):  python3 qr.py && python3 render.py ausgabe/"""
import asyncio, sys, os, pathlib
from playwright.async_api import async_playwright
HERE = pathlib.Path(__file__).resolve().parent
OUT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else HERE / "ausgabe"); OUT.mkdir(parents=True, exist_ok=True)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(device_scale_factor=1)
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto((HERE / "sticker.html").as_uri()); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(400)
        print("Schriften:", await pg.evaluate("[...document.fonts].filter(f=>f.status=='loaded').map(f=>f.family).join(', ')"), "Fehler:", errs)
        await pg.pdf(path=str(OUT / "OlaLa-Sticker-180x100mm-Druck.pdf"), prefer_css_page_size=True, print_background=True)
        el = await pg.query_selector("#page")
        # 300 dpi Bild (186 mm ≈ 2197 px) – zum Teilen ohne Hilfslinien
        await pg.set_viewport_size({"width": 703, "height": 401})
        pg2 = await b.new_page(device_scale_factor=300 / 96)
        await pg2.goto((HERE / "sticker.html").as_uri()); await pg2.evaluate("document.fonts.ready"); await pg2.wait_for_timeout(400)
        await (await pg2.query_selector("#page")).screenshot(path=str(OUT / "OlaLa-Sticker-300dpi.png"))
        await pg2.evaluate("document.body.classList.add('guides')")
        await (await pg2.query_selector("#page")).screenshot(path=str(OUT / "OlaLa-Sticker-Vorschau-mit-Schnittlinie.png"))
        # QR-Code einzeln, 2000 px
        pg3 = await b.new_page(viewport={"width": 2000, "height": 2000})
        await pg3.set_content(f'<style>body{{margin:0}}</style><img src="{(HERE / "qr-pizzeriaolala.svg").as_uri()}" style="width:2000px;height:2000px;display:block">')
        await pg3.wait_for_timeout(300); await pg3.screenshot(path=str(OUT / "QR-pizzeriaolala-2000px.png"))
        await b.close()
asyncio.run(main())
