import { TaskTypeClassificationDtoSchema } from './TaskTypeClassificationDtoSchema';
import { NestedReportItemReportItem<?>Schema } from './NestedReportItemReportItem<?>Schema';
import { CycleSubspanGroupSnapshotDtoSchema } from './CycleSubspanGroupSnapshotDtoSchema';
import { z } from 'zod';
export const FullReportDtoSchema = z.object({
  creationTime: z.date(),
  id: z.number(),
  children: z.array(NestedReportItemReportItem<?>Schema),
  cycleId: z.number(),
  cycleSubspanCountSnapshot: z.number(),
  cycleSubspanGroupSnapshotDtoList: z.array(CycleSubspanGroupSnapshotDtoSchema),
  taskTypeClassifications: z.array(TaskTypeClassificationDtoSchema),
  passes: z.boolean(),
  reportStatus: z.string(),
});
export type FullReportDto = z.infer<typeof FullReportDtoSchema>;