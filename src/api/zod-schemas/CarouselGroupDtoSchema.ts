import { CarouselGroupOptionDtoSchema } from './CarouselGroupOptionDtoSchema';
import { KnowledgeLevelDtoSchema } from './KnowledgeLevelDtoSchema';
import { CarouselLeanDtoSchema } from './CarouselLeanDtoSchema';
import { z } from 'zod';
export const CarouselGroupDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  carousels: z.array(CarouselLeanDtoSchema),
  carouselGroupOptions: z.array(CarouselGroupOptionDtoSchema),
  knowledgeLevel: KnowledgeLevelDtoSchema,
});
export type CarouselGroupDto = z.infer<typeof CarouselGroupDtoSchema>;