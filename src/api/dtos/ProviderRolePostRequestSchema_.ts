import { ProviderRoleTypeDtoSchema } from '../generated-dtos/ProviderRoleTypeDtoSchema';
import { WorkTaskTypeDtoSchema } from '../generated-dtos/WorkTaskTypeDtoSchema';
import { z } from 'zod';
export const ProviderRolePostRequestSchema = z.object({
  workTaskTypeExampleList: z.array(WorkTaskTypeDtoSchema.partial()),
  providerRoleTypeExample: ProviderRoleTypeDtoSchema.partial(),
  rating: z.number()
});
export type ProviderRolePostRequest = z.infer<
  typeof ProviderRolePostRequestSchema
>;
