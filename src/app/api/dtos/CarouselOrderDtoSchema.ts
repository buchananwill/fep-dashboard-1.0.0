import { CarouselOrderItemDtoSchema } from './CarouselOrderItemDtoSchema';
import { z } from 'zod';
export const CarouselOrderDtoSchema = z.object({
  id: z.string().uuid(),
  carouselOrderItems: z.array(CarouselOrderItemDtoSchema),
  userRoleId: z.number(),
});
export type CarouselOrderDto = z.infer<typeof CarouselOrderDtoSchema>;