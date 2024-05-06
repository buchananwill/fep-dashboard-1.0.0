import { VectorDtoSchema } from './VectorDtoSchema';
import { z } from 'zod';
export const TransformationDtoSchema = z.object({
  displacement: VectorDtoSchema,
  rotation: VectorDtoSchema,
  attached: z.boolean(),
});
export type TransformationDto = z.infer<typeof TransformationDtoSchema>;