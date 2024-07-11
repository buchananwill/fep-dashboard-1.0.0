import { ProviderRoleTypeDtoSchema } from './ProviderRoleTypeDtoSchema';
import { WorkTaskTypeDtoSchema } from './WorkTaskTypeDtoSchema';
import { z } from 'zod';
export const ProviderRolePostRequestSchema = z.object({
  workTaskTypeExampleList: z.array(WorkTaskTypeDtoSchema),
  providerRoleTypeExample: ProviderRoleTypeDtoSchema,
  rating: z.number(),
});
export type ProviderRolePostRequest = z.infer<typeof ProviderRolePostRequestSchema>;