// Define the schema with cleaning and specific error messages
import { z } from 'zod';

export const schemaNameSchema = z
  .string()
  .max(63, { message: 'Schema name must be 63 characters or fewer' })
  .regex(/^[A-Za-z0-9_]*$/, {
    message: 'Schema name can only contain letters, numbers, and underscores'
  })
  .refine((val) => val.startsWith('org_'), {
    message: "Schema name must start with 'org_'"
  });
