import { z } from 'zod';
export const LessonEnrollmentDTOSchema = z.object({
  id: z.number(),
  lessonCycleId: z.string(),
  periodId: z.number(),
  userRoleId: z.number(),
});
export type LessonEnrollmentDTO = z.infer<typeof LessonEnrollmentDTOSchema>;