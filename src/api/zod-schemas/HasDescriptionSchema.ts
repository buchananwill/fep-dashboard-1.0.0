import { z } from 'zod';
export const HasDescriptionSchema = z.object({
  description: z.string()
});
