import { z } from 'zod';
import { TaskTypeClassificationDtoSchema } from '@/api/dtos/TaskTypeClassificationDtoSchema_';
import { CycleSubspanGroupSnapshotDtoSchema } from '@/api/dtos/CycleSubspanGroupSnapshotDtoSchema';

export const FeasibilityReportTreeItemBasePayloadSchema = z.object({
  itemType: z.string(),
  passes: z.boolean(),
  id: z.number()
});

export type FeasibilityReportTreeItemBase = z.infer<
  typeof FeasibilityReportTreeItemBasePayloadSchema
>;

export const NestedItemSchema =
  FeasibilityReportTreeItemBasePayloadSchema.extend({
    children: z.lazy(() => FeasibilityReportTreeItemBasePayloadSchema.array())
  });

export type NestedItem = z.infer<typeof NestedItemSchema>;

export const FullReportDtoSchema = z.object({
  creationTime: z.date(),
  id: z.number(),
  cycleId: z.number(),
  cycleSubspanCountSnapshot: z.number(),
  cycleSubspanGroupSnapshotDtoList: z.array(CycleSubspanGroupSnapshotDtoSchema),
  taskTypeClassifications: z.array(TaskTypeClassificationDtoSchema),
  passes: z.boolean()
});

export type FullReportDto = z.infer<typeof FullReportDtoSchema>;
