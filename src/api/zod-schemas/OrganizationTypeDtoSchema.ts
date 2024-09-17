import { z } from 'zod';
export const OrganizationTypeDtoSchema = z.object({
  id: z.number(),
  name: z.string()
});
