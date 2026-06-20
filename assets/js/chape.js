mountCalculator({
  title: "Calculateur chape sol",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur (m)", required: true, value: 5 },
    { name: "largeur", label: "Largeur (m)", required: true, value: 4 },
    { name: "epaisseur", label: "Epaisseur chape (m)", required: true, value: 0.05 },
    { name: "dosage", label: "Dosage ciment", type: "select", options: [250, 300, 350].map((x) => ({ value: x, label: `${x} kg/m3` })) },
    { name: "marge", label: "Marge de perte (%)", value: 10 }
  ],
  calculate(data) {
    const surface = toNumber(data.longueur) * toNumber(data.largeur);
    const volume = surface * toNumber(data.epaisseur) * (1 + toNumber(data.marge) / 100);
    const cimentKg = volume * toNumber(data.dosage);
    const sacs = Math.ceil(cimentKg / 50);
    const sable = volume * 1.05;
    const cout = sacs * getPrice("ciment_sac_50kg") + sable * getPrice("sable_m3");
    return { summary: `Projet : ${data.project}. Chape de ${formatNumber(surface)} m2 sur ${formatNumber(toNumber(data.epaisseur))} m.`, total: cout, rows: [
      { label: "Surface chape", value: `${formatNumber(surface)} m2` },
      { label: "Volume mortier avec marge", value: `${formatNumber(volume)} m3` },
      { label: "Ciment", value: `${sacs} sacs de 50 kg` },
      { label: "Sable", value: `${formatNumber(sable)} m3` },
      { label: "Cout estimatif materiaux", value: formatCurrency(cout) }
    ], share: `Calcul chape\nProjet : ${data.project}\nSurface : ${formatNumber(surface)} m2\nMortier : ${formatNumber(volume)} m3\nCiment : ${sacs} sacs\nCout : ${formatCurrency(cout)}` };
  }
});
