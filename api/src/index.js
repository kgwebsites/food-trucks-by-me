require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetchLongLat = require('./core/fetchLongLat');
const filterFoodTrucks = require('./core/filterFoodTrucks');

const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(cors());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

async function getFoodTrucks(req, res) {
  const { address, range, day, start24, end24 } = req.body;
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
    res.json({ trucks: response, lng, lat });
  } else res.json({ error: 'Invalid address' });
}

app.post('/', getFoodTrucks);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
