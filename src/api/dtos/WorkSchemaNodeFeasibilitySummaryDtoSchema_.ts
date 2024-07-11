import { z } from 'zod';

export const WorkSchemaNodeFeasibilitySummaryDtoSchema = z.object({
  serialVersionUID: z.number(),
  passes: z.boolean(),
  id: z.number()
});
export type WorkSchemaNodeFeasibilitySummaryDto = z.infer<
  typeof WorkSchemaNodeFeasibilitySummaryDtoSchema
>;
