mountCalculator({
  title: "Calculateur poutres et chainages",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur totale (m)", required: true, value: 30 },
    { name: "largeur", label: "Largeur poutre (m)", required: true, value: 0.2 },
    { name: "hauteur", label: "Hauteur poutre (m)", required: true, value: 0.3 },
    { name: "dosage", label: "Dosage beton", type: "select", options: [300, 350].map((x) => ({ value: x, label: `${x} kg/m3` })) },
    { name: "barresSup", label: "Barres superieures", value: 2 },
    { name: "barresInf", label: "Barres inferieures", value: 2 },
    { name: "diametre", label: "Diametre barres", type: "select", options: [8, 10, 12, 14, 16].map((x) => ({ value: x, label: `${x} mm` })) },
    { name: "diametreCadre", label: "Diametre cadres", type: "select", options: [6, 8, 10].map((x) => ({ value: x, label: `${x} mm` })) },
    { name: "espacement", label: "Espacement cadres (m)", value: 0.2 },
    { name: "prixAcier", label: "Prix acier kg", value: getPrice("acier_kg") }
  ],
  calculate(data) {
    const volume = toNumber(data.longueur) * toNumber(data.largeur) * toNumber(data.hauteur);
    const q = concreteQuantities(volume, data.dosage);
    const acierPrincipal = toNumber(data.longueur) * (toNumber(data.barresSup) + toNumber(data.barresInf));
    const cadres = Math.ceil(toNumber(data.longueur) / toNumber(data.espacement));
    const longueurCadres = cadres * (2 * (toNumber(data.largeur) + toNumber(data.hauteur)) + 0.2);
    const poids = acierPrincipal * BTP_DATA.steel[data.diametre] + longueurCadres * BTP_DATA.steel[data.diametreCadre];
    const cout = q.sacs * getPrice("ciment_sac_50kg") + q.sable * getPrice("sable_m3") + q.gravier * getPrice("gravier_m3") + poids * toNumber(data.prixAcier);
    return { summary: `Projet : ${data.project}. Poutres de ${formatNumber(data.longueur)} m lineaires.`, total: cout, rows: [
      { label: "Volume beton", value: `${formatNumber(volume)} m3` },
      { label: "Ciment", value: `${q.sacs} sacs` },
      { label: "Sable", value: `${formatNumber(q.sable)} m3` },
      { label: "Gravier", value: `${formatNumber(q.gravier)} m3` },
      { label: "Acier principal", value: `${formatNumber(acierPrincipal)} m` },
      { label: "Nombre cadres", value: `${cadres}` },
      { label: "Poids acier", value: `${formatNumber(poids)} kg` }
    ], share: `Calcul poutres\nProjet : ${data.project}\nBeton : ${formatNumber(volume)} m3\nCiment : ${q.sacs} sacs\nAcier : ${formatNumber(poids)} kg\nCout : ${formatCurrency(cout)}` };
  }
});
