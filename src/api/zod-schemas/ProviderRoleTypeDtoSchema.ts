import { z } from 'zod';
export const ProviderRoleTypeDtoSchema = z.object({
  name: z.string(),
  id: z.number()
});
