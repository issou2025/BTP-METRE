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
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
  paint: '<path d="M5 3h14v8H5z"/><path d="M8 11v10"/><path d="M16 11v5a5 5 0 0 1-5 5H8"/>',
  print: '<path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/>',
  rebar: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/><path d="M8 5v14"/><path d="M16 5v14"/>',
  roof: '<path d="m3 12 9-8 9 8"/><path d="M6 12h12"/><path d="M8 12v8h8v-8"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>',
  share: '<path d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 .17 1L8.9 8.7a3 3 0 1 0 0 6.6l6.27 3.69A3 3 0 1 0 16 17.3L9.73 13.6a3 3 0 0 0 0-3.2L16 6.7A3 3 0 0 0 18 8z"/>',
  shuffle: '<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.5a6 6 0 0 0 5.2-3l6.6-12A6 6 0 0 1 20.5 0"/><path d="M2 6h1.5a6 6 0 0 1 5.2 3l1 1.8"/><path d="M15 18h7"/><path d="M15 6h7"/>',
  slab: '<path d="M3 16h18L12 8 3 16z"/><path d="M3 16v3h18v-3"/>',
  star: '<path d="m12 3 2.7 5.47 6.03.88-4.36 4.25 1.03 6-5.4-2.84L6.6 19.6l1.03-6-4.36-4.25 6.03-.88L12 3z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  tank: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6"/><path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3"/>',
  tiles: '<path d="M4 4h7v7H4z"/><path d="M13 4h7v7h-7z"/><path d="M4 13h7v7H4z"/><path d="M13 13h7v7h-7z"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 15h10l1-15"/>',
  wifi: '<path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M8.5 16.05a6 6 0 0 1 7 0"/><path d="M12 20h.01"/>',
  wifiOff: '<path d="m2 2 20 20"/><path d="M8.5 16.05a6 6 0 0 1 7 0"/><path d="M12 20h.01"/><path d="M5 12.55a11 11 0 0 1 7.5-2.53"/><path d="M19 12.55a11 11 0 0 0-2.29-1.75"/>',
  wall: '<path d="M4 9h16v11H4z"/><path d="M4 14h16"/><path d="M9 9v5"/><path d="M15 14v6"/>'
};

function icon(name) {
  return `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24">${ICONS[name] || ICONS.calculator}</svg>`;
}

const CALCULATOR_CATEGORIES = {
  beton: "Gros oeuvre",
  maconnerie: "Gros oeuvre",
  fondation: "Gros oeuvre",
  dalle: "Gros oeuvre",
  poteau: "Structure",
  poutre: "Structure",
  ferraillage: "Structure",
  escalier: "Structure",
  enduit: "Finitions",
  peinture: "Finitions",
  carrelage: "Finitions",
  chape: "Finitions",
  plafond: "Finitions",
  toiture: "Couverture",
  cloture: "Exterieur",
  fosse: "Exterieur",
  terrassement: "Exterieur",
  maison: "Budget",
  electricite: "Second oeuvre",
  plomberie: "Second oeuvre",
  menuiserie: "Second oeuvre",
  mortier: "Materiaux"
};

function calculatorCategory(item) {
  return CALCULATOR_CATEGORIES[item.id] || "Autres";
}

function currentPagePath() {
  return location.pathname.split("/").pop() || "index.html";
}

function setupTheme() {
  const theme = loadTheme();
  document.documentElement.dataset.theme = theme;
}

function setupNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;
  const themeButton = document.createElement("button");
  themeButton.className = "icon-btn";
  themeButton.type = "button";
  themeButton.setAttribute("aria-label", "Changer le theme");
  themeButton.innerHTML = icon(loadTheme() === "dark" ? "sun" : "moon");
  themeButton.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    saveTheme(next);
    themeButton.innerHTML = icon(next === "dark" ? "sun" : "moon");
  });
  nav.insertAdjacentElement("afterend", themeButton);
  toggle.innerHTML = `${icon("menu")}<span>Menu</span>`;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function calculatorCard(item) {
  const favorites = loadFavorites();
  const active = favorites.includes(item.id);
  const category = calculatorCategory(item);
  return `
    <article class="tool-card" data-id="${item.id}" data-category="${category}" data-title="${item.title.toLowerCase()} ${item.desc.toLowerCase()} ${category.toLowerCase()}">
      <button class="favorite ${active ? "is-active" : ""}" data-favorite="${item.id}" aria-label="Ajouter aux favoris">${icon("star")}</button>
      <span class="tool-icon">${icon(item.icon)}</span>
      <span class="badge">${category}</span>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <a class="btn btn-secondary" href="${item.href}">Ouvrir ${icon("arrow")}</a>
    </article>`;
}

