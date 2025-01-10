import {
  DateAsString,
  Serializable
} from '@/api/generated-types/generated-types_';
new Date('2000-01-01T00:00:00.000Z');
new Date('2000-01-03T00:00:00.000Z');
export const REGEX_TIME = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
export const REGEX_TIME_HH_MM = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const REGEX_DATE =
  /^(?:19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

export const parseTen = (stringNumber: string) => parseInt(stringNumber, 10);
export const DayOfWeekObject = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday'
} as const;
export const DayOfWeekArray = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
] as const;

// Create a type from the values of DayOfWeekArray
export type DayOfWeek = (typeof DayOfWeekArray)[number];
export interface DateAndTimeAndZoneDto extends Serializable {
  dateTime: DateAsString;
  date: DateAsString;
  timeZone: string;
}
