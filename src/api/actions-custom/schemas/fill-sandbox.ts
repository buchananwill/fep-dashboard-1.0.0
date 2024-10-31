'use server';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { API_V2_URL } from '@/api/literals';

export default async function fillSandbox() {
  return postEntitiesWithDifferentReturnType<{}, string>(
    {},
    `${API_V2_URL}/tenancy/sandbox`
  );
}
