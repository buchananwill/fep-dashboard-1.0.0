import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { requestRefreshSchemaCookies } from '@/api/actions-custom/schemas/request-refresh-schema-cookies';
import { storeTokensInCookies } from '@/api/actions-custom/schemas/store-tokens-in-cookies';
import { getSchemaRefreshCookie } from '@/api/auth/get-schema-name-cookie';

export async function GET(request: NextRequest) {
  const token = await getSchemaRefreshCookie();
  if (!token) {
    throw Error('no token found in cookies');
  }
  const schemaAccessTokenDto = await requestRefreshSchemaCookies(token);
  await storeTokensInCookies(schemaAccessTokenDto);
  const searchParams = request.nextUrl.searchParams;
  const redirectUrl = searchParams.get('redirect') ?? '';
  const uri = decodeURIComponent(redirectUrl);
  console.log({ searchParams, redirectUrl, uri });
  redirect(`/${uri}`);
}
