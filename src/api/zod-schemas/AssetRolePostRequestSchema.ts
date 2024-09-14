import { AssetRoleTypeDtoSchema } from './AssetRoleTypeDtoSchema';
import { WorkTaskTypeDtoSchema } from './WorkTaskTypeDtoSchema';
import { z } from 'zod';
export const AssetRolePostRequestSchema = z.object({
  workTaskTypeExampleList: z.array(WorkTaskTypeDtoSchema),
  roleTypeExample: AssetRoleTypeDtoSchema,
  rating: z.number(),
});
export type AssetRolePostRequest = z.infer<typeof AssetRolePostRequestSchema>;