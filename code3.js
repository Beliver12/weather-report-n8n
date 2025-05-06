const dataString = $input.first().json.data;
const parsed = JSON.parse(dataString);

// uzimamo samo datume gdje je praznik ("yes")
const dates = parsed
  .filter(item => item.is_public_holiday === 'yes')
  .map(item => item.date);

return [{
  json: {
    holidayDates: dates
  }
}];