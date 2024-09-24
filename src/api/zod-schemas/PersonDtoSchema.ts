import { zDateOnly } from '../zod-mods';
import { z } from 'zod';
export const PersonDtoSchema = z.object({
  id: z.number(),
  dateOfBirth: zDateOnly,
  fName: z.string(),
  lName: z.string(),
});
export type PersonDto = z.infer<typeof PersonDtoSchema>;