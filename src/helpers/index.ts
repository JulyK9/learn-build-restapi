// authentication helpers
// encrypt password, create random token
import crypto from 'crypto';
import { config } from 'dotenv';

config();
const SECRET = `${process.env.CRYPTO_SECRET}`;

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');
};
