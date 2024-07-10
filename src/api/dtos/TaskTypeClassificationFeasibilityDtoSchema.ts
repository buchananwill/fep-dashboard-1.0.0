import { BandwidthFeasibilityLayerDtoSchema } from './BandwidthFeasibilityLayerDtoSchema';
import { z } from 'zod';
import { TaskTypeClassificationDtoSchema } from '@/api/dtos/TaskTypeClassificationDtoSchema';
export const TaskTypeClassificationFeasibilityDtoSchema = z.object({
  id: z.number(),
  feasibilityReportId: z.number(),
  rootTaskTypeClassification: TaskTypeClassificationDtoSchema,
  bandwidthFeasibilityLayers: z.array(BandwidthFeasibilityLayerDtoSchema),
  passes: z.boolean()
});
export type TaskTypeClassificationFeasibilityDto = z.infer<
  typeof TaskTypeClassificationFeasibilityDtoSchema
>;
