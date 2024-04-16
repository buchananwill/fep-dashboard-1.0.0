import { z } from 'zod';
export const CarouselLeanDtoSchema = z.object({
  id: z.string().uuid(),
  carouselOrdinal: z.number(),
});
export type CarouselLeanDto = z.infer<typeof CarouselLeanDtoSchema>;