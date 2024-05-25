import { OrganizationTypeDtoSchema } from './OrganizationTypeDtoSchema';
import { WorkSeriesBundleAssignmentDtoSchema } from './WorkSeriesBundleAssignmentDtoSchema';
import { z } from 'zod';
export const OrganizationDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: OrganizationTypeDtoSchema,
  workSeriesBundleAssignment: WorkSeriesBundleAssignmentDtoSchema,
});
export type OrganizationDto = z.infer<typeof OrganizationDtoSchema>;