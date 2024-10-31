'use server';
import createSchemaName from '@/api/actions-custom/schemas/create-schema-name';
import { migrateSchema } from '@/api/actions-custom/schemas/migrate-schema';

export async function createSchemaFlow(schemaName: string) {
  const success = await createSchemaName(schemaName);
  console.log({ outcomeOfCreation: success });
  if (success) {
    const result = await migrateSchema(schemaName);
    console.log({ migrationResult: result });
  }
}
