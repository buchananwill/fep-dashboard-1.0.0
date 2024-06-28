import { CarouselOptionDtoSchema } from './CarouselOptionDtoSchema';
import { z } from 'zod';
export const CarouselDtoSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  carouselOrdinal: z.number(),
  carouselGroupId: z.string().uuid(),
  carouselOptionDtos: z.array(CarouselOptionDtoSchema),
});
export type CarouselDto = z.infer<typeof CarouselDtoSchema>;