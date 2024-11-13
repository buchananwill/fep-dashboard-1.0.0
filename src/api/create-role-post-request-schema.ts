import { z } from 'zod';
import {
  AvailabilityPostRequestSchema,
  AvailabilitySummaryDtoSchema,
  SuitabilityPostRequestSchema,
  SuitabilitySummaryDtoSchema
} from '@/api/generated-schemas/schemas_';

export function createRolePostRequestSchema<T extends z.ZodTypeAny>(
  dataSchema: T
) {
  return z.object({
    baseEntity: dataSchema,
    roleDataMap: z.record(
      z.string(),
      z.object({
        suitabilities: z
          .array(SuitabilitySummaryDtoSchema)
          .min(1, noElements('suitability')),
        availabilities: z
          .array(AvailabilitySummaryDtoSchema)
          .min(1, noElements('availability'))
      })
    )
  });
}

export function noElements(propertyName: string) {
  return `Please supply at least one ${propertyName}.`;
}
