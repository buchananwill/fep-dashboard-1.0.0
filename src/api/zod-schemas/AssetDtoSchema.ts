import { AssetTypeDtoSchema } from './AssetTypeDtoSchema';
import { z } from 'zod';
export const AssetDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  ownerId: z.number().optional(),
  type: AssetTypeDtoSchema
});
