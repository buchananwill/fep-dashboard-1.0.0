import { z } from 'zod';
export const WorkTaskTypeProjectionSchema = z.object({
  id: z.number(),
  totalTaskVolume: z.number(),
});
export type WorkTaskTypeProjection = z.infer<typeof WorkTaskTypeProjectionSchema>;