// CODE2.JS – Formatira finalni JSON attachment i generira email izlaz

const holidayDates = $json.holidayDates;
const weatherData = $json.weatherData;

// Dodavanje polja is_public_holiday i pretvaranje vremena kiše u niz
const formattedWeather = weatherData.map(entry => ({
  sky: entry.sky,
  city: entry.city,
  date: entry.date,
  degrees: entry.degrees_in_celsius,
  is_public_holiday: holidayDates.includes(entry.date) ? 'yes' : 'no',
  times_of_rain_showers: entry.times_of_rain_showers
    ? entry.times_of_rain_showers.split(',').map(t => t.trim())
    : null
}));

// Priprema rezultata za slanje emaila s JSON privitkom
return [{
  json: {
    emailBody: $json.emailBody,
    city: $json.city
  },
  binary: {
    data: {
      data: Buffer.from(JSON.stringify(formattedWeather, null, 2)).toString('base64'),
      mimeType: 'application/json',
      fileName: 'weather_stats.json'
    }
  }
}];