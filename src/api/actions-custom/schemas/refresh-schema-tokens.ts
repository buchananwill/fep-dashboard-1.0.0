'use server';
import { getSchemaRefreshCookie } from '@/api/auth/get-schema-name-cookie';
import { requestRefreshSchemaCookies } from '@/api/actions-custom/schemas/request-refresh-schema-cookies';
import { storeTokensInCookies } from '@/api/actions-custom/schemas/store-tokens-in-cookies';

export async function refreshSchemaTokens() {
  const refreshCookie = await getSchemaRefreshCookie();
  if (!refreshCookie) {
    throw Error('Refresh cookie not present');
  }
  const { value } = refreshCookie;

  const schemaAccessTokenDto = await requestRefreshSchemaCookies(value);
  await storeTokensInCookies(schemaAccessTokenDto);
}
