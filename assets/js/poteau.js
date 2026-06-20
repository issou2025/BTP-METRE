mountCalculator({
  title: "Calculateur poteaux beton arme",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "nombre", label: "Nombre de poteaux", required: true, value: 6 },
    { name: "largeur", label: "Largeur section (m)", required: true, value: 0.2 },
    { name: "hauteurSection", label: "Hauteur section (m)", required: true, value: 0.2 },
    { name: "hauteur", label: "Hauteur poteau (m)", required: true, value: 3 },
    { name: "dosage", label: "Dosage beton", type: "select", options: [300, 350].map((x) => ({ value: x, label: `${x} kg/m3` })) },
    { name: "barres", label: "Nombre barres verticales", value: 4 },
    { name: "diametre", label: "Diametre barres verticales", type: "select", options: [8, 10, 12, 14, 16].map((x) => ({ value: x, label: `${x} mm` })) },
    { name: "diametreCadre", label: "Diametre cadres", type: "select", options: [6, 8, 10].map((x) => ({ value: x, label: `${x} mm` })) },
    { name: "espacement", label: "Espacement cadres (m)", value: 0.2 },
    { name: "prixAcier", label: "Prix acier kg", value: getPrice("acier_kg") }
  ],
  calculate(data) {
    const volume = toNumber(data.nombre) * toNumber(data.largeur) * toNumber(data.hauteurSection) * toNumber(data.hauteur);
    const q = concreteQuantities(volume, data.dosage);
    const vertical = toNumber(data.nombre) * toNumber(data.barres) * toNumber(data.hauteur);
    const cadres = Math.ceil(toNumber(data.hauteur) / toNumber(data.espacement)) * toNumber(data.nombre);
    const cadreLength = 2 * (toNumber(data.largeur) + toNumber(data.hauteurSection)) + 0.2;
    const totalCadres = cadres * cadreLength;
    const poids = vertical * BTP_DATA.steel[data.diametre] + totalCadres * BTP_DATA.steel[data.diametreCadre];
    const coutBeton = q.sacs * getPrice("ciment_sac_50kg") + q.sable * getPrice("sable_m3") + q.gravier * getPrice("gravier_m3");
    const coutAcier = poids * toNumber(data.prixAcier);
    return { summary: `Projet : ${data.project}. ${data.nombre} poteaux, beton ${formatNumber(volume)} m3.`, total: coutBeton + coutAcier, rows: [
      { label: "Volume beton", value: `${formatNumber(volume)} m3` },
      { label: "Ciment", value: `${q.sacs} sacs` },
      { label: "Acier vertical", value: `${formatNumber(vertical)} m` },
      { label: "Nombre cadres", value: `${cadres}` },
      { label: "Longueur cadres", value: `${formatNumber(totalCadres)} m` },
      { label: "Poids acier", value: `${formatNumber(poids)} kg` },
      { label: "Cout beton", value: formatCurrency(coutBeton) },
      { label: "Cout acier", value: formatCurrency(coutAcier) }
    ], share: `Calcul poteaux\nProjet : ${data.project}\nBeton : ${formatNumber(volume)} m3\nCiment : ${q.sacs} sacs\nAcier : ${formatNumber(poids)} kg\nCout : ${formatCurrency(coutBeton + coutAcier)}` };
  }
});
