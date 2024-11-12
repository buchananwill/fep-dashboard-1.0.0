import { z } from 'zod';
import { isValid, parseISO } from 'date-fns';
import {
  DayOfWeekObject,
  REGEX_DATE,
  REGEX_TIME,
  REGEX_TIME_HH_MM
} from './date-and-time';

const days = DayOfWeekObject;

export const zDateOnly = z
  .string()
  .regex(REGEX_DATE)
  .refine((arg) => (isValid(parseISO(arg)) ? arg : false));

export const zTimeOnly = z.string().regex(REGEX_TIME);
export const zHHmmOnly = z.string().regex(REGEX_TIME_HH_MM, 'Format not valid');

export const zDayOfWeek = z
  .string()
  .refine((arg) => Object.keys(days).includes(arg));

export function createDataNodeDtoSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    id: z.number(),
    data: dataSchema // Use the passed schema here
  });
}
