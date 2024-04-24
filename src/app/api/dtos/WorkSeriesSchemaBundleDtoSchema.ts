import { KnowledgeLevelDtoSchema } from './KnowledgeLevelDtoSchema';
import { WorkSeriesBundleItemDtoSchema } from './WorkSeriesBundleItemDtoSchema';
import { z } from 'zod';
export const WorkSeriesSchemaBundleDtoSchema = z.object({
  id: z.number(),
  workProjectSeriesSchemaIds: z.array(z.string()),
  workSeriesBundleItems: z.array(WorkSeriesBundleItemDtoSchema),
  knowledgeLevel: KnowledgeLevelDtoSchema,
  name: z.string(),
});
export type WorkSeriesSchemaBundleDto = z.infer<typeof WorkSeriesSchemaBundleDtoSchema>;