import { z } from 'zod';
export const ProductTypeDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type ProductTypeDto = z.infer<typeof ProductTypeDtoSchema>;