import { z } from 'zod';
export const CarouselGroupOptionDtoSchema = z.object({
  id: z.number(),
  carouselGroupId: z.number(),
  workProjectSeriesSchemaId: z.number(),
});
export type CarouselGroupOptionDto = z.infer<typeof CarouselGroupOptionDtoSchema>;