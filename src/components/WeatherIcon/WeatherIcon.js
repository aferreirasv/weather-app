"use client";
import Image from "next/image";
const WeatherIcon = ({ size, weather }) => {
  return (
    <Image
      src={weather.condition.icon}
      alt={weather}
      width={size}
      height={size}
    />
  );
};

export default WeatherIcon;
