import { z } from 'zod';
import { CycleSubspanDtoSchema } from '@/api/dtos/CycleSubspanDtoSchema';
export const ProviderAvailabilityDtoSchema = z.object({
  providerRoleId: z.number(),
  cycleSubspanDto: CycleSubspanDtoSchema,
  availabilityCode: z.number()
});
export type ProviderAvailabilityDto = z.infer<
  typeof ProviderAvailabilityDtoSchema
>;
