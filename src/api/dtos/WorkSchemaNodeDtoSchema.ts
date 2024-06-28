import { z } from 'zod';
export const WorkSchemaNodeDtoSchema = z.object({
  workProjectSeriesSchemaId: z.string().uuid().optional(),
  id: z.number(),
  name: z.string().optional(),
  knowledgeLevelId: z.number().optional(),
  knowledgeDomainId: z.number().optional(),
  carouselId: z.string().uuid().optional(),
  carouselGroupId: z.string().uuid().optional(),
  workSchemaNodeAssignmentIds: z.array(z.number()),
  carouselOptionId: z.number().optional(),
  allowBundle: z.boolean(),
  priority: z.number(),
  dominanceFactor: z.number()
});
export type WorkSchemaNodeDto = z.infer<typeof WorkSchemaNodeDtoSchema>;
