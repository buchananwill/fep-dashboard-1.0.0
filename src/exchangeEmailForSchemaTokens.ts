import { storeTokensInCookies } from '@/api/actions-custom/schemas/store-tokens-in-cookies';

('server only');

import { requestNewSchemaCookies } from '@/api/actions-custom/schemas/set-schema-cookies';

export async function exchangeEmailForSchemaTokens(
  email: string | null | undefined
) {
  console.log('exchanging email for tokens');
  try {
    if (email) {
      const tokens = await requestNewSchemaCookies(email);
      await storeTokensInCookies(tokens);
    }
  } catch (e) {
    console.error(e);
  }
}
