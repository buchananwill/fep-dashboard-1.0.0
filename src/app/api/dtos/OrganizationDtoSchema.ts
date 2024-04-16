import { OrganizationTypeDtoSchema } from './OrganizationTypeDtoSchema';
import { z } from 'zod';
export const OrganizationDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: OrganizationTypeDtoSchema,
  workSeriesBundleAssignmentId: z.number(),
});
export type OrganizationDto = z.infer<typeof OrganizationDtoSchema>;