import { CarouselOptionDtoSchema } from './CarouselOptionDtoSchema';
import { z } from 'zod';
export const CarouselDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  carouselOrdinal: z.number(),
  carouselGroupId: z.number(),
  carouselOptionDtos: z.array(CarouselOptionDtoSchema),
});
export type CarouselDto = z.infer<typeof CarouselDtoSchema>;