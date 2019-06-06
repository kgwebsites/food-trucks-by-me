const fetchAddress = require('./core/fetchAddress');

exports.handler = function(event, context, callback) {
  const { lat, lng } = JSON.parse(event.body);
  fetchAddress(lat, lng)
    .then(address => {
      console.log('address', address);
      callback(null, {
        statusCode: 200,
        body: address,
      });
    })
    .catch(err => {
      console.log('err', err);
      callback(err);
    });
};
