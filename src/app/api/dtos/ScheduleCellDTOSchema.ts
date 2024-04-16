import { z } from 'zod';
export const ScheduleCellDTOSchema = z.object({
  principalValue: z.string(),
  leftBottom: z.string(),
  rightBottom: z.string(),
});
export type ScheduleCellDTO = z.infer<typeof ScheduleCellDTOSchema>;