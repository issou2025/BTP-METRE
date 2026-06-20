mountCalculator({
  title: "Calculateur escalier beton",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "hauteur", label: "Hauteur a franchir (m)", required: true, value: 3 },
    { name: "largeur", label: "Largeur escalier (m)", required: true, value: 1 },
    { name: "hauteurMarche", label: "Hauteur marche (m)", required: true, value: 0.17 },
    { name: "giron", label: "Giron marche (m)", required: true, value: 0.28 },
    { name: "paillasse", label: "Epaisseur paillasse (m)", value: 0.12 },
    { name: "dosage", label: "Dosage beton", type: "select", options: [300, 350].map((x) => ({ value: x, label: `${x} kg/m3` })) }
  ],
  calculate(data) {
    const marches = Math.ceil(toNumber(data.hauteur) / toNumber(data.hauteurMarche));
    const developpe = marches * toNumber(data.giron);
    const volumeMarches = marches * (toNumber(data.giron) * toNumber(data.hauteurMarche) / 2) * toNumber(data.largeur);
    const volumePaillasse = developpe * toNumber(data.largeur) * toNumber(data.paillasse);
    const q = concreteQuantities(volumeMarches + volumePaillasse, data.dosage, 0.1);
    const acierKg = (developpe * toNumber(data.largeur)) * 8;
    const cout = q.sacs * getPrice("ciment_sac_50kg") + q.sable * getPrice("sable_m3") + q.gravier * getPrice("gravier_m3") + acierKg * getPrice("acier_kg");
    return { summary: `Projet : ${data.project}. Escalier de ${marches} marches, largeur ${formatNumber(toNumber(data.largeur))} m.`, total: cout, rows: [
      { label: "Nombre de marches", value: `${marches} marches` },
      { label: "Developpe horizontal", value: `${formatNumber(developpe)} m` },
      { label: "Volume beton avec marge", value: `${formatNumber(q.volume)} m3` },
      { label: "Ciment", value: `${q.sacs} sacs` },
      { label: "Sable", value: `${formatNumber(q.sable)} m3` },
      { label: "Gravier", value: `${formatNumber(q.gravier)} m3` },
      { label: "Acier estimatif", value: `${formatNumber(acierKg)} kg` }
    ], share: `Calcul escalier\nProjet : ${data.project}\nMarches : ${marches}\nBeton : ${formatNumber(q.volume)} m3\nCiment : ${q.sacs} sacs\nCout : ${formatCurrency(cout)}` };
  }
});
