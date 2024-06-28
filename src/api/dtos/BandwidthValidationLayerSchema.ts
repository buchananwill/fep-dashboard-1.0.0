import { z } from 'zod';
export const BandwidthValidationLayerSchema = z.object({
  rootClassificationId: z.number(),
  residualBandwidth: z.number(),
  taskClassificationIdList: z.array(z.number()),
  resourceClassificationIdList: z.array(z.number()),
});
export type BandwidthValidationLayer = z.infer<typeof BandwidthValidationLayerSchema>;