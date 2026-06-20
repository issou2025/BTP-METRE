mountCalculator({
  title: "Calculateur regard beton",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur interne (m)", value: 0.8 },
    { name: "largeur", label: "Largeur interne (m)", value: 0.8 },
    { name: "hauteur", label: "Hauteur interne (m)", value: 1 },
    { name: "epaisseur", label: "Epaisseur parois (m)", value: 0.1 },
    { name: "prixCouvercle", label: "Prix couvercle", value: 18000 },
    { name: "pose", label: "Main-d'oeuvre forfait", value: 25000 }
  ],
  calculate(data) {
    const l = toNumber(data.longueur);
    const w = toNumber(data.largeur);
    const h = toNumber(data.hauteur);
    const e = toNumber(data.epaisseur);
    const parois = 2 * (l + w) * h;
    const briques = Math.ceil(parois * 10);
    const radier = (l + 2 * e) * (w + 2 * e) * e;
    const q = concreteQuantities(radier, 250, 0.08);
    const mortier = parois * BTP_DATA.constants.masonryMortarPerM2;
    const sacsMortier = Math.ceil((mortier * 300) / 50);
    const cout = briques * getPrice("brique_unite") + (q.sacs + sacsMortier) * getPrice("ciment_sac_50kg") + q.sable * getPrice("sable_m3") + q.gravier * getPrice("gravier_m3") + toNumber(data.prixCouvercle) + toNumber(data.pose);
    return { summary: `Projet : ${data.project}. Regard ${formatNumber(l)} x ${formatNumber(w)} x ${formatNumber(h)} m.`, total: cout, rows: [
      { label: "Surface parois", value: `${formatNumber(parois)} m2` },
      { label: "Briques estimees", value: `${briques} unites` },
      { label: "Beton radier", value: `${formatNumber(q.volume)} m3` },
      { label: "Ciment beton + mortier", value: `${q.sacs + sacsMortier} sacs` },
      { label: "Couvercle", value: formatCurrency(toNumber(data.prixCouvercle)) },
      { label: "Main-d'oeuvre", value: formatCurrency(toNumber(data.pose)) }
    ], share: `Calcul regard\nProjet : ${data.project}\nBriques : ${briques}\nCiment : ${q.sacs + sacsMortier} sacs\nCout : ${formatCurrency(cout)}` };
  }
});
