const fetchAddress = require('./core/fetchAddress');

exports.handler = function(event, context, callback) {
  const { lat, lng } = JSON.parse(event.body);
  console.log('handler event.body', 'lat', lat, 'lng', lng);
  fetchAddress(lat, lng)
    .then(address => {
      callback(null, {
        statusCode: 200,
        body: address,
      });
    })
    .catch(err => {
      callback(err);
    });
};
