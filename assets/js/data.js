const BTP_DATA = {
  prices: {
    ciment_sac_50kg: 4000,
    sable_m3: 3000,
    gravier_m3: 20000,
    acier_kg: 450,
    brique_unite: 125,
    carrelage_m2: 6000,
    peinture_20l: 35000,
    main_oeuvre_jour: 5000,
    tole_unite: 6000,
    bois_charpente: 250000
  },
  dosages: {
    150: { usage: "Beton de proprete", ciment_kg_m3: 150, sable_m3_m3: 0.55, gravier_m3_m3: 0.85 },
    250: { usage: "Beton simple", ciment_kg_m3: 250, sable_m3_m3: 0.5, gravier_m3_m3: 0.8 },
    300: { usage: "Beton courant", ciment_kg_m3: 300, sable_m3_m3: 0.45, gravier_m3_m3: 0.8 },
    350: { usage: "Beton arme", ciment_kg_m3: 350, sable_m3_m3: 0.4, gravier_m3_m3: 0.8 }
  },
  steel: { 6: 0.222, 8: 0.395, 10: 0.617, 12: 0.888, 14: 1.21, 16: 1.58, 20: 2.47, 25: 3.85, 32: 6.31 },
  constants: {
    waterPerM3: 175,
    masonryMortarPerM2: 0.025,
    plasterSandFactor: 1.1,
    blocksPerM2: { 10: 12, 12: 11, 15: 10, 20: 9 }
  }
};

const CALCULATOR_LINKS = [
  { id: "beton", title: "Calcul beton", desc: "Volume, ciment, sable, gravier et cout.", href: "pages/beton.html", icon: "concrete" },
  { id: "maconnerie", title: "Briques et maconnerie", desc: "Murs, ouvertures, briques et mortier.", href: "pages/maconnerie.html", icon: "bricks" },
  { id: "enduit", title: "Enduit ciment", desc: "Surface, mortier, ciment et sable.", href: "pages/enduit.html", icon: "layers" },
  { id: "peinture", title: "Peinture", desc: "Litres, pots et budget peinture.", href: "pages/peinture.html", icon: "paint" },
  { id: "carrelage", title: "Carrelage", desc: "Surface, carreaux, cartons et cout.", href: "pages/carrelage.html", icon: "tiles" },
  { id: "fondation", title: "Fondation", desc: "Fouille, proprete, beton arme et cout.", href: "pages/fondation.html", icon: "foundation" },
  { id: "dalle", title: "Dalle beton", desc: "Surface, volume, acier simple et cout.", href: "pages/dalle.html", icon: "slab" },
  { id: "poteau", title: "Poteaux BA", desc: "Beton, cadres, acier et budget.", href: "pages/poteau.html", icon: "column" },
  { id: "poutre", title: "Poutres et chainages", desc: "Beton, acier principal, cadres.", href: "pages/poutre.html", icon: "beam" },
  { id: "ferraillage", title: "Ferraillage", desc: "Longueur, poids et prix acier.", href: "pages/ferraillage.html", icon: "rebar" },
  { id: "cloture", title: "Mur de cloture", desc: "Perimetre, briques, poteaux et finition.", href: "pages/cloture.html", icon: "wall" },
  { id: "maison", title: "Maison complete", desc: "Budget par m2 et niveau de standing.", href: "pages/maison-complete.html", icon: "home" },
  { id: "toiture", title: "Toiture", desc: "Toles, surface et charpente estimative.", href: "pages/toiture.html", icon: "roof" },
  { id: "fosse", title: "Fosse septique", desc: "Volume, beton, maconnerie et cout.", href: "pages/fosse-septique.html", icon: "tank" },
  { id: "mortier", title: "Mortier ciment", desc: "Volume, sacs de ciment, sable et cout.", href: "pages/mortier.html", icon: "layers" },
  { id: "chape", title: "Chape sol", desc: "Surface, epaisseur, mortier et budget.", href: "pages/chape.html", icon: "slab" },
  { id: "terrassement", title: "Terrassement", desc: "Fouille, deblais, camions et main-d'oeuvre.", href: "pages/terrassement.html", icon: "foundation" },
  { id: "escalier", title: "Escalier beton", desc: "Marches, volume beton, acier et cout.", href: "pages/escalier.html", icon: "layers" },
  { id: "plafond", title: "Plafond", desc: "Surface, plaques, ossature et accessoires.", href: "pages/plafond.html", icon: "tiles" },
  { id: "electricite", title: "Electricite", desc: "Points, cables, gaines et tableau estimatif.", href: "pages/electricite.html", icon: "calculator" },
  { id: "plomberie", title: "Plomberie", desc: "Points d'eau, tuyaux, evacuation et raccords.", href: "pages/plomberie.html", icon: "tank" },
  { id: "menuiserie", title: "Menuiserie", desc: "Portes, fenetres, pose et budget.", href: "pages/menuiserie.html", icon: "home" },
  { id: "coffrage", title: "Coffrage", desc: "Surface, panneaux, huile, clous et main-d'oeuvre.", href: "pages/coffrage.html", icon: "beam" },
  { id: "pavage", title: "Pavage", desc: "Paves, lit de sable, bordures et cout.", href: "pages/pavage.html", icon: "tiles" },
  { id: "caniveau", title: "Caniveau", desc: "Beton, pente, volume et evacuation d'eau.", href: "pages/caniveau.html", icon: "foundation" },
  { id: "puisard", title: "Puisard", desc: "Volume, maconnerie, beton et couvercle.", href: "pages/puisard.html", icon: "tank" },
  { id: "regard", title: "Regard beton", desc: "Dimensions, parois, radier et couvercle.", href: "pages/regard.html", icon: "slab" },
  { id: "joint-carrelage", title: "Joints carrelage", desc: "Mortier joint, surface, largeur et budget.", href: "pages/joint-carrelage.html", icon: "tiles" },
  { id: "terrasse", title: "Terrasse exterieure", desc: "Surface, support, finition et cout global.", href: "pages/terrasse.html", icon: "home" },
  { id: "remblai", title: "Remblai compacte", desc: "Volume, couches, compactage et transport.", href: "pages/remblai.html", icon: "foundation" }
];
