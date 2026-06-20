mountCalculator({
  title: "Calculateur fondation",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "type", label: "Type fondation", type: "select", options: ["Fouille", "Semelle filante", "Semelle isolee", "Radier"].map((x) => ({ value: x, label: x })) },
    { name: "longueur", label: "Longueur totale (m)", required: true, value: 40 },
    { name: "largeur", label: "Largeur (m)", required: true, value: 0.5 },
    { name: "hauteur", label: "Profondeur/hauteur (m)", required: true, value: 0.6 },
    { name: "proprete", label: "Epaisseur beton proprete (m)", value: 0.05 },
    { name: "dosage", label: "Dosage beton", type: "select", options: [150, 250, 300, 350].map((x) => ({ value: x, label: `${x} kg/m3` })) }
  ],
  calculate(data) {
    const fouille = toNumber(data.longueur) * toNumber(data.largeur) * toNumber(data.hauteur);
    const proprete = toNumber(data.longueur) * toNumber(data.largeur) * toNumber(data.proprete);
    const arme = Math.max(0, fouille - proprete);
    const q = concreteQuantities(arme + proprete, data.dosage);
    const cout = q.sacs * getPrice("ciment_sac_50kg") + q.sable * getPrice("sable_m3") + q.gravier * getPrice("gravier_m3");
    return { summary: `Projet : ${data.project}. Fondation ${data.type}, beton total ${formatNumber(q.volume)} m3.`, total: cout, rows: [
      { label: "Volume fouille", value: `${formatNumber(fouille)} m3` },
      { label: "Beton de proprete", value: `${formatNumber(proprete)} m3` },
      { label: "Beton arme", value: `${formatNumber(arme)} m3` },
      { label: "Ciment", value: `${q.sacs} sacs` },
      { label: "Sable", value: `${formatNumber(q.sable)} m3` },
      { label: "Gravier", value: `${formatNumber(q.gravier)} m3` }
    ], share: `Calcul fondation\nProjet : ${data.project}\nFouille : ${formatNumber(fouille)} m3\nBeton : ${formatNumber(q.volume)} m3\nCiment : ${q.sacs} sacs\nCout : ${formatCurrency(cout)}` };
  }
});
