import { ElectivePreferenceDTOSchema } from './ElectivePreferenceDTOSchema';
import { ElectiveDTOSchema } from './ElectiveDTOSchema';
import { StudentDTOSchema } from './StudentDTOSchema';
import { z } from 'zod';
export const YearGroupWithElectivesDTOSchema = z.object({
  name: z.string(),
  id: z.string(),
  carouselRows: z.number(),
  carouselColumns: z.number(),
  studentDTOList: z.array(StudentDTOSchema),
  electiveDTOList: z.array(ElectiveDTOSchema),
  electivePreferenceDTOList: z.array(ElectivePreferenceDTOSchema),
});
export type YearGroupWithElectivesDTO = z.infer<typeof YearGroupWithElectivesDTOSchema>;