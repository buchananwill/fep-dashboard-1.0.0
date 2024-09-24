import { z } from 'zod';
export const CycleSubspanGroupSnapshotDtoSchema = z.object({
  id: z.number(),
  count: z.number(),
  size: z.number(),
  ownerId: z.number(),
  ownerType: z.string(),
  residual: z.number(),
});
export type CycleSubspanGroupSnapshotDto = z.infer<typeof CycleSubspanGroupSnapshotDtoSchema>;