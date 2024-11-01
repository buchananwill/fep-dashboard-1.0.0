import { NextRequest } from 'next/server';
import { API_V2_URL } from '@/api/literals';
import { TenancyDto } from '@/api/generated-types/generated-types';
import { userToken } from '@/api/auth/schemaName';

('server only');

export async function getTenancy(email: string): Promise<Partial<TenancyDto>> {
  const tenancyDto: Partial<TenancyDto> = {
    email
  };

  const nextRequest = new NextRequest(`${API_V2_URL}/tenancy`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${userToken(tenancyDto)}`
    }
  });

  const response = await fetch(nextRequest);

  if (response) {
    return await response.json();
  } else {
    throw Error('Server did not return tenancy DTO');
  }
}
