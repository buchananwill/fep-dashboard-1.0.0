import { z } from 'zod';
export const ServiceCompetencyDtoSchema = z.object({
  id: z.number(),
  competencyRating: z.number(),
  serviceProductType: z.string(),
  serviceProductTypeId: z.number(),
});
export type ServiceCompetencyDto = z.infer<typeof ServiceCompetencyDtoSchema>;