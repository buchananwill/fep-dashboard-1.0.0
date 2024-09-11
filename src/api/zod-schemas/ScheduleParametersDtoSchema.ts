import { AutoBuildParametersDtoSchema } from './AutoBuildParametersDtoSchema';
import { z } from 'zod';
export const ScheduleParametersDtoSchema = z.object({
  autoBuildParametersDto: AutoBuildParametersDtoSchema,
  costParameters: z.array(z.string()),
});
export type ScheduleParametersDto = z.infer<typeof ScheduleParametersDtoSchema>;