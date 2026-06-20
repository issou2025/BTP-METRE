mountCalculator({
  title: "Calculateur fosse septique",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur interieure (m)", required: true, value: 2.5 },
    { name: "largeur", label: "Largeur interieure (m)", required: true, value: 1.5 },
    { name: "profondeur", label: "Profondeur utile (m)", required: true, value: 1.8 },
    { name: "epMur", label: "Epaisseur murs (m)", value: 0.15 },
    { name: "epDalle", label: "Epaisseur dalle fond/couvercle (m)", value: 0.12 },
    { name: "briquesM2", label: "Briques par m2", value: 10 }
  ],
  calculate(data) {
    const volumeUtile = toNumber(data.longueur) * toNumber(data.largeur) * toNumber(data.profondeur);
    const perimetre = 2 * (toNumber(data.longueur) + toNumber(data.largeur));
    const surfaceMurs = perimetre * toNumber(data.profondeur);
    const briques = Math.ceil(surfaceMurs * toNumber(data.briquesM2));
    const dalle = toNumber(data.longueur) * toNumber(data.largeur) * toNumber(data.epDalle) * 2;
    const q = concreteQuantities(dalle, 300);
    const cout = briques * getPrice("brique_unite") + q.sacs * getPrice("ciment_sac_50kg") + q.sable * getPrice("sable_m3") + q.gravier * getPrice("gravier_m3");
    return { summary: `Projet : ${data.project}. Volume utile ${formatNumber(volumeUtile)} m3.`, total: cout, rows: [
      { label: "Volume utile", value: `${formatNumber(volumeUtile)} m3` },
      { label: "Surface murs", value: `${formatNumber(surfaceMurs)} m2` },
      { label: "Nombre briques", value: `${briques}` },
      { label: "Beton dalles", value: `${formatNumber(dalle)} m3` },
      { label: "Ciment beton", value: `${q.sacs} sacs` },
      { label: "Sable", value: `${formatNumber(q.sable)} m3` },
      { label: "Gravier", value: `${formatNumber(q.gravier)} m3` }
    ], share: `Calcul fosse septique\nProjet : ${data.project}\nVolume utile : ${formatNumber(volumeUtile)} m3\nBriques : ${briques}\nBeton : ${formatNumber(dalle)} m3\nCout : ${formatCurrency(cout)}` };
  }
});
