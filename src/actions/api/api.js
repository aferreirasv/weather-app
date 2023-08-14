import axios from "axios";

const WEATHER_API_BASE_URL = process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL;
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const IP_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getWeatherForecast = (userIp) => {
  console.log(WEATHER_API_BASE_URL);
  return axios.get(WEATHER_API_BASE_URL + "forecast.json", {
    params: { q: userIp, days: 7, key: WEATHER_API_KEY },
  });
};

const getUserIp = () => {
  return axios.get(IP_API_BASE_URL + "?format=json");
};

export { getWeatherForecast, getUserIp };
