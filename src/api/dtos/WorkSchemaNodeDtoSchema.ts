import { z } from 'zod';
export const WorkSchemaNodeDtoSchema = z.object({
  allowBundle: z.boolean({ message: 'allowBundle missing' }),
  preferCarousel: z.boolean({ message: 'preferCarousel missing' }),
  dominanceFactor: z.number({ message: 'dominanceFactor missing' }),
  priority: z.number({ message: 'priority missing' }),
  workSchemaNodeAssignmentIds: z.array(z.number()),
  carouselOptionId: z.number().optional(),
  id: z.number(),
  knowledgeDomainId: z.number().optional(),
  knowledgeLevelId: z.number().optional(),
  name: z.string().optional(),
  carouselGroupId: z.string().uuid().optional(),
  carouselId: z.string().uuid().optional(),
  workProjectSeriesSchemaId: z.string().uuid().optional()
});
export type WorkSchemaNodeDto = z.infer<typeof WorkSchemaNodeDtoSchema>;
