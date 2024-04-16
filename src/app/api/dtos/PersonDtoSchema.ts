import { zDateOnly } from '../zod-mods';
import { z } from 'zod';
export const PersonDtoSchema = z.object({
  id: z.number(),
  dateOfBirth: zDateOnly,
  personalName: z.string(),
  familyName: z.string(),
});
export type PersonDto = z.infer<typeof PersonDtoSchema>;