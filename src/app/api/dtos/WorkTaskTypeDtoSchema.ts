import { z } from 'zod';
export const WorkTaskTypeDtoSchema = z.object({
  serialVersionUID: z.number(),
  name: z.string(),
  id: z.number(),
  serviceCategoryId: z.number(),
  knowledgeDomainName: z.string(),
  knowledgeDomainId: z.number(),
  knowledgeLevelName: z.string(),
  knowledgeLevelLevelOrdinal: z.number(),
  knowledgeLevelId: z.number(),
  deliveryValidationTypeName: z.string(),
  deliveryValidationTypeId: z.number(),
});
export type WorkTaskTypeDto = z.infer<typeof WorkTaskTypeDtoSchema>;