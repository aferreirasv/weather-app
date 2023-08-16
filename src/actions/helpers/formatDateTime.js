const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function formatDateTime(date) {
  function padFormat(number) {
    return String(number).padStart(2, "0");
  }
  return `${padFormat(date.getDate())}/${padFormat(
    date.getMonth()
  )}/${date.getFullYear()} - ${weekday[date.getDay()]} - ${padFormat(
    date.getHours()
  )}:${padFormat(date.getMinutes())}`;
}

export default formatDateTime;
