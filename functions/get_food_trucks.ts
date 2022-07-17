import { Handler } from '@netlify/functions';

const fetchLongLat = require('./core/fetchLongLat');
const filterFoodTrucks = require('./core/filterFoodTrucks');

export const handler: Handler = async (event) => {
  const { address, coor, range, day, openNow, currentHour } = JSON.parse(
    event.body!,
  );
  try {
    let lat, lng;
    if (coor) {
      lat = coor.latitude;
      lng = coor.longitude;
    } else {
      ({ lat, lng } = await fetchLongLat(address));
    }
    if (lng && lat) {
      const response = await filterFoodTrucks({
        lng,
        lat,
        range,
        day,
        openNow,
        currentHour,
      });
      try {
        return {
          statusCode: 200,
          body: JSON.stringify({ trucks: response, lng, lat }),
        };
      } catch (err) {
        console.log(err);
        throw new Error('Something went wrong, try again later');
      }
    } else {
      throw new Error('Invalid address');
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};