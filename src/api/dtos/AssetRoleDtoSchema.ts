import { AssetRoleTypeDtoSchema } from './AssetRoleTypeDtoSchema';
import { z } from 'zod';
export const AssetRoleDtoSchema = z.object({
  assetId: z.number(),
  assetAssetCode: z.string(),
  assetName: z.string(),
  name: z.string(),
  assetRoleType: AssetRoleTypeDtoSchema,
  id: z.number(),
});
export type AssetRoleDto = z.infer<typeof AssetRoleDtoSchema>;