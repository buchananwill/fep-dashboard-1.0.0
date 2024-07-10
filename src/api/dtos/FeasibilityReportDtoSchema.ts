import { CycleSubspanGroupSnapshotDtoSchema } from '../generated-dtos/CycleSubspanGroupSnapshotDtoSchema';
import { z } from 'zod';
export const FeasibilityReportDtoSchema = z.object({
  creationTime: z.date(),
  id: z.number(),
  cycleId: z.number(),
  cycleSubspanCountSnapshot: z.number(),
  cycleSubspanGroupSnapshots: z.array(CycleSubspanGroupSnapshotDtoSchema)
});
export type FeasibilityReportDto = z.infer<typeof FeasibilityReportDtoSchema>;
