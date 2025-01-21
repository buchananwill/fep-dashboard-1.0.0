'server only';
import { BASE_URL } from '@/api/BASE_URL';
import { NextRequest } from 'next/server';
import { SchemaAccessTokenDto } from '@/api/generated-types/generated-types_';

export async function requestRefreshSchemaCookies(token: string) {
  console.log('requesting refresh');
  const url = `${BASE_URL}/api/v2/tenancy/refresh`;
  const request = new NextRequest(url, { method: 'POST' });
  request.headers.append('authorization', `Bearer ${token}`);

  const schemaTokensResponse = await fetch(request);
  const contentType = schemaTokensResponse.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const tokens: SchemaAccessTokenDto = await schemaTokensResponse.json();
    return tokens;
  }
  throw new Error('Request did not return JSON token.');
}
