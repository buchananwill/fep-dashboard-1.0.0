import { NavTreeBranch } from '@/app/core/navigation/types';
import WorkProjectSeriesAssignmentsPage from '@/app/scheduling/[scheduleId]/work-project-series-assignments/WorkProjectSeriesAssignmentsPage';
import SchedulingHome from '@/app/scheduling/SchedulingHome';

export const schedulingNavTree: NavTreeBranch = {
  type: 'branch',
  component: SchedulingHome,
  children: {
    workProjectSeriesAssignments: {
      type: 'leaf',
      component: WorkProjectSeriesAssignmentsPage
    }
  }
};
