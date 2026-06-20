mountCalculator({
  title: "Calculateur menuiserie",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "portes", label: "Nombre de portes", value: 5 },
    { name: "fenetres", label: "Nombre de fenetres", value: 6 },
    { name: "prixPorte", label: "Prix moyen porte", value: 65000 },
    { name: "prixFenetre", label: "Prix moyen fenetre", value: 45000 },
    { name: "posePorte", label: "Pose par porte", value: 10000 },
    { name: "poseFenetre", label: "Pose par fenetre", value: 8000 },
    { name: "accessoires", label: "Accessoires et marge (%)", value: 8 }
  ],
  calculate(data) {
    const coutPortes = toNumber(data.portes) * (toNumber(data.prixPorte) + toNumber(data.posePorte));
    const coutFenetres = toNumber(data.fenetres) * (toNumber(data.prixFenetre) + toNumber(data.poseFenetre));
    const marge = (coutPortes + coutFenetres) * toNumber(data.accessoires) / 100;
    const cout = coutPortes + coutFenetres + marge;
    return { summary: `Projet : ${data.project}. Menuiserie pour ${formatNumber(toNumber(data.portes), 0)} portes et ${formatNumber(toNumber(data.fenetres), 0)} fenetres.`, total: cout, rows: [
      { label: "Portes", value: `${formatNumber(toNumber(data.portes), 0)} unites` },
      { label: "Fenetres", value: `${formatNumber(toNumber(data.fenetres), 0)} unites` },
      { label: "Cout portes avec pose", value: formatCurrency(coutPortes) },
      { label: "Cout fenetres avec pose", value: formatCurrency(coutFenetres) },
      { label: "Accessoires et marge", value: formatCurrency(marge) }
    ], share: `Calcul menuiserie\nProjet : ${data.project}\nPortes : ${formatNumber(toNumber(data.portes), 0)}\nFenetres : ${formatNumber(toNumber(data.fenetres), 0)}\nCout : ${formatCurrency(cout)}` };
  }
});
