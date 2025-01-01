'server only';

import { setSchemaCookies } from '@/api/actions-custom/schemas/set-schema-cookies';

export async function exchangeEmailForSchemaTokens(
  email: string | null | undefined
) {
  try {
    if (email) {
      await setSchemaCookies(email);
    }
  } catch (e) {
    console.error(e);
  }
}
