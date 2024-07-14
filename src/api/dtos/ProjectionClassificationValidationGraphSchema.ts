import { BlankNodeGraphSchema } from './BlankNodeGraphSchema';
import { BandwidthValidationTraversalSchema } from './BandwidthValidationTraversalSchema';
import { z } from 'zod';
export const ProjectionClassificationValidationGraphSchema = z.object({
  classificationGraph: BlankNodeGraphSchema,
  validationTraversalMap: z.record(z.number(), BandwidthValidationTraversalSchema),
});
export type ProjectionClassificationValidationGraph = z.infer<typeof ProjectionClassificationValidationGraphSchema>;