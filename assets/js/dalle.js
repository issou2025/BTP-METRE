mountCalculator({
  title: "Calculateur dalle beton",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur (m)", required: true, value: 5 },
    { name: "largeur", label: "Largeur (m)", required: true, value: 4 },
    { name: "epaisseur", label: "Epaisseur (m)", required: true, value: 0.12 },
    { name: "dosage", label: "Dosage beton", type: "select", options: [250, 300, 350].map((x) => ({ value: x, label: `${x} kg/m3` })) },
    { name: "type", label: "Type dalle", type: "select", options: ["Dalle sol", "Terrasse", "Radier", "Dalle pleine"].map((x) => ({ value: x, label: x })) },
    { name: "marge", label: "Marge de perte (%)", value: 5 }
  ],
  calculate(data) {
    const surface = toNumber(data.longueur) * toNumber(data.largeur);
    const q = concreteQuantities(surface * toNumber(data.epaisseur), data.dosage, toNumber(data.marge) / 100);
    const acierKg = surface * 5;
    const cout = q.sacs * getPrice("ciment_sac_50kg") + q.sable * getPrice("sable_m3") + q.gravier * getPrice("gravier_m3") + acierKg * getPrice("acier_kg");
    return { summary: `Projet : ${data.project}. ${data.type} de ${formatNumber(surface)} m2.`, total: cout, rows: [
      { label: "Surface dalle", value: `${formatNumber(surface)} m2` },
      { label: "Volume beton", value: `${formatNumber(q.volume)} m3` },
      { label: "Ciment", value: `${q.sacs} sacs` },
      { label: "Sable", value: `${formatNumber(q.sable)} m3` },
      { label: "Gravier", value: `${formatNumber(q.gravier)} m3` },
      { label: "Acier simple estimatif", value: `${formatNumber(acierKg)} kg` }
    ], share: `Calcul dalle\nProjet : ${data.project}\nSurface : ${formatNumber(surface)} m2\nBeton : ${formatNumber(q.volume)} m3\nCiment : ${q.sacs} sacs\nCout : ${formatCurrency(cout)}` };
  }
});
