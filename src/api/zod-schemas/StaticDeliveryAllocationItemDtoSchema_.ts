import { StaticDeliveryAllocationDtoSchema } from './StaticDeliveryAllocationDtoSchema';
import { z } from 'zod';
export const StaticDeliveryAllocationItemDtoSchema = z.object({
  id: z.number(),
  cycleSubspanGroupId: z.string().uuid(),
  staticDeliveryAllocation: StaticDeliveryAllocationDtoSchema,
});
export type StaticDeliveryAllocationItemDto = z.infer<typeof StaticDeliveryAllocationItemDtoSchema>;