mountCalculator({
  title: "Calculateur remblai compacte",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur (m)", required: true, value: 10 },
    { name: "largeur", label: "Largeur (m)", required: true, value: 6 },
    { name: "hauteur", label: "Hauteur remblai compactee (m)", required: true, value: 0.4 },
    { name: "compactage", label: "Majoration compactage (%)", value: 20 },
    { name: "couche", label: "Epaisseur par couche (m)", value: 0.2 },
    { name: "camion", label: "Capacite camion (m3)", value: 8 },
    { name: "prixM3", label: "Prix remblai livre par m3", value: 4500 }
  ],
  calculate(data) {
    const volumeCompact = toNumber(data.longueur) * toNumber(data.largeur) * toNumber(data.hauteur);
    const volumeApport = volumeCompact * (1 + toNumber(data.compactage) / 100);
    const couches = Math.ceil(toNumber(data.hauteur) / Math.max(toNumber(data.couche), 0.01));
    const camions = Math.ceil(volumeApport / Math.max(toNumber(data.camion), 0.01));
    const cout = volumeApport * toNumber(data.prixM3);
    return { summary: `Projet : ${data.project}. Remblai compacte de ${formatNumber(volumeCompact)} m3.`, total: cout, rows: [
      { label: "Volume compacte", value: `${formatNumber(volumeCompact)} m3` },
      { label: "Volume a apporter", value: `${formatNumber(volumeApport)} m3` },
      { label: "Nombre de couches", value: `${couches} couches` },
      { label: "Camions estimes", value: `${camions} voyages` },
      { label: "Cout remblai livre", value: formatCurrency(cout) }
    ], share: `Calcul remblai\nProjet : ${data.project}\nVolume compacte : ${formatNumber(volumeCompact)} m3\nApport : ${formatNumber(volumeApport)} m3\nCamions : ${camions}\nCout : ${formatCurrency(cout)}` };
  }
});
