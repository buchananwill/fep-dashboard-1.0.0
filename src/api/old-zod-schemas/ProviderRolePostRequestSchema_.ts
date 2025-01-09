import { z } from 'zod';
import {
  ProviderRoleTypeDtoSchema,
  WorkTypeDtoSchema
} from '@/api/generated-schemas/schemas_';
export const ProviderRolePostRequestSchema = z.object({
  workTypeExampleList: z.array(WorkTypeDtoSchema.partial()),
  roleTypeExample: ProviderRoleTypeDtoSchema.partial(),
  rating: z.number()
});
export type ProviderRolePostRequest = z.infer<
  typeof ProviderRolePostRequestSchema
>;
