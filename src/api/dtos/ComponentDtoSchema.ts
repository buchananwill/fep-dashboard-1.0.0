import { ComponentTypeDtoSchema } from './ComponentTypeDtoSchema';
import { z } from 'zod';
export const ComponentDtoSchema = z.object({
  id: z.number(),
  partCode: z.string(),
  name: z.string(),
  quantityInStock: z.number(),
  description: z.string(),
  componentType: ComponentTypeDtoSchema,
  physicalAttributesLength: z.number(),
  physicalAttributesWidth: z.number(),
  physicalAttributesDepth: z.number(),
});
export type ComponentDto = z.infer<typeof ComponentDtoSchema>;