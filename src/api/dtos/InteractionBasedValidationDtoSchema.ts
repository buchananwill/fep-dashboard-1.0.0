import { z } from 'zod';
export const InteractionBasedValidationDtoSchema = z.object({
  name: z.string(),
  id: z.number(),
});
export type InteractionBasedValidationDto = z.infer<typeof InteractionBasedValidationDtoSchema>;