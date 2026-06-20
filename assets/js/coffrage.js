mountCalculator({
  title: "Calculateur coffrage",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "surface", label: "Surface a coffrer (m2)", required: true, value: 30 },
    { name: "reutilisation", label: "Reutilisation panneaux (fois)", value: 3 },
    { name: "surfacePanneau", label: "Surface panneau (m2)", value: 2.88 },
    { name: "prixPanneau", label: "Prix panneau", value: 12000 },
    { name: "huileM2", label: "Huile/coffrage par m2", value: 250 },
    { name: "clousM2", label: "Clous/fil par m2", value: 180 },
    { name: "poseM2", label: "Main-d'oeuvre par m2", value: 1500 }
  ],
  calculate(data) {
    const surface = toNumber(data.surface);
    const panneaux = Math.ceil(surface / Math.max(toNumber(data.surfacePanneau) * Math.max(toNumber(data.reutilisation), 1), 0.01));
    const coutPanneaux = panneaux * toNumber(data.prixPanneau);
    const consommables = surface * (toNumber(data.huileM2) + toNumber(data.clousM2));
    const pose = surface * toNumber(data.poseM2);
    const cout = coutPanneaux + consommables + pose;
    return { summary: `Projet : ${data.project}. Coffrage estime pour ${formatNumber(surface)} m2.`, total: cout, rows: [
      { label: "Surface a coffrer", value: `${formatNumber(surface)} m2` },
      { label: "Panneaux a prevoir", value: `${panneaux} panneaux` },
      { label: "Cout panneaux", value: formatCurrency(coutPanneaux) },
      { label: "Consommables", value: formatCurrency(consommables) },
      { label: "Main-d'oeuvre", value: formatCurrency(pose) }
    ], share: `Calcul coffrage\nProjet : ${data.project}\nSurface : ${formatNumber(surface)} m2\nPanneaux : ${panneaux}\nCout : ${formatCurrency(cout)}` };
  }
});
