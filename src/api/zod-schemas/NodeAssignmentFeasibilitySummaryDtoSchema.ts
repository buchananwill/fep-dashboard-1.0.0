import { NodeAssignmentFeasibilityDtoSchema } from './NodeAssignmentFeasibilityDtoSchema';
import { z } from 'zod';
export const NodeAssignmentFeasibilitySummaryDtoSchema = z.object({
  passes: z.boolean(),
  children: z.array(NodeAssignmentFeasibilityDtoSchema),
});
export type NodeAssignmentFeasibilitySummaryDto = z.infer<typeof NodeAssignmentFeasibilitySummaryDtoSchema>;