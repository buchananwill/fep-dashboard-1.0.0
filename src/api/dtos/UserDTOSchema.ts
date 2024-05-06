import { z } from 'zod';
export const UserDTOSchema = z.object({
  name: z.string(),
  email: z.string(),
});
export type UserDTO = z.infer<typeof UserDTOSchema>;