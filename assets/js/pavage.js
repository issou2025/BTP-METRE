mountCalculator({
  title: "Calculateur pavage",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur (m)", required: true, value: 8 },
    { name: "largeur", label: "Largeur (m)", required: true, value: 4 },
    { name: "pavesM2", label: "Paves par m2", value: 36 },
    { name: "marge", label: "Marge de coupe (%)", value: 7 },
    { name: "sableLit", label: "Epaisseur lit sable (m)", value: 0.05 },
    { name: "prixPave", label: "Prix pave unite", value: 150 },
    { name: "poseM2", label: "Pose/compactage par m2", value: 1800 }
  ],
  calculate(data) {
    const surface = toNumber(data.longueur) * toNumber(data.largeur);
    const paves = Math.ceil(surface * toNumber(data.pavesM2) * (1 + toNumber(data.marge) / 100));
    const sable = surface * toNumber(data.sableLit);
    const coutPaves = paves * toNumber(data.prixPave);
    const coutSable = sable * getPrice("sable_m3");
    const pose = surface * toNumber(data.poseM2);
    const cout = coutPaves + coutSable + pose;
    return { summary: `Projet : ${data.project}. Pavage de ${formatNumber(surface)} m2.`, total: cout, rows: [
      { label: "Surface", value: `${formatNumber(surface)} m2` },
      { label: "Paves avec marge", value: `${paves} unites` },
      { label: "Sable lit de pose", value: `${formatNumber(sable)} m3` },
      { label: "Cout paves", value: formatCurrency(coutPaves) },
      { label: "Cout sable", value: formatCurrency(coutSable) },
      { label: "Pose/compactage", value: formatCurrency(pose) }
    ], share: `Calcul pavage\nProjet : ${data.project}\nSurface : ${formatNumber(surface)} m2\nPaves : ${paves}\nSable : ${formatNumber(sable)} m3\nCout : ${formatCurrency(cout)}` };
  }
});
