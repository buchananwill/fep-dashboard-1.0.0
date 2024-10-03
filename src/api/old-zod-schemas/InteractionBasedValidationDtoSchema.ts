import { InteractionBasedValidationDtoSchema } from '@/api/generated-schemas/schemas_';
import { z } from 'zod';

export type InteractionBasedValidationDto = z.infer<
  typeof InteractionBasedValidationDtoSchema
>;
