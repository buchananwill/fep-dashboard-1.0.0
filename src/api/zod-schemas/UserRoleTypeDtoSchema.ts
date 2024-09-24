import { z } from 'zod';
export const UserRoleTypeDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type UserRoleTypeDto = z.infer<typeof UserRoleTypeDtoSchema>;