'use server';
import { SchemaAccessTokenDto } from '@/api/generated-types/generated-types_';
import { BASE_URL } from '@/api/BASE_URL';
import { NextRequest } from 'next/server';
import { storeTokensInCookies } from '@/api/actions-custom/schemas/store-tokens-in-cookies';

function getRetrieveSchemaKey() {
  const key = process.env.RETRIEVE_SCHEMA;
  if (key === undefined) {
    throw new Error('Missing retrieve schema key');
  }
  return key;
}

export async function requestNewSchemaCookies(email: string) {
  const url = `${BASE_URL}/api/v2/tenancy/retrieve-schema`;
  const request = new NextRequest(url, { body: email, method: 'POST' });
  request.headers.append('retrieve-schema', getRetrieveSchemaKey());

  const schemaTokensResponse = await fetch(request);
  const tokens: SchemaAccessTokenDto = await schemaTokensResponse.json();

  await storeTokensInCookies(tokens);
}
