import { z } from 'zod';
export const BandwidthFeasibilityLayerItemDtoSchema = z.object({
  id: z.number(),
  bandwidthFeasibilityLayerId: z.number(),
  taskTypeClassificationId: z.number(),
});
export type BandwidthFeasibilityLayerItemDto = z.infer<typeof BandwidthFeasibilityLayerItemDtoSchema>;