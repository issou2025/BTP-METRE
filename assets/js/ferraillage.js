mountCalculator({
  title: "Calculateur ferraillage",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "diametre", label: "Diametre acier", type: "select", options: Object.keys(BTP_DATA.steel).map((x) => ({ value: x, label: `${x} mm` })) },
    { name: "longueur", label: "Longueur unitaire (m)", required: true, value: 12 },
    { name: "nombre", label: "Nombre de barres", required: true, value: 10 },
    { name: "prixKg", label: "Prix kg acier", value: getPrice("acier_kg") }
  ],
  calculate(data) {
    const longueur = toNumber(data.longueur) * toNumber(data.nombre);
    const poids = longueur * BTP_DATA.steel[data.diametre];
    const cout = poids * toNumber(data.prixKg);
    return { summary: `Projet : ${data.project}. Acier HA ${data.diametre}, longueur totale ${formatNumber(longueur)} m.`, total: cout, rows: [
      { label: "Longueur totale", value: `${formatNumber(longueur)} m` },
      { label: "Poids lineaire", value: `${formatNumber(BTP_DATA.steel[data.diametre], 3)} kg/m` },
      { label: "Poids total", value: `${formatNumber(poids)} kg` }
    ], share: `Calcul ferraillage\nProjet : ${data.project}\nLongueur : ${formatNumber(longueur)} m\nPoids : ${formatNumber(poids)} kg\nCout : ${formatCurrency(cout)}` };
  }
});
