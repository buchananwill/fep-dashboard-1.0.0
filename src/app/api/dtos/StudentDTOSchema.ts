import { z } from 'zod';
export const StudentDTOSchema = z.object({
  id: z.number(),
  name: z.string(),
  yearGroup: z.number(),
});
export type StudentDTO = z.infer<typeof StudentDTOSchema>;