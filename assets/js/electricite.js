mountCalculator({
  title: "Calculateur electricite",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "pointsLumineux", label: "Points lumineux", value: 6 },
    { name: "prises", label: "Prises electriques", value: 12 },
    { name: "interrupteurs", label: "Interrupteurs", value: 6 },
    { name: "prixPoint", label: "Prix moyen par point", value: 4500 },
    { name: "metresCablePoint", label: "Cable moyen par point (m)", value: 8 },
    { name: "prixCableM", label: "Prix cable par metre", value: 350 },
    { name: "prixTableau", label: "Tableau + protections", value: 45000 }
  ],
  calculate(data) {
    const points = toNumber(data.pointsLumineux) + toNumber(data.prises) + toNumber(data.interrupteurs);
    const cable = points * toNumber(data.metresCablePoint);
    const coutAppareillage = points * toNumber(data.prixPoint);
    const coutCable = cable * toNumber(data.prixCableM);
    const cout = coutAppareillage + coutCable + toNumber(data.prixTableau);
    return { summary: `Projet : ${data.project}. Installation estimee a ${formatNumber(points, 0)} points electriques.`, total: cout, rows: [
      { label: "Points lumineux", value: `${formatNumber(toNumber(data.pointsLumineux), 0)}` },
      { label: "Prises", value: `${formatNumber(toNumber(data.prises), 0)}` },
      { label: "Interrupteurs", value: `${formatNumber(toNumber(data.interrupteurs), 0)}` },
      { label: "Total points", value: `${formatNumber(points, 0)} points` },
      { label: "Cable estimatif", value: `${formatNumber(cable, 0)} m` },
      { label: "Cout appareillage", value: formatCurrency(coutAppareillage) },
      { label: "Cout cable", value: formatCurrency(coutCable) },
      { label: "Tableau + protections", value: formatCurrency(toNumber(data.prixTableau)) }
    ], share: `Calcul electricite\nProjet : ${data.project}\nPoints : ${formatNumber(points, 0)}\nCable : ${formatNumber(cable, 0)} m\nCout : ${formatCurrency(cout)}` };
  }
});
