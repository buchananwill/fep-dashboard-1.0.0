import { z } from 'zod';
export const CarouselGroupOptionDtoSchema = z.object({
  id: z.number(),
  carouselGroupId: z.string().uuid(),
  workProjectSeriesSchemaId: z.number(),
});
export type CarouselGroupOptionDto = z.infer<typeof CarouselGroupOptionDtoSchema>;