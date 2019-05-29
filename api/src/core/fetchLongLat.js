const fetch = require('node-fetch');

const { GOOGLE_MAP_TOKEN } = process.env;

async function fetchLongLat(address) {
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+San+Francisco,+CA&key=${GOOGLE_MAP_TOKEN}`,
  );
  const data = await resp.json();

  if (data.status === 'OK') return data.results[0].geometry.location;

  return { error: 'No location found' };
}

module.exports = fetchLongLat;
