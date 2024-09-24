import { z } from 'zod';
export const ScheduleDtoSchema = z.object({
  id: z.number(),
  creationDateTime: z.date(),
  fromDate: z.date(),
  thruDate: z.date(),
  active: z.boolean(),
  cycleId: z.number(),
  status: z.string(),
});
export type ScheduleDto = z.infer<typeof ScheduleDtoSchema>;