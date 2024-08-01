import { NavTreeBranch } from '@/app/core/navigation/types';
import { WorkProjectSeriesAssignmentsPage } from '@/components/work-project-series-assignments/WorkProjectSeriesAssignmentsPage';
import { SchedulingHomeRedirect } from '@/app/core/scheduling/SchedulingHome';
import BuildMetric from '@/app/core/scheduling/build-metrics/BuildMetric';
import { WorkProjectSeriesMetricsPage } from '@/components/work-project-series-metrics/WorkProjectSeriesMetrics';

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
    },
    workProjectSeriesMetrics: {
      type: 'leaf',
      component: WorkProjectSeriesMetricsPage
    }
  }
};
