mountCalculator({
  title: "Calculateur peinture",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "surface", label: "Surface a peindre (m2)", required: true, value: 80 },
    { name: "couches", label: "Nombre de couches", required: true, value: 2 },
    { name: "rendement", label: "Rendement (m2 par litre)", required: true, value: 8 },
    { name: "volumePot", label: "Volume pot (litres)", required: true, value: 20 },
    { name: "prixPot", label: "Prix pot", value: getPrice("peinture_20l") },
    { name: "marge", label: "Marge de perte (%)", value: 10 }
  ],
  calculate(data) {
    const litres = (toNumber(data.surface) * toNumber(data.couches) / toNumber(data.rendement)) * (1 + toNumber(data.marge) / 100);
    const pots = Math.ceil(litres / toNumber(data.volumePot));
    const cout = pots * toNumber(data.prixPot);
    return { summary: `Projet : ${data.project}. Besoin estime ${formatNumber(litres)} litres.`, total: cout, rows: [
      { label: "Litres necessaires", value: `${formatNumber(litres)} L` },
      { label: "Nombre de pots", value: `${pots} pots` },
      { label: "Prix par pot", value: formatCurrency(toNumber(data.prixPot)) }
    ], share: `Calcul peinture\nProjet : ${data.project}\nLitres : ${formatNumber(litres)} L\nPots : ${pots}\nCout : ${formatCurrency(cout)}` };
  }
});
