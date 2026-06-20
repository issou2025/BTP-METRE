mountCalculator({
  title: "Calculateur toiture",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur batiment (m)", required: true, value: 10 },
    { name: "largeur", label: "Largeur batiment (m)", required: true, value: 8 },
    { name: "pente", label: "Majoration pente (%)", value: 20 },
    { name: "surfaceTole", label: "Surface utile par tole (m2)", value: 1.8 },
    { name: "prixTole", label: "Prix tole unite", value: getPrice("tole_unite") },
    { name: "coutCharpenteM2", label: "Cout charpente par m2", value: 3500 }
  ],
  calculate(data) {
    const surface = toNumber(data.longueur) * toNumber(data.largeur) * (1 + toNumber(data.pente) / 100);
    const toles = Math.ceil(surface / toNumber(data.surfaceTole));
    const coutToles = toles * toNumber(data.prixTole);
    const coutCharpente = surface * toNumber(data.coutCharpenteM2);
    const total = coutToles + coutCharpente;
    return { summary: `Projet : ${data.project}. Toiture estimee a ${formatNumber(surface)} m2.`, total, rows: [
      { label: "Surface toiture", value: `${formatNumber(surface)} m2` },
      { label: "Nombre de toles", value: `${toles}` },
      { label: "Cout toles", value: formatCurrency(coutToles) },
      { label: "Cout charpente", value: formatCurrency(coutCharpente) }
    ], share: `Calcul toiture\nProjet : ${data.project}\nSurface : ${formatNumber(surface)} m2\nToles : ${toles}\nCout : ${formatCurrency(total)}` };
  }
});
