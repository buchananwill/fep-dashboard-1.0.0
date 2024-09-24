import { z } from 'zod';
export const AssetTypeDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  isMoveable: z.boolean(),
});
export type AssetTypeDto = z.infer<typeof AssetTypeDtoSchema>;