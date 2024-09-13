import { WorkProjectSeriesNodeLinkDtoSchema } from './WorkProjectSeriesNodeLinkDtoSchema';
import { z } from 'zod';
export const QueueTreeNodeDtoSchema = z.object({
  id: z.string(),
  nodeNumber: z.number(),
  taskSize: z.number(),
  degreeOfNesting: z.number(),
  netFailureCount: z.number(),
  batchSize: z.number(),
  totalAllocationArea: z.number(),
  workProjectSeriesNodeLinks: z.array(WorkProjectSeriesNodeLinkDtoSchema),
});
export type QueueTreeNodeDto = z.infer<typeof QueueTreeNodeDtoSchema>;