import { z } from 'zod';
export const ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema = z.object({
  id: z.number(),
  rating: z.number(),
  partyId: z.number(),
  providerRoleTypeId: z.number(),
  providerRoleTypeName: z.string(),
  workTaskTypeId: z.number(),
  workTaskTypeName: z.string(),
  isDynamic: z.boolean(),
});
export type ProviderRoleTypeWorkTaskTypeSuitabilityDto = z.infer<typeof ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema>;