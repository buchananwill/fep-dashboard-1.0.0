('server only');
import { TenancyDto } from '@/api/generated-types/generated-types';
import * as jwt from 'jsonwebtoken';

const cookieSecret = process.env.COOKIE_SECRET_KEY!;

const templatePayload = { schemaName: 'org_1' };
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

export const userToken = ({ email, schemaName }: Partial<TenancyDto>) => {
  return jwt.sign({ email, schemaName }, cookieSecret, {
    algorithm: 'HS256',
    expiresIn: '24h'
  });
};
