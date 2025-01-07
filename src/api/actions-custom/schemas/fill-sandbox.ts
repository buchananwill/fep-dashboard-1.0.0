'use server';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';

import { API_V2_URL } from '@/api/server-literals';

export default async function fillSandbox() {
  return postEntitiesWithDifferentReturnType<{}, string>(
    {},
    `${API_V2_URL}/tenancy/initializeFromTemplate/${17}`
  );
}
