'use server';

import { authOrSignInRedirect } from '@/api/auth/auth-or-sign-in-redirect';
import { NextRequest } from 'next/server';
import { BASE_URL } from '@/api/BASE_URL';
import { schemaNameSchema } from '@/api/actions-custom/schema-name-schema';

export default async function checkSchemaNameAvailable(schemaName: string) {
  await authOrSignInRedirect();

  const safeParse = schemaNameSchema.safeParse(schemaName);

  if (!safeParse.success) {
    console.log(safeParse);
    return {
      error: String(safeParse.error.format()._errors.join('; '))
    };
  }

  const url = `${BASE_URL}/api/v2/tenancy/checkSchemaNameAvailable/${schemaName}`;
  console.log(url);
  const request = new NextRequest(url, { cache: 'no-cache' });

  const response = await fetch(request);

  const responseData = await response.json();

  console.log(responseData);

  return { error: !responseData ? 'Name unavailable' : undefined };
}
