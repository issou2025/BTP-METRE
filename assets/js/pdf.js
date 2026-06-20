function pdfText(selector) {
  const node = document.querySelector(selector);
  return node ? node.textContent.trim() : "";
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildPdfSheet() {
  const rows = [...document.querySelectorAll("[data-result-rows] tr")].map((row) => {
    const cells = row.querySelectorAll("th, td");
    return {
      label: cells[0] ? cells[0].textContent.trim() : "",
      value: cells[1] ? cells[1].textContent.trim() : ""
    };
  });
  const title = pdfText(".result-head h2") || "Resultat de calcul";
  const summary = pdfText("[data-result-summary]");
  const total = pdfText("[data-result-total]") || "Aucun cout total";
  const date = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short"
  }).format(new Date());

  const sheet = document.createElement("section");
  sheet.className = "pdf-sheet";
  sheet.innerHTML = `
    <header class="pdf-header">
      <div>
        <p class="pdf-kicker">Metre BTP Niger</p>
        <h1>${escapeHtml(title)}</h1>
      </div>
      <div class="pdf-total">
        <span>Cout estimatif</span>
        <strong>${escapeHtml(total)}</strong>
      </div>
    </header>
    <div class="pdf-summary">
      <strong>Resume</strong>
      <p>${escapeHtml(summary)}</p>
    </div>
    <table class="pdf-table">
      <thead><tr><th>Element</th><th>Quantite / montant</th></tr></thead>
      <tbody>
        ${rows.map((row) => `<tr><td>${escapeHtml(row.label)}</td><td>${escapeHtml(row.value)}</td></tr>`).join("")}
      </tbody>
    </table>
    <footer class="pdf-footer">
      <p>Document genere le ${escapeHtml(date)}. Les calculs sont indicatifs et doivent etre verifies selon le chantier.</p>
    </footer>`;
  return sheet;
}

function createPdfHost() {
  const host = document.createElement("div");
  host.className = "pdf-render-host";
  host.appendChild(buildPdfSheet());
  document.body.appendChild(host);
  return host;
}

function generatePDF() {
  const result = document.querySelector(".result-card");
  if (!result || result.hidden) {
    showAlert("Lancez d'abord un calcul avant l'export PDF.", "danger");
    return;
  }

  const host = createPdfHost();
  const sheet = host.querySelector(".pdf-sheet");
  if (window.html2pdf) {
    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: "metre-btp-resultat.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: "#ffffff", useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] }
      })
      .from(sheet)
      .save()
      .then(() => host.remove());
    return;
  }

  host.className = "print-export";
  window.print();
  setTimeout(() => host.remove(), 500);
}

function printResult() {
  const result = document.querySelector(".result-card");
  if (!result || result.hidden) {
    showAlert("Lancez d'abord un calcul avant l'impression.", "danger");
    return;
  }
  const printArea = createPdfHost();
  printArea.className = "print-export";
  window.print();
  setTimeout(() => printArea.remove(), 500);
}
