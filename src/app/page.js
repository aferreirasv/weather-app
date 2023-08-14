import { getWeatherForecast, getUserIp } from "../actions/api/api";
import React from "react";
import Weather from "../components/Weather/Weather";
export default function Home() {
  return (
    <>
      <Weather />
    </>
  );
}
