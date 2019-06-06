const fetchAddress = require('./core/fetchAddress');

exports.handler = function(event, context, callback) {
  const { lat, lng } = JSON.parse(event.body);
  fetchAddress(lat, lng)
    .then(address => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(address),
      });
    })
    .catch(err => {
      callback(err);
    });
};
