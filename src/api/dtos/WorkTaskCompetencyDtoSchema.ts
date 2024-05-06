import { z } from 'zod';
export const WorkTaskCompetencyDtoSchema = z.object({
  id: z.number(),
  rating: z.number(),
  partyRoleId: z.number(),
  workTaskType: z.string(),
  workTaskTypeId: z.number(),
});
export type WorkTaskCompetencyDto = z.infer<typeof WorkTaskCompetencyDtoSchema>;