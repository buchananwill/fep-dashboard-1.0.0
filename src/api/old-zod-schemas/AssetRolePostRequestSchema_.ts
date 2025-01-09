import { z } from 'zod';
import {
  AssetRoleTypeDtoSchema,
  WorkTypeDtoSchema
} from '@/api/generated-schemas/schemas_';
export const AssetRolePostRequestSchema = z.object({
  workTypeExampleList: z.array(WorkTypeDtoSchema.partial()),
  roleTypeExample: AssetRoleTypeDtoSchema.partial(),
  rating: z.number(),
  flex: z.any()
});
export type AssetRolePostRequest = z.infer<typeof AssetRolePostRequestSchema>;