function decorateCalculatorSearch(grid) {
  const section = grid.closest(".section");
  const input = document.querySelector("[data-search]");
  if (!section || section.querySelector(".tool-controls")) return;
  const categories = ["Tous", ...new Set(CALCULATOR_LINKS.map(calculatorCategory))];
  const controls = document.createElement("div");
  controls.className = "tool-controls";
  controls.innerHTML = `
    <div class="segmented" data-category-filter>
      ${categories.map((cat, index) => `<button type="button" class="${index === 0 ? "is-active" : ""}" data-category="${cat}">${cat}</button>`).join("")}
    </div>
    <div class="toolbar-row">
      <label class="compact-field">Tri
        <select data-sort-tools>
          <option value="default">Par defaut</option>
          <option value="az">A-Z</option>
          <option value="category">Categorie</option>
          <option value="favorites">Favoris d'abord</option>
        </select>
      </label>
      <button class="btn btn-light" type="button" data-favorites-only>${icon("star")}Favoris</button>
      <button class="btn btn-light" type="button" data-random-tool>${icon("shuffle")}Au hasard</button>
      <span class="result-count" data-result-count></span>
    </div>`;
  (input ? input.closest(".section-head") : section.querySelector(".container")).insertAdjacentElement("afterend", controls);
}

function applyToolFilters() {
  const grid = document.querySelector("[data-calculator-grid]");
  if (!grid) return;
  const input = document.querySelector("[data-search]");
  const value = input ? input.value.trim().toLowerCase() : "";
  const activeCategory = document.querySelector("[data-category-filter] .is-active")?.dataset.category || "Tous";
  const favoritesOnly = document.querySelector("[data-favorites-only]")?.classList.contains("is-active");
  const favorites = loadFavorites();
  let visible = 0;
  document.querySelectorAll(".tool-card").forEach((card) => {
    const matchesSearch = card.dataset.title.includes(value);
    const matchesCategory = activeCategory === "Tous" || card.dataset.category === activeCategory;
    const matchesFavorite = !favoritesOnly || favorites.includes(card.dataset.id);
    card.hidden = !(matchesSearch && matchesCategory && matchesFavorite);
    if (!card.hidden) visible += 1;
  });
  const count = document.querySelector("[data-result-count]");
  if (count) count.textContent = `${visible} outil${visible > 1 ? "s" : ""}`;
}

function sortToolCards(mode) {
  const grid = document.querySelector("[data-calculator-grid]");
  if (!grid) return;
  const favorites = loadFavorites();
  const cards = [...grid.children];
  const original = new Map(CALCULATOR_LINKS.map((item, index) => [item.id, index]));
  cards.sort((a, b) => {
    if (mode === "az") return a.querySelector("h3").textContent.localeCompare(b.querySelector("h3").textContent, "fr");
    if (mode === "category") return a.dataset.category.localeCompare(b.dataset.category, "fr") || a.querySelector("h3").textContent.localeCompare(b.querySelector("h3").textContent, "fr");
    if (mode === "favorites") return Number(favorites.includes(b.dataset.id)) - Number(favorites.includes(a.dataset.id)) || original.get(a.dataset.id) - original.get(b.dataset.id);
    return original.get(a.dataset.id) - original.get(b.dataset.id);
  });
  cards.forEach((card) => grid.appendChild(card));
}

function setupToolControls() {
  const grid = document.querySelector("[data-calculator-grid]");
  if (!grid) return;
  decorateCalculatorSearch(grid);
  document.querySelector("[data-category-filter]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    button.parentElement.querySelectorAll("button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    applyToolFilters();
  });
  document.querySelector("[data-sort-tools]")?.addEventListener("change", (event) => {
    sortToolCards(event.target.value);
    applyToolFilters();
  });
  document.querySelector("[data-favorites-only]")?.addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("is-active");
    applyToolFilters();
  });
  document.querySelector("[data-random-tool]")?.addEventListener("click", () => {
    const visible = [...document.querySelectorAll(".tool-card:not([hidden]) a.btn")];
    const target = visible[Math.floor(Math.random() * visible.length)];
    if (target) location.href = target.getAttribute("href");
  });
  applyToolFilters();
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
    applyToolFilters();
  });
  setupToolControls();
}

