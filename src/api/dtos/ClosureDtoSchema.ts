import { z } from 'zod';
export const ClosureDtoSchema = z.object({
  id: z.number(),
  closureType: z.string(),
  source: z.number(),
  target: z.number(),
  value: z.number(),
  weighting: z.number(),
});
export type ClosureDto = z.infer<typeof ClosureDtoSchema>;