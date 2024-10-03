import { z } from 'zod';
import {
  ProviderRoleTypeDtoSchema,
  WorkTaskTypeDtoSchema
} from '@/api/generated-schemas/schemas_';
export const ProviderRolePostRequestSchema = z.object({
  workTaskTypeExampleList: z.array(WorkTaskTypeDtoSchema.partial()),
  providerRoleTypeExample: ProviderRoleTypeDtoSchema.partial(),
  rating: z.number()
});
export type ProviderRolePostRequest = z.infer<
  typeof ProviderRolePostRequestSchema
>;
