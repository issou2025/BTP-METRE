function toNumber(value) {
  if (typeof value === "number") return value;
  return Number(String(value || "0").replace(/\s/g, "").replace(",", ".")) || 0;
}

function formatNumber(value, decimals = 2) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(Number(value || 0));
}

function formatCurrency(value) {
  return `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(Number(value || 0)))} FCFA`;
}

function showAlert(message, type = "success") {
  const alert = document.querySelector("[data-alert]");
  if (!alert) return;
  alert.textContent = message;
  alert.className = `alert alert-${type}`;
  alert.hidden = false;
}

const ICONS = {
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  beam: '<path d="M4 7h16"/><path d="M4 17h16"/><path d="M7 7v10"/><path d="M17 7v10"/>',
  bricks: '<path d="M4 8h16v10H4z"/><path d="M4 13h16"/><path d="M9 8v5"/><path d="M15 13v5"/>',
  calculator: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8"/><path d="M8 11h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 15h.01"/><path d="M12 15h.01"/><path d="M16 15h.01"/>',
  column: '<path d="M8 3h8"/><path d="M8 21h8"/><path d="M10 3v18"/><path d="M14 3v18"/><path d="M7 7h10"/><path d="M7 17h10"/>',
  concrete: '<path d="M4 18h16"/><path d="M6 18 9 7h6l3 11"/><path d="M8 12h8"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
  foundation: '<path d="M4 18h16"/><path d="M6 18v-5l6-4 6 4v5"/><path d="M9 18v-4h6v4"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/><path d="m3 18 9 5 9-5"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  paint: '<path d="M5 3h14v8H5z"/><path d="M8 11v10"/><path d="M16 11v5a5 5 0 0 1-5 5H8"/>',
  print: '<path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/>',
  rebar: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/><path d="M8 5v14"/><path d="M16 5v14"/>',
  roof: '<path d="m3 12 9-8 9 8"/><path d="M6 12h12"/><path d="M8 12v8h8v-8"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>',
  share: '<path d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 .17 1L8.9 8.7a3 3 0 1 0 0 6.6l6.27 3.69A3 3 0 1 0 16 17.3L9.73 13.6a3 3 0 0 0 0-3.2L16 6.7A3 3 0 0 0 18 8z"/>',
  slab: '<path d="M3 16h18L12 8 3 16z"/><path d="M3 16v3h18v-3"/>',
  star: '<path d="m12 3 2.7 5.47 6.03.88-4.36 4.25 1.03 6-5.4-2.84L6.6 19.6l1.03-6-4.36-4.25 6.03-.88L12 3z"/>',
  tank: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6"/><path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3"/>',
  tiles: '<path d="M4 4h7v7H4z"/><path d="M13 4h7v7h-7z"/><path d="M4 13h7v7H4z"/><path d="M13 13h7v7h-7z"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 15h10l1-15"/>',
  wall: '<path d="M4 9h16v11H4z"/><path d="M4 14h16"/><path d="M9 9v5"/><path d="M15 14v6"/>'
};

function icon(name) {
  return `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24">${ICONS[name] || ICONS.calculator}</svg>`;
}

function setupNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;
  toggle.innerHTML = `${icon("menu")}<span>Menu</span>`;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function calculatorCard(item) {
  const favorites = loadFavorites();
  const active = favorites.includes(item.id);
  return `
    <article class="tool-card" data-title="${item.title.toLowerCase()} ${item.desc.toLowerCase()}">
      <button class="favorite ${active ? "is-active" : ""}" data-favorite="${item.id}" aria-label="Ajouter aux favoris">${icon("star")}</button>
      <span class="tool-icon">${icon(item.icon)}</span>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <a class="btn btn-secondary" href="${item.href}">Ouvrir ${icon("arrow")}</a>
    </article>`;
}

function renderCalculatorGrid(limit) {
  const grid = document.querySelector("[data-calculator-grid]");
  if (!grid) return;
  const items = typeof limit === "number" ? CALCULATOR_LINKS.slice(0, limit) : CALCULATOR_LINKS;
  grid.innerHTML = items.map(calculatorCard).join("");
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-favorite]");
    if (!button) return;
    const next = toggleFavorite(button.dataset.favorite);
    button.classList.toggle("is-active", next.includes(button.dataset.favorite));
  });
}

