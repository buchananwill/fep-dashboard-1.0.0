import { SubjectContactTimeDTOSchema } from './SubjectContactTimeDTOSchema';
import { z } from 'zod';
export const AllSubjectsContactTimeDTOSchema = z.object({
  allItems: z.array(SubjectContactTimeDTOSchema),
});
export type AllSubjectsContactTimeDTO = z.infer<typeof AllSubjectsContactTimeDTOSchema>;