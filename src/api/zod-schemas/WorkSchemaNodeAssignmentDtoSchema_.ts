import { z } from 'zod';
export const WorkSchemaNodeAssignmentDtoSchema = z.object({
  id: z.number(),
  organizationId: z.number(),
  workSchemaNodeId: z.number().optional()
});
export type WorkSchemaNodeAssignmentDto = z.infer<
  typeof WorkSchemaNodeAssignmentDtoSchema
>;