function setupSearch() {
  const input = document.querySelector("[data-search]");
  if (!input) return;
  input.addEventListener("input", () => {
    const value = input.value.trim().toLowerCase();
    document.querySelectorAll(".tool-card").forEach((card) => {
      card.hidden = !card.dataset.title.includes(value);
    });
  });
}

function enhanceButtons() {
  document.querySelectorAll(".btn").forEach((button) => {
    if (button.querySelector(".icon")) return;
    const label = button.textContent.trim().toLowerCase();
    let name = "arrow";
    if (label.includes("calcul")) name = "calculator";
    if (label.includes("maison")) name = "home";
    if (label.includes("whatsapp") || label.includes("partager")) name = "share";
    if (label.includes("envoyer")) name = "send";
    if (label.includes("pdf") || label.includes("sauvegarder") || label.includes("exporter")) name = "download";
    if (label.includes("importer") || label.includes("copier")) name = "copy";
    if (label.includes("effacer") || label.includes("reinitialiser")) name = "trash";
    button.insertAdjacentHTML("afterbegin", icon(name));
  });
}

function enhanceContentCards() {
  document.querySelectorAll(".info-card, .guide-card").forEach((card, index) => {
    if (card.querySelector(".tool-icon")) return;
    const names = ["calculator", "download", "share", "layers", "home", "wall"];
    card.insertAdjacentHTML("afterbegin", `<span class="tool-icon">${icon(names[index % names.length])}</span>`);
  });
}

function collectForm(form) {
  const data = {};
  new FormData(form).forEach((value, key) => {
    data[key] = value;
  });
  return data;
}

function validateRequired(form) {
  const negative = [...form.querySelectorAll('input[type="number"]')].find((field) => field.value !== "" && toNumber(field.value) < 0);
  if (negative) {
    negative.focus();
    showAlert("Les valeurs negatives ne sont pas acceptees.", "danger");
    return false;
  }
  const invalid = [...form.querySelectorAll("[required]")].find((field) => {
    return field.value === "" || (field.type === "number" && toNumber(field.value) < 0);
  });
  if (invalid) {
    invalid.focus();
    showAlert("Veuillez remplir tous les champs obligatoires avec des valeurs positives.", "danger");
    return false;
  }
  return true;
}

function renderRows(rows) {
  return rows.map((row) => `<tr><th>${row.label}</th><td>${row.value}</td></tr>`).join("");
}

function shareWhatsApp(summary) {
  const text = encodeURIComponent(summary);
  window.open(`https://wa.me/?text=${text}`, "_blank", "noopener");
}

function mountCalculator(config) {
  const host = document.querySelector("[data-calculator]");
  if (!host || !config) return;
  host.innerHTML = `
    <form class="calc-form" data-calc-form>
      ${config.fields.map(renderField).join("")}
      <div class="form-actions sticky-actions">
        <button class="btn btn-primary" type="submit">${icon("calculator")}Calculer</button>
        <button class="btn btn-light" type="reset">${icon("trash")}Effacer</button>
      </div>
      <div data-alert hidden></div>
    </form>
    <section class="result-card" hidden>
      <div class="result-head">
        <div>
          <p class="eyebrow">Resume du calcul</p>
          <h2>${config.title}</h2>
          <p data-result-summary></p>
        </div>
        <strong data-result-total></strong>
      </div>
      <div class="table-wrap"><table><tbody data-result-rows></tbody></table></div>
      <p class="note">Calcul indicatif. Pour les ouvrages structurels, faites valider les dimensions et dosages par un professionnel qualifie.</p>
      <div class="result-actions">
        <button class="btn btn-primary" type="button" data-pdf>${icon("download")}Telecharger PDF</button>
        <button class="btn btn-light" type="button" data-print>${icon("print")}Imprimer</button>
        <button class="btn btn-secondary" type="button" data-share>${icon("share")}Partager WhatsApp</button>
        <button class="btn btn-light" type="button" data-copy>${icon("copy")}Copier</button>
      </div>
    </section>`;

  const form = host.querySelector("[data-calc-form]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateRequired(form)) return;
    const result = config.calculate(collectForm(form));
    showResult(host, result);
  });
}

