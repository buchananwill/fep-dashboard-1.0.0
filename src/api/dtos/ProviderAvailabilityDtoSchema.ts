import { CycleSubspanDtoSchema } from '../../../../../fep-dashboard-1.0.0/src/app/api/dtos/CycleSubspanDtoSchema';
import { z } from 'zod';
export const ProviderAvailabilityDtoSchema = z.object({
  providerRoleId: z.number(),
  cycleSubspanDto: CycleSubspanDtoSchema,
  availabilityCode: z.number()
});
export type ProviderAvailabilityDto = z.infer<
  typeof ProviderAvailabilityDtoSchema
>;
