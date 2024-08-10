import { z } from 'zod';
export const SubjectContactTimeDTOSchema = z.object({
  subject: z.string(),
  periods: z.number(),
  teachers: z.number(),
  perTeacher: z.number(),
});
export type SubjectContactTimeDTO = z.infer<typeof SubjectContactTimeDTOSchema>;