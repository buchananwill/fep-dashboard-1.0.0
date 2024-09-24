import { z } from 'zod';
export const HasDescriptionSchema = z.object({
  description: z.string(),
});
export type HasDescription = z.infer<typeof HasDescriptionSchema>;