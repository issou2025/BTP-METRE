mountCalculator({
  title: "Calculateur terrasse exterieure",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur (m)", required: true, value: 6 },
    { name: "largeur", label: "Largeur (m)", required: true, value: 4 },
    { name: "supportM2", label: "Support par m2", value: 4500 },
    { name: "finitionM2", label: "Finition par m2", value: 6500 },
    { name: "bordureM", label: "Bordure par metre", value: 2500 },
    { name: "pente", label: "Marge pente/pertes (%)", value: 8 },
    { name: "poseM2", label: "Pose par m2", value: 3000 }
  ],
  calculate(data) {
    const surface = toNumber(data.longueur) * toNumber(data.largeur);
    const perimetre = 2 * (toNumber(data.longueur) + toNumber(data.largeur));
    const coeff = 1 + toNumber(data.pente) / 100;
    const support = surface * coeff * toNumber(data.supportM2);
    const finition = surface * coeff * toNumber(data.finitionM2);
    const bordure = perimetre * toNumber(data.bordureM);
    const pose = surface * toNumber(data.poseM2);
    const cout = support + finition + bordure + pose;
    return { summary: `Projet : ${data.project}. Terrasse de ${formatNumber(surface)} m2 avec ${formatNumber(perimetre)} m de bordures.`, total: cout, rows: [
      { label: "Surface", value: `${formatNumber(surface)} m2` },
      { label: "Perimetre", value: `${formatNumber(perimetre)} m` },
      { label: "Support", value: formatCurrency(support) },
      { label: "Finition", value: formatCurrency(finition) },
      { label: "Bordures", value: formatCurrency(bordure) },
      { label: "Pose", value: formatCurrency(pose) }
    ], share: `Calcul terrasse\nProjet : ${data.project}\nSurface : ${formatNumber(surface)} m2\nPerimetre : ${formatNumber(perimetre)} m\nCout : ${formatCurrency(cout)}` };
  }
});
