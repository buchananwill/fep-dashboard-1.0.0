import { z } from 'zod';
export const AssetRoleTypeWorkTaskTypeSuitabilityDtoSchema = z.object({
  id: z.number(),
  rating: z.number(),
  assetRoleTypeName: z.string(),
  assetRoleTypeId: z.number(),
  workTaskTypeName: z.string(),
  workTaskTypeId: z.number(),
  assetId: z.number(),
  assetName: z.string(),
});
export type AssetRoleTypeWorkTaskTypeSuitabilityDto = z.infer<typeof AssetRoleTypeWorkTaskTypeSuitabilityDtoSchema>;