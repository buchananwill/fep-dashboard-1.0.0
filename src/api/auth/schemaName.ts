import { cookieSecret } from '@/api/literals';
import { TenancyDto } from '@/api/generated-types/generated-types_';
import * as jwt from 'jsonwebtoken';

('server only');

const templatePayload = { schemaName: 'org_example' };
const publicPayload = { schemaName: 'public' };
export const templateToken = () =>
  jwt.sign(templatePayload, cookieSecret, {
    algorithm: 'HS256',
    expiresIn: '24h'
  });

export const publicToken = (userPayload: { email: string }) => {
  return jwt.sign({ ...userPayload, ...publicPayload }, cookieSecret, {
    algorithm: 'HS256',
    expiresIn: '24h'
  });
};
