import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { requestRefreshSchemaCookies } from '@/api/actions-custom/schemas/request-refresh-schema-cookies';
import { SCHEMA_REFRESH_COOKIE } from '@/api/literals';
import { storeTokensInCookies } from '@/api/actions-custom/schemas/store-tokens-in-cookies';

export async function GET(request: NextRequest) {
  console.log('handler refresh route');
  const token = request.headers.get(SCHEMA_REFRESH_COOKIE);
  if (!token) {
    throw Error('no token in header');
  }
  console.log(token);
  const schemaAccessTokenDto = await requestRefreshSchemaCookies(token);
  await storeTokensInCookies(schemaAccessTokenDto);
  const searchParams = request.nextUrl.searchParams;
  const redirectUrl = searchParams.get('redirect') ?? '';
  redirect(`/${decodeURIComponent(redirectUrl)}`);
}
