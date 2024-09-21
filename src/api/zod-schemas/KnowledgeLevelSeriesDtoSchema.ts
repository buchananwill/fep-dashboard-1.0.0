import { KnowledgeLevelDtoSchema } from './KnowledgeLevelDtoSchema';
import { z } from 'zod';
export const KnowledgeLevelSeriesDtoSchema = z.object({
  name: z.string().optional(),
  id: z.number(),
  knowledgeLevelDescriptor: z.string().optional(),
  knowledgeLevels: z.array(KnowledgeLevelDtoSchema)
});
