import { Session } from 'next-auth';

export interface SessionWithAccessToken extends Session {
  accessToken?: string;
}