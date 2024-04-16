import { z } from 'zod';
export const DeliveryAllocationDtoSchema = z.object({
  id: z.number(),
  deliveryAllocationSize: z.number(),
  count: z.number(),
  workProjectSeriesSchemaId: z.string().uuid(),
  workTaskTypeId: z.number(),
  priority: z.number(),
});
export type DeliveryAllocationDto = z.infer<typeof DeliveryAllocationDtoSchema>;