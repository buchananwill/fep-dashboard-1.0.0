import { z } from 'zod';
export const AssetRoleWorkTaskSuitabilityDtoSchema = z.object({
  id: z.number(),
  rating: z.number(),
  assetRoleTypeName: z.string(),
  assetRoleTypeId: z.number(),
  workTaskTypeName: z.string(),
  workTaskTypeId: z.number(),
  assetId: z.number(),
  assetName: z.string(),
  isDynamic: z.boolean().optional()
});
export type AssetRoleWorkTaskSuitabilityDto = z.infer<
  typeof AssetRoleWorkTaskSuitabilityDtoSchema
>;
