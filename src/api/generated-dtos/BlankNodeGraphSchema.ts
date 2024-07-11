import { ClosureDtoSchema } from './ClosureDtoSchema';
import { NodeDtoSchema } from './NodeDtoSchema';
import { z } from 'zod';
export const BlankNodeGraphSchema = z.object({
  nodes: z.array(NodeDtoSchema),
  closureDtos: z.array(ClosureDtoSchema),
});
export type BlankNodeGraph = z.infer<typeof BlankNodeGraphSchema>;