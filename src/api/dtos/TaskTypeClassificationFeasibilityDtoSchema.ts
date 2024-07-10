import { TaskTypeClassificationDtoSchema } from '../generated-dtos/TaskTypeClassificationDtoSchema';
import { BandwidthFeasibilityLayerDtoSchema } from './BandwidthFeasibilityLayerDtoSchema';
import { z } from 'zod';
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
