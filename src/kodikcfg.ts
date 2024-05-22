import { Client } from 'kodikwrapper';

export const kodikApiKey = process.env.REACT_APP_KODIK_API_KEY || '';

export const clientKodik = new Client({
  token: kodikApiKey,
});
