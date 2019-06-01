// require('dotenv').config();
const fetchLongLat = require('./core/fetchLongLat');
const filterFoodTrucks = require('./core/filterFoodTrucks');

exports.handler = function(event, context, callback) {
  const { address, range, day, start24, end24 } = event.body;
  console.log(event.body);
  fetchLongLat(address)
    .then(({ lat, lng }) => {
      if (lng && lat) {
        filterFoodTrucks({
          lng,
          lat,
          range,
          day,
          start24,
          end24,
        })
          .then(response => {
            callback(null, {
              statusCode: 200,
              body: JSON.stringify({ trucks: response, lng, lat }),
            });
          })
          .catch(() => {
            throw new Error('Something went wrong, try again later');
          });
      } else {
        throw new Error('Invalid address');
      }
    })
    .catch(err => {
      callback(err);
    });
};
