import { z } from 'zod';
export const AssetClassificationItemDtoSchema = z.object({
  id: z.number(),
  taskTypeClassificationId: z.number(),
  assetId: z.number()
});
