'use server';

import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { FlywayOperationRequest } from '@/api/generated-types/generated-types_';
import { API_V2_URL } from '@/api/literals';
import { getSchemaNameCookie } from '@/api/auth/get-schema-name-cookie';
import { getInitializationStatus } from '@/api/actions-custom/schemas/getInitializationStatus';

const initialRequest: Pick<FlywayOperationRequest, 'beginWith' | 'finishWith'> =
  { beginWith: 'BASELINE', finishWith: 'MIGRATE' };

export async function migrateSchema(
  requestBody?: Partial<FlywayOperationRequest>
) {
  const body: Partial<FlywayOperationRequest> = {
    ...initialRequest,
    ...requestBody
  };
  const templateProgress = await getInitializationStatus();
  if (templateProgress.templatesLoaded.length > 0) {
    return postEntitiesWithDifferentReturnType(
      body.targetTemplateId,
      `${API_V2_URL}/tenancy/re-initialize`
    );
  } else {
    return postEntitiesWithDifferentReturnType<
      Partial<FlywayOperationRequest>,
      string
    >(body, `${API_V2_URL}/tenancy/migrate`);
  }
}

export async function resetSchema() {
  const schemaNameCookie = await getSchemaNameCookie();

  throw Error('Error resetting schema');
}
