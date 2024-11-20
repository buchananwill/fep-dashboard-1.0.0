'use server';

import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { FlywayOperationRequest } from '@/api/generated-types/generated-types';
import { API_V2_URL, cookieSecret } from '@/api/literals';
import { getSchemaNameCookie } from '@/api/auth/get-schema-name-cookie';
import * as jwt from 'jsonwebtoken';

const initialRequest: Pick<FlywayOperationRequest, 'beginWith' | 'finishWith'> =
  { beginWith: 'BASELINE', finishWith: 'MIGRATE' };
export async function migrateSchema(
  schemaName: string,
  requestBody?: Partial<FlywayOperationRequest>
) {
  const body = { ...initialRequest, schemaName, ...requestBody };

  return postEntitiesWithDifferentReturnType<FlywayOperationRequest, string>(
    body,
    `${API_V2_URL}/tenancy/migrate`
  );
}

export async function resetSchema() {
  const schemaNameCookie = await getSchemaNameCookie();
  if (schemaNameCookie?.value) {
    const verify = jwt.verify(schemaNameCookie.value, cookieSecret);
    if (typeof verify === 'object') {
      const schemaName = verify.schemaName;
      if (schemaName) {
        return migrateSchema(schemaName, {
          beginWith: 'CLEAN',
          targetTemplateId: 17
        });
      }
    }
  }
  throw Error('Error resetting schema');
}
