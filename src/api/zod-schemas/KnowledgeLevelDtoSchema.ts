import { z } from 'zod';
export const KnowledgeLevelDtoSchema = z.object({
  name: z.string(),
  id: z.number(),
  levelOrdinal: z.number(),
  knowledgeLevelSeriesId: z.number(),
});
export type KnowledgeLevelDto = z.infer<typeof KnowledgeLevelDtoSchema>;