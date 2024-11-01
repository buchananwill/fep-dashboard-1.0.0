'use server';

import { authOrSignInRedirect } from '@/api/auth/auth-or-sign-in-redirect';
import { NextRequest } from 'next/server';
import { BASE_URL } from '@/api/BASE_URL';
import { schemaNameSchema } from '@/api/actions-custom/schemas/schema-name-schema';

export default async function checkSchemaNameAvailable(schemaName: string) {
  await authOrSignInRedirect();

  const safeParse = schemaNameSchema.safeParse(schemaName);

  if (!safeParse.success) {
    return {
      error: String(safeParse.error.format()._errors.join('; '))
    };
  }

  const url = `${BASE_URL}/api/v2/tenancy/checkSchemaNameAvailable/${schemaName}`;
  const request = new NextRequest(url, { cache: 'no-cache' });

  const response = await fetch(request);

  const responseData = await response.json();

  return { error: !responseData ? 'Name unavailable' : undefined };
}
