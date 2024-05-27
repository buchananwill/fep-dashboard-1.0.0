import { z } from 'zod';
import { CarouselOrderItemDtoSchema } from '@/api/dtos/CarouselOrderItemDtoSchema';
export const CarouselOrderDtoSchema = z.object({
  id: z.string().uuid(),
  carouselOrderItems: z.record(z.string().uuid(), CarouselOrderItemDtoSchema),
  userRoleId: z.number(),
  carouselGroupId: z.string().uuid()
});
export type CarouselOrderDto = z.infer<typeof CarouselOrderDtoSchema>;
