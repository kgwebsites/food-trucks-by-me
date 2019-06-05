export default function timeFormat(timeString) {
  // timestring example: "13:00"
  const timeArr = timeString.split(':');
  const hours = parseInt(timeArr[0]);
  const minutes = timeArr[1];
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const convertedHours = `${((hours + 11) % 12) + 1}`;
  return `${convertedHours}:${minutes} ${suffix}`;
}
