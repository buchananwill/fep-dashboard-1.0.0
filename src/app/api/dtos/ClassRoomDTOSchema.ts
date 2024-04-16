import { z } from 'zod';
export const ClassRoomDTOSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  floor: z.string(),
  building: z.string(),
});
export type ClassRoomDTO = z.infer<typeof ClassRoomDTOSchema>;