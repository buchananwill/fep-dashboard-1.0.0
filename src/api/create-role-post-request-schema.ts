import { z } from 'zod';
import { SuitabilityPostRequestSchema } from '@/api/zod-schemas/SuitabilityPostRequestSchema_';
import { AvailabilityPostRequestSchema } from '@/api/zod-schemas/AvailabilityPostRequestSchema_';

export function createRolePostRequestSchema<T extends z.ZodTypeAny>(
  dataSchema: T
) {
  return z.object({
    baseEntity: dataSchema,
    suitabilities: z
      .array(SuitabilityPostRequestSchema)
      .min(1, noElements('suitability')),
    availabilities: z
      .array(AvailabilityPostRequestSchema)
      .min(1, noElements('availability'))
  });
}

export function noElements(propertyName: string) {
  return `Please supply at least one ${propertyName}.`;
}
