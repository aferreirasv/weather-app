"use client";
import { getWeatherForecast, getUserIp } from "../../actions/api/api";
import React from "react";
export default function Home() {
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

  return (
    <>
      <div></div>
    </>
  );
}
