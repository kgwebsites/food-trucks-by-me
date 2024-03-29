import fetch from 'node-fetch';

interface FilterFoodTrucksProps {
  lng: number;
  lat: number;
  range: number;
  day: string;
  openNow: boolean;
  currentHour: number;
}

export function filterFoodTrucks({
  lng,
  lat,
  range,
  day,
  openNow,
  currentHour,
}: FilterFoodTrucksProps) {
  const latDeg = 69.172;
  const degToRad = 0.0174533;

  const latMile = 1 / latDeg;
  const latDisparity = range * latMile;
  const startLat = lat - latDisparity;
  const endLat = lat + latDisparity;

  const latRad = lat * degToRad;
  const lngDeg = latRad * latDeg;

  const lngMile = 1 / lngDeg;
  const lngDisparity = range * lngMile;
  const startLng = lng - lngDisparity;
  const endLng = lng + lngDisparity;

  const dowSoQL = `dayofweekstr = '${day}'`;
  const start24SoQL = `start24 <= '${currentHour}'`;
  const end24SoQL = `end24 >= '${currentHour}'`;
  const latSoQL = `latitude between ${startLat} and ${endLat}`;
  const lngSoQL = `longitude between ${startLng} and ${endLng}`;

  const url = encodeURI(
    `https://data.sfgov.org/resource/jjew-r69b.json?$where= ${dowSoQL} ${
      openNow ? `AND ${start24SoQL} AND ${end24SoQL}` : ''
    } AND ${latSoQL} AND ${lngSoQL}`,
  );
  const { REACT_APP_SFGOV_TOKEN } = process.env;

  return new Promise((res, rej) => {
    fetch(url, {
      headers: { 'X-App-Token': REACT_APP_SFGOV_TOKEN! },
    })
      .then((data) => data.json().then((response) => res(response)))
      .catch((err: Error) => rej(err));
  });
}
