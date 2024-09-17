import { DeliveryAllocationDtoSchema } from './DeliveryAllocationDtoSchema';
import { z } from 'zod';
export const DeliveryAllocationProjectionSchema = z.object({
  deliveryAllocation: DeliveryAllocationDtoSchema,
  horizontalMultiplier: z.number(),
  verticalMultiplier: z.number()
});
