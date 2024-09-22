import { z } from 'zod';

import { supplyAName } from '@/api/zod-schemas/error-messages';
export const AssetTypeDtoSchema = z.object({
  id: z.number(),
  name: z.string().min(1, supplyAName),
  isMoveable: z.boolean()
});
