import { TimeSpanDtoSchema } from './TimeSpanDtoSchema';
import { CycleSubspanJoinNestedDtoSchema } from './CycleSubspanJoinNestedDtoSchema';
import { z } from 'zod';
export const CycleSubspanWithJoinsListDtoSchema = z.object({
  id: z.number(),
  timeSpan: TimeSpanDtoSchema,
  parentCycleId: z.number(),
  name: z.string(),
  cycleSubspanJoins: z.record(z.string(), CycleSubspanJoinNestedDtoSchema),
  zeroIndexedCycleDay: z.number(),
  dayOrdinal: z.number()
});
export type CycleSubspanWithJoinsListDto = z.infer<
  typeof CycleSubspanWithJoinsListDtoSchema
>;
