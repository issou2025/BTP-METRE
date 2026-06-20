mountCalculator({
  title: "Calculateur mur de cloture",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "longueur", label: "Longueur terrain (m)", required: true, value: 20 },
    { name: "largeur", label: "Largeur terrain (m)", required: true, value: 30 },
    { name: "hauteur", label: "Hauteur mur (m)", required: true, value: 2 },
    { name: "briquesM2", label: "Briques par m2", value: 10 },
    { name: "espacement", label: "Espacement poteaux (m)", value: 3 },
    { name: "section", label: "Section poteaux carree (m)", value: 0.2 },
    { name: "hauteurPoteau", label: "Hauteur poteaux (m)", value: 2.4 },
    { name: "fondLargeur", label: "Fondation largeur (m)", value: 0.4 },
    { name: "fondHauteur", label: "Fondation hauteur (m)", value: 0.4 },
    { name: "facesEnduit", label: "Enduit", type: "select", options: [{ value: 0, label: "Non" }, { value: 1, label: "1 face" }, { value: 2, label: "2 faces" }] },
    { name: "peinture", label: "Peinture", type: "select", options: [{ value: 0, label: "Non" }, { value: 1, label: "Oui" }] }
  ],
  calculate(data) {
    const perimetre = 2 * (toNumber(data.longueur) + toNumber(data.largeur));
    const surface = perimetre * toNumber(data.hauteur);
    const briques = Math.ceil(surface * toNumber(data.briquesM2));
    const poteaux = Math.ceil(perimetre / toNumber(data.espacement));
    const fondation = perimetre * toNumber(data.fondLargeur) * toNumber(data.fondHauteur);
    const volumePoteaux = poteaux * toNumber(data.section) * toNumber(data.section) * toNumber(data.hauteurPoteau);
    const q = concreteQuantities(fondation + volumePoteaux, 300);
    const enduitSurface = surface * toNumber(data.facesEnduit);
    const peintureSurface = toNumber(data.peinture) ? enduitSurface : 0;
    const cout = briques * getPrice("brique_unite") + q.sacs * getPrice("ciment_sac_50kg") + q.sable * getPrice("sable_m3") + q.gravier * getPrice("gravier_m3") + peintureSurface / 80 * getPrice("peinture_20l");
    return { summary: `Projet : ${data.project}. Cloture de ${formatNumber(perimetre)} m de perimetre.`, total: cout, rows: [
      { label: "Perimetre terrain", value: `${formatNumber(perimetre)} m` },
      { label: "Surface mur", value: `${formatNumber(surface)} m2` },
      { label: "Nombre briques", value: `${briques}` },
      { label: "Nombre poteaux", value: `${poteaux}` },
      { label: "Volume fondation", value: `${formatNumber(fondation)} m3` },
      { label: "Volume poteaux", value: `${formatNumber(volumePoteaux)} m3` },
      { label: "Beton total", value: `${formatNumber(q.volume)} m3` },
      { label: "Ciment beton", value: `${q.sacs} sacs` },
      { label: "Enduit", value: `${formatNumber(enduitSurface)} m2` },
      { label: "Peinture", value: `${formatNumber(peintureSurface)} m2` }
    ], share: `Calcul cloture\nProjet : ${data.project}\nPerimetre : ${formatNumber(perimetre)} m\nBriques : ${briques}\nPoteaux : ${poteaux}\nBeton : ${formatNumber(q.volume)} m3\nCout : ${formatCurrency(cout)}` };
  }
});
