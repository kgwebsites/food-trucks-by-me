const fetch = require('node-fetch');

// const { GOOGLE_MAP_TOKEN } = process.env;
const { REACT_APP_GOOGLE_MAP_TOKEN } = process.env;

function fetchLongLat(lat, lng) {
  return new Promise((res, rej) => {
    const mapsUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${REACT_APP_GOOGLE_MAP_TOKEN}`;
    fetch(mapsUrl)
      .then(resp => {
        resp.json().then(data => {
          console.log('data', data);
          if (
            data.status === 'OK' &&
            data.results &&
            data.results[0] &&
            data.results[0].address_components &&
            data.results[0].address_components[0] &&
            data.results[0].address_components[0].short_name &&
            data.results[0].address_components[1] &&
            data.results[0].address_components[1].short_name
          ) {
            res(
              `${data.results[0].address_components[0].short_name} ${
                data.results[0].address_components[1].short_name
              }`,
            );
          } else {
            throw new Error('Address not found');
          }
        });
      })
      .catch(err => {
        rej(err);
      });
  });
}

module.exports = fetchLongLat;
