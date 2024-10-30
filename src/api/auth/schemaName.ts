'server only';
import * as jwt from 'jsonwebtoken';

const cookieSecret = process.env.COOKIE_SECRET_KEY!;

const templatePayload = { schemaName: 'org_1' };
export const templateToken = () =>
  jwt.sign(templatePayload, cookieSecret, {
    algorithm: 'HS256',
    expiresIn: '24h'
  });
