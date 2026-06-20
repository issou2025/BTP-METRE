mountCalculator({
  title: "Calculateur caniveau",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur caniveau (m)", required: true, value: 12 },
    { name: "largeurInterne", label: "Largeur interne (m)", value: 0.3 },
    { name: "hauteurInterne", label: "Hauteur interne (m)", value: 0.35 },
    { name: "epaisseur", label: "Epaisseur beton (m)", value: 0.08 },
    { name: "dosage", label: "Dosage beton", type: "select", options: [250, 300, 350].map((x) => ({ value: x, label: `${x} kg/m3` })) },
    { name: "prixGrilleM", label: "Grille/couvercle par metre", value: 9000 },
    { name: "poseM", label: "Main-d'oeuvre par metre", value: 2500 }
  ],
  calculate(data) {
    const l = toNumber(data.longueur);
    const wi = toNumber(data.largeurInterne);
    const hi = toNumber(data.hauteurInterne);
    const e = toNumber(data.epaisseur);
    const betonVolume = l * (((wi + 2 * e) * (hi + e)) - (wi * hi));
    const q = concreteQuantities(betonVolume, data.dosage, 0.08);
    const grilles = l * toNumber(data.prixGrilleM);
    const pose = l * toNumber(data.poseM);
    const cout = q.sacs * getPrice("ciment_sac_50kg") + q.sable * getPrice("sable_m3") + q.gravier * getPrice("gravier_m3") + grilles + pose;
    return { summary: `Projet : ${data.project}. Caniveau de ${formatNumber(l)} m avec section utile ${formatNumber(wi * hi)} m2.`, total: cout, rows: [
      { label: "Longueur", value: `${formatNumber(l)} m` },
      { label: "Volume beton", value: `${formatNumber(q.volume)} m3` },
      { label: "Ciment", value: `${q.sacs} sacs` },
      { label: "Sable", value: `${formatNumber(q.sable)} m3` },
      { label: "Gravier", value: `${formatNumber(q.gravier)} m3` },
      { label: "Grilles/couvercles", value: formatCurrency(grilles) },
      { label: "Main-d'oeuvre", value: formatCurrency(pose) }
    ], share: `Calcul caniveau\nProjet : ${data.project}\nLongueur : ${formatNumber(l)} m\nBeton : ${formatNumber(q.volume)} m3\nCiment : ${q.sacs} sacs\nCout : ${formatCurrency(cout)}` };
  }
});
