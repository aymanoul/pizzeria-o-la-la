# Übergabe: Website „Pizzeria O la la“

> Diese Datei zu Beginn eines neuen Chats hochladen. Sie enthält alles, was im ersten Chat entschieden, gebaut und gelernt wurde.
> Das Projekt ist **komplett getrennt** von Masjid As-Sunnah, Fahrstation und Dar as-Sunnah. Keine Farben, Logos, Repos oder Links von dort verwenden.

---

## 1. Projekt in Kürze

| | |
|---|---|
| **Kunde** | Ein Kollege von Ayman, der die Pizzeria neu eröffnet hat (Nachfolger von „Pizza Ciao“) |
| **Name** | Pizzeria O la la |
| **Adresse** | Rather Broich 4, 40472 Düsseldorf (Rath) |
| **Telefon** | 0211 71000977 (`tel:+4921171000977`), vorerst die Nummer des Vorbesitzers |
| **Halal** | 100 % Halal. Ein Halal-Siegel kommt bald und soll dann sichtbar eingebaut werden |
| **Alkohol** | **Kein Alkohol und kein Bier.** Diese Kategorie wurde gestrichen |
| **Bestellsystem** | Noch offen. Ayman erkundigt sich, welches am besten passt. Bis dahin ruft „Bestellen“ an |
| **Öffnungszeiten** | Noch unbekannt; auf der Seite steht „Werden in Kürze bekannt gegeben“ |
| **Instagram / WhatsApp** | Noch nicht vorhanden bzw. noch nicht genannt |

---

## 2. Links und Hosting

- **GitHub-Repo:** https://github.com/aymanoul/pizzeria-o-la-la (Account `aymanoul`, public, Branch `main`)
- **Live-Link (GitHub Pages):** https://aymanoul.github.io/pizzeria-o-la-la/
- **Vorschau als Artifact (claude.ai):** https://claude.ai/artifact/DPnngPCpPahgCEKoGf7D2g
- **Vorlagen:**
  - Inhalt und Speisekarte vom Vorbesitzer: https://pizzaciaorath.de
  - Aufbau und Stil: https://via-pizzeria.order.app.hd.digital/menus
- **Später möglich:** eine eigene Domain (z. B. `pizzeria-olala.de`). Dafür in GitHub unter *Settings → Pages → Custom domain* die Domain eintragen und beim Anbieter einen DNS-Eintrag anlegen (CNAME auf `aymanoul.github.io`).

### Wichtig zu GitHub (Erfahrung aus dem ersten Chat)
- **Claude kann keine neuen Repos anlegen.** Die Session ist an bestehende Repos gebunden. Ayman legt das Repo auf github.com/new an, leer und ohne README. Claude hängt es danach mit `add_repo` (Zugriff „push“) an und pusht.
- **Claude kann GitHub Pages nicht selbst einschalten,** weil die API dafür gesperrt ist. Das macht Ayman einmalig: *Repo → Settings → Pages → Source: „Deploy from a branch“ → Branch `main`, Ordner `/ (root)` → Save*. Nach 1–2 Minuten ist die Seite live.
- Pushen in ein bestehendes, angehängtes Repo funktioniert ganz normal. Spätere Änderungen sind also problemlos möglich.
- Commit-Autor: `Ayman <aymanoulhaji@yahoo.com>`.

---

## 3. Dateien im Repo

```
index.html     Seite mit Design, Aufbau und Logik (ein File, kein Framework)
menu.js        SPEISEKARTE: Gerichte und Preise nur hier ändern
img/logo.png       Logo für weißen Hintergrund (transparent, 1273×790)
img/logo-900.png   kleinere Version (für Social-Vorschau, og:image)
img/favicon.png    Browser-Icon (das rote „O“)
README.md
.nojekyll      damit GitHub Pages nichts umbaut
```

### Speisekarte ändern (`menu.js`)
Ein Gericht ist eine Zeile:
```js
[Nr, "Name", "Zutaten/Beschreibung", Preis, "Tags"]
[4, "Pizza Salami", "Rindersalami", 9.90, "b"]
```
- Tags werden mit Leerzeichen getrennt: `v` = vegetarisch, `s` = scharf, `b` = beliebt (erscheint automatisch oben unter „Beliebt“).
- Kategorien haben `id`, `name`, `icon` (Emoji) und `note` (Hinweis unter der Überschrift).
- Neue Kategorie: ein neuer Block im Array. Die Kategorie-Leiste und die Suche aktualisieren sich automatisch.

