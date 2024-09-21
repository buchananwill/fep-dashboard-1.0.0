import { zDayOfWeek, zHHmmOnly } from '../zod-mods';
import { zTimeOnly } from '../zod-mods';
import { z } from 'zod';
import { noElements } from '@/api/create-role-post-request-schema';

const AvailabilityCodeSchema = z.enum(['NEVER', 'FALSE', 'MAYBE', 'TRUE']);

export const AvailabilityPostRequestSchema = z.object({
  day: zDayOfWeek,
  startTime: zHHmmOnly,
  endTime: zHHmmOnly,
  roleTypeNames: z
    .array(z.string())
    .min(1, 'Please provide exactly one role type')
    .max(1, 'Please provide exactly one role type'),
  availabilityCode: AvailabilityCodeSchema
});
