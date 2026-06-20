mountCalculator({
  title: "Calculateur briques et maconnerie",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur du mur (m)", required: true, value: 10 },
    { name: "hauteur", label: "Hauteur du mur (m)", required: true, value: 3 },
    { name: "nombre", label: "Nombre de murs identiques", required: true, value: 1 },
    { name: "ouvertures", label: "Surface des ouvertures (m2)", value: 0 },
    { name: "typeBrique", label: "Type brique", type: "select", options: [10, 12, 15, 20].map((x) => ({ value: x, label: `${x} cm` })) },
    { name: "briquesM2", label: "Briques par m2", value: 10 },
    { name: "marge", label: "Marge de perte (%)", value: 5 },
    { name: "prixBrique", label: "Prix brique unite", value: getPrice("brique_unite") },
    { name: "prixCiment", label: "Prix sac ciment", value: getPrice("ciment_sac_50kg") },
    { name: "prixSable", label: "Prix sable m3", value: getPrice("sable_m3") }
  ],
  calculate(data) {
    const surfaceBrute = toNumber(data.longueur) * toNumber(data.hauteur) * toNumber(data.nombre);
    const surfaceNette = Math.max(0, surfaceBrute - toNumber(data.ouvertures));
    const briquesM2 = toNumber(data.briquesM2) || BTP_DATA.constants.blocksPerM2[data.typeBrique];
    const briques = Math.ceil(surfaceNette * briquesM2 * (1 + toNumber(data.marge) / 100));
    const mortier = surfaceNette * BTP_DATA.constants.masonryMortarPerM2;
    const sacs = Math.ceil((mortier * 250) / 50);
    const sable = mortier * 1.1;
    const cout = briques * toNumber(data.prixBrique) + sacs * toNumber(data.prixCiment) + sable * toNumber(data.prixSable);
    return {
      summary: `Projet : ${data.project}. Mur de ${formatNumber(surfaceNette)} m2 net.`,
      total: cout,
      rows: [
        { label: "Surface brute", value: `${formatNumber(surfaceBrute)} m2` },
        { label: "Surface ouvertures", value: `${formatNumber(toNumber(data.ouvertures))} m2` },
        { label: "Surface nette", value: `${formatNumber(surfaceNette)} m2` },
        { label: "Nombre de briques", value: `${briques} unites` },
        { label: "Mortier", value: `${formatNumber(mortier)} m3` },
        { label: "Ciment mortier", value: `${sacs} sacs` },
        { label: "Sable mortier", value: `${formatNumber(sable)} m3` }
      ],
      share: `Calcul maconnerie Metre BTP Niger\nProjet : ${data.project}\nSurface nette : ${formatNumber(surfaceNette)} m2\nBriques : ${briques}\nCiment : ${sacs} sacs\nSable : ${formatNumber(sable)} m3\nCout : ${formatCurrency(cout)}`
    };
  }
});
