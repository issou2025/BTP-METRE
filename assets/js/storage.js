(function loadModernTheme() {
  if (document.querySelector('link[data-modern-theme]')) return;
  const script = document.currentScript;
  const href = script && script.src
    ? script.src.replace('/js/storage.js', '/css/modern.css')
    : (location.pathname.includes('/pages/') ? '../assets/css/modern.css' : 'assets/css/modern.css');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.dataset.modernTheme = 'true';
  document.head.appendChild(link);
})();

const PRICE_KEY = "metreBtpNigerPrices";
const FAVORITE_KEY = "metreBtpNigerFavorites";
const RECENT_KEY = "metreBtpNigerRecent";
const HISTORY_KEY = "metreBtpNigerHistory";
const DRAFT_KEY = "metreBtpNigerDrafts";
const THEME_KEY = "metreBtpNigerTheme";

function loadPrices() {
  try {
    return { ...BTP_DATA.prices, ...JSON.parse(localStorage.getItem(PRICE_KEY) || "{}") };
  } catch (error) {
    return { ...BTP_DATA.prices };
  }
}

function getPrice(key) {
  return Number(loadPrices()[key] || 0);
}

function savePrices(prices) {
  localStorage.setItem(PRICE_KEY, JSON.stringify(prices));
}

function resetPrices() {
  localStorage.removeItem(PRICE_KEY);
}

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function toggleFavorite(id) {
  const favorites = loadFavorites();
  const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(next));
  return next;
}

function loadTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

function loadRecent() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function saveRecent(item) {
  const recent = loadRecent().filter((entry) => entry.href !== item.href);
  localStorage.setItem(RECENT_KEY, JSON.stringify([{ ...item, at: Date.now() }, ...recent].slice(0, 6)));
}

function historyKey(title) {
  return `${HISTORY_KEY}:${title}`;
}

function loadHistory(title) {
  try {
    return JSON.parse(localStorage.getItem(historyKey(title)) || "[]");
  } catch (error) {
    return [];
  }
}

function saveHistory(title, result) {
  const history = loadHistory(title);
  localStorage.setItem(historyKey(title), JSON.stringify([{ ...result, at: Date.now() }, ...history].slice(0, 5)));
}

function draftKey(title) {
  return `${DRAFT_KEY}:${title}`;
}

function loadDraft(title) {
  try {
    return JSON.parse(localStorage.getItem(draftKey(title)) || "{}");
  } catch (error) {
    return {};
  }
}

function saveDraft(title, data) {
  localStorage.setItem(draftKey(title), JSON.stringify(data));
}

function clearDraft(title) {
  localStorage.removeItem(draftKey(title));
}
