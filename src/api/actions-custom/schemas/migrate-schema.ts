'use server';

import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { FlywayOperationRequest } from '@/api/generated-types/generated-types_';
import { API_V2_URL } from '@/api/literals';
import { getSchemaNameCookie } from '@/api/auth/get-schema-name-cookie';
import * as jwt from 'jsonwebtoken';

const initialRequest: Pick<FlywayOperationRequest, 'beginWith' | 'finishWith'> =
  { beginWith: 'BASELINE', finishWith: 'MIGRATE' };
export async function migrateSchema(
  requestBody?: Partial<FlywayOperationRequest>
) {
  const body = { ...initialRequest, ...requestBody };

  return postEntitiesWithDifferentReturnType<
    Partial<FlywayOperationRequest>,
    string
  >(body, `${API_V2_URL}/tenancy/migrate`);
}

export async function resetSchema() {
  const schemaNameCookie = await getSchemaNameCookie();

  throw Error('Error resetting schema');
}
