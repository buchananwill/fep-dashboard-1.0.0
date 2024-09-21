import { z } from 'zod';
import { KnowledgeLevelSeriesDtoSchema } from '@/api/zod-schemas/KnowledgeLevelSeriesDtoSchema';
import { KnowledgeDomainDtoSchema } from '@/api/zod-schemas/KnowledgeDomainDtoSchema';
import { noElements } from '@/api/create-role-post-request-schema';
import { getDomainAlias } from '@/api/getDomainAlias';
export const WorkTaskTypeListMatrixSchema = z.object({
  knowledgeLevelSeriesDtoList: z
    .array(KnowledgeLevelSeriesDtoSchema)
    .min(1, noElements(getDomainAlias('knowledgeLevel'))),
  knowledgeDomainDtoList: z
    .array(KnowledgeDomainDtoSchema)
    .min(1, noElements(getDomainAlias('knowledgeDomain'))),
  workTaskTypeNames: z.array(z.string()).min(1, noElements('task type'))
});
