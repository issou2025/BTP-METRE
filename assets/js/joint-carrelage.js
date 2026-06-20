mountCalculator({
  title: "Calculateur joints carrelage",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "surface", label: "Surface carrelage (m2)", required: true, value: 30 },
    { name: "longueurCarreau", label: "Longueur carreau (cm)", value: 60 },
    { name: "largeurCarreau", label: "Largeur carreau (cm)", value: 60 },
    { name: "largeurJoint", label: "Largeur joint (mm)", value: 3 },
    { name: "epaisseur", label: "Epaisseur carreau (mm)", value: 8 },
    { name: "densite", label: "Densite mortier joint", value: 1.6 },
    { name: "prixKg", label: "Prix joint par kg", value: 900 }
  ],
  calculate(data) {
    const surface = toNumber(data.surface);
    const l = toNumber(data.longueurCarreau);
    const w = toNumber(data.largeurCarreau);
    const joint = toNumber(data.largeurJoint);
    const ep = toNumber(data.epaisseur);
    const kgM2 = ((l + w) / (l * w)) * joint * ep * toNumber(data.densite);
    const kg = kgM2 * surface * 1.1;
    const cout = kg * toNumber(data.prixKg);
    return { summary: `Projet : ${data.project}. Joints pour ${formatNumber(surface)} m2 de carrelage.`, total: cout, rows: [
      { label: "Surface", value: `${formatNumber(surface)} m2` },
      { label: "Consommation", value: `${formatNumber(kgM2)} kg/m2` },
      { label: "Quantite avec marge", value: `${formatNumber(kg)} kg` },
      { label: "Sacs de 5 kg", value: `${Math.ceil(kg / 5)} sacs` },
      { label: "Cout joint", value: formatCurrency(cout) }
    ], share: `Calcul joints carrelage\nProjet : ${data.project}\nSurface : ${formatNumber(surface)} m2\nJoint : ${formatNumber(kg)} kg\nCout : ${formatCurrency(cout)}` };
  }
});
