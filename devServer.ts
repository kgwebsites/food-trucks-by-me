import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { handler as getFoodTrucks } from './functions/get_food_trucks';
import { handler as getAddressFromCoor } from './functions/get_address_from_coor';
import { HandlerResponse } from '@netlify/functions';

const app = express();
const port = 3001;

app.use(express.json()); // for parsing application/json
app.use(cors());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/get_food_trucks', async (req, res) => {
  const response: HandlerResponse = await getFoodTrucks({
    body: JSON.stringify(req.body),
  });
  res.statusCode = response.statusCode;
  if (response.statusCode === 500) res.json({ error: response.body });
  else res.json(JSON.parse(response.body || ''));
});

app.post('/get_address_from_coor', async (req, res) => {
  const response: HandlerResponse = await getAddressFromCoor({
    body: JSON.stringify(req.body),
  });
  res.statusCode = response.statusCode;
  if (response.statusCode === 500) res.json({ error: response.body });
  else res.json(JSON.parse(response.body || ''));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
