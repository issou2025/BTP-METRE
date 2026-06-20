mountCalculator({
  title: "Calculateur plafond",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur piece (m)", required: true, value: 5 },
    { name: "largeur", label: "Largeur piece (m)", required: true, value: 4 },
    { name: "surfacePlaque", label: "Surface par plaque (m2)", value: 2.88 },
    { name: "marge", label: "Marge de chute (%)", value: 10 },
    { name: "prixPlaque", label: "Prix par plaque", value: 5500 },
    { name: "prixOssatureM2", label: "Ossature + accessoires par m2", value: 3500 },
    { name: "prixPoseM2", label: "Pose par m2", value: 2500 }
  ],
  calculate(data) {
    const surface = toNumber(data.longueur) * toNumber(data.largeur);
    const surfaceAvecMarge = surface * (1 + toNumber(data.marge) / 100);
    const plaques = Math.ceil(surfaceAvecMarge / toNumber(data.surfacePlaque));
    const coutPlaques = plaques * toNumber(data.prixPlaque);
    const coutOssature = surface * toNumber(data.prixOssatureM2);
    const coutPose = surface * toNumber(data.prixPoseM2);
    const cout = coutPlaques + coutOssature + coutPose;
    return { summary: `Projet : ${data.project}. Plafond de ${formatNumber(surface)} m2 avec ${data.marge}% de marge.`, total: cout, rows: [
      { label: "Surface plafond", value: `${formatNumber(surface)} m2` },
      { label: "Surface avec marge", value: `${formatNumber(surfaceAvecMarge)} m2` },
      { label: "Plaques necessaires", value: `${plaques} plaques` },
      { label: "Cout plaques", value: formatCurrency(coutPlaques) },
      { label: "Cout ossature/accessoires", value: formatCurrency(coutOssature) },
      { label: "Cout pose", value: formatCurrency(coutPose) }
    ], share: `Calcul plafond\nProjet : ${data.project}\nSurface : ${formatNumber(surface)} m2\nPlaques : ${plaques}\nCout : ${formatCurrency(cout)}` };
  }
});
