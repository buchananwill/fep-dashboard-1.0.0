import { z } from 'zod';
export const CarouselOptionDtoSchema = z.object({
  carouselId: z.string().uuid(),
  id: z.number(),
  workProjectSeriesSchemaId: z.number(),
});
export type CarouselOptionDto = z.infer<typeof CarouselOptionDtoSchema>;