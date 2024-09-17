import { z } from 'zod';
export const ClassificationDtoSchema = z.object({
  hashcode: z.number(),
  id: z.number(),
  type: z.string(),
  memberIdList: z.array(z.number()),
  classificationReferenceType: z.string(),
  classificationReferenceId: z.number(),
  bandwidth: z.number()
});
