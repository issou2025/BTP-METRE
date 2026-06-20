mountCalculator({
  title: "Calculateur carrelage",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur piece (m)", required: true, value: 5 },
    { name: "largeur", label: "Largeur piece (m)", required: true, value: 4 },
    { name: "surfaceSupp", label: "Surface supplementaire (m2)", value: 0 },
    { name: "format", label: "Format carreau", type: "select", options: ["30x30", "40x40", "60x60", "80x80"].map((x) => ({ value: x, label: `${x} cm` })) },
    { name: "carreauxCarton", label: "Carreaux par carton", value: 4 },
    { name: "prixCarton", label: "Prix carton", value: getPrice("carrelage_m2") },
    { name: "marge", label: "Marge de perte (%)", value: 10 }
  ],
  calculate(data) {
    const surface = toNumber(data.longueur) * toNumber(data.largeur) + toNumber(data.surfaceSupp);
    const surfacePerte = surface * (1 + toNumber(data.marge) / 100);
    const [l, w] = data.format.split("x").map((n) => Number(n) / 100);
    const carreaux = Math.ceil(surfacePerte / (l * w));
    const cartons = Math.ceil(carreaux / toNumber(data.carreauxCarton));
    const cout = cartons * toNumber(data.prixCarton);
    return { summary: `Projet : ${data.project}. Surface avec perte ${formatNumber(surfacePerte)} m2.`, total: cout, rows: [
      { label: "Surface", value: `${formatNumber(surface)} m2` },
      { label: "Surface avec perte", value: `${formatNumber(surfacePerte)} m2` },
      { label: "Nombre de carreaux", value: `${carreaux} unites` },
      { label: "Nombre de cartons", value: `${cartons} cartons` }
    ], share: `Calcul carrelage\nProjet : ${data.project}\nSurface : ${formatNumber(surfacePerte)} m2\nCarreaux : ${carreaux}\nCartons : ${cartons}\nCout : ${formatCurrency(cout)}` };
  }
});
