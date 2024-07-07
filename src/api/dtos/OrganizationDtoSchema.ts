import { WorkSchemaNodeAssignmentDtoSchema } from './WorkSchemaNodeAssignmentDtoSchema';
import { OrganizationTypeDtoSchema } from './OrganizationTypeDtoSchema';
import { z } from 'zod';
export const OrganizationDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: OrganizationTypeDtoSchema,
  workSchemaNodeAssignment: WorkSchemaNodeAssignmentDtoSchema
});
export type OrganizationDto = z.infer<typeof OrganizationDtoSchema>;
