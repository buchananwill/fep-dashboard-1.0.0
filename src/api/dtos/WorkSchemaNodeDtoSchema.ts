import { z } from 'zod';
export const WorkSchemaNodeDtoSchema = z.object({
  allowBundle: z.boolean(),
  preferCarousel: z.boolean(),
  dominanceFactor: z.number(),
  priority: z.number(),
  workSchemaNodeAssignmentIds: z.array(z.number()),
  carouselOptionId: z.number(),
  id: z.number(),
  knowledgeDomainId: z.number(),
  knowledgeLevelId: z.number(),
  name: z.string(),
  carouselGroupId: z.string().uuid(),
  carouselId: z.string().uuid(),
  workProjectSeriesSchemaId: z.string().uuid(),
  resolutionMode: z.string(),
});
export type WorkSchemaNodeDto = z.infer<typeof WorkSchemaNodeDtoSchema>;