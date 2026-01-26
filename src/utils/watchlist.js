const KEY = 'stock_watchlist';

export function getWatchlist() {
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function addToWatchlist(symbol) {
  const list = getWatchlist();
  if (!list.includes(symbol)) {
    list.push(symbol);
    localStorage.setItem(KEY, JSON.stringify(list));
  }
}

export function removeFromWatchlist(symbol) {
  const list = getWatchlist();
  const updated = list.filter(s => s !== symbol);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function isInWatchlist(symbol) {
  return getWatchlist().includes(symbol);
}
