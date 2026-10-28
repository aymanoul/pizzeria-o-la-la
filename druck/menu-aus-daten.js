/* Erzeugt ../menu.js (Website) aus daten.js (gedruckte Speisekarte).
   So gibt es nur EINE Preisliste.  Aufruf:  node druck/menu-aus-daten.js  */
const fs = require('fs'), path = require('path');
global.window = {};
eval(fs.readFileSync(path.join(__dirname, 'daten.js'), 'utf8'));
const K = window.KARTE;
const sup = s => String(s || '').replace(/<sup>([^<]*)<\/sup>/g, '^$1');   // <sup>2,5</sup> → ^2,5
const T = t => ({ veg: 'v', scharf: 's', haus: 'h', neu: 'n' }[t] || '');
const J = x => JSON.stringify(x);
const num = s => parseInt(s, 10);

const cats = [];
// Pizza: Calzone gibt es nur in „Groß“ → [null, Preis, null]
cats.push({ id: 'pizza', name: 'Pizza', icon: '🍕', sizes: 'pizza', groups: ['exPizza'],
  note: 'Aus dem Steinofen – alle Pizzen^D,G mit Tomatensauce und Käse^1,2 (außer Nr. 32). Für Extras wie gefüllten Käserand einfach auf die Pizza tippen.',
  hint: 'z. B. ohne Zwiebeln, gut durchgebacken',
  items: K.pizza.map(([nr, n, k, d, a, b, c, t]) => [num(nr), n, k, sup(d), [a, b, c], T(t)]) });
cats.push({ id: 'pasta', name: 'Pasta', icon: '🍝', groups: ['exPasta'],
  note: 'Alle Nudelgerichte^D auf Wunsch mit Käse^G,1,2 überbacken: + 2,00 € – einfach auf das Gericht tippen.',
  items: K.pasta.map(([nr, n, k, d, p, t]) => [num(nr), n, k, sup(d), p, T(t)]) });
cats.push({ id: 'alforno', name: 'Al Forno', icon: '🧀', note: 'Überbackene Gerichte – heiß aus dem Ofen.',
  items: K.forno.map(([nr, n, k, d, p, t]) => [num(nr), n, k, sup(d), p, T(t)]) });
cats.push({ id: 'salate', name: 'Salate', icon: '🥗', groups: ['dressing'],
  note: 'Alle Salate wahlweise mit Cocktail-Dressing, Joghurt-Dressing^G oder Essig & Öl.',
  items: K.salate.map(([nr, n, k, d, p, t]) => [num(nr), n, k, sup(d), p, T(t)]) });
cats.push({ id: 'antipasti', name: 'Antipasti', icon: '🫑',
  items: K.antipasti.map(([nr, n, k, d, p, t]) => [num(nr), n, k, sup(d), p, T(t)]) });
const B = K.broetchen;
cats.push({ id: 'broetchen', name: 'Pizzabrötchen', icon: '🥖', items: [
  [num(B[0][0]), B[0][1], B[0][2], '6 Stück', B[0][4], '', { groups: ['butter'] }],
  ...B.slice(2, 8).map(([nr, _, k, d, p]) => [num(nr), 'Gefüllte Pizzabrötchen', ['D,G', k].filter(Boolean).join(','), sup(d) + ' · 8 Stück', p, '']),
  [num(B[8][0]), B[8][1], B[8][2], sup(B[8][3]), B[8][4], '']
]});
cats.push({ id: 'getraenke', name: 'Getränke', icon: '🥤', sizes: 'drink', drinks: true, note: 'Alle Getränkepreise inkl. Pfand.', items: [
  [101, 'Coca-Cola', '6', '', [2.50, 3.50], ''],
  [102, 'Cola light', '4,6', '', [2.50, 3.50], ''],
  [103, 'Fanta', '1', '', [2.50, 3.50], ''],
  [104, 'Sprite', '', '', [2.50, 3.50], ''],
  [105, 'Mineralwasser', '', 'mit Kohlensäure', [null, 2.00], '']
]});

