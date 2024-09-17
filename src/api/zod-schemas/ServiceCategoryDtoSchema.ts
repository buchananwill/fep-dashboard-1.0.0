import { z } from 'zod';
export const ServiceCategoryDtoSchema = z.object({
  name: z.string(),
  id: z.number(),
  knowledgeDomainDescriptor: z.string(),
  knowledgeLevelDescriptor: z.string(),
  knowledgeDomainIds: z.array(z.number()),
  knowledgeLevelIds: z.array(z.number())
});
