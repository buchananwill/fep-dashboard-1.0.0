import { OrganizationTypeDtoSchema } from './OrganizationTypeDtoSchema';
import { WorkSchemaNodeAssignmentDtoSchema } from './WorkSchemaNodeAssignmentDtoSchema';
import { z } from 'zod';
export const OrganizationDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: OrganizationTypeDtoSchema,
  workSeriesBundleAssignment: WorkSchemaNodeAssignmentDtoSchema.optional()
});
export type OrganizationDto = z.infer<typeof OrganizationDtoSchema>;
