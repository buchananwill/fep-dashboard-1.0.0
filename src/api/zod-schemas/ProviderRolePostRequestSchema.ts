import { ProviderRoleTypeDtoSchema } from './ProviderRoleTypeDtoSchema';
import { WorkTaskTypeDtoSchema } from './WorkTaskTypeDtoSchema';
import { z } from 'zod';
export const ProviderRolePostRequestSchema = z.object({
  workTaskTypeExampleList: z.array(WorkTaskTypeDtoSchema),
  roleTypeExample: ProviderRoleTypeDtoSchema,
  rating: z.number()
});
