import { BandwidthValidationLayerSchema } from './BandwidthValidationLayerSchema';
import { z } from 'zod';
export const BandwidthValidationTraversalSchema = z.object({
  id: z.number(),
  layers: z.array(BandwidthValidationLayerSchema),
});
export type BandwidthValidationTraversal = z.infer<typeof BandwidthValidationTraversalSchema>;