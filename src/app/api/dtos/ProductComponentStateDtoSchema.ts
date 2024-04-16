import { TransformationDtoSchema } from './TransformationDtoSchema';
import { z } from 'zod';
export const ProductComponentStateDtoSchema = z.object({
  serialVersionUID: z.number(),
  description: z.string(),
  transformation: TransformationDtoSchema,
  id: z.number(),
  entityId: z.number(),
  entityName: z.string(),
  referenceId: z.number(),
  referenceName: z.string(),
});
export type ProductComponentStateDto = z.infer<typeof ProductComponentStateDtoSchema>;