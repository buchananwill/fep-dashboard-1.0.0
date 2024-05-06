import { z } from 'zod';
export const KnowledgeDomainDtoSchema = z.object({
  id: z.number(),
  serviceCategoryId: z.number(),
  knowledgeDomainDescriptor: z.string(),
  name: z.string(),
  workTaskTypeCount: z.number(),
});
export type KnowledgeDomainDto = z.infer<typeof KnowledgeDomainDtoSchema>;