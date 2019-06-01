const fetch = require('node-fetch');

// const { GOOGLE_MAP_TOKEN } = process.env;

const GOOGLE_MAP_TOKEN = 'AIzaSyCEEL1A-yyym_FOHJKysmGzBOWdVzzzGXs';

function fetchLongLat(address) {
  return new Promise((res, rej) => {
    const mapsUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+San+Francisco,+CA&key=${GOOGLE_MAP_TOKEN}`;
    console.log(mapsUrl);
    fetch(mapsUrl)
      .then(resp => {
        console.log(resp);
        resp.json().then(data => {
          console.log(data);
          if (
            data.status === 'OK' &&
            data.results &&
            data.results[0] &&
            data.results[0].geometry &&
            data.results[0].geometry.location
          ) {
            res(data.results[0].geometry.location);
          } else {
            throw new Error('No location found');
          }
        });
      })
      .catch(err => {
        rej(err);
      });
  });
}

module.exports = fetchLongLat;
