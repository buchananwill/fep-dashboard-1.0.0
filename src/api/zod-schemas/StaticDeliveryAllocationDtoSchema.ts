import { DeliveryAllocationDtoSchema } from './DeliveryAllocationDtoSchema';
import { z } from 'zod';
export const StaticDeliveryAllocationDtoSchema = z.object({
  id: z.number(),
  cycleId: z.number(),
  deliveryAllocation: DeliveryAllocationDtoSchema,
});
export type StaticDeliveryAllocationDto = z.infer<typeof StaticDeliveryAllocationDtoSchema>;