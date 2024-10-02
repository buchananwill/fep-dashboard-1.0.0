import { NavTreeBranch } from '@/app/core/navigation/types';
import SchedulesHomePage from '@/components/work-project-series-assignments/SchedulesHomePage';
import { scheduleChildren } from '@/app/core/schedules/scheduleChildren';

export const schedulesNavTree: NavTreeBranch = {
  component: SchedulesHomePage,
  children: scheduleChildren
};
