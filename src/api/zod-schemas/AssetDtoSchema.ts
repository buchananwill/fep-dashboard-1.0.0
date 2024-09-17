import { AssetTypeDtoSchema } from './AssetTypeDtoSchema';
import { z } from 'zod';
export const AssetDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  ownerId: z.number(),
  type: AssetTypeDtoSchema
});
