import { StudentDTOSchema } from './StudentDTOSchema';
import { z } from 'zod';
export const YearGroupDTOSchema = z.object({
  academicLevel: z.string(),
  studentDTOList: z.array(StudentDTOSchema),
});
export type YearGroupDTO = z.infer<typeof YearGroupDTOSchema>;