// require('dotenv').config();
const fetchLongLat = require('./core/fetchLongLat');
const filterFoodTrucks = require('./core/filterFoodTrucks');

exports.handler = async function(event, context, callback) {
  const { address, range, day, start24, end24 } = event.body;
  const { lat, lng } = await fetchLongLat(address);
  if (lng && lat) {
    const response = await filterFoodTrucks({
      lng,
      lat,
      range,
      day,
      start24,
      end24,
    });
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ trucks: response, lng, lat }),
    });
  } else callback('Invalid address');
};
