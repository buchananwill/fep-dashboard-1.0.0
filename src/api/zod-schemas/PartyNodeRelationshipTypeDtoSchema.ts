import { z } from 'zod';
export const PartyNodeRelationshipTypeDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  hierarchical: z.boolean()
});
