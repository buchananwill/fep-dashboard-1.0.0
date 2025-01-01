'use server';
import { SchemaAccessTokenDto } from '@/api/generated-types/generated-types_';
import { cookies } from 'next/headers';
import { SCHEMA_NAME_COOKIE, SCHEMA_REFRESH_COOKIE } from '@/api/literals';

export async function storeTokensInCookies(tokens: SchemaAccessTokenDto) {
  const { accessToken, refreshToken } = tokens;

  const cookieStore = await cookies();

  cookieStore.set(SCHEMA_NAME_COOKIE, accessToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 // 1 hour in seconds
  });

  cookieStore.set(SCHEMA_REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 1 week in seconds
  });
}
