import fetch from 'node-fetch';

const { REACT_APP_GOOGLE_MAP_TOKEN } = process.env;

export function fetchAddress(lat: number, lng: number) {
  return new Promise((res, rej) => {
    const mapsUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${REACT_APP_GOOGLE_MAP_TOKEN}`;
    fetch(mapsUrl)
      .then((resp) => {
        resp.json().then((data) => {
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
            res({
              address: `${data.results[0].address_components[0].short_name} ${data.results[0].address_components[1].short_name}`,
            });
          } else {
            throw new Error('Address not found');
          }
        });
      })
      .catch((err: Error) => {
        rej(err);
      });
  });
}
