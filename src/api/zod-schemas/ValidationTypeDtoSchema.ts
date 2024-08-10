import { z } from 'zod';
export const ValidationTypeDtoSchema = z.object({
  serialVersionUID: z.number(),
  id: z.number(),
  name: z.string(),
});
export type ValidationTypeDto = z.infer<typeof ValidationTypeDtoSchema>;