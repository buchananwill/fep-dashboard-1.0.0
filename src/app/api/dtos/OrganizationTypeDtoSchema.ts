import { z } from 'zod';
export const OrganizationTypeDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type OrganizationTypeDto = z.infer<typeof OrganizationTypeDtoSchema>;