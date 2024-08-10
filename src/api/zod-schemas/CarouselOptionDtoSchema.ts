import { z } from 'zod';
export const CarouselOptionDtoSchema = z.object({
  carouselId: z.string().uuid(),
  id: z.number(),
  workProjectSeriesSchemaId: z.string().uuid(),
});
export type CarouselOptionDto = z.infer<typeof CarouselOptionDtoSchema>;