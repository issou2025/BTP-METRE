mountCalculator({
  title: "Calculateur plomberie",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "pointsEau", label: "Points d'eau", value: 4 },
    { name: "longueurAlim", label: "Longueur alimentation (m)", value: 35 },
    { name: "longueurEvac", label: "Longueur evacuation (m)", value: 20 },
    { name: "prixPoint", label: "Accessoires par point", value: 6000 },
    { name: "prixAlimM", label: "Prix tuyau alimentation par m", value: 900 },
    { name: "prixEvacM", label: "Prix tuyau evacuation par m", value: 1500 },
    { name: "prixPose", label: "Pose par point", value: 7000 }
  ],
  calculate(data) {
    const points = toNumber(data.pointsEau);
    const coutAccessoires = points * toNumber(data.prixPoint);
    const coutAlim = toNumber(data.longueurAlim) * toNumber(data.prixAlimM);
    const coutEvac = toNumber(data.longueurEvac) * toNumber(data.prixEvacM);
    const coutPose = points * toNumber(data.prixPose);
    const cout = coutAccessoires + coutAlim + coutEvac + coutPose;
    return { summary: `Projet : ${data.project}. Plomberie estimee pour ${formatNumber(points, 0)} points d'eau.`, total: cout, rows: [
      { label: "Points d'eau", value: `${formatNumber(points, 0)} points` },
      { label: "Tuyau alimentation", value: `${formatNumber(toNumber(data.longueurAlim), 0)} m` },
      { label: "Tuyau evacuation", value: `${formatNumber(toNumber(data.longueurEvac), 0)} m` },
      { label: "Cout accessoires", value: formatCurrency(coutAccessoires) },
      { label: "Cout alimentation", value: formatCurrency(coutAlim) },
      { label: "Cout evacuation", value: formatCurrency(coutEvac) },
      { label: "Cout pose", value: formatCurrency(coutPose) }
    ], share: `Calcul plomberie\nProjet : ${data.project}\nPoints : ${formatNumber(points, 0)}\nAlimentation : ${formatNumber(toNumber(data.longueurAlim), 0)} m\nEvacuation : ${formatNumber(toNumber(data.longueurEvac), 0)} m\nCout : ${formatCurrency(cout)}` };
  }
});
