import { z } from 'zod';
export const UserRoleTypeDtoSchema = z.object({
  id: z.number(),
  name: z.string()
});
