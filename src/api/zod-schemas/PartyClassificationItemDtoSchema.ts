import { z } from 'zod';
export const PartyClassificationItemDtoSchema = z.object({
  id: z.number(),
  taskTypeClassificationId: z.number(),
  partyId: z.number(),
});
export type PartyClassificationItemDto = z.infer<typeof PartyClassificationItemDtoSchema>;