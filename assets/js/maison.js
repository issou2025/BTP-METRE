mountCalculator({
  title: "Estimateur maison complete",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "surface", label: "Surface maison (m2)", required: true, value: 100 },
    { name: "chambres", label: "Nombre chambres", value: 3 },
    { name: "toilettes", label: "Nombre toilettes", value: 2 },
    { name: "standing", label: "Standing", type: "select", options: [
      { value: "economique", label: "Economique" }, { value: "standard", label: "Standard" }, { value: "moyen", label: "Moyen standing" }, { value: "haut", label: "Haut standing" }
    ] },
    { name: "toiture", label: "Type toiture", type: "select", options: ["Tole", "Dalle", "Charpente bois", "Charpente metallique"].map((x) => ({ value: x, label: x })) },
    { name: "ville", label: "Ville", type: "text", value: "Niamey" },
    { name: "gros", label: "Prix m2 gros oeuvre", value: 120000 },
    { name: "second", label: "Prix m2 second oeuvre", value: 65000 },
    { name: "finition", label: "Prix m2 finition", value: 55000 }
  ],
  calculate(data) {
    const surface = toNumber(data.surface);
    const gros = surface * toNumber(data.gros);
    const second = surface * toNumber(data.second);
    const finition = surface * toNumber(data.finition);
    const total = gros + second + finition;
    return { summary: `Projet : ${data.project}. Maison ${data.standing} de ${formatNumber(surface)} m2 a ${data.ville}.`, total, rows: [
      { label: "Budget bas", value: formatCurrency(total * 0.9) },
      { label: "Budget moyen", value: formatCurrency(total) },
      { label: "Budget haut", value: formatCurrency(total * 1.15) },
      { label: "Gros oeuvre", value: formatCurrency(gros) },
      { label: "Second oeuvre", value: formatCurrency(second) },
      { label: "Finition", value: formatCurrency(finition) },
      { label: "Duree indicative", value: `${Math.ceil(surface / 20)} a ${Math.ceil(surface / 12)} mois selon organisation` },
      { label: "Remarque technique", value: "Budget indicatif hors terrain, etudes, branchements et imprevus." }
    ], share: `Estimation maison\nProjet : ${data.project}\nSurface : ${formatNumber(surface)} m2\nBudget moyen : ${formatCurrency(total)}\nFourchette : ${formatCurrency(total * 0.9)} - ${formatCurrency(total * 1.15)}` };
  }
});
