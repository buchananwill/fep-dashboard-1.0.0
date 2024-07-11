import { z } from 'zod';
export const ElectivePreferenceDTOSchema = z.object({
  userRoleId: z.number(),
  courseName: z.string(),
  courseId: z.string(),
  preferencePosition: z.number(),
  assignedCarouselOptionId: z.number(),
  active: z.boolean(),
});
export type ElectivePreferenceDTO = z.infer<typeof ElectivePreferenceDTOSchema>;