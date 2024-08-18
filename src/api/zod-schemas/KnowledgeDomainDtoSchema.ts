import { z } from 'zod';
export const KnowledgeDomainDtoSchema = z.object({
  id: z.number(),
  knowledgeLevelSeriesId: z.number(),
  knowledgeDomainDescriptor: z.string(),
  name: z.string()
});
export type KnowledgeDomainDto = z.infer<typeof KnowledgeDomainDtoSchema>;
