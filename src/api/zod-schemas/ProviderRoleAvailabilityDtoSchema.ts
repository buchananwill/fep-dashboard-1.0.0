import { z } from 'zod';
export const ProviderRoleAvailabilityDtoSchema = z.object({
  id: z.number(),
  providerRoleId: z.number(),
  partyId: z.number(),
  cycleSubspanId: z.number(),
  availabilityCode: z.number()
});
