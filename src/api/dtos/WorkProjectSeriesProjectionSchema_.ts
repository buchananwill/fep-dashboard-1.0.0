import { CarouselOptionDtoSchema } from './CarouselOptionDtoSchema';
import { WorkSchemaNodeDtoSchema } from './WorkSchemaNodeDtoSchema_';
import { z } from 'zod';
import { WorkProjectSeriesSchemaDtoSchema } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
export const WorkProjectSeriesProjectionSchema = z.object({
  workProjectSeriesSchema: WorkProjectSeriesSchemaDtoSchema,
  bundleItemDtoList: z.array(WorkSchemaNodeDtoSchema),
  bundleItemAssignmentMap: z.record(z.number(), z.number()),
  carouselOptionDtoList: z.array(CarouselOptionDtoSchema),
  carouselOrderItemAssigneeMap: z.record(z.number(), z.number())
});
export type WorkProjectSeriesProjection = z.infer<
  typeof WorkProjectSeriesProjectionSchema
>;
