import { ProviderRoleTypeDtoSchema } from './ProviderRoleTypeDtoSchema';
import { z } from 'zod';
export const ProviderRoleDtoSchema = z.object({
  name: z.string(),
  id: z.number(),
  partyName: z.string(),
  partyId: z.number(),
  knowledgeDomainId: z.number(),
  knowledgeDomainName: z.string(),
  type: ProviderRoleTypeDtoSchema,
});
export type ProviderRoleDto = z.infer<typeof ProviderRoleDtoSchema>;