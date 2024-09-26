import { createRolePostRequestSchema } from '@/api/create-role-post-request-schema';
import {
  AssetDtoSchema,
  PersonDtoSchema
} from '@/api/generated-schemas/schemas';

export const ProviderRolePostRequestSchema =
  createRolePostRequestSchema(PersonDtoSchema);
export const AssetRolePostRequestSchema =
  createRolePostRequestSchema(AssetDtoSchema);
