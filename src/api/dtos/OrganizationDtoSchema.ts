import { OrganizationTypeDtoSchema } from './OrganizationTypeDtoSchema';
import { WorkNodeAssignmentDtoSchema } from './WorkNodeAssignmentDtoSchema';
import { z } from 'zod';
export const OrganizationDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: OrganizationTypeDtoSchema,
  workSeriesBundleAssignment: WorkNodeAssignmentDtoSchema.optional()
});
export type OrganizationDto = z.infer<typeof OrganizationDtoSchema>;