function setupSearch() {
  const input = document.querySelector("[data-search]");
  if (!input) return;
  input.addEventListener("input", applyToolFilters);
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

function setupPageUtilities() {
  const rail = document.createElement("div");
  rail.className = "quick-rail";
  rail.innerHTML = `
    <button class="icon-btn" type="button" data-copy-page aria-label="Copier le lien">${icon("link")}</button>
    <button class="icon-btn" type="button" data-install-app hidden aria-label="Installer">${icon("download")}</button>
    <button class="icon-btn" type="button" data-back-top aria-label="Retour en haut">${icon("arrow")}</button>
    <span class="connection-pill" data-connection>${icon(navigator.onLine ? "wifi" : "wifiOff")}<span>${navigator.onLine ? "En ligne" : "Hors ligne"}</span></span>`;
  document.body.appendChild(rail);
  rail.querySelector("[data-copy-page]").addEventListener("click", async () => {
    await navigator.clipboard.writeText(location.href);
    showToast("Lien de la page copie.");
  });
  rail.querySelector("[data-back-top]").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  const status = rail.querySelector("[data-connection]");
  const updateStatus = () => {
    status.innerHTML = `${icon(navigator.onLine ? "wifi" : "wifiOff")}<span>${navigator.onLine ? "En ligne" : "Hors ligne"}</span>`;
    status.classList.toggle("is-offline", !navigator.onLine);
  };
  addEventListener("online", updateStatus);
  addEventListener("offline", updateStatus);
  setupInstallPrompt(rail.querySelector("[data-install-app]"));
}

function setupInstallPrompt(button) {
  let installEvent;
  addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installEvent = event;
    button.hidden = false;
  });
  button.addEventListener("click", async () => {
    if (!installEvent) return;
    installEvent.prompt();
    await installEvent.userChoice;
    installEvent = null;
    button.hidden = true;
  });
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function renderHomeStats() {
  const heroPanel = document.querySelector(".hero-panel");
  if (!heroPanel || heroPanel.querySelector(".stat-strip")) return;
  const categories = new Set(CALCULATOR_LINKS.map(calculatorCategory)).size;
  heroPanel.insertAdjacentHTML("beforeend", `
    <div class="stat-strip">
      <span><strong>${CALCULATOR_LINKS.length}</strong> calculateurs</span>
      <span><strong>${categories}</strong> categories</span>
      <span><strong>PDF</strong> inclus</span>
    </div>`);
}

function renderRecentTools() {
  const recent = loadRecent();
  const grid = document.querySelector("[data-calculator-grid]");
  if (!recent.length || !grid || document.querySelector(".recent-panel")) return;
  const panel = document.createElement("section");
  panel.className = "recent-panel";
  panel.innerHTML = `
    <div>
      <p class="eyebrow">Derniers outils</p>
      <h2>Reprendre rapidement</h2>
    </div>
    <div class="chip-list">
      ${recent.map((item) => `<a class="chip" href="${item.href}">${icon(item.icon || "calculator")}${item.title}</a>`).join("")}
    </div>`;
  grid.closest(".container").insertBefore(panel, grid);
}

function rememberCurrentCalculator(config) {
  const page = currentPagePath();
  const item = CALCULATOR_LINKS.find((entry) => entry.href.endsWith(page));
  if (item) saveRecent({ title: item.title, href: item.href, icon: item.icon });
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
  rememberCurrentCalculator(config);
  const draft = loadDraft(config.title);
  host.innerHTML = `
    <aside class="calc-toolbar">
      <div>
        <p class="eyebrow">Assistant de saisie</p>
        <strong>${config.fields.length} champs</strong>
      </div>
      <div class="toolbar-row">
        <button class="btn btn-light" type="button" data-fill-example>${icon("calculator")}Exemple</button>
        <button class="btn btn-light" type="button" data-clear-draft>${icon("trash")}Brouillon</button>
      </div>
    </aside>
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
        <button class="btn btn-light" type="button" data-native-share>${icon("share")}Partager</button>
        <button class="btn btn-light" type="button" data-copy>${icon("copy")}Copier</button>
        <button class="btn btn-light" type="button" data-csv>${icon("download")}CSV</button>
        <button class="btn btn-light" type="button" data-json>${icon("download")}JSON</button>
      </div>
      <div class="history-panel" data-history-panel></div>
    </section>`;

  const form = host.querySelector("[data-calc-form]");
  restoreDraft(form, draft);
  form.addEventListener("input", () => saveDraft(config.title, collectForm(form)));
  form.addEventListener("reset", () => {
    clearDraft(config.title);
    setTimeout(() => saveDraft(config.title, collectForm(form)));
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateRequired(form)) return;
    const result = config.calculate(collectForm(form));
    showResult(host, result, config.title);
  });
  host.querySelector("[data-fill-example]").onclick = () => {
    config.fields.forEach((field) => {
      const input = form.elements[field.name];
      if (input && field.value !== undefined) input.value = field.value;
    });
    saveDraft(config.title, collectForm(form));
    showToast("Exemple charge.");
  };
  host.querySelector("[data-clear-draft]").onclick = () => {
    clearDraft(config.title);
    showToast("Brouillon supprime.");
  };
  renderHistory(host, config.title);
}

