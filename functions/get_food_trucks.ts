import { HandlerEvent, HandlerResponse } from '@netlify/functions';

import { fetchLongLat } from './core/fetchLongLat';
import { filterFoodTrucks } from './core/filterFoodTrucks';

export const handler = async (event: {
  body: string;
}): Promise<HandlerResponse> => {
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
