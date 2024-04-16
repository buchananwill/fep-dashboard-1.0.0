import { z } from 'zod';
export const ElectiveDTOSchema = z.object({
  id: z.number(),
  carouselOrdinal: z.number(),
  electiveOrdinal: z.number(),
  courseId: z.string(),
  name: z.string(),
  subscriberUserRoleIds: z.array(z.number())
});
export type ElectiveDTO = z.infer<typeof ElectiveDTOSchema>;
