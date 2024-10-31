'use server';

import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { FlywayOperationRequest } from '@/api/generated-types/generated-types';
import { API_V2_URL } from '@/api/literals';
import { getSchemaName } from '@/api/auth/get-schema-name';

const initialRequest: Pick<FlywayOperationRequest, 'beginWith' | 'finishWith'> =
  { beginWith: 'BASELINE', finishWith: 'MIGRATE' };
export async function migrateSchema(
  schemaName: string,
  requestBody?: Partial<FlywayOperationRequest>
) {
  return postEntitiesWithDifferentReturnType<FlywayOperationRequest, string>(
    { ...initialRequest, schemaName, ...requestBody },
    `${API_V2_URL}/tenancy/migrate`
  );
}

export async function resetSchema() {
  const schemaNameCookie = await getSchemaName();
  if (schemaNameCookie?.value) {
    return migrateSchema(schemaNameCookie.value, { beginWith: 'CLEAN' });
  }
}
