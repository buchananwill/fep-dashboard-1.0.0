import { z } from 'zod';

export const AutoBuildParametersDtoSchema = z.object({
  multiStepUndoTimeoutMs: z
    .number()
    .min(1_000, 'Must be at least 1 second non-zero positive number')
    .max(60_000, 'Must be less than one minute'),
  multiUndoIncrement: z
    .number()
    .min(1, 'Must be a non-zero positive number')
    .max(10, 'Must be less than 10.'),
  saveBuild: z.boolean(),
  forceSaveMetrics: z.boolean()
});

export type AutoBuildParametersDto = z.infer<
  typeof AutoBuildParametersDtoSchema
>;
