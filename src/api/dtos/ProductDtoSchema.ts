import { z } from 'zod';
export const ProductDtoSchema = z.object({
  id: z.number(),
  quantityInStock: z.number(),
  productCode: z.string(),
  name: z.string(),
  physicalAttributesLength: z.number(),
  physicalAttributesHeight: z.number(),
  physicalAttributesDepth: z.number(),
  physicalAttributesWeight: z.number(),
  productTypeId: z.number(),
  productTypeName: z.string(),
});
export type ProductDto = z.infer<typeof ProductDtoSchema>;