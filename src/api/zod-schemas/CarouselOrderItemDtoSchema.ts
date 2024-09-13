import { z } from 'zod';
export const CarouselOrderItemDtoSchema = z.object({
  id: z.number(),
  carouselOrderId: z.string().uuid(),
  workProjectSeriesSchemaId: z.number(),
  preferencePosition: z.number(),
  active: z.boolean(),
  carouselOptionId: z.number(),
});
export type CarouselOrderItemDto = z.infer<typeof CarouselOrderItemDtoSchema>;