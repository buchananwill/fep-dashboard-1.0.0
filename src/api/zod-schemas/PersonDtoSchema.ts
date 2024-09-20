import { zDateOnly } from '../zod-mods';
import { z } from 'zod';
export const PersonDtoSchema = z.object({
  id: z.number(),
  dateOfBirth: zDateOnly,
  fName: z.string().min(1, 'Please supply a personal name'),
  lName: z.string().min(1, 'Please supply a family name')
});
