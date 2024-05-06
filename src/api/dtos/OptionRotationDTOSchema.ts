import { z } from 'zod';
export const OptionRotationDTOSchema = z.object({
  studentIdList: z.array(z.number()),
  carouselOptionIdList: z.array(z.number()),
  rotationDirection: z.number(),
});
export type OptionRotationDTO = z.infer<typeof OptionRotationDTOSchema>;