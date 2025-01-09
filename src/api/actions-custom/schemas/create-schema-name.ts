'use server';
import { authOrSignInRedirect } from '@/api/auth/auth-or-sign-in-redirect';
import { schemaNameSchema } from '@/api/actions-custom/schemas/schema-name-schema';
import { NextRequest } from 'next/server';
import { TenancyDto } from '@/api/generated-types/generated-types_';
import { requestNewSchemaCookies } from '@/api/actions-custom/schemas/set-schema-cookies';
import { storeTokensInCookies } from '@/api/actions-custom/schemas/store-tokens-in-cookies';
import Env from '../../environment';
import { API_V2_URL } from '@/api/server-literals';

export default async function createSchemaName(name: string) {
  const session = await authOrSignInRedirect('/admin/create-schema');
  const safeParse = schemaNameSchema.safeParse(name);
  if (!safeParse) {
    throw Error('invalid name');
  }
  const email = session.user?.email;
  if (email) {
    const nextRequest = new NextRequest(`${API_V2_URL}/tenancy/create-schema`, {
      body: JSON.stringify({ schemaName: name, email }),
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      }
    });
    nextRequest.headers.append('create-schema', Env.getCreateSchemaSecret());

    const response = await fetch(nextRequest);
    // TODO: Split this part into a follow up action, with a progress indicator page.
    if (response.status === 201) {
      const tenancyDto: TenancyDto | undefined = await response.json();

      if (tenancyDto) {
        const schemaAccessTokenDto = await requestNewSchemaCookies(
          tenancyDto.email
        );
        await storeTokensInCookies(schemaAccessTokenDto);
        return true;
      }
    } else {
      throw Error('Error creating and assign schema');
    }
  }
}