// Extras-Preise je Größe aus der gedruckten Karte (Klein, Groß, Family; null = nicht möglich)
const ex = K.extras;   // [Name, '', klein, groß, family]
const head = `/* =========================================================
   SPEISEKARTE – Pizzeria O la la (Ratingen)
   NICHT von Hand ändern: wird aus druck/daten.js erzeugt (node druck/menu-aus-daten.js),
   damit Website und gedruckte Karte immer gleich sind.

   Format pro Gericht:  [Nr, "Name", "Allergene/Zusatzstoffe", "Beschreibung", Preis, "Tags", {Optionen}]
   - Nr: wie auf der gedruckten Karte (1–82). Ab 100 = ohne Nummer angezeigt (Getränke).
   - Preis: Zahl oder Liste je Größe (Namen in SIZES), null = Größe gibt es nicht.
   - ^ macht hochgestellt (Allergene/Zusatzstoffe), z. B. "Truthahnschinken^2,5"
   - Tags: v vegetarisch, s scharf, h Haus-Tipp, n neu
   - Optionen: { sizes: "…", groups: ["…"] } – sonst gelten sizes/groups der Kategorie
   ========================================================= */

window.SIZES = { pizza: ["Klein Ø 24 cm", "Groß Ø 29 cm", "Family Ø 41 cm"], drink: ["0,33 l", "1,0 l"] };
window.SIZE_TITLE = { pizza: "Größe wählen", drink: "Größe wählen" };

/* Auswahl-Gruppen
   one:  genau eine Auswahl (ohne Aufpreis), die erste ist vorausgewählt
   many: Extras mit Aufpreis [id, Name, Preis] – Preis darf eine Liste je Größe sein (null = nicht möglich) */
window.GROUPS = {
  exPizza: { label: "Extras", many: [
    ["rand",   "Gefüllter Käserand^G,1,2", [${ex[3].slice(2).map(x => x == null ? 'null' : x.toFixed(2)).join(', ')}]],
    ["kaese",  "Extra Käse^G,1,2",         [${ex[1].slice(2).map(x => x.toFixed(2)).join(', ')}]],
    ["tonno",  "Extra Thunfisch^C",        [${ex[1].slice(2).map(x => x.toFixed(2)).join(', ')}]],
    ["huhn",   "Extra Hähnchenfilet",      [${ex[2].slice(2).map(x => x.toFixed(2)).join(', ')}]],
    ["moz",    "Extra Mozzarella^G",       [${ex[2].slice(2).map(x => x.toFixed(2)).join(', ')}]],
    ["hirt",   "Extra Hirtenkäse^G",       [${ex[2].slice(2).map(x => x.toFixed(2)).join(', ')}]],
    ["scampi", "Extra Scampi^E",           [${ex[2].slice(2).map(x => x.toFixed(2)).join(', ')}]],
    ["meer",   "Extra Meeresfrüchte^C,E",  [${ex[2].slice(2).map(x => x.toFixed(2)).join(', ')}]],
    ["bolo",   "Extra Bolognese",          [${ex[2].slice(2).map(x => x.toFixed(2)).join(', ')}]],
    ["zutat",  "Weitere Zutat (bitte in der Anmerkung nennen)", [${ex[0].slice(2).map(x => x.toFixed(2)).join(', ')}]]
  ]},
  exPasta:  { label: "Extras", many: [["ueber", "Mit Käse^G,1,2 überbacken", 2.00]] },
  dressing: { label: "Dressing", one: ["Cocktail-Dressing", "Joghurt-Dressing^G", "Essig & Öl"] },
  butter:   { label: "Dazu", one: ["Kräuterbutter", "Aioli"] }
};

window.MENU = [
`;
const body = cats.map(c => {
  const { items, ...meta } = c;
  const m = Object.entries(meta).map(([k, v]) => `${k}: ${J(v)}`).join(', ');
  return `  { ${m}, items: [\n` + items.map(i => '    ' + J(i)).join(',\n') + '\n  ]}';
}).join(',\n');
fs.writeFileSync(path.join(__dirname, '..', 'menu.js'), head + body + '\n];\n');
const n = cats.reduce((s, c) => s + c.items.length, 0);
console.log('menu.js geschrieben:', n, 'Einträge');
