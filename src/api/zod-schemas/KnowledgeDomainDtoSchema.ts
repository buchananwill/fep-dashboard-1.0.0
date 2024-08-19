import { z } from 'zod';
export const KnowledgeDomainDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  shortCode: z.string().length(2).optional()
});
export type KnowledgeDomainDto = z.infer<typeof KnowledgeDomainDtoSchema>;
