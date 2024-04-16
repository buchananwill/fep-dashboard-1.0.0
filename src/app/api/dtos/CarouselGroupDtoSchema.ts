import { CarouselGroupOptionDtoSchema } from './CarouselGroupOptionDtoSchema';
import { CarouselLeanDtoSchema } from './CarouselLeanDtoSchema';
import { z } from 'zod';
export const CarouselGroupDtoSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  carousels: z.array(CarouselLeanDtoSchema),
  carouselGroupOptions: z.array(CarouselGroupOptionDtoSchema),
});
export type CarouselGroupDto = z.infer<typeof CarouselGroupDtoSchema>;