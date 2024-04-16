import { z } from 'zod';
export const ComponentTypeDtoSchema = z.object({
  id: z.number(),
  typeCode: z.string(),
  name: z.string(),
  rootGraphId: z.number(),
  rootGraphName: z.string(),
});
export type ComponentTypeDto = z.infer<typeof ComponentTypeDtoSchema>;