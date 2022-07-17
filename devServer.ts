import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { handler as getFoodTrucks } from './functions/get_food_trucks';
import { handler as getAddressFromCoor } from './functions/get_address_from_coor';

const app = express();
const port = 3001;

app.use(express.json()); // for parsing application/json
app.use(cors());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// async function getFoodTrucks(req, res) {
//   const { address, coor, range, day, openNow, currentHour } = req.body;
//   let lat, lng;
//   if (coor) {
//     lat = coor.latitude;
//     lng = coor.longitude;
//   } else {
//     ({ lat, lng } = await fetchLongLat(address));
//   }
//   if (lng && lat) {
//     const response = await filterFoodTrucks({
//       lng,
//       lat,
//       range,
//       day,
//       openNow,
//       currentHour,
//     });
//     res.json({ trucks: response, lng, lat });
//   } else res.json({ error: 'Invalid address' });
// }

interface NetlifyResponse {
  statusCode: number;
  body: string;
}

app.post('/get_food_trucks', async (req, res) => {
  // @ts-ignore - context is not used in this api
  const response: NetlifyResponse = await getFoodTrucks({
    body: JSON.stringify(req.body),
  });
  res.statusCode = response.statusCode;
  if (response.statusCode == 500) res.json({ error: response.body });
  else res.json(JSON.parse(response.body));
});

// async function getAddressFromCoor(req, res) {
//   const { lat, lng } = req.body;
//   try {
//     const address = await fetchAddress(lat, lng);
//     res.json(address);
//   } catch (err) {
//     res.json({ error: 'Invalid coordinates' });
//   }
// }

app.post('/get_address_from_coor', async (req, res) => {
  // @ts-ignore - context is not used in this api
  const response: NetlifyResponse = await getAddressFromCoor({
    body: JSON.stringify(req.body),
  });
  res.statusCode = response.statusCode;
  if (response.statusCode == 500) res.json({ error: response.body });
  else res.json(JSON.parse(response.body));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
