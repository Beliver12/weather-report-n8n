// CODE1.JS – Generira tekst emaila i izračunava vremensku statistiku

const weatherResponse = $('HTTP Request').first().json;
// Dohvaća listu praznika koju smo prethodno filtrirali samo na "yes"
let holidays = $('Code3').first().json.holidayDates;

let weatherData = [];

try {
  // Parsiramo JSON sadržaj vremenskih podataka
  weatherData = typeof weatherResponse.data === 'string'
    ? JSON.parse(weatherResponse.data)
    : weatherResponse.data;
} catch (error) {
  return [{ json: { error: 'Parsing failed (weather)' } }];
}

// Računanje minimalne, maksimalne i prosječne temperature
const temperatures = weatherData.map(i => i.degrees_in_celsius);
const maxTemp = Math.max(...temperatures);
const minTemp = Math.min(...temperatures);
const avgTemp = Math.round(temperatures.reduce((a, b) => a + b, 0) / temperatures.length);

// Brojanje svih različitih "sky" vrijednosti (sortirane abecedno)
const skyCounts = {};
weatherData.forEach(i => {
  skyCounts[i.sky] = (skyCounts[i.sky] || 0) + 1;
});
const skyOverview = Object.entries(skyCounts)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([sky, count]) => `${sky.charAt(0).toUpperCase() + sky.slice(1)}: ${count}`)
  .join('\n');

// Pronalazak svih termina s kišom i sortiranje
let rainTimes = [];
weatherData.forEach(i => {
  if (i.times_of_rain_showers) {
    i.times_of_rain_showers.split(',').forEach(t => {
      rainTimes.push(`${i.date} ${t.trim()}`);
    });
  }
});
rainTimes.sort();

// Povezivanje praznika s odgovarajućim "sky" statusom
const holidaySkies = holidays.map(date => {
  const entry = weatherData.find(i => i.date === date);
  return `${date}: ${entry ? entry.sky : 'no data'}`;
});

const city = weatherData[0]?.city || 'Unknown City';

// Sastavljanje email poruke (plain-text)
const emailBody = `
### scenario URL: https://nikola2.app.n8n.cloud/workflow/B71HIafHRBqjvKSM ###

Hi, 

here are your San Francisco weather stats for 2022-11:
the max temperature was: ${maxTemp}
the avg temperature was: ${avgTemp}
the min temperature was: ${minTemp}

Overview of unique "sky" values and their counts:
${skyOverview}

Rain showers: 
${rainTimes.join('\n')}

"Sky" statuses during holidays:
${holidaySkies.join('\n')}

Have a nice day!
`;

return [{
  json: {
    city,
    emailBody,
    weatherData,
    holidayDates: holidays
  }
}];