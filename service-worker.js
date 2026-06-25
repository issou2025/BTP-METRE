const CACHE_NAME = "metre-btp-niger-v9";
const ASSETS = [
  "./",
  "./index.html",
  "./calculateurs.html",
  "./projets.html",
  "./prix.html",
  "./guides.html",
  "./contact.html",
  "./a-propos.html",
  "./404.html",
  "./offline.html",
  "./manifest.json",
  "./assets/css/style.css",
  "./assets/js/main.js",
  "./assets/js/data.js",
  "./assets/js/storage.js",
  "./assets/js/pdf.js",
  "./assets/js/projects.js",
  "./assets/js/beton.js",
  "./assets/js/maconnerie.js",
  "./assets/js/enduit.js",
  "./assets/js/peinture.js",
  "./assets/js/carrelage.js",
  "./assets/js/fondation.js",
  "./assets/js/dalle.js",
  "./assets/js/poteau.js",
  "./assets/js/poutre.js",
  "./assets/js/ferraillage.js",
  "./assets/js/cloture.js",
  "./assets/js/maison.js",
  "./assets/js/toiture.js",
  "./assets/js/fosse.js",
  "./assets/js/mortier.js",
  "./assets/js/chape.js",
  "./assets/js/terrassement.js",
  "./assets/js/escalier.js",
  "./assets/js/plafond.js",
  "./assets/js/electricite.js",
  "./assets/js/plomberie.js",
  "./assets/js/menuiserie.js",
  "./assets/js/coffrage.js",
  "./assets/js/pavage.js",
  "./assets/js/caniveau.js",
  "./assets/js/puisard.js",
  "./assets/js/regard.js",
  "./assets/js/joint-carrelage.js",
  "./assets/js/terrasse.js",
  "./assets/js/remblai.js",
  "./pages/beton.html",
  "./pages/maconnerie.html",
  "./pages/enduit.html",
  "./pages/peinture.html",
  "./pages/carrelage.html",
  "./pages/fondation.html",
  "./pages/dalle.html",
  "./pages/poteau.html",
  "./pages/poutre.html",
  "./pages/ferraillage.html",
  "./pages/cloture.html",
  "./pages/maison-complete.html",
  "./pages/toiture.html",
  "./pages/fosse-septique.html",
  "./pages/mortier.html",
  "./pages/chape.html",
  "./pages/terrassement.html",
  "./pages/escalier.html",
  "./pages/plafond.html",
  "./pages/electricite.html",
  "./pages/plomberie.html",
  "./pages/menuiserie.html",
  "./pages/coffrage.html",
  "./pages/pavage.html",
  "./pages/caniveau.html",
  "./pages/puisard.html",
  "./pages/regard.html",
  "./pages/joint-carrelage.html",
  "./pages/terrasse.html",
  "./pages/remblai.html",
  "./assets/data/prix.json",
  "./assets/data/dosages.json",
  "./assets/data/acier.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => {
          if (event.request.destination === "document") {
            return caches.match("./offline.html");
          }
          return Response.error();
        });
    })
  );
});
