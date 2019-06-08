const fetchLongLat = require('./core/fetchLongLat');
const filterFoodTrucks = require('./core/filterFoodTrucks');

exports.handler = async function(event, context, callback) {
  const { address, coor, range, day, start24, end24 } = JSON.parse(event.body);
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
        start24,
        end24,
      });
      try {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ trucks: response, lng, lat }),
        });
      } catch {
        throw new Error('Something went wrong, try again later');
      }
    } else {
      throw new Error('Invalid address');
    }
  } catch (err) {
    callback(err);
  }
};
