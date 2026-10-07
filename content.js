// "280 zł", "od 315 zł", "1 200 zł", "150,50 zł"
const PRICE_RE = /(\d{1,3}(?:[  ]\d{3})+|\d+)(?:,\d+)?\s*zł/g;

// Najniższa cena w tekście karty (lekarz może mieć kilka adresów/usług) albo null.
function lowestPrice(text) {
  const prices = [...text.matchAll(PRICE_RE)].map(m => Number(m[1].replace(/\D/g, '')));
  return prices.length ? Math.min(...prices) : null;
}

function sortList(list, mode) {
  const items = [...list.children];
  items.forEach((li, i) => (li.dataset.zlOrder ??= i));
  const dir = mode === 'desc' ? -1 : 1;
  items.sort((a, b) => {
    if (mode) {
      const pa = lowestPrice(a.textContent), pb = lowestPrice(b.textContent);
      // karty bez ceny (i reklamy) zawsze na końcu
      if ((pa === null) !== (pb === null)) return pa === null ? 1 : -1;
      if (pa !== pb) return (pa - pb) * dir;
    }
    return a.dataset.zlOrder - b.dataset.zlOrder;
  });
  list.append(...items);
}

if (typeof document === 'undefined') {
  // self-check: node content.js
  const assert = require('assert');
  assert.strictEqual(lowestPrice('Konsultacja 280 zł\n\t340 zł'), 280);
  assert.strictEqual(lowestPrice('od 1 200 zł'), 1200);
  assert.strictEqual(lowestPrice('wizyta 30\n\t\t150,50 zł'), 150);
  assert.strictEqual(lowestPrice('brak cennika'), null);
  console.log('ok');
} else {
  const list = document.querySelector('[data-test-id="search-list"]');
  if (list) {
    const KEY = 'zl-price-sort';
    const label = document.createElement('label');
    label.style.cssText = 'display:flex;align-items:center;gap:12px;margin:0 0 12px;padding:12px 16px;' +
      'background:#fff;border-radius:8px;border-left:6px solid #00806e;box-shadow:0 1px 4px rgba(0,0,0,.15);' +
      'font-size:16px;font-weight:700';
    label.textContent = 'Sortuj wyniki:';
    const select = document.createElement('select');
    select.style.cssText = 'flex:1;max-width:260px;padding:8px 12px;font-size:16px;font-weight:400;' +
      'background:#fff;border:2px solid #00806e;border-radius:6px;cursor:pointer';
    select.append(new Option('domyślnie', ''), new Option('cena rosnąco', 'asc'), new Option('cena malejąco', 'desc'));
    select.value = localStorage.getItem(KEY) || '';
    select.onchange = () => {
      localStorage.setItem(KEY, select.value);
      sortList(list, select.value);
    };
    label.append(select);
    list.before(label);
    // ponytail: sortuje tylko bieżącą stronę wyników; dociąganie kolejnych stron przez fetch, jeśli będzie potrzebne
    if (select.value) sortList(list, select.value);
  }
}
