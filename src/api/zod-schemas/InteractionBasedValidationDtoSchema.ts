import { z } from 'zod';
export const InteractionBasedValidationDtoSchema = z.object({
});
export type InteractionBasedValidationDto = z.infer<typeof InteractionBasedValidationDtoSchema>;