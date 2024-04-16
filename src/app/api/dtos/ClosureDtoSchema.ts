import { z } from 'zod';
export const ClosureDtoSchema = z.object({
  id: z.number(),
  closureType: z.string(),
  target: z.number(),
  source: z.number(),
  value: z.number(),
  weighting: z.number(),
});
export type ClosureDto = z.infer<typeof ClosureDtoSchema>;