mountCalculator({
  title: "Calculateur beton",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "ouvrage", label: "Type ouvrage", type: "select", options: ["Dalle", "Poteau", "Poutre", "Semelle", "Longrine", "Radier", "Chainage"].map((x) => ({ value: x, label: x })) },
    { name: "longueur", label: "Longueur (m)", required: true, value: 5 },
    { name: "largeur", label: "Largeur (m)", required: true, value: 4 },
    { name: "hauteur", label: "Hauteur ou epaisseur (m)", required: true, value: 0.12 },
    { name: "dosage", label: "Dosage beton", type: "select", options: [150, 250, 300, 350].map((x) => ({ value: x, label: `${x} kg/m3` })) },
    { name: "marge", label: "Marge de perte", type: "select", options: [0, 5, 10, 15].map((x) => ({ value: x / 100, label: `${x}%` })) },
    { name: "prixCiment", label: "Prix ciment sac 50 kg", value: getPrice("ciment_sac_50kg") },
    { name: "prixSable", label: "Prix sable par m3", value: getPrice("sable_m3") },
    { name: "prixGravier", label: "Prix gravier par m3", value: getPrice("gravier_m3") }
  ],
  calculate(data) {
    const volumeBrut = toNumber(data.longueur) * toNumber(data.largeur) * toNumber(data.hauteur);
    const q = concreteQuantities(volumeBrut, data.dosage, toNumber(data.marge));
    const cout = q.sacs * toNumber(data.prixCiment) + q.sable * toNumber(data.prixSable) + q.gravier * toNumber(data.prixGravier);
    return {
      summary: `Projet : ${data.project}. ${data.ouvrage} de ${formatNumber(q.volume)} m3 avec dosage ${data.dosage} kg/m3.`,
      total: cout,
      rows: [
        { label: "Volume beton", value: `${formatNumber(q.volume)} m3` },
        { label: "Ciment", value: `${formatNumber(q.cimentKg, 0)} kg, soit ${q.sacs} sacs de 50 kg` },
        { label: "Sable", value: `${formatNumber(q.sable)} m3` },
        { label: "Gravier", value: `${formatNumber(q.gravier)} m3` },
        { label: "Eau estimative", value: `${formatNumber(q.eau, 0)} litres` },
        { label: "Cout ciment", value: formatCurrency(q.sacs * toNumber(data.prixCiment)) },
        { label: "Cout sable", value: formatCurrency(q.sable * toNumber(data.prixSable)) },
        { label: "Cout gravier", value: formatCurrency(q.gravier * toNumber(data.prixGravier)) }
      ],
      share: `Bonjour, voici mon calcul avec Metre BTP Niger :\nProjet : ${data.project}\nType : ${data.ouvrage}\nVolume : ${formatNumber(q.volume)} m3\nCiment : ${q.sacs} sacs\nSable : ${formatNumber(q.sable)} m3\nGravier : ${formatNumber(q.gravier)} m3\nCout estimatif : ${formatCurrency(cout)}`
    };
  }
});
