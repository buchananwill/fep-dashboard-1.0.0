import { CycleSubspanGroupSnapshotDtoSchema } from './CycleSubspanGroupSnapshotDtoSchema';
import { z } from 'zod';
export const FeasibilityReportDtoSchema = z.object({
  creationTime: z.date(),
  id: z.number(),
  cycleId: z.number(),
  cycleSubspanCountSnapshot: z.number(),
  cycleSubspanGroupSnapshots: z.array(CycleSubspanGroupSnapshotDtoSchema),
  reportStatus: z.string(),
});
export type FeasibilityReportDto = z.infer<typeof FeasibilityReportDtoSchema>;