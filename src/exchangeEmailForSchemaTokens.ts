'server only';

import { requestNewSchemaCookies } from '@/api/actions-custom/schemas/set-schema-cookies';

export async function exchangeEmailForSchemaTokens(
  email: string | null | undefined
) {
  console.log('exchanging email for tokens');
  try {
    if (email) {
      await requestNewSchemaCookies(email);
    }
  } catch (e) {
    console.error(e);
  }
}
