import { Handler } from '@netlify/functions';

import { fetchAddress } from './core/fetchAddress';

export const handler: Handler = async (event) => {
  const { lat, lng } = JSON.parse(event.body!);
  try {
    const address = await fetchAddress(lat, lng);
    return {
      statusCode: 200,
      body: JSON.stringify(address),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
