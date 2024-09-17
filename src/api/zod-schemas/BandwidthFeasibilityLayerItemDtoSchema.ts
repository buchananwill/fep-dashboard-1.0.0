import { z } from 'zod';
export const BandwidthFeasibilityLayerItemDtoSchema = z.object({
  id: z.number(),
  bandwidthFeasibilityLayerId: z.number(),
  taskTypeClassificationId: z.number()
});
