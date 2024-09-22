import { AssetTypeDtoSchema } from './AssetTypeDtoSchema';
import { z } from 'zod';
import { supplyAName } from '@/api/zod-schemas/error-messages';

export const AssetDtoSchema = z.object({
  id: z.number(),
  name: z.string().min(1, supplyAName),
  ownerId: z.number().optional(),
  type: AssetTypeDtoSchema
});
