'use server';
import { SchemaAccessTokenDto } from '@/api/generated-types/generated-types_';
import Env from '../../environment.mjs';
import { NextRequest } from 'next/server';

export async function requestNewSchemaCookies(
  email: string
): Promise<SchemaAccessTokenDto> {
  const url = `${Env.getBaseUrl()}/api/v2/tenancy/retrieve-schema`;
  const request = new NextRequest(url, { body: email, method: 'POST' });
  request.headers.append('retrieve-schema', Env.getRetrieveSchemaSecret());

  const schemaTokensResponse = await fetch(request);
  return await schemaTokensResponse.json();
}
