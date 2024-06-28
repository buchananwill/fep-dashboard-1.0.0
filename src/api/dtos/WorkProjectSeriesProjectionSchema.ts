import { WorkProjectSeriesSchemaDtoSchema } from './WorkProjectSeriesSchemaDtoSchema';
import { CarouselOptionDtoSchema } from './CarouselOptionDtoSchema';
import { WorkSchemaNodeDtoSchema } from './WorkSchemaNodeDtoSchema';
import { z } from 'zod';
export const WorkProjectSeriesProjectionSchema = z.object({
  workProjectSeriesSchema: WorkProjectSeriesSchemaDtoSchema,
  bundleItemDtoList: z.array(WorkSchemaNodeDtoSchema),
  bundleItemAssignmentMap: z.record(z.number(), z.number()),
  carouselOptionDtoList: z.array(CarouselOptionDtoSchema),
  carouselOrderItemAssigneeMap: z.record(z.number(), z.number()),
});
export type WorkProjectSeriesProjection = z.infer<typeof WorkProjectSeriesProjectionSchema>;