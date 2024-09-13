import { KnowledgeLevelDtoSchema } from './KnowledgeLevelDtoSchema';
import { z } from 'zod';
export const KnowledgeLevelSeriesDtoSchema = z.object({
  name: z.string(),
  id: z.number(),
  knowledgeLevelDescriptor: z.string(),
  knowledgeLevels: z.array(KnowledgeLevelDtoSchema),
});
export type KnowledgeLevelSeriesDto = z.infer<typeof KnowledgeLevelSeriesDtoSchema>;