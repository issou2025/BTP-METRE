mountCalculator({
  title: "Calculateur mortier ciment",
  fields: [
    { name: "project", label: "Nom du projet", type: "text", required: true },
    { name: "volume", label: "Volume mortier voulu (m3)", required: true, value: 1 },
    { name: "dosage", label: "Dosage ciment", type: "select", options: [
      { value: 250, label: "250 kg/m3 - leger" },
      { value: 300, label: "300 kg/m3 - courant" },
      { value: 350, label: "350 kg/m3 - resistant" },
      { value: 400, label: "400 kg/m3 - riche" }
    ] },
    { name: "marge", label: "Marge de perte (%)", value: 10 },
    { name: "prixCiment", label: "Prix ciment sac 50 kg", value: getPrice("ciment_sac_50kg") },
    { name: "prixSable", label: "Prix sable par m3", value: getPrice("sable_m3") }
  ],
  calculate(data) {
    const volume = toNumber(data.volume) * (1 + toNumber(data.marge) / 100);
    const cimentKg = volume * toNumber(data.dosage);
    const sacs = Math.ceil(cimentKg / 50);
    const sable = volume * 1.05;
    const cout = sacs * toNumber(data.prixCiment) + sable * toNumber(data.prixSable);
    return { summary: `Projet : ${data.project}. Mortier dose a ${data.dosage} kg/m3 pour ${formatNumber(volume)} m3 avec marge.`, total: cout, rows: [
      { label: "Volume mortier avec marge", value: `${formatNumber(volume)} m3` },
      { label: "Ciment", value: `${formatNumber(cimentKg, 0)} kg, soit ${sacs} sacs` },
      { label: "Sable", value: `${formatNumber(sable)} m3` },
      { label: "Cout ciment", value: formatCurrency(sacs * toNumber(data.prixCiment)) },
      { label: "Cout sable", value: formatCurrency(sable * toNumber(data.prixSable)) }
    ], share: `Calcul mortier\nProjet : ${data.project}\nVolume : ${formatNumber(volume)} m3\nCiment : ${sacs} sacs\nSable : ${formatNumber(sable)} m3\nCout : ${formatCurrency(cout)}` };
  }
});
