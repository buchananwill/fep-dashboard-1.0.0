import { WorkSeriesBundleItemDtoSchema } from './WorkSeriesBundleItemDtoSchema';
import { z } from 'zod';
export const WorkSeriesSchemaBundleDtoSchema = z.object({
  id: z.number(),
  workProjectSeriesSchemaIds: z.array(z.string()),
  workSeriesBundleItems: z.array(WorkSeriesBundleItemDtoSchema),
  knowledgeLevelName: z.string(),
  knowledgeLevelId: z.number(),
  knowledgeLevelLevelOrdinal: z.number(),
  name: z.string(),
});
export type WorkSeriesSchemaBundleDto = z.infer<typeof WorkSeriesSchemaBundleDtoSchema>;