import { z } from 'zod';
export const HasNumberIdDtoSchema = z.object({
  id: z.number(),
});
export type HasNumberIdDto = z.infer<typeof HasNumberIdDtoSchema>;