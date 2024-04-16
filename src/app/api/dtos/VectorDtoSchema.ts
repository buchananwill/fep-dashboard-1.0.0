import { z } from 'zod';
export const VectorDtoSchema = z.object({
  deltaX: z.number(),
  deltaY: z.number(),
  deltaZ: z.number(),
});
export type VectorDto = z.infer<typeof VectorDtoSchema>;