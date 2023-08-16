function generateSelectedWeather(weather, location) {
  return {
    celsius: weather.day.avgtemp_c,
    fahrenheit: weather.day.avgtemp_f,
    maxCelsius: weather.day.maxtemp_c,
    minCelsius: weather.day.mintemp_c,
    maxFahrenheit: weather.day.maxtemp_f,
    minFahrenheit: weather.day.mintemp_f,
    date: new Date(weather.date),
    city: location.name,
    country: location.country,
    text: weather.day.condition.text,
    humidity: weather.day.avghumidity,
    icon: weather.day.condition.icon,
    precipitation: weather.day.totalprecip_mm,
    hour: weather.hour,
  };
}
function generateWeekWeather(week) {
  console.log(week);
  return week.map((forecastDay) => {
    return {
      date: forecastDay.date,
      maxCelsius: forecastDay.day.maxtemp_c,
      minCelsius: forecastDay.day.mintemp_c,
      maxFahrenheit: forecastDay.day.maxtemp_f,
      minFahrenheit: forecastDay.day.mintemp_f,
      icon: forecastDay.day.condition.icon,
    };
  });
}

export { generateSelectedWeather, generateWeekWeather };
