import { z } from 'zod';
export const CycleSubspanGroupSnapshotDtoSchema = z.object({
  id: z.number(),
  count: z.number(),
  size: z.number(),
  ownerId: z.number(),
  ownerType: z.string(),
});
export type CycleSubspanGroupSnapshotDto = z.infer<typeof CycleSubspanGroupSnapshotDtoSchema>;