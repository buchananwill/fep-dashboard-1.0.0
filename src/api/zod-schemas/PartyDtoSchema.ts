import { z } from 'zod';
export const PartyDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  partyType: z.string(),
});
export type PartyDto = z.infer<typeof PartyDtoSchema>;