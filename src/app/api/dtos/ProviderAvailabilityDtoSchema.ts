import { CycleSubspanDtoSchema } from './CycleSubspanDtoSchema';
import { z } from 'zod';
export const ProviderAvailabilityDtoSchema = z.object({
  providerRoleId: z.number(),
  cycleSubspanDto: CycleSubspanDtoSchema,
  availabilityCode: z.number(),
});
export type ProviderAvailabilityDto = z.infer<typeof ProviderAvailabilityDtoSchema>;