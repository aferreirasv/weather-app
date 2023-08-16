"use client";
import { getWeatherForecast, getUserIp } from "../../actions/api/api";
import React from "react";
import SelectedWeather from "../SelectedWeather/SelectedWeather";
import {
  generateSelectedWeather,
  generateWeekWeather,
} from "@/actions/helpers/weatherFactory";
export default function Home() {
  const [weather, setWeather] = React.useState(null);
  const [selectedWeather, setSelectedWeather] = React.useState(null);
  const [weekForecast, setWeekForecast] = React.useState(null);
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
      setWeekForecast(generateWeekWeather(response.data.forecast.forecastday));
      setSelectedWeather(
        generateSelectedWeather(
          response.data.forecast.forecastday[0],
          response.data.location
        )
      );
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
    navigator.permissions.request({ name: "geolocation" }).then((result) => {
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

  return (
    <>
      <div>
        {selectedWeather && <SelectedWeather weather={selectedWeather} />}
      </div>
    </>
  );
}
