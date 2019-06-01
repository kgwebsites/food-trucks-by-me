const fetch = require('node-fetch');

// const { GOOGLE_MAP_TOKEN } = process.env;

const GOOGLE_MAP_TOKEN = 'AIzaSyCEEL1A-yyym_FOHJKysmGzBOWdVzzzGXs';

function fetchLongLat(address) {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+San+Francisco,+CA&key=${GOOGLE_MAP_TOKEN}`,
  )
    .then(resp => {
      resp.json().then(data => {
        if (
          data.status === 'OK' &&
          data.results &&
          data.results[0] &&
          data.results[0].geometry &&
          data.results[0].geometry.location
        ) {
          return data.results[0].geometry.location;
        } else {
          throw new Error('No location found');
        }
      });
    })
    .catch(err => {
      return err;
    });
}

module.exports = fetchLongLat;
