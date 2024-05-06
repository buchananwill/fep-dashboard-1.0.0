import { CycleSubspanLeanDtoSchema } from './CycleSubspanLeanDtoSchema';
import { z } from 'zod';
export const ProviderRoleAvailabilityDtoSchema = z.object({
  id: z.number(),
  providerRoleId: z.number(),
  cycleSubspanDto: CycleSubspanLeanDtoSchema,
  availabilityCode: z.number(),
});
export type ProviderRoleAvailabilityDto = z.infer<typeof ProviderRoleAvailabilityDtoSchema>;