"""Gedruckte Speisekarte (Wickelfalz, 303 × 216 mm mit 3 mm Beschnitt) als PDF + Vorschaubilder erzeugen.
Aufruf (im Ordner druck/):  python3 render.py ausgabe/karte
Braucht Python-Playwright mit Chromium. Inhalt kommt aus daten.js – dieselbe Datei erzeugt auch ../menu.js
(node menu-aus-daten.js), damit Karte und Website immer gleich sind."""
import asyncio, sys, time, os, pathlib
from playwright.async_api import async_playwright
HERE = pathlib.Path(__file__).resolve().parent
OUT = sys.argv[1] if len(sys.argv) > 1 else "ausgabe/karte"
os.makedirs(os.path.dirname(OUT) or ".", exist_ok=True)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 1200, "height": 900}, device_scale_factor=2)
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto((HERE / "karte.html").as_uri()); await pg.evaluate("document.fonts.ready.then(()=>window.balanced)"); await pg.wait_for_timeout(500)
        ov = await pg.evaluate("""[...document.querySelectorAll('.panel')].map(p=>{const i=p.querySelector('.inner');
          i.style.height='auto';const nat=i.scrollHeight;i.style.height='';const cs=getComputedStyle(p);const avail=p.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom);
          return (p.parentElement.classList[1])+'-'+p.classList[1]+': Inhalt '+(nat*25.4/96).toFixed(1)+' mm / Platz '+(avail*25.4/96).toFixed(1)+' mm'})""")
        print("\n".join(ov)); print("Fehler:", errs)
        await pg.pdf(path=OUT + ".pdf", width="303mm", height="216mm", print_background=True, prefer_css_page_size=True)
        await pg.evaluate("document.body.classList.add('guides')")
        await pg.set_viewport_size({"width": 1145, "height": 817})
        for i, sel in enumerate(['.aussen', '.innen']):
            el = await pg.query_selector(sel); await el.screenshot(path=f"{OUT}-{['aussen','innen'][i]}-{int(time.time()) % 100000}.png", scale="device")
        await b.close()
asyncio.run(main())
