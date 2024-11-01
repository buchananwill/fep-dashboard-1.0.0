'use server';
import createSchemaName from '@/api/actions-custom/schemas/create-schema-name';
import { migrateSchema } from '@/api/actions-custom/schemas/migrate-schema';
import fillSandbox from '@/api/actions-custom/schemas/fill-sandbox';

export async function createSchemaFlow(schemaName: string) {
  const success = await createSchemaName(schemaName);
  if (success) {
    const result = await migrateSchema(schemaName);

    if (result) return await fillSandbox();
    else throw Error('Error while setting up schema.');
  }
}
