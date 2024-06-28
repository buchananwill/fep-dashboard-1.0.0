import { KnowledgeDomainDtoSchema } from './KnowledgeDomainDtoSchema';
import { z } from 'zod';
export const KnowledgeDomainWorkProjectionSchema = z.object({
  knowledgeDomainDto: KnowledgeDomainDtoSchema,
  totalWork: z.number(),
  minimumBandwidth: z.number(),
});
export type KnowledgeDomainWorkProjection = z.infer<typeof KnowledgeDomainWorkProjectionSchema>;