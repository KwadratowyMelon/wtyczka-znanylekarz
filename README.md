# Sortowanie po cenie dla ZnanyLekarz

Wtyczka do przeglądarki, która dodaje nad listą wyników wyszukiwania na [znanylekarz.pl](https://www.znanylekarz.pl) pole sortowania po cenie wizyty: domyślnie, rosnąco lub malejąco.

Dodatek jest nieoficjalny i nie jest powiązany z serwisem ZnanyLekarz ani firmą Docplanner.

## Jak działa

- Dla każdego lekarza brana jest najniższa cena widoczna na karcie.
- Lekarze bez podanej ceny trafiają na koniec listy.
- Sortowana jest tylko bieżąca strona wyników.
- Wybrane sortowanie jest zapamiętywane w przeglądarce.

Wtyczka nie zbiera żadnych danych i niczego nie wysyła na zewnątrz.

## Instalacja z kodu

Działa w Chrome, Brave i Edge.

1. Pobierz to repozytorium (zielony przycisk „Code" → „Download ZIP") i rozpakuj.
2. Otwórz `chrome://extensions` (w Brave: `brave://extensions`).
3. Włącz „Tryb dewelopera".
4. Kliknij „Załaduj rozpakowane" i wskaż rozpakowany folder.

## Dla programistów

Test odczytu cen: `node content.js` (wypisuje `ok`).
