mountCalculator({
  title: "Calculateur puisard",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "diametre", label: "Diametre interieur (m)", required: true, value: 1.2 },
    { name: "profondeur", label: "Profondeur utile (m)", required: true, value: 2.5 },
    { name: "epaisseurParoi", label: "Epaisseur paroi (m)", value: 0.12 },
    { name: "radier", label: "Epaisseur radier (m)", value: 0.12 },
    { name: "prixCouvercle", label: "Couvercle/dalle superieure", value: 35000 },
    { name: "pose", label: "Main-d'oeuvre forfait", value: 45000 }
  ],
  calculate(data) {
    const r = toNumber(data.diametre) / 2;
    const h = toNumber(data.profondeur);
    const e = toNumber(data.epaisseurParoi);
    const volumeUtile = Math.PI * r * r * h;
    const volumeParoi = Math.PI * ((r + e) * (r + e) - r * r) * h;
    const volumeRadier = Math.PI * (r + e) * (r + e) * toNumber(data.radier);
    const q = concreteQuantities(volumeParoi + volumeRadier, 300, 0.08);
    const cout = q.sacs * getPrice("ciment_sac_50kg") + q.sable * getPrice("sable_m3") + q.gravier * getPrice("gravier_m3") + toNumber(data.prixCouvercle) + toNumber(data.pose);
    return { summary: `Projet : ${data.project}. Puisard de ${formatNumber(volumeUtile)} m3 utiles.`, total: cout, rows: [
      { label: "Volume utile", value: `${formatNumber(volumeUtile)} m3` },
      { label: "Beton parois + radier", value: `${formatNumber(q.volume)} m3` },
      { label: "Ciment", value: `${q.sacs} sacs` },
      { label: "Sable", value: `${formatNumber(q.sable)} m3` },
      { label: "Gravier", value: `${formatNumber(q.gravier)} m3` },
      { label: "Couvercle", value: formatCurrency(toNumber(data.prixCouvercle)) },
      { label: "Main-d'oeuvre", value: formatCurrency(toNumber(data.pose)) }
    ], share: `Calcul puisard\nProjet : ${data.project}\nVolume utile : ${formatNumber(volumeUtile)} m3\nBeton : ${formatNumber(q.volume)} m3\nCout : ${formatCurrency(cout)}` };
  }
});
