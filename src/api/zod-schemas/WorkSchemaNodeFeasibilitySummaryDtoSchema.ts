import { WorkSchemaNodeFeasibilityDtoSchema } from './WorkSchemaNodeFeasibilityDtoSchema';
import { z } from 'zod';
export const WorkSchemaNodeFeasibilitySummaryDtoSchema = z.object({
  passes: z.boolean(),
  children: z.array(WorkSchemaNodeFeasibilityDtoSchema),
  serialVersionUID: z.number(),
});
export type WorkSchemaNodeFeasibilitySummaryDto = z.infer<typeof WorkSchemaNodeFeasibilitySummaryDtoSchema>;