### Online-Bestellung mit Warenkorb (seit 25.10.2026)
Die Seite hat einen eigenen Warenkorb, ohne fremdes System:
- Jedes Gericht hat einen roten **+**-Button. Nach dem ersten Tippen wird daraus ein Zähler **− 2 +**.
- Tippt man auf die Karte selbst, öffnet sich ein Fenster mit Menge und **Anmerkung** (z. B. „ohne Zwiebeln“).
- Unten erscheint die Leiste **„Warenkorb ansehen“** mit Anzahl und Summe; oben rechts ein Warenkorb-Button mit Zähler.
- Ablauf: **Warenkorb** (Lieferung/Abholung, Mengen ändern) → **Kasse** (Name, Telefon, Adresse, Zeit, Zahlung, Anmerkung, mit Prüfung der Pflichtfelder) → **Fertig** (Bestell-Nr. und Übersicht).
- Warenkorb und Kundendaten bleiben im Browser gespeichert (localStorage).

**Wichtig:** Eine statische Seite kann die Bestellung nicht selbst an den Laden schicken. Deshalb gibt es im Script ganz oben die Einstellungen `SHOP`:
```js
whatsapp: "",   // Nummer eintragen, z. B. "4917612345678" → „Per WhatsApp senden“ mit fertiger Nachricht
email: "",      // alternativ: Bestellung als E-Mail
minOrder: 0, deliveryFee: 0,   // Mindestbestellwert / Liefergebühr
payments: ["Barzahlung"],      // weitere Zahlungsarten ergänzen
delivery: true, pickup: true
```
Solange `whatsapp` und `email` leer sind, zeigt die letzte Seite den Hinweis „Online-Übermittlung wird eingerichtet“ und einen Anruf-Button.
Für echten Empfang mit Tablet/Drucker im Laden später ein Bestellsystem (Gloria Food, Foodbooking …) oder ein kleiner Server nötig.

`ORDER_URL` gibt es weiterhin: Wird dort ein externes Bestellsystem eingetragen, führen die Buttons mit der Klasse `order-link` (rotes Banner, Kontakt, mobile Anruf-Leiste) dorthin.

**Sicherung:** Der Stand vor dem Warenkorb liegt im Branch `vor-warenkorb`.

---

## 4. Design-Entscheidungen

- **Weißer Hintergrund, schwarze Schrift.** Das hat Ayman ausdrücklich so gewollt, nicht Schwarz als Grund.
- **Farben** (CSS-Variablen in `:root`):
  - Rot `#e30613` (Hover `#b8000c`) für Akzente und Buttons
  - Grün `#0f9d3f` nur im Flaggen-Streifen und beim Halal-Häkchen
  - Text `#141414`, grau `#6b6763`, Flächen `#f6f5f3`, Linien `#ebe8e4`
- **Schriften** (Google Fonts):
  - „Kaushan Script“ für Überschriften (passt zum Schreibschrift-Logo)
  - „Outfit“ für alles andere
- **Flaggen-Streifen** grün-weiß-rot ganz oben (4 px).
- **Logo:** Das Original ist weiß und rot auf schwarzem Grund. Für den weißen Grund wurde es umgewandelt:
  - Schwarz wird transparent.
  - „Pizzeria“ und die Kochmütze werden schwarz.
  - Der weiße Teil des Swooshes wird hellgrau, damit er auf Weiß sichtbar bleibt.
  - „O la la“ bleibt rot.

