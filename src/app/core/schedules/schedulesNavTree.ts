import SchedulesHomePage from '@/components/work-project-series-assignments/SchedulesHomePage';
import { scheduleChildren } from '@/app/core/schedules/scheduleChildren';
import { NavTreeNode } from '@/app/core/navigation/data/types';

export const schedulesNavTree: NavTreeNode = {
  component: SchedulesHomePage,
  children: scheduleChildren
};
