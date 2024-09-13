import { DeliveryAllocationDtoSchema } from './DeliveryAllocationDtoSchema';
import { WorkTaskTypeDtoSchema } from './WorkTaskTypeDtoSchema';
import { z } from 'zod';
export const WorkProjectSeriesSchemaDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  deliveryAllocations: z.record(z.string(), DeliveryAllocationDtoSchema),
  workProjectBandwidth: z.number(),
  userToProviderRatio: z.number(),
  workTaskType: WorkTaskTypeDtoSchema,
});
export type WorkProjectSeriesSchemaDto = z.infer<typeof WorkProjectSeriesSchemaDtoSchema>;