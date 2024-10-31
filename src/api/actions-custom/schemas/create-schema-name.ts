'use server';
import { authOrSignInRedirect } from '@/api/auth/auth-or-sign-in-redirect';
import { schemaNameSchema } from '@/api/actions-custom/schemas/schema-name-schema';
import { publicToken, userToken } from '@/api/auth/schemaName';
import { NextRequest } from 'next/server';
import { API_V2_URL, SCHEMA_NAME_COOKIE } from '@/api/literals';
import { TenancyDto } from '@/api/generated-types/generated-types';
import { cookies } from 'next/headers';

export default async function createSchemaName(name: string) {
  const session = await authOrSignInRedirect('/admin/create-schema');
  const safeParse = schemaNameSchema.safeParse(name);
  if (!safeParse) {
    throw Error('invalid name');
  }
  const email = session.user?.email;
  if (email) {
    const token = publicToken({ email });
    const nextRequest = new NextRequest(`${API_V2_URL}/tenancy/createSchema`, {
      body: name,
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain' // Indicate we're sending JSON data
      }
    });
    nextRequest.headers.append('Authorization', `Bearer ${token}`);

    const response = await fetch(nextRequest);
    if (response.status === 201) {
      const tenancyDto: TenancyDto | undefined = await response.json();

      if (tenancyDto) {
        const cookieStore = await cookies();
        const jwt = userToken(tenancyDto);
        cookieStore.set(SCHEMA_NAME_COOKIE, jwt, {
          httpOnly: true,
          secure: true,
          path: '/',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 // 1 day in seconds
        });
        return true;
      }
    } else {
      throw Error('Error creating and assign schema');
    }
  }
}
