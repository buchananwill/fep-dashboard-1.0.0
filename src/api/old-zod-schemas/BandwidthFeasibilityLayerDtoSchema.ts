import { BandwidthFeasibilityLayerItemDtoSchema } from './BandwidthFeasibilityLayerItemDtoSchema';
import { z } from 'zod';
export const BandwidthFeasibilityLayerDtoSchema = z.object({
  id: z.number(),
  taskTypeClassificationFeasibilityId: z.number(),
  layerOrdinal: z.number(),
  bandwidthFeasibilityLayerItems: z.array(BandwidthFeasibilityLayerItemDtoSchema),
  residual: z.number(),
  passes: z.boolean(),
  serialVersionUID: z.number(),
});
export type BandwidthFeasibilityLayerDto = z.infer<typeof BandwidthFeasibilityLayerDtoSchema>;