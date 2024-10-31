'use server';
import createSchemaName from '@/api/actions-custom/schemas/create-schema-name';
import { migrateSchema } from '@/api/actions-custom/schemas/migrate-schema';
import fillSandbox from '@/api/actions-custom/schemas/fill-sandbox';

export async function createSchemaFlow(schemaName: string) {
  const success = await createSchemaName(schemaName);
  console.log({ outcomeOfCreation: success });
  if (success) {
    const result = await migrateSchema(schemaName);
    console.log({ migrationResult: result });

    const resultSandboxFilling = await fillSandbox();
    console.log({ sandbox: resultSandboxFilling });
    return resultSandboxFilling;
  }
}
