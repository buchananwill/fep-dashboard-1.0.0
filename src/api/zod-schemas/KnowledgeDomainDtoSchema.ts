import { z } from 'zod';
export const KnowledgeDomainDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  shortCode: z.string(),
});
export type KnowledgeDomainDto = z.infer<typeof KnowledgeDomainDtoSchema>;