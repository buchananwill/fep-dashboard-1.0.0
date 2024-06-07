import { z } from 'zod';
import { isValid, parseISO } from 'date-fns';
import { DayOfWeekObject, REGEX_DATE, REGEX_TIME } from './date-and-time';
import { HasUuidDtoSchema } from './dtos/HasUuidDtoSchema';
import { HasNameDtoSchema } from './dtos/HasNameDtoSchema';

const days = DayOfWeekObject;

export const zDateOnly = z
  .string()
  .regex(REGEX_DATE)
  .refine((arg) => (isValid(parseISO(arg)) ? arg : false));

export const zTimeOnly = z.string().regex(REGEX_TIME);

export const zDayOfWeek = z
  .string()
  .refine((arg) => Object.keys(days).includes(arg));

const LessonCycleSchema = z.object({
  periodVenueAssignments: z.map(z.number(), z.string()),
  enrolledStudentIds: z.set(z.number()),
  assignedTeacherIds: z.set(z.number()),
  requiredNumberOfPeriods: z.number(),
  subject: z.string(),
  ...HasNameDtoSchema.shape,
  ...HasUuidDtoSchema.shape
});

export function createDataNodeDtoSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    id: z.number(),
    distanceFromRoot: z.number(),
    data: dataSchema // Use the passed schema here
  });
}

export { LessonCycleSchema };

export type LessonCycle = z.infer<typeof LessonCycleSchema>;
