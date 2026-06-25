const PROJECT_KEY = "metreBtpNigerProjects";
const ACTIVE_PROJECT_KEY = "metreBtpNigerActiveProject";

function projectMoney(value) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(Number(value || 0))) + " FCFA";
}

function projectNumber(value) {
  return Number(String(value || "0").replace(/\s/g, "").replace(",", ".")) || 0;
}

function uid(prefix = "p") {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadProjects() {
  try {
    return JSON.parse(localStorage.getItem(PROJECT_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function saveProjects(projects) {
  localStorage.setItem(PROJECT_KEY, JSON.stringify(projects));
}

function activeProjectId() {
  return localStorage.getItem(ACTIVE_PROJECT_KEY);
}

function setActiveProject(id) {
  if (id) localStorage.setItem(ACTIVE_PROJECT_KEY, id);
}

function getActiveProject() {
  const projects = loadProjects();
  return projects.find((project) => project.id === activeProjectId()) || projects[0] || null;
}

function updateProject(nextProject) {
  const projects = loadProjects();
  const index = projects.findIndex((project) => project.id === nextProject.id);
  if (index >= 0) projects[index] = nextProject;
  else projects.unshift(nextProject);
  saveProjects(projects);
  setActiveProject(nextProject.id);
}

function projectBaseTotal(project) {
  return (project.items || []).reduce((sum, item) => sum + projectNumber(item.qty) * projectNumber(item.unitPrice), 0);
}

function projectGrandTotal(project) {
  const base = projectBaseTotal(project);
  const margin = base * projectNumber(project.margin) / 100;
  return base + margin;
}

function projectSummaryText(project) {
  if (!project) return "Aucun projet.";
  const lines = [
    `Projet : ${project.name}`,
    `Client : ${project.client || "-"}`,
    `Ville : ${project.city || "-"}`,
    `Type : ${project.type || "-"}`,
    `Surface : ${project.surface || 0} m2`,
    `Total estimatif : ${projectMoney(projectGrandTotal(project))}`,
    "",
    "Détail :"
  ];
  (project.items || []).forEach((item) => {
    const amount = projectNumber(item.qty) * projectNumber(item.unitPrice);
    lines.push(`- ${item.lot} | ${item.designation} | ${item.qty} ${item.unit} x ${projectMoney(item.unitPrice)} = ${projectMoney(amount)}`);
  });
  lines.push("", "Calcul indicatif généré avec Métré BTP Niger.");
  return lines.join("\n");
}

function downloadText(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function projectToCsv(project) {
  const rows = [["Lot", "Designation", "Quantite", "Unite", "Prix unitaire", "Montant"]];
  (project.items || []).forEach((item) => {
    const amount = projectNumber(item.qty) * projectNumber(item.unitPrice);
    rows.push([item.lot, item.designation, item.qty, item.unit, item.unitPrice, amount]);
  });
  rows.push(["", "", "", "", "Sous-total", projectBaseTotal(project)]);
  rows.push(["", "", "", "", `Marge ${projectNumber(project.margin)}%`, projectGrandTotal(project) - projectBaseTotal(project)]);
  rows.push(["", "", "", "", "Total", projectGrandTotal(project)]);
  return rows.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(";")).join("\n");
}

function renderProjects() {
  const app = document.querySelector("[data-project-app]");
  if (!app) return;
  const form = document.querySelector("[data-project-form]");
  const lineForm = document.querySelector("[data-line-form]");
  const project = getActiveProject();
  const title = document.querySelector("[data-active-title]");
  const meta = document.querySelector("[data-active-meta]");
  const activeTotal = document.querySelector("[data-active-total]");
  const grandTotal = document.querySelector("[data-grand-total]");
  const tbody = document.querySelector("[data-lines]");
  const lotSummary = document.querySelector("[data-lot-summary]");

  if (form && project) {
    form.name.value = project.name || "";
    form.client.value = project.client || "";
    form.city.value = project.city || "Niamey";
    form.type.value = project.type || "Maison";
    form.surface.value = project.surface || "";
    form.margin.value = project.margin ?? 10;
  }

  if (title) title.textContent = project ? project.name : "Aucun projet";
  if (meta) meta.textContent = project ? `${project.type || "Projet"} - ${project.city || "Ville non définie"} - ${project.items?.length || 0} ligne(s)` : "Créez un projet pour commencer.";
  if (activeTotal) activeTotal.textContent = project ? projectMoney(projectGrandTotal(project)) : "0 FCFA";
  if (grandTotal) grandTotal.textContent = project ? projectMoney(projectGrandTotal(project)) : "0 FCFA";

  if (tbody) {
    const items = project?.items || [];
    tbody.innerHTML = items.length ? items.map((item) => {
      const amount = projectNumber(item.qty) * projectNumber(item.unitPrice);
      return `<tr><td>${item.lot}</td><td>${item.designation}</td><td>${item.qty}</td><td>${item.unit}</td><td>${projectMoney(item.unitPrice)}</td><td>${projectMoney(amount)}</td><td><button class="btn btn-light" type="button" data-remove-line="${item.id}">Supprimer</button></td></tr>`;
    }).join("") : `<tr><td colspan="7">Aucune ligne de devis. Ajoutez une quantité ou un poste de dépense.</td></tr>`;
  }

  if (lotSummary) {
    if (!project || !project.items?.length) {
      lotSummary.innerHTML = `<tr><th>Total</th><td>0 FCFA</td></tr>`;
    } else {
      const totals = {};
      project.items.forEach((item) => {
        totals[item.lot] = (totals[item.lot] || 0) + projectNumber(item.qty) * projectNumber(item.unitPrice);
      });
      const base = projectBaseTotal(project);
      const marginValue = projectGrandTotal(project) - base;
      lotSummary.innerHTML = Object.entries(totals).map(([lot, total]) => `<tr><th>${lot}</th><td>${projectMoney(total)}</td></tr>`).join("") + `<tr><th>Sous-total</th><td>${projectMoney(base)}</td></tr><tr><th>Marge / imprévus</th><td>${projectMoney(marginValue)}</td></tr><tr><th>Total général</th><td>${projectMoney(projectGrandTotal(project))}</td></tr>`;
    }
  }

  if (lineForm) lineForm.hidden = !project;
}

function setupProjects() {
  const app = document.querySelector("[data-project-app]");
  if (!app) return;
  const form = document.querySelector("[data-project-form]");
  const lineForm = document.querySelector("[data-line-form]");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const existing = getActiveProject();
    const project = {
      id: existing?.id || uid("project_"),
      name: data.get("name") || "Projet sans nom",
      client: data.get("client") || "",
      city: data.get("city") || "",
      type: data.get("type") || "Maison",
      surface: projectNumber(data.get("surface")),
      margin: projectNumber(data.get("margin")),
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: existing?.items || []
    };
    updateProject(project);
    renderProjects();
    showAlert("Projet enregistré.");
  });

  lineForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const project = getActiveProject();
    if (!project) return showAlert("Créez d’abord un projet.", "danger");
    const data = new FormData(lineForm);
    project.items = project.items || [];
    project.items.push({
      id: uid("line_"),
      lot: data.get("lot"),
      designation: data.get("designation"),
      unit: data.get("unit") || "u",
      qty: projectNumber(data.get("qty")),
      unitPrice: projectNumber(data.get("unitPrice"))
    });
    updateProject(project);
    lineForm.reset();
    lineForm.unit.value = "u";
    lineForm.qty.value = 1;
    lineForm.unitPrice.value = 0;
    renderProjects();
    showAlert("Ligne ajoutée au devis.");
  });

  document.addEventListener("click", async (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;
    const project = getActiveProject();

    if (target.matches("[data-new-project]")) {
      localStorage.removeItem(ACTIVE_PROJECT_KEY);
      form?.reset();
      if (form) {
        form.city.value = "Niamey";
        form.margin.value = 10;
      }
      renderProjects();
    }

    if (target.matches("[data-remove-line]")) {
      if (!project) return;
      project.items = (project.items || []).filter((item) => item.id !== target.dataset.removeLine);
      updateProject(project);
      renderProjects();
    }

    if (target.matches("[data-delete-project]")) {
      if (!project) return showAlert("Aucun projet à supprimer.", "danger");
      const projects = loadProjects().filter((item) => item.id !== project.id);
      saveProjects(projects);
      if (projects[0]) setActiveProject(projects[0].id);
      else localStorage.removeItem(ACTIVE_PROJECT_KEY);
      renderProjects();
      showAlert("Projet supprimé.");
    }

    if (target.matches("[data-copy-project]")) {
      if (!project) return showAlert("Aucun projet à copier.", "danger");
      await navigator.clipboard.writeText(projectSummaryText(project));
      showAlert("Résumé copié.");
    }

    if (target.matches("[data-print-project]")) {
      window.print();
    }

    if (target.matches("[data-share-project]")) {
      if (!project) return showAlert("Aucun projet à partager.", "danger");
      const text = projectSummaryText(project);
      if (navigator.share) {
        navigator.share({ title: project.name, text }).catch(() => {});
      } else {
        location.href = `https://wa.me/?text=${encodeURIComponent(text)}`;
      }
    }

    if (target.matches("[data-export-csv]")) {
      if (!project) return showAlert("Aucun projet à exporter.", "danger");
      downloadText(`${project.name || "devis"}.csv`, projectToCsv(project), "text/csv;charset=utf-8");
    }

    if (target.matches("[data-export-json]")) {
      const projects = loadProjects();
      downloadText("metre-btp-projets.json", JSON.stringify(projects, null, 2), "application/json");
    }
  });

  document.querySelector("[data-import-json]")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        const projects = Array.isArray(imported) ? imported : [imported];
        saveProjects(projects);
        if (projects[0]?.id) setActiveProject(projects[0].id);
        renderProjects();
        showAlert("Projets importés.");
      } catch (error) {
        showAlert("Fichier JSON invalide.", "danger");
      }
    };
    reader.readAsText(file);
  });

  renderProjects();
}

setupProjects();
