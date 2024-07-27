import { DeliveryAllocationDtoSchema } from './DeliveryAllocationDtoSchema';
import { z } from 'zod';
export const WorkProjectSeriesSchemaDtoSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  workTaskTypeId: z.number(),
  deliveryAllocations: z.record(z.string(), DeliveryAllocationDtoSchema),
  workProjectBandwidth: z.number(),
  userToProviderRatio: z.number(),
  shortCode: z.string(),
});
export type WorkProjectSeriesSchemaDto = z.infer<typeof WorkProjectSeriesSchemaDtoSchema>;