### Aufbau der Seite (von oben nach unten)
1. Kopfzeile, beim Scrollen fixiert: kleines Logo, Navigation (Speisekarte, Öffnungszeiten, Anfahrt, Kontakt), roter Button „Bestellen“.
2. Hero: großes Logo, „Pizza, Pasta, Burger & mehr – 100 % Halal“, Adresse, Buttons „Jetzt bestellen“ und „Zur Speisekarte“, Chips (100 % Halal, Lieferung, Abholung, Frisch aus dem Ofen).
3. Kategorie-Leiste, ebenfalls fixiert, mit Emoji-Pills und Suchfeld. Die aktive Kategorie wird beim Scrollen schwarz hervorgehoben.
4. „Beliebt“ als schwarze Karten mit rotem Kreis.
5. Speisekarte als Karten: Nummer, Name, Zutaten, Tags und Preis rechts.
6. Rotes Banner „Hunger bekommen?“ mit Anruf-Button.
7. Info: Karten für Öffnungszeiten, Anfahrt (mit „Route planen“) und Kontakt, darunter eine Google-Karte (iframe).
8. Footer: Logo, Impressum, Datenschutz, Allergene (vorerst Platzhalter-Dialoge), Hinweis „Preise inkl. MwSt.“.
9. Auf dem Handy zusätzlich: eine rote Leiste „Anrufen & bestellen“ unten. Sie erscheint erst, wenn man am Hero vorbeigescrollt hat.

---

## 5. Speisekarte: Stand und Änderungen gegenüber Pizza Ciao

Übernommen vom Vorbesitzer (pizzaciaorath.de), mit den **alten Normalpreisen** (nicht den 10-%-Rabattpreisen).

Kategorien:
- Pizza (1–44)
- Party-Pizza (450)
- Pasta (70–99)
- Aufläufe (100–107)
- Salate (161–172)
- Pizzabrötchen (50–65)
- Baguette (110–119)
- Burger (180–193)
- Schnitzel (120–128)
- Fisch (210–214)
- Snacks (140–152)
- Dips & Extras (300–310)
- Dessert (220–223)
- Getränke (230–247)

**Gestrichen:** die komplette Kategorie „Alkoholische Getränke“ (250–263).

**Umbenannt** (Ayman soll das bestätigen oder zurückändern lassen):
| Alt (Pizza Ciao) | Neu |
|---|---|
| Pizza Ciao (21) | Pizza O la la |
| Pizza Ciao Spezial (22) | Pizza Spezial Hollandaise |
| Pasta Ciao Spezial (74) | Pasta Spezial Hollandaise |
| Pasta Ciao (82) | Pasta Pollo Funghi |
| Ciao Burger XXL (189) | O la la Burger XXL |
| Pizza Spezial (40): Parmaschinken | Schinken |
| Bacon (190, 191, 193) | Rinderbacon |
| Zigeunerschnitzel (122) | Paprikaschnitzel |
| Pizza Pirate Spezial (11) | Pizza Pirata Spezial |

Dazu kleine Schreibkorrekturen: Gamberetti, Greca, Calamari, Potato Wedges, Capricciosa.

**Offene Frage:** Ist „Schinken“ Puten- oder Rinderschinken? Für die Halal-Kennzeichnung eventuell genauer angeben, z. B. „Putenschinken“.

---

## 6. Offene Punkte (To-do)

- [ ] **GitHub Pages einschalten** (Ayman, einmalig, siehe Abschnitt 2), dann den Live-Link testen
- [ ] Ayman bzw. der Kollege bestätigt die Speisekarte und die Preise
- [ ] Öffnungszeiten (Lieferung und Abholung, eventuell Ruhetag)
- [ ] Lieferinfos: Mindestbestellwert, Liefergebiet bzw. PLZ, Liefergebühr
- [ ] Zahlungsarten (bar, Karte, PayPal …)
- [ ] **Impressum** mit den echten Angaben: Inhaber, Rechtsform, Anschrift, Telefon, E-Mail, ggf. USt-IdNr. **Pflicht, bevor die Seite beworben wird**
- [ ] **Datenschutzerklärung**, die Google Fonts und Google Maps erwähnt. Alternativ die Fonts lokal einbinden und die Karte erst nach Klick laden, das ist DSGVO-freundlicher
- [ ] Allergene und Zusatzstoffe (Pflicht für Gastronomie, gern als Kennzahlen pro Gericht)
- [ ] Halal-Siegel einbauen, sobald es da ist (Hero und Footer)
- [ ] Bestellsystem auswählen und `ORDER_URL` setzen. Mögliche Optionen: Lieferando, ein eigenes System wie „app smart“ (das nutzte Pizza Ciao), Hd.digital (wie bei via-pizzeria), Gloria Food, Foodbooking
- [ ] Eventuell Fotos von Pizzen und Laden (Hero-Bild, Kategorie-Bilder)
- [ ] Eventuell Instagram, WhatsApp, Google-Maps-Eintrag, eigene Domain
- [ ] Neue Telefonnummer, falls sie sich ändert (überall `+4921171000977` ersetzen)

