import { AutoBuildParametersDtoSchema } from './AutoBuildParametersDtoSchema';
import { z } from 'zod';
export const ScheduleParametersDtoSchema = z.object({
  autoBuildParametersDto: AutoBuildParametersDtoSchema,
  costParameters: z.array(z.string())
});
