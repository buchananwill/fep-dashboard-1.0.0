import { z } from 'zod';
export const TaskTypeClassificationItemDtoSchema = z.object({
  id: z.number(),
  taskTypeClassificationId: z.number(),
  workTaskTypeId: z.number(),
});
export type TaskTypeClassificationItemDto = z.infer<typeof TaskTypeClassificationItemDtoSchema>;