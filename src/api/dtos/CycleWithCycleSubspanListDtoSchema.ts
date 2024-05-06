import { zDayOfWeek } from '../zod-mods';
import { CycleSubspanLeanDtoSchema } from './CycleSubspanLeanDtoSchema';
import { z } from 'zod';
export const CycleWithCycleSubspanListDtoSchema = z.object({
  id: z.number(),
  cycleSubspans: z.array(CycleSubspanLeanDtoSchema),
  cycleLengthInDays: z.number(),
  cycleDayZero: zDayOfWeek,
});
export type CycleWithCycleSubspanListDto = z.infer<typeof CycleWithCycleSubspanListDtoSchema>;