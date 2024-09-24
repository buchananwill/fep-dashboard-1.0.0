import { z } from 'zod';
export const HasNameDtoSchema = z.object({
  name: z.string(),
});
export type HasNameDto = z.infer<typeof HasNameDtoSchema>;