function renderField(field) {
  const fieldClass = field.type === "text" || field.name === "project" || field.name === "message" ? "field field-wide" : "field";
  if (field.type === "select") {
    return `<label class="${fieldClass}">${field.label}<select name="${field.name}" ${field.required ? "required" : ""}>${field.options.map((opt) => `<option value="${opt.value}">${opt.label}</option>`).join("")}</select></label>`;
  }
  return `<label class="${fieldClass}">${field.label}<input name="${field.name}" type="${field.type || "number"}" inputmode="${field.inputmode || "decimal"}" min="${field.min || "0"}" step="${field.step || "any"}" value="${field.value || ""}" ${field.required ? "required" : ""}></label>`;
}

function restoreDraft(form, draft) {
  Object.entries(draft).forEach(([key, value]) => {
    const field = form.elements[key];
    if (field && value !== "") field.value = value;
  });
}

function downloadText(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function resultToCsv(result) {
  const rows = [["Element", "Valeur"], ...result.rows.map((row) => [row.label, row.value])];
  return rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
}

function renderHistory(host, title) {
  const panel = host.querySelector("[data-history-panel]");
  if (!panel) return;
  const history = loadHistory(title);
  if (!history.length) {
    panel.innerHTML = "";
    return;
  }
  panel.innerHTML = `
    <p class="eyebrow">Historique local</p>
    <div class="history-list">
      ${history.map((item) => `<button type="button" data-history-item="${item.at}"><strong>${item.total ? formatCurrency(item.total) : "Resultat"}</strong><span>${new Date(item.at).toLocaleString("fr-FR")}</span></button>`).join("")}
    </div>`;
  panel.querySelectorAll("[data-history-item]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = history.find((entry) => String(entry.at) === button.dataset.historyItem);
      if (item) showResult(host, item, title, false);
    });
  });
}

function showResult(host, result, title = "Calcul", persist = true) {
  const card = host.querySelector(".result-card");
  card.hidden = false;
  host.querySelector("[data-result-summary]").textContent = result.summary;
  host.querySelector("[data-result-total]").textContent = result.total ? formatCurrency(result.total) : "";
  host.querySelector("[data-result-rows]").innerHTML = renderRows(result.rows);
  host.querySelector("[data-share]").onclick = () => shareWhatsApp(result.share);
  host.querySelector("[data-native-share]").hidden = !navigator.share;
  host.querySelector("[data-native-share]").onclick = async () => {
    await navigator.share({ title, text: result.share, url: location.href });
  };
  host.querySelector("[data-copy]").onclick = async () => {
    await navigator.clipboard.writeText(result.share);
    showAlert("Resultat copie.", "success");
  };
  host.querySelector("[data-csv]").onclick = () => downloadText("metre-btp-resultat.csv", resultToCsv(result), "text/csv");
  host.querySelector("[data-json]").onclick = () => downloadText("metre-btp-resultat.json", JSON.stringify(result, null, 2), "application/json");
  host.querySelector("[data-pdf]").onclick = generatePDF;
  host.querySelector("[data-print]").onclick = printResult;
  if (persist) {
    saveHistory(title, result);
    renderHistory(host, title);
  }
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
      <button class="btn btn-light" type="button" data-copy-prices>${icon("copy")}Copier les prix</button>
      <label class="btn btn-light import-label">${icon("copy")}Importer JSON<input type="file" accept="application/json" data-import-prices hidden></label>
    </div><div class="price-summary" data-price-summary></div><div data-alert hidden></div>`;
  const updatePriceSummary = () => {
    const values = {};
    new FormData(form).forEach((value, key) => {
      values[key] = toNumber(value);
    });
    const sample = values.ciment_sac_50kg * 10 + values.sable_m3 + values.gravier_m3;
    form.querySelector("[data-price-summary]").innerHTML = `<strong>Simulation rapide</strong><span>10 sacs + 1 m3 sable + 1 m3 gravier : ${formatCurrency(sample)}</span>`;
  };
  form.addEventListener("input", updatePriceSummary);
  updatePriceSummary();
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
  form.querySelector("[data-copy-prices]").onclick = async () => {
    await navigator.clipboard.writeText(JSON.stringify(loadPrices(), null, 2));
    showAlert("Prix copies.", "success");
  };
  form.querySelector("[data-import-prices]").onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    savePrices(JSON.parse(await file.text()));
    location.reload();
  };
}

document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupNav();
  renderCalculatorGrid(document.body.dataset.gridLimit ? Number(document.body.dataset.gridLimit) : undefined);
  setupSearch();
  initPricePage();
  enhanceContentCards();
  enhanceButtons();
  renderHomeStats();
  renderRecentTools();
  setupPageUtilities();
});
