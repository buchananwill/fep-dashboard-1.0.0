import { DayOfWeekArray } from '@/api/date-and-time';
import {
  mondayIsDayZero,
  toHHmmSS
} from '@/components/roles/create-role/RoleSubmissionHandler';

export function getDayAndTime(start: Date | null) {
  if (start === null) return 'No date provided';
  else {
    return `${DayOfWeekArray[mondayIsDayZero(start)]} ${toHHmmSS(start)}`;
  }
}