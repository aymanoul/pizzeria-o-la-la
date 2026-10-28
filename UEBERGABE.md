# Übergabe: Website „Pizzeria O la la“

> Diese Datei zu Beginn eines neuen Chats hochladen. Stand: 28.10.2026 (nach dem Übertrag von Kochy's).
> Das Projekt ist **komplett getrennt** von Masjid As-Sunnah, Fahrstation, Dar as-Sunnah und Kochy's. Von Kochy's werden nur Aufbau und Technik übernommen, nie Farben, Logo oder Inhalte.

---

## 1. Projekt in Kürze

| | |
|---|---|
| **Kunde** | Kollege von Ayman, **neuer Inhaber** der bestehenden Pizzeria O la la (Name des Inhabers noch nicht bekannt) |
| **Adresse** | Volkardeyer Str. 23, 40878 Ratingen (bestätigt) |
| **Telefon / Fax** | 02102 44 44 74 (`tel:+492102444474`) · Fax 02102 740 69 93 |
| **E-Mail** | noch keine. **Nicht** die E-Mail oder Impressumsdaten des Vorbesitzers verwenden |
| **Küche** | Pizza, Pasta, Al Forno, Salate, Antipasti, Pizzabrötchen · **100 % Halal, kein Alkohol** |
| **Öffnungszeiten** | täglich 11–23 Uhr (laut Karte) |
| **Liefergebiete** | West/Mitte/Tiefenbroich ab 12,50 € · Ost ab 15 € · Düsseldorf Oberrath/Rath/Lichtenbroich/Flughafen/Unterrath ab 18,50 € · Lintorf/Hösel ab 25 € – **Mindestbestellwert ohne Getränke** |
| **Domain** | pizzeriaolala.de gehört zur Pizzeria, liegt bei **Netlify** (Nameserver nsone.net, keine MX-Einträge). Zugang muss vom Vorbesitzer kommen (Auth-Code oder Netlify-Einladung) |

---

## 2. Links

- Repo: https://github.com/aymanoul/pizzeria-o-la-la (Branch `main`)
- Vorschau (GitHub Pages): https://aymanoul.github.io/pizzeria-o-la-la/
- Dashboard-Demo: https://aymanoul.github.io/pizzeria-o-la-la/dashboard-demo/
- Vorlage für Technik: https://github.com/aymanoul/kochys (nur lesen)
- Sicherungen: Branch `vor-warenkorb`, Branch `vor-kochys-uebertrag` (Stand vor dem 28.10.2026)

GitHub Pages ist **nur Vorschau** (laut GitHub nicht für Online-Geschäfte gedacht) und hat `noindex`. Die echte Seite kommt auf Cloudflare Pages unter pizzeriaolala.de.

---

## 3. Dateien

```
index.html                Website (Design, Warenkorb, Kasse – eine Datei, kein Framework)
menu.js                   Speisekarte für die Website – NICHT von Hand ändern (wird erzeugt, siehe 4.)
druck/daten.js            QUELLE der Speisekarte: Nummern, Namen, Allergene, Preise
druck/menu-aus-daten.js   erzeugt ../menu.js aus daten.js:  node druck/menu-aus-daten.js
druck/karte.html          gedruckte Karte (Wickelfalz 303 × 216 mm inkl. 3 mm Beschnitt)
druck/render.py           Karte als PDF + Vorschaubilder:  cd druck && python3 render.py ausgabe/karte
druck/fonts/              Schriften für die Druckkarte (Outfit statisch, Courgette)
dashboard-demo/index.html Dashboard-Demo (eine Datei, Beispieldaten)
impressum/, datenschutz/  Rechtstexte als eigene Seiten
fonts/                    Outfit (variabel) + Courgette, lokal, mit OFL-Lizenzen
img/                      logo.png (weißer Grund, 1341×840), logo-hell.png (dunkler Grund), logo-900.png,
                          og-image.png (1200×630), App-Icons (grün, Variante B)
sw.js                     Service Worker (Cache-Version bei jeder Änderung hochzählen, jetzt olala-v6)
manifest.webmanifest      Web-App „O La La“
```

---

## 4. Speisekarte

- **Eine Quelle für Karte und Website:** `druck/daten.js`. Nach jeder Änderung `node druck/menu-aus-daten.js` ausführen, dann sind Website und Druckkarte gleich.
- Nummern **01–82 fortlaufend** (Pizza 1–35, Pasta 36–53, Al Forno 54–60, Salate 61–71, Antipasti 72–74, Pizzabrötchen 75–82), zweistellig angezeigt. Getränke intern 101–105, ohne Nummer.
- Format in `menu.js` (wie Kochy's): `SIZES` (Größen mit eigenem Preis), `GROUPS` (`one` = Pflichtauswahl, `many` = Extras mit Aufpreis), Gericht = `[Nr, Name, Allergene, Beschreibung, Preis oder [Klein, Groß, Family], Tags, {Optionen}]`, `^` = hochgestellt.
- **O-la-la-Erweiterung:** Extra-Preis darf eine Liste je Größe sein, `null` = „nicht möglich“:
  - Gefüllter Käserand 3 / 4 € (Family nicht möglich)
  - Extra Käse, Thunfisch, Hähnchen, Mozzarella, Hirtenkäse, Scampi, Meeresfrüchte, Bolognese 2 / 3 / 5 €
  - Weitere Zutat 1 / 1,50 / 3 €
  - Pasta: mit Käse überbacken + 2 € · Salate: Dressing-Pflichtauswahl · Pizzabrötchen: Kräuterbutter oder Aioli
- Calzone (10, 11) nur in Groß. Mineralwasser nur 1,0 l.
- Warenkorb-Schlüssel `olala-cart4` – **hochzählen**, wenn sich Nummern ändern.

---

## 5. Website (`SHOP` oben im Script von `index.html`)

- Übernommen von Kochy's: Schriften lokal, Google-Karte erst nach Klick, Impressum/Datenschutz als Seiten, „Jetzt geöffnet · bis 23:00 Uhr“ aus `SHOP.hours`, Nummern, `measure()` für den Sprung zu Kategorien, kompakte Karten am Handy, ld+json (Restaurant), og-image, `noindex`.
- `orderWhatsapp` / `orderEmail` leer → Button „Bestellübersicht anzeigen“, Kunde ruft an. Sobald eine Nummer/Adresse drinsteht, wird die Bestellung als fertige Nachricht geschickt (dann Datenschutz Punkt 4 anpassen). `email` = Kontaktadresse (noch leer).
- `minOhneGetraenke: true`, Liefergebühr 0 €, Zahlung „Barzahlung“ (unbestätigt).
- `demoDashboard` ist **nur** über `?demo=1` an (Link im Dashboard). Normale Besucher schicken nichts an die Demo.
- **Beim Umzug auf pizzeriaolala.de:** `noindex` entfernen, Hosting-Abschnitt im Datenschutz auf Cloudflare ändern.

---

## 6. Design (feste Entscheidungen)

- Weißer Hintergrund, Schrift Schwarz `#141414`, Akzent Rot `#e30613` (Hover `#b8000c`), Grün `#0f9d3f` nur im Flaggen-Streifen (grün · weiß · rot).
- Schriften: **Courgette** (Überschriften), **Outfit** (Text).
- Kopfzeile mit Logo · Start: Logo, „Pizza, Pasta, Salate & mehr – 100 % Halal“, Adresse, „Jetzt geöffnet“, **ein** roter Button „Jetzt anrufen“.
- Kategorie-Leiste wie Lieferando: fette Schrift, aktive Kategorie dunkel `#2b2b2b`, Verlauf rechts, runder Listen-Button, Suche „Suche Pizzeria O la la“.
- **Nicht verwenden:** Hintergrundbild hinter dem Logo, „Beliebt“-Bereich, graue Chips unter dem Logo, zweiter Button, Ornamente, alles was nach Moena aussieht. Logo = Version mit verbundenem Strich.

---

## 7. Dashboard-Demo (28.10.2026)

- Wie Kochy's, in O-la-la-Farben: Bestellungen (Neu → In Zubereitung → Unterwegs/abholbereit → erledigt), **Automatik an** (Lieferung 45 Min., Abholung 20 Min., „Viel los“ +15 Min.), **iPhone-Mitteilung** am Handy, **Mac-Mitteilung** oben rechts am Computer, Ton, Bon-Vorschau (80 mm) und Telegram-Vorschau, Umsatz (heute / 7 / 30 Tage / 12 Monate, Top-Gerichte, Stoßzeiten 11–22 Uhr, Liefergebiete, Zahlungsarten, CSV-Export), Einstellungen (Automatik, Zeiten, pausieren, Lieferung, ausverkauft-Schalter, „So kommt die Bestellung an“).
- Beispieldaten aus `menu.js`: meist Größe Groß, Extras mit Preis je Größe, Mindestwert ohne Getränke, Telefonnummern gekürzt, Speicher `olala-demo-*`, Bestell-Nr. `OL-TTMM-HHMM`.
- Diagrammfarbe `#d0202a` (Hover `#9e1018`) mit dem Dataviz-Prüfskript getestet.
- Kein Tagesangebot (gibt es bei O la la nicht).

---

## 8. Plan für echte Bestellungen (Kurzfassung)

Website → Cloudflare Worker (rechnet Preise nach) → Datenbank D1 (EU) → Telegram aufs Laden-Handy + Epson TM-m30III (Server Direct Print) → Dashboard unter `/admin` mit Cloudflare Access (Einmal-Code per E-Mail). Online-Zahlung: **Stripe Checkout** (Weiterleitung, Apple Pay/Karte, 1,5 % + 0,25 €) und **PayPal** (2,99 % + 0,39 €). Konten gehören dem Inhaber, geheime Schlüssel trägt er selbst bei Cloudflare ein, nie per Chat.

**Aber zuerst das Kassensystem klären** (Lehre aus Kochy's: Chef nutzt WinOrder und wollte kein zweites Dashboard). Wenn die Kasse eine Webshop-Schnittstelle hat, gehen Website-Bestellungen direkt dorthin.

---

## 9. Offene Fragen an den Inhaber

**Kasse**
1. Welches Kassensystem nutzt er (WinOrder, orderbird, Gastrofix, Vectron, SumUp-Kasse, keins)?
2. Kommen Lieferando-Bestellungen dort automatisch an? Nutzt er Lieferando überhaupt?
3. Hat die Kasse eine Schnittstelle für einen eigenen Webshop? Was kostet sie?
4. Will er ein eigenes Dashboard – oder soll alles in der Kasse landen?
5. Bondrucker vorhanden? Welches Modell, WLAN/LAN?

**Recht und Inhalt**
6. Impressum: voller Name, Rechtsform, Kontakt-E-Mail, USt-ID (falls vorhanden)
7. Allergene/Zusatzstoffe in `druck/daten.js` mit der Karte im Laden abgleichen (stehen schon an jedem Gericht)
8. Getränke: Pfand gesondert angeben („2,50 € zzgl. 0,25 € Pfand“, § 7 PAngV) – Höhe des Pfands? Die Karte sagt bisher „inkl. Pfand“
9. Preise überall gleich (Lieferando, Flyer, alte Seite)?
10. Datenschutzerklärung vor dem Start mit einem Generator (eRecht24, IT-Recht-Kanzlei) erzeugen bzw. prüfen lassen
11. Liefergebühr, Zahlungsarten (Karte an der Tür?), Lieferzeiten gleich wie Öffnungszeiten?
12. Domain: Auth-Code oder Netlify-Zugang vom Vorbesitzer

---

## 10. Arbeitsweise mit Ayman

- Arbeitet vom iPad/Handy, schreibt Deutsch, kennt sich mit Technik **nicht** aus → Einrichtungen als Schritt-für-Schritt-Anleitung mit genauen Klicks, wer was macht, was es kostet.
- Kann keine Zugriffe/Freigaben geben, wenn er weg ist → nichts starten, was eine Bestätigung braucht.
- Bei Design-Fragen mehrere Varianten zeigen; Apple-Stil bei Animationen und Meldungen.
- Vorschau prüfen: Playwright, Handy 390×844 und Computer 1440×900, `scrollWidth == innerWidth`, keine JS-Fehler, `scroll-behavior:auto` vor `scrollIntoView`, für Screenshots die Uhrzeit auf den Abend stellen (`context.clock.setSystemTime`), Dateinamen eindeutig (Bildvorschau cacht).
- Commit + Push, live prüfen, Screenshots schicken, diese Datei aktualisieren.

---

## 11. Sticker „10 % Rabatt“ (28.10.2026)

- Quelle: `druck/sticker/` – `qr.py` (QR-Code), `sticker.html` (Gestaltung, `?v=a|b|c`), `render.py` (Druck-PDF + Bilder), Schriften in `druck/sticker/fonts/` (OFL).
- Format **180 × 100 mm** (nach Foto vom Moena-Sticker geschätzt – Maße vom Inhaber bestätigen lassen) + 3 mm Beschnitt.
- Grüner Hintergrund wie das App-Symbol, **QR-Code weiß direkt auf Grün** (Ayman wollte keine weiße Fläche), runde Punkte, Logo frei in der Mitte (11,5 von 33 Modulen, Fehlerkorrektur H; größer = zu wenig Reserve, getestet).
- Code **OLALA10** (in Großbuchstaben gedruckt; im Shop später in jeder Schreibweise gültig machen).
- Varianten: A Barlow Condensed kursiv + roter Code · B Bebas Neue + Kaushan Script + gestrichelter Gutschein-Rahmen (Empfehlung) · C Bebas Neue + Courgette.
- Erste Version (weiße QR-Fläche, roter Coupon) gefiel nicht – nicht wieder so machen.
- **Vor dem Verteilen:** Domain muss umgezogen sein (sonst landet man auf der alten Seite) und der Code muss im Shop funktionieren. Probedruck mit iPhone und Android scannen (weiße QR-Codes auf dunklem Grund lesen ältere Scanner-Apps manchmal nicht).

---

## 12. Startnachricht für den nächsten Chat

> Hier die Übergabe-Datei zur Pizzeria O la la (Anhang). Bitte häng das Repo **aymanoul/pizzeria-o-la-la** (Zugriff push) an und lies `UEBERGABE.md`. Als Nächstes möchte ich: …
