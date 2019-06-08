const fetchAddress = require('./core/fetchAddress');

exports.handler = async function(event, context, callback) {
  const { lat, lng } = JSON.parse(event.body);
  try {
    const address = await fetchAddress(lat, lng);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(address),
    });
  } catch (err) {
    callback(err);
  }
};
