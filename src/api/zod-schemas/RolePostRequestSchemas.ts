import { PersonDtoSchema } from '@/api/zod-schemas/PersonDtoSchema';
import { AssetDtoSchema } from '@/api/zod-schemas/AssetDtoSchema';
import { createRolePostRequestSchema } from '@/api/create-role-post-request-schema';

export const ProviderRolePostRequestSchema =
  createRolePostRequestSchema(PersonDtoSchema);
export const AssetRolePostRequestSchema =
  createRolePostRequestSchema(AssetDtoSchema);
