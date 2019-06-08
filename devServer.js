require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetchLongLat = require('./functions/core/fetchLongLat');
const filterFoodTrucks = require('./functions/core/filterFoodTrucks');
const fetchAddress = require('./functions/core/fetchAddress');

const app = express();
const port = 3001;

app.use(express.json()); // for parsing application/json
app.use(cors());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

async function getFoodTrucks(req, res) {
  const { address, coor, range, day, start24, end24 } = req.body;
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
    res.json({ trucks: response, lng, lat });
  } else res.json({ error: 'Invalid address' });
}

app.post('/get_food_trucks', getFoodTrucks);

async function getAddressFromCoor(req, res) {
  const { lat, lng } = req.body;
  try {
    const address = await fetchAddress(lat, lng);
    res.json(address);
  } catch (err) {
    res.json({ error: 'Invalid coordinates' });
  }
}

app.post('/get_address_from_coor', getAddressFromCoor);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
