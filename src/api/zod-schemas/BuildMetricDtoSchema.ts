import { QueueTreeNodeDtoSchema } from './QueueTreeNodeDtoSchema';
import { z } from 'zod';
export const BuildMetricDtoSchema = z.object({
  id: z.number(),
  finalState: z.string(),
  totalAllocationLoops: z.number(),
  scheduleId: z.number(),
  queueTreeNodes: z.array(QueueTreeNodeDtoSchema),
});
export type BuildMetricDto = z.infer<typeof BuildMetricDtoSchema>;