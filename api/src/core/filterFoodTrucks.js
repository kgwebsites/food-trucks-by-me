const fetch = require('node-fetch');

async function filterFoodTrucks({ lng, lat, range, day, start24, end24 }) {
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
  const start24SoQL = `start24 < '${start24}'`;
  const end24SoQL = `end24 > '${end24}'`;
  const latSoQL = `latitude between ${startLat} and ${endLat}`;
  const lngSoQL = `longitude between ${startLng} and ${endLng}`;

  const url = encodeURI(
    `https://data.sfgov.org/resource/jjew-r69b.json?$where= ${dowSoQL} AND ${start24SoQL} AND ${end24SoQL} AND ${latSoQL} AND ${lngSoQL}`,
  );

  const data = await fetch(url, {
    headers: { 'X-App-Token': process.env.SFGOV_TOKEN },
  });
  const response = await data.json();
  return response;
}

module.exports = filterFoodTrucks;
