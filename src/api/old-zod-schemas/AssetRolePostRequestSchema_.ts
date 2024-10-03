import { z } from 'zod';
import {
  AssetRoleTypeDtoSchema,
  WorkTaskTypeDtoSchema
} from '@/api/generated-schemas/schemas_';
export const AssetRolePostRequestSchema = z.object({
  workTaskTypeExampleList: z.array(WorkTaskTypeDtoSchema.partial()),
  roleTypeExample: AssetRoleTypeDtoSchema.partial(),
  rating: z.number(),
  flex: z.any()
});
export type AssetRolePostRequest = z.infer<typeof AssetRolePostRequestSchema>;
