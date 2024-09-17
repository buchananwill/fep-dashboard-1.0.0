import { z } from 'zod';
export const HasUuidDtoSchema = z.object({
  id: z.string().uuid()
});
