import { UserRoleTypeDtoSchema } from './UserRoleTypeDtoSchema';
import { zDateOnly } from '../zod-mods';
import { z } from 'zod';
export const UserRoleDtoSchema = z.object({
  name: z.string(),
  id: z.number(),
  startDate: z.date(),
  thruDate: z.date(),
  serviceCategoryName: z.string(),
  serviceCategoryId: z.number(),
  partyName: z.string(),
  partyId: z.number(),
  partyType: z.string(),
  partyDateOfBirth: zDateOnly,
  userRoleType: UserRoleTypeDtoSchema,
});
export type UserRoleDto = z.infer<typeof UserRoleDtoSchema>;