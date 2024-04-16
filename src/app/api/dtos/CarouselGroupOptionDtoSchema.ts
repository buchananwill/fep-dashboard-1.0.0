import { z } from 'zod';
export const CarouselGroupOptionDtoSchema = z.object({
  id: z.number(),
  carouselGroupId: z.string().uuid(),
  carouselGroupName: z.string(),
  workProjectSeriesSchemaId: z.string().uuid(),
  workProjectSeriesSchemaName: z.string(),
});
export type CarouselGroupOptionDto = z.infer<typeof CarouselGroupOptionDtoSchema>;