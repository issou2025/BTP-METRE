const PRICE_KEY = "metreBtpNigerPrices";
const FAVORITE_KEY = "metreBtpNigerFavorites";

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
