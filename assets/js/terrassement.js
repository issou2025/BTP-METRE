mountCalculator({
  title: "Calculateur terrassement",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur fouille (m)", required: true, value: 10 },
    { name: "largeur", label: "Largeur fouille (m)", required: true, value: 0.6 },
    { name: "profondeur", label: "Profondeur (m)", required: true, value: 0.8 },
    { name: "foisonnement", label: "Foisonnement (%)", value: 25 },
    { name: "camion", label: "Capacite camion (m3)", value: 8 },
    { name: "prixM3", label: "Prix terrassement par m3", value: 2500 },
    { name: "prixCamion", label: "Prix evacuation par camion", value: 15000 }
  ],
  calculate(data) {
    const volume = toNumber(data.longueur) * toNumber(data.largeur) * toNumber(data.profondeur);
    const deblais = volume * (1 + toNumber(data.foisonnement) / 100);
    const camions = Math.ceil(deblais / toNumber(data.camion));
    const coutTerrassement = volume * toNumber(data.prixM3);
    const coutEvacuation = camions * toNumber(data.prixCamion);
    const cout = coutTerrassement + coutEvacuation;
    return { summary: `Projet : ${data.project}. Fouille de ${formatNumber(volume)} m3, deblais estimes a ${formatNumber(deblais)} m3.`, total: cout, rows: [
      { label: "Volume en place", value: `${formatNumber(volume)} m3` },
      { label: "Deblais avec foisonnement", value: `${formatNumber(deblais)} m3` },
      { label: "Camions necessaires", value: `${camions} voyages` },
      { label: "Cout terrassement", value: formatCurrency(coutTerrassement) },
      { label: "Cout evacuation", value: formatCurrency(coutEvacuation) }
    ], share: `Calcul terrassement\nProjet : ${data.project}\nVolume : ${formatNumber(volume)} m3\nDeblais : ${formatNumber(deblais)} m3\nCamions : ${camions}\nCout : ${formatCurrency(cout)}` };
  }
});
