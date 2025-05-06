# weather-report-n8n

# Weather Report Automation – n8n Workflow

Ovo je rješenje za praktični zadatak automatizacije slanja vremenskog izvještaja koristeći [n8n](https://n8n.io/).

## 🎯 Cilj zadatka

Automatski:
- parsirati CSV s vremenskim podacima i CSV s praznicima
- izračunati min/max/avg temperaturu
- sortirati "sky" vrijednosti abecedno i brojem pojavljivanja
- identificirati vrijeme kiša i prikazati ih po danima
- prikazati samo one "sky" statuse koji su na dane praznika
- poslati plain-text email s JSON privitkom (`weather_stats.json`)

## 🧠 Ključne komponente

### Code nodeovi:
- **`code1.js`** – računa sve statistike i generira tijelo email poruke
- **`code2.js`** – formatira JSON podatke i generira `.json` privitak
- **`code3.js`** – filtrira datume koji su stvarno praznici (`is_public_holiday === "yes"`)

### Korišteni n8n nodeovi:
- Webhook
- HTTP Request
- Code
- Merge (Combine → by Position)
- Gmail (za slanje poruke)

## 📎 Output

Email sadrži:
- Grad u subjectu
- Plain-text poruku
- Sortirane sekcije (temperature, sky vrijednosti, kišni dani, praznici)
- JSON privitak s potpunim vremenskim podacima i oznakom praznika

## ✅ Napomene

- Rješenje je izrađeno unutar jednog n8n workflowa (bez kopiranja)
- Korišten je AI (ChatGPT) kao pomoćni alat za pisanje koda unutar `Code` nodova — u skladu s pravilima zadatka
- Svi rezultati su testirani i uspoređeni s uzorkom iz dokumentacije

## 📂 Struktura repozitorija

