import { z } from 'zod';
export const WorkSeriesBundleItemDtoSchema = z.object({
  id: z.number(),
  priorityFactor: z.number(),
  workProjectSeriesSchemaId: z.string().uuid(),
  workSeriesSchemaBundleId: z.number(),
});
export type WorkSeriesBundleItemDto = z.infer<typeof WorkSeriesBundleItemDtoSchema>;