function renderField(field) {
  const fieldClass = field.type === "text" || field.name === "project" || field.name === "message" ? "field field-wide" : "field";
  if (field.type === "select") {
    return `<label class="${fieldClass}">${field.label}<select name="${field.name}" ${field.required ? "required" : ""}>${field.options.map((opt) => `<option value="${opt.value}">${opt.label}</option>`).join("")}</select></label>`;
  }
  return `<label class="${fieldClass}">${field.label}<input name="${field.name}" type="${field.type || "number"}" inputmode="${field.inputmode || "decimal"}" min="${field.min || "0"}" step="${field.step || "any"}" value="${field.value || ""}" ${field.required ? "required" : ""}></label>`;
}

function showResult(host, result) {
  const card = host.querySelector(".result-card");
  card.hidden = false;
  host.querySelector("[data-result-summary]").textContent = result.summary;
  host.querySelector("[data-result-total]").textContent = result.total ? formatCurrency(result.total) : "";
  host.querySelector("[data-result-rows]").innerHTML = renderRows(result.rows);
  host.querySelector("[data-share]").onclick = () => shareWhatsApp(result.share);
  host.querySelector("[data-copy]").onclick = async () => {
    await navigator.clipboard.writeText(result.share);
    showAlert("Resultat copie.", "success");
  };
  host.querySelector("[data-pdf]").onclick = generatePDF;
  host.querySelector("[data-print]").onclick = printResult;
  card.scrollIntoView({ behavior: "smooth", block: "start" });
}

function concreteQuantities(volume, dosage, loss = 0) {
  const d = BTP_DATA.dosages[dosage] || BTP_DATA.dosages[350];
  const v = volume * (1 + loss);
  return {
    volume: v,
    cimentKg: v * d.ciment_kg_m3,
    sacs: Math.ceil((v * d.ciment_kg_m3) / 50),
    sable: v * d.sable_m3_m3,
    gravier: v * d.gravier_m3_m3,
    eau: v * BTP_DATA.constants.waterPerM3
  };
}

function initPricePage() {
  const form = document.querySelector("[data-price-form]");
  if (!form) return;
  const fields = [
    ["ciment_sac_50kg", "Prix sac ciment 50 kg"],
    ["sable_m3", "Prix sable par m3"],
    ["gravier_m3", "Prix gravier par m3"],
    ["acier_kg", "Prix acier par kg"],
    ["brique_unite", "Prix brique unite"],
    ["carrelage_m2", "Prix carrelage par m2"],
    ["peinture_20l", "Prix peinture 20L"],
    ["main_oeuvre_jour", "Prix main-d'oeuvre par jour"],
    ["tole_unite", "Prix tole unite"],
    ["bois_charpente", "Prix bois ou charpente"]
  ];
  const prices = loadPrices();
  form.innerHTML = fields.map(([key, label]) => `<label>${label}<input name="${key}" type="number" min="0" value="${prices[key] || 0}"></label>`).join("") + `
    <div class="form-actions">
      <button class="btn btn-primary" type="submit">${icon("download")}Sauvegarder</button>
      <button class="btn btn-light" type="button" data-reset-prices>${icon("trash")}Reinitialiser</button>
      <button class="btn btn-secondary" type="button" data-export-prices>${icon("download")}Exporter JSON</button>
      <label class="btn btn-light import-label">${icon("copy")}Importer JSON<input type="file" accept="application/json" data-import-prices hidden></label>
    </div><div data-alert hidden></div>`;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const next = {};
    new FormData(form).forEach((value, key) => {
      next[key] = toNumber(value);
    });
    savePrices(next);
    showAlert("Prix sauvegardes sur cet appareil.", "success");
  });
  form.querySelector("[data-reset-prices]").onclick = () => {
    resetPrices();
    location.reload();
  };
  form.querySelector("[data-export-prices]").onclick = () => {
    const blob = new Blob([JSON.stringify(loadPrices(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "prix-materiaux-niger.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  form.querySelector("[data-import-prices]").onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    savePrices(JSON.parse(await file.text()));
    location.reload();
  };
}

document.addEventListener("DOMContentLoaded", () => {
  setupNav();
  renderCalculatorGrid(document.body.dataset.gridLimit ? Number(document.body.dataset.gridLimit) : undefined);
  setupSearch();
  initPricePage();
  enhanceContentCards();
  enhanceButtons();
});
