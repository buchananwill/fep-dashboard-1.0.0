import { z } from 'zod';
export const CarouselLeanDtoSchema = z.object({
  id: z.number(),
  carouselOrdinal: z.number()
});
