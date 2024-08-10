import { CycleSubspanJoinDtoSchema } from './CycleSubspanJoinDtoSchema';
import { z } from 'zod';
export const CycleSubspanGroupDtoSchema = z.object({
  cycleSubspanJoins: z.array(CycleSubspanJoinDtoSchema),
  id: z.string().uuid(),
});
export type CycleSubspanGroupDto = z.infer<typeof CycleSubspanGroupDtoSchema>;