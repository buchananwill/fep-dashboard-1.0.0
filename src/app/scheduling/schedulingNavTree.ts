import { NavTreeBranch } from '@/app/core/navigation/types';
import { WorkProjectSeriesAssignmentsPage } from '@/app/scheduling/[scheduleId]/work-project-series-assignments/WorkProjectSeriesAssignmentsPage';
import { SchedulingHomeRedirect } from '@/app/scheduling/SchedulingHome';
import BuildMetric from '@/app/scheduling/build-metrics/BuildMetric';

export const schedulingNavTree: NavTreeBranch = {
  type: 'branch',
  component: SchedulingHomeRedirect,
  children: {
    workProjectSeriesAssignments: {
      type: 'leaf',
      component: WorkProjectSeriesAssignmentsPage
    },
    buildMetric: {
      type: 'leaf',
      component: BuildMetric
    }
  }
};
