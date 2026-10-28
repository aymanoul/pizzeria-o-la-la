/* =========================================================
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
    ["rand",   "Gefüllter Käserand^G,1,2", [3.00, 4.00, null]],
    ["kaese",  "Extra Käse^G,1,2",         [2.00, 3.00, 5.00]],
    ["tonno",  "Extra Thunfisch^C",        [2.00, 3.00, 5.00]],
    ["huhn",   "Extra Hähnchenfilet",      [2.00, 3.00, 5.00]],
    ["moz",    "Extra Mozzarella^G",       [2.00, 3.00, 5.00]],
    ["hirt",   "Extra Hirtenkäse^G",       [2.00, 3.00, 5.00]],
    ["scampi", "Extra Scampi^E",           [2.00, 3.00, 5.00]],
    ["meer",   "Extra Meeresfrüchte^C,E",  [2.00, 3.00, 5.00]],
    ["bolo",   "Extra Bolognese",          [2.00, 3.00, 5.00]],
    ["zutat",  "Weitere Zutat (bitte in der Anmerkung nennen)", [1.00, 1.50, 3.00]]
  ]},
  exPasta:  { label: "Extras", many: [["ueber", "Mit Käse^G,1,2 überbacken", 2.00]] },
  dressing: { label: "Dressing", one: ["Cocktail-Dressing", "Joghurt-Dressing^G", "Essig & Öl"] },
  butter:   { label: "Dazu", one: ["Kräuterbutter", "Aioli"] }
};

window.MENU = [
  { id: "pizza", name: "Pizza", icon: "🍕", sizes: "pizza", groups: ["exPizza"], note: "Aus dem Steinofen – alle Pizzen^D,G mit Tomatensauce und Käse^1,2 (außer Nr. 32). Für Extras wie gefüllten Käserand einfach auf die Pizza tippen.", hint: "z. B. ohne Zwiebeln, gut durchgebacken", items: [
    [1,"Margherita","D,G","",[6,7,15],""],
    [2,"Salami","2,3,D,G","mit Rindersalami",[7,8,16],""],
    [3,"Hollandaise","D,G","mit Hähnchenbrust, Broccoli und Sauce Hollandaise",[8.5,11,20],"n"],
    [4,"Prosciutto","D,G","mit Formfleisch-Truthahnschinken^2,5",[7,8,16],""],
    [5,"Europa","D,G","mit Formfleisch-Truthahnschinken^2,5 und Champignons",[8,9.5,19],""],
    [6,"Tonno","D,G,C","mit Thunfisch",[7,9,18],""],
    [7,"Romana","D,G,C","mit Thunfisch und Zwiebeln",[8,10,19],""],
    [8,"Spinaci","D,G","mit Spinat",[7,8,16],""],
    [9,"Funghi","D,G","mit frischen Champignons",[7,8,16],""],
    [10,"Calzone","D,G","gefüllt mit Formfleisch-Truthahnschinken^2,5, Champignons und Käse^1,2",[null,9.5,null],""],
    [11,"Calzone","D,G,C","gefüllt mit Thunfisch, Champignons und frischer Paprika",[null,11,null],""],
    [12,"Hawaii","D,G","mit Formfleisch-Truthahnschinken^2,5 und Ananas",[8,9.5,20],""],
    [13,"Contadina","D,G","mit Formfleisch-Truthahnschinken^2,5 und Broccoli",[8,9.5,20],""],
    [14,"Buffalina","D,G","mit frischen Tomaten, Mozzarella und Basilikum",[8,10,20],""],
    [15,"Bolognese","D,G","mit Fleischsauce (Rind)",[8,9.5,20],""],
    [16,"Napoli","D,G,C","mit Sardellen, Oliven und Kapern",[8,10,20],""],
    [17,"Italia","D,G","mit frischer Paprika, Zwiebeln und Spinat",[8,10,20],""],
    [18,"Gyros","D,G","mit Hähnchenfleisch",[8,9.5,20],""],
    [19,"O la la","D,G,C","mit Thunfisch, Formfleisch-Truthahnschinken^2,5, Artischocken, Oliven und Spinat",[9,12,24],"h"],
    [20,"Mare Monti","D,G,C,E","mit Meeresfrüchten",[8.5,10,24],""],
    [21,"Scampi Special","D,G,E","mit Krabben, Cherrytomaten und Rucola",[9,11,24],""],
    [22,"Greek Pizza","D,G","mit Gyros, Hirtenkäse und Peperoni",[9,11,24],""],
    [23,"Sicilia","D,G","mit Spinat, frischer Paprika, Mais und Hirtenkäse",[9,12,24],""],
    [24,"Sucuk","D,G","mit Knoblauchwurst",[8,9,20],""],
    [25,"Capricciosa","D,G,A","mit Formfleisch-Truthahnschinken^2,5, Champignons, Spinat und Ei",[8.5,11,24],""],
    [26,"Rucola","D,G","mit frischen Tomaten und Mozzarella",[9,11,24],""],
    [27,"Pollo","D,G","mit Hähnchenbrust, frischer Paprika und Mais",[9,11,24],""],
    [28,"Diavolo","D,G","mit Salami^2,3 und Peperoni",[8,10,20],"s"],
    [29,"Quattro Stagioni","D,G,C","mit Thunfisch, Formfleisch-Truthahnschinken^2,5, Artischocken und Champignons",[8.5,10,22],""],
    [30,"Vegetariana","D,G","mit Gemüse",[9,11,22],"v"],
    [31,"Carciofi","D,G","gegrillte Artischocken und frische Champignons in Olivenöl",[9,10,22],"v"],
    [32,"Odri","D,G","Napoli-Tomatensauce, Cherrytomaten, Rucola, Parmesan und Olivenöl extra vergine – ohne Gouda, unter 400 kcal",[9,11,22],"v"],
    [33,"Quattro Formaggi","D,G","mit 4 Käsesorten^1,2",[8.5,11,24],""],
    [34,"Gorgonzola","D,G,E","mit Scampi und Spinat",[9,11,24],""],
    [35,"Mista","D,G","mit Formfleisch-Truthahnschinken^2,5, Salami^2,3 und frischen Champignons",[9,11,24],""]
  ]},
  { id: "pasta", name: "Pasta", icon: "🍝", groups: ["exPasta"], note: "Alle Nudelgerichte^D auf Wunsch mit Käse^G,1,2 überbacken: + 2,00 € – einfach auf das Gericht tippen.", items: [
    [36,"Spaghetti Bolognese","D,G","mit Fleischsauce",9.5,""],
    [37,"Spaghetti Napoli","D","mit Tomatensauce und Basilikum",8,""],
    [38,"Spaghetti Carbonara","D,G,A","mit Formfleisch-Truthahnschinken^2,5, Ei und Sahnesauce",10,""],
    [39,"Spaghetti O la la Spezial","D,E","mit Gambas, Cherrytomaten und Knoblauch in leichter Kräuter-Napolisauce",13,"h"],
    [40,"Spaghetti Rimini","D,E,G","mit Krabben, frischen Tomaten, Spinat und Sahnesauce",11,""],
    [41,"Spaghetti Mare Monti","D,G,C,E","mit Meeresfrüchten, Knoblauch und Tomatensahnesauce",11,""],
    [42,"Rigatoni Scampi","D,G,E","mit Krabben, Broccoli, Knoblauch und Tomatensahnesauce",11,""],
    [43,"Rigatoni Campagnola","D,G","mit Cherrytomaten, frischer Paprika, Champignons und Tomatensahnesauce",10,""],
    [44,"Rigatoni Arrabbiata","D","mit Peperoni, Zwiebeln und Napolisauce",10,"s"],
    [45,"Rigatoni al Pollo","D,G","mit Putenbrustfilet, frischer Paprika, Cherrytomaten, Zwiebeln und Sahnesauce",11,""],
    [46,"Rigatoni Chicken Alfredo","D,G","mit Hähnchenbrustfilet in Kräuterbutter, Parmesan, schwarzem Pfeffer und Sahnesauce",11,""],
    [47,"Rigatoni Curry","D,G","mit Hähnchenbrustfilet, Champignons und Curry-Sahnesauce",11,""],
    [48,"Tortellini alla Panna","D,G","mit Formfleisch-Truthahnschinken^2,5 und Sahnesauce",10,""],
    [49,"Tortellini Carbonara","D,G,A","mit Formfleisch-Truthahnschinken^2,5, Ei und Sahnesauce",10,""],
    [50,"Tortellini della Casa","D,G","mit Formfleisch-Truthahnschinken^2,5 und Champignons in Bolognesesauce, überbacken",11,""],
    [51,"Tortellini Salvatore","D,G","mit Spinat, Gorgonzola und Sahnesauce",11,""],
    [52,"Tagliatelle al Salmone","D,G,C","mit Lachs, Zwiebeln, Knoblauch und Tomatensahnesauce",11,""],
    [53,"Tagliatelle al Pollo","D,G","mit Hähnchenbrust, frischer Paprika, Champignons und Sahnesauce",11,""]
  ]},
  { id: "alforno", name: "Al Forno", icon: "🧀", note: "Überbackene Gerichte – heiß aus dem Ofen.", items: [
    [54,"Lasagne al Forno","D,G","mit Fleischsauce und Formfleisch-Truthahnschinken^2,5",10,""],
    [55,"Cannelloni","D,G","gefüllt mit Spinat und Ricotta in Napolisauce",10,""],
    [56,"Tris di Pasta","D,G","Cannelloni, Tortellini und Rigatoni in Tomatensahnesauce",11,""],
    [57,"Rigatoni Quattro Formaggi","D,G","mit 4 Käsesorten^1,2",11,""],
    [58,"Rigatoni Tonno","D,G,C","mit Thunfisch und Zwiebeln in Tomatensahnesauce",11,""],
    [59,"Tortellini Quattro Formaggi","D,G","mit 4 Käsesorten^1,2",11,""],
    [60,"Verdure al Forno","D,G","Gemüse in Napolisauce mit Knoblauch",11,"v"]
  ]},
  { id: "salate", name: "Salate", icon: "🥗", groups: ["dressing"], note: "Alle Salate wahlweise mit Cocktail-Dressing, Joghurt-Dressing^G oder Essig & Öl.", items: [
    [61,"Mista","","grüner Salat, Tomaten, Gurken, Zwiebeln, frische Paprika und Mais",6.5,""],
    [62,"Capricciosa","A,C,G","grüner Salat, Tomaten, Gurken, Formfleisch-Truthahnschinken^2,5, Ei, Thunfisch, frische Paprika, Artischocken und Käse^1,2",10,""],
    [63,"O la la","","grüner Salat, Tomaten, Gurken, frische Paprika, Mais, gebratene Hähnchenbrust und frische Champignons",10,"h"],
    [64,"Mediterranea","G","Tomaten, Gurken, Zwiebeln, Oliven^2, Paprika, Hirtenkäse und Peperoni",10.5,""],
    [65,"Caprese","G","Tomaten, Mozzarella und Basilikum in Olivenöl",9,""],
    [66,"Smeralda","C,E,G","grüner Salat, Thunfisch, Krabben, Artischocken, Mozzarella, Oliven^2, Tomaten und Gurken",12,""],
    [67,"Verde","","grüner Salat",5,""],
    [68,"Cetrioli","","Gurkensalat",6,""],
    [69,"Pomodori","","Tomatensalat",6,""],
    [70,"Tropicana","G","gemischter Salat mit Formfleisch-Truthahnschinken^2,5, Käse^1,2 und Ananas",10,""],
    [71,"Nizza","C","gemischter Salat mit Thunfisch und Zwiebeln",10,""]
  ]},
  { id: "antipasti", name: "Antipasti", icon: "🫑", items: [
    [72,"Gebratene Paprika","","in Napoli-Knoblauchsauce",6.5,""],
    [73,"Gebratene Auberginen","","in Napoli-Knoblauchsauce",6.5,""],
    [74,"Hirtenkäse überbacken","G","mit frischen Tomaten und Zwiebeln in Olivenöl",6.5,""]
  ]},
  { id: "broetchen", name: "Pizzabrötchen", icon: "🥖", items: [
    [75,"Pizzabrötchen","D","6 Stück",3,"",{"groups":["butter"]}],
    [76,"Gefüllte Pizzabrötchen","D,G","Formfleisch-Truthahnschinken^2,5 und Käse^1,2 · 8 Stück",7.5,""],
    [77,"Gefüllte Pizzabrötchen","D,G,C","Thunfisch, Zwiebeln und Käse^1,2 · 8 Stück",8.5,""],
    [78,"Gefüllte Pizzabrötchen","D,G","Spinat, Hirtenkäse und Käse^1,2 · 8 Stück",8.5,""],
    [79,"Gefüllte Pizzabrötchen","D,G","Sucuk und Käse^1,2 · 8 Stück",7.5,""],
    [80,"Gefüllte Pizzabrötchen","D,G,C","Rucola, Thunfisch und Mozzarella · 8 Stück",10,""],
    [81,"Gefüllte Pizzabrötchen","D,G","Formfleisch-Truthahnschinken^2,5 und Ananas (Hawaii) · 8 Stück",8.5,""],
    [82,"Focaccine","D","hausgemachtes Fladenbrot aus dem Steinofen mit Knoblauch, Olivenöl und Gewürzen",5,""]
  ]},
  { id: "getraenke", name: "Getränke", icon: "🥤", sizes: "drink", drinks: true, note: "Alle Getränkepreise inkl. Pfand.", items: [
    [101,"Coca-Cola","6","",[2.5,3.5],""],
    [102,"Cola light","4,6","",[2.5,3.5],""],
    [103,"Fanta","1","",[2.5,3.5],""],
    [104,"Sprite","","",[2.5,3.5],""],
    [105,"Mineralwasser","","mit Kohlensäure",[null,2],""]
  ]}
];
