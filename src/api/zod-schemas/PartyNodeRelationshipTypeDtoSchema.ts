import { z } from 'zod';
export const PartyNodeRelationshipTypeDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  hierarchical: z.boolean(),
});
export type PartyNodeRelationshipTypeDto = z.infer<typeof PartyNodeRelationshipTypeDtoSchema>;