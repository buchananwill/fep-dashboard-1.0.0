import { z } from 'zod';
export const WorkSeriesBundleItemDtoSchema = z.object({
  id: z.number(),
  priorityFactor: z.number(),
  workProjectSeriesSchemaId: z.string().uuid(),
  workSeriesSchemaBundleId: z.string().uuid()
});
export type WorkSeriesBundleItemDto = z.infer<
  typeof WorkSeriesBundleItemDtoSchema
>;
