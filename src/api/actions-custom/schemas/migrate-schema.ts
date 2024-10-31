'use server';

import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { FlywayOperationRequest } from '@/api/generated-types/generated-types';
import { API_V2_URL } from '@/api/literals';

export async function migrateSchema(schemaName: string) {
  return postEntitiesWithDifferentReturnType<FlywayOperationRequest, string>(
    { schemaName, beginWith: 'BASELINE', finishWith: 'MIGRATE' },
    `${API_V2_URL}/tenancy/migrate`
  );
}
