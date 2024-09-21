import { WorkTaskTypeListMatrixSchema } from './WorkTaskTypeListMatrixSchema_';
import { z } from 'zod';
import { noElements } from '@/api/create-role-post-request-schema';
export const SuitabilityPostRequestSchema = z.object({
  workTaskTypeMatrix: WorkTaskTypeListMatrixSchema,
  roleTypeNames: z.array(z.string()).min(1, noElements('role types')),
  rating: z.number().min(0).max(1)
});
