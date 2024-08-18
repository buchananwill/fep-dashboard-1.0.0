import { KnowledgeDomainDtoSchema } from './KnowledgeDomainDtoSchema';
import { ValidationTypeDtoSchema } from './ValidationTypeDtoSchema';
import { KnowledgeLevelDtoSchema } from './KnowledgeLevelDtoSchema';
import { z } from 'zod';
export const WorkTaskTypeDtoSchema = z.object({
  name: z.string(),
  id: z.number(),
  knowledgeLevelSeriesId: z.number(),
  shortCode: z.string(),
  knowledgeDomain: KnowledgeDomainDtoSchema,
  knowledgeLevel: KnowledgeLevelDtoSchema,
  validationType: ValidationTypeDtoSchema
});
export type WorkTaskTypeDto = z.infer<typeof WorkTaskTypeDtoSchema>;
