"use client";
import { getWeatherForecast, getUserIp } from "../../actions/api/api";
import React from "react";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
export default function Home() {
  const [weather, setWeather] = React.useState(null);
  const [date, setDate] = React.useState(null);
  const getIp = async () => {
    try {
      let response = await getUserIp();
      console.log("IP RESPONSE:", response);
      return response.data.ip;
    } catch (e) {
      console.error(e);
    }
  };
  const listWeather = async (ip) => {
    try {
      let response = await getWeatherForecast(ip);
      setWeather(response.data);
      setDate(new Date(response.data.location.localtime));
      console.log("WEATHER RESPONSE:", response);
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    const setup = async () => {
      let ip = await getIp();
      listWeather(ip);
    };
    setup();
  }, []);

  function handlePermission() {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        report(result.coords);
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
          try {
            let response = await getWeatherForecast(
              `${coords.latitude},${coords.longitude}`
            );
            setWeather(response.data);
            console.log("COORDS WEATHER RESPONSE:", response);
          } catch (e) {
            console.error(e);
          }
        });
      } else if (result.state === "prompt") {
        report(result.state);
        navigator.geolocation.getCurrentPosition(console.log);
      } else if (result.state === "denied") {
        report(result.state);
      }
      result.addEventListener("change", () => {
        report(result.state);
      });
    });
  }

  function report(state) {
    console.log(`Permission ${state}`);
  }

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <>
      <div>
        <div>
          {weather && (
            <>
              <WeatherIcon weather={weather.current} size="64" />
              <p>{weather.current.feelslike_c}ºC</p>
              <p>{weather.current.feelslike_f}ºF</p>
              <p>
                {weather.location.name} - {weather.location.country}
              </p>
              <p>
                {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${
                  weekday[new Date(weather.location.localtime).getDay()]
                } - ${date.getHours()}:${date.getMinutes()}`}
              </p>
              <p>{weather.current.condition.text}</p>
              <p>Umidade em {weather.current.humidity}%</p>
              <p>Precipitação {weather.current.precip_mm}mm</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
