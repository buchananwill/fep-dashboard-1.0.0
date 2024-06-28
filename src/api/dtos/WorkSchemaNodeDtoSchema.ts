import { z } from 'zod';
export const WorkSchemaNodeDtoSchema = z.object({
  workProjectSeriesSchemaId: z.string().uuid(),
  id: z.number(),
  name: z.string(),
  knowledgeLevelId: z.number(),
  knowledgeDomainId: z.number(),
  carouselId: z.string().uuid(),
  carouselGroupId: z.string().uuid(),
  workSchemaNodeAssignmentIds: z.array(z.number()),
  carouselOptionId: z.number(),
  allowBundle: z.boolean(),
  priority: z.number(),
  dominanceFactor: z.number(),
});
export type WorkSchemaNodeDto = z.infer<typeof WorkSchemaNodeDtoSchema>;