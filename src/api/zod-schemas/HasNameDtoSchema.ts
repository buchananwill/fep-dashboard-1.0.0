import { z } from 'zod';
export const HasNameDtoSchema = z.object({
  name: z.string()
});