---

## 7. Tipps und Tricks für Claude (Arbeitsweise)

**Allgemein**
- Ayman arbeitet vom iPad bzw. Handy. Antworten auf Deutsch, kurz und konkret. Vorschauen als Artifact oder Screenshot schicken.
- Ayman will zuerst einen **Plan** sehen, bevor größere Dinge gebaut werden.
- Wenn Ayman schlafen geht oder „ohne Berechtigung“ sagt: keine Aktionen starten, die eine Bestätigung brauchen (neue Websites abrufen usw.).

**Webseiten abrufen (WebFetch)**
- Nur URLs, die Ayman selbst in den Chat geschrieben hat, lassen sich zuverlässig abrufen. Andere URLs werden oft blockiert oder brauchen eine Freigabe.
- Shell-Zugriffe (curl usw.) auf normale Websites sind gesperrt. Nur Paket-Registries und GitHub gehen.

**Vorschau prüfen**
- Mit Playwright Screenshots machen: Desktop 1366×900 und Handy 390×844.
- Vor `scrollIntoView` `scroll-behavior` auf `auto` setzen, sonst entsteht der Screenshot mitten im Scrollen.
- Prüfen, dass `scrollWidth` gleich der Viewport-Breite ist, also kein seitliches Scrollen auf dem Handy.

**Artifact-Vorschau**
- Mit `files` (`menu.js`, `img/...`) veröffentlichen.
- Die Google-Maps-Karte bleibt in der Artifact-Vorschau leer, weil fremde iframes blockiert werden. Auf GitHub Pages funktioniert sie.

**Logo-Umwandlung** (Schwarz wird transparent, Weiß wird Schwarz, Rot bleibt):
```python
from PIL import Image; import numpy as np
im=np.array(Image.open('logo_original.png').convert('RGB')).astype(float)
H,W,_=im.shape; mx=im.max(2); mn=im.min(2); sat=(mx-mn)/np.maximum(mx,1)
ceil=np.where(sat>0.35,110,235)                 # farbige Pixel früher deckend
a=np.clip((mx-20)/(ceil-20),0,1)                # Alpha aus Helligkeit
rgb=np.clip(im/np.maximum(a[...,None],1e-3),0,255)
rgb=np.minimum(rgb,np.where(a[...,None]>=1,im,255))
yy=np.arange(H)[:,None].repeat(W,1); low=sat<0.3
rgb[(yy<435)&low]=[22,22,22]                    # "Pizzeria" + Mütze schwarz
rgb[(yy>730)&low]=[205,205,205]                 # weißer Swoosh-Teil hellgrau
img=Image.fromarray(np.dstack([rgb,a*255]).astype(np.uint8),'RGBA')
img.crop(img.getbbox()).save('logo.png')
```
Die y-Grenzen 435 und 730 gelten für das Original-Logo (1536×1024).

**Ablauf bei Änderungen**
1. Repo klonen: `git clone https://github.com/aymanoul/pizzeria-o-la-la`. Vorher mit `add_repo` anhängen.
2. Dateien ändern, Screenshots prüfen, Vorschau als Artifact zeigen.
3. Wenn Ayman zufrieden ist: committen und pushen. GitHub Pages aktualisiert sich nach 1–2 Minuten von selbst.

---

## 8. Startnachricht für den neuen Chat (zum Kopieren)

> Hier die Übergabe-Datei zur Website „Pizzeria O la la“ (siehe Anhang). Das Projekt ist getrennt von Masjid As-Sunnah. Repo: aymanoul/pizzeria-o-la-la. Bitte lies die Datei und häng das Repo an. Als Nächstes möchte ich: …
