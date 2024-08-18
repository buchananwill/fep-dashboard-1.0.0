import { UserRoleTypeDtoSchema } from './UserRoleTypeDtoSchema';
import { zDateOnly } from '../zod-mods';
import { z } from 'zod';
export const UserRoleDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  startDate: z.date(),
  thruDate: z.date(),
  serviceCategoryName: z.string(),
  knowledgeLevelSeriesId: z.number(),
  partyName: z.string(),
  partyId: z.number(),
  partyType: z.string(),
  partyDateOfBirth: zDateOnly,
  userRoleType: UserRoleTypeDtoSchema
});
export type UserRoleDto = z.infer<typeof UserRoleDtoSchema>;
