import { NodeAssignmentFeasibilityDtoSchema } from './NodeAssignmentFeasibilityDtoSchema';
import { z } from 'zod';
export const NodeAssignmentFeasibilitySummaryDtoSchema = z.object({
  passes: z.boolean(),
  id: z.number()
});
export type NodeAssignmentFeasibilitySummaryDto = z.infer<
  typeof NodeAssignmentFeasibilitySummaryDtoSchema
>;
