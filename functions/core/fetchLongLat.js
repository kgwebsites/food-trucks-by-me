const fetch = require('node-fetch');
const { REACT_APP_GOOGLE_MAP_TOKEN } = process.env;

function fetchLongLat(address) {
  return new Promise((res, rej) => {
    const mapsUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${REACT_APP_GOOGLE_MAP_TOKEN}`;
    try {
      fetch(mapsUrl).then((resp) => {
        resp.json().then((data) => {
          if (
            data.status === 'OK' &&
            data.results &&
            data.results[0] &&
            data.results[0].geometry &&
            data.results[0].geometry.location
          ) {
            res(data.results[0].geometry.location);
          } else {
            rej(new Error('No location found'));
          }
        });
      });
    } catch (err) {
      rej(err);
    }
  });
}

module.exports = fetchLongLat;
