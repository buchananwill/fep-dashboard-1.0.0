'use server';
import { TenancyDto } from '@/api/generated-types/generated-types';
import { cookies } from 'next/headers';
import { userToken } from '@/api/auth/schemaName';
import { SCHEMA_NAME_COOKIE } from '@/api/literals';

export async function setSchemaNameCookie(tenancyDto: Partial<TenancyDto>) {
  const cookieStore = await cookies();
  const jwt = userToken(tenancyDto);
  cookieStore.set(SCHEMA_NAME_COOKIE, jwt, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 1 day in seconds
  });
}
