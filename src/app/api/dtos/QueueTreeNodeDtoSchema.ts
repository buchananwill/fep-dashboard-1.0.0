import { StringIntegerTupleSchema } from './StringIntegerTupleSchema';
import { z } from 'zod';
export const QueueTreeNodeDtoSchema = z.object({
  id: z.string(),
  nodeNumber: z.number(),
  taskSize: z.number(),
  degreeOfNesting: z.number(),
  netFailureCount: z.number(),
  batchSize: z.number(),
  totalAllocationArea: z.number(),
  yearGroup: z.number(),
  subjectContactTimeUnits: z.array(StringIntegerTupleSchema),
});
export type QueueTreeNodeDto = z.infer<typeof QueueTreeNodeDtoSchema>;