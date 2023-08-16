"use client";
import Image from "next/image";
import formatDateTime from "@/actions/helpers/formatDateTime";
const SelectedWeather = ({ weather }) => {
  let {
    icon,
    celsius,
    fahrenheit,
    city,
    country,
    date,
    text,
    humidity,
    precipitation,
  } = weather;
  return (
    <>
      <Image src={icon} alt={text} width="64" height="64" />
      <p>{celsius}ºC</p>
      <p>{fahrenheit}ºF</p>
      <p>
        {city} - {country}
      </p>
      <p>{date && formatDateTime(date)}</p>
      <p>{text}</p>
      <p>Umidade em {humidity}%</p>
      <p>Precipitação {precipitation}mm</p>
    </>
  );
};

export default SelectedWeather;
