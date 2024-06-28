import { z } from 'zod';
export const WorkNodeAssignmentDtoSchema = z.object({
  id: z.number(),
  organizationId: z.number(),
  workSchemaNodeId: z.number().optional()
});
export type WorkNodeAssignmentDto = z.infer<typeof WorkNodeAssignmentDtoSchema>;
