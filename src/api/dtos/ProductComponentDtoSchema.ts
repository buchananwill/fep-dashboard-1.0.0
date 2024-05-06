import { LongIdStringNameTupleSchema } from './LongIdStringNameTupleSchema';
import { ComponentDtoSchema } from './ComponentDtoSchema';
import { z } from 'zod';
export const ProductComponentDtoSchema = z.object({
  serialVersionUID: z.number(),
  id: z.number(),
  name: z.string(),
  product: LongIdStringNameTupleSchema,
  component: ComponentDtoSchema,
});
export type ProductComponentDto = z.infer<typeof ProductComponentDtoSchema>;