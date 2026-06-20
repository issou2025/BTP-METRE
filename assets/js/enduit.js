mountCalculator({
  title: "Calculateur enduit ciment",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur mur (m)", required: true, value: 10 },
    { name: "hauteur", label: "Hauteur mur (m)", required: true, value: 3 },
    { name: "faces", label: "Nombre de faces", type: "select", options: [{ value: 1, label: "1 face" }, { value: 2, label: "2 faces" }] },
    { name: "epaisseur", label: "Epaisseur enduit (cm)", value: 1.5, required: true },
    { name: "dosage", label: "Dosage mortier (kg/m3)", value: 300 },
    { name: "prixCiment", label: "Prix ciment sac", value: getPrice("ciment_sac_50kg") },
    { name: "prixSable", label: "Prix sable m3", value: getPrice("sable_m3") }
  ],
  calculate(data) {
    const surface = toNumber(data.longueur) * toNumber(data.hauteur) * toNumber(data.faces);
    const mortier = surface * (toNumber(data.epaisseur) / 100);
    const sacs = Math.ceil((mortier * toNumber(data.dosage)) / 50);
    const sable = mortier * 1.1;
    const cout = sacs * toNumber(data.prixCiment) + sable * toNumber(data.prixSable);
    return { summary: `Projet : ${data.project}. Surface a enduire ${formatNumber(surface)} m2.`, total: cout, rows: [
      { label: "Surface a enduire", value: `${formatNumber(surface)} m2` },
      { label: "Volume mortier", value: `${formatNumber(mortier)} m3` },
      { label: "Sacs ciment", value: `${sacs} sacs` },
      { label: "Sable", value: `${formatNumber(sable)} m3` }
    ], share: `Calcul enduit\nProjet : ${data.project}\nSurface : ${formatNumber(surface)} m2\nCiment : ${sacs} sacs\nSable : ${formatNumber(sable)} m3\nCout : ${formatCurrency(cout)}` };
  }
});
