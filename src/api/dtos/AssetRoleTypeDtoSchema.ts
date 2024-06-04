import { z } from 'zod';
export const AssetRoleTypeDtoSchema = z.object({
  name: z.string(),
  id: z.number(),
});
export type AssetRoleTypeDto = z.infer<typeof AssetRoleTypeDtoSchema>;