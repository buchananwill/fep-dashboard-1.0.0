import { NavTreeBranch } from '@/app/core/navigation/types';
import { WorkProjectSeriesAssignmentsPage } from '@/components/work-project-series-assignments/WorkProjectSeriesAssignmentsPage';
import { SchedulingHomeRedirect } from '@/app/core/scheduling/SchedulingHome';
import {
  BuildMetricQueueTreeGraphFallback,
  BuildMetricTableFallback,
  WorkProjectSeriesMetricFallback
} from '@/app/core/scheduling/build-metrics/BuildMetricListHome';
import BuildMetricTablePage from '@/app/core/scheduling/build-metrics/BuildMetricTablePage';

export const schedulingNavTree: NavTreeBranch = {
  type: 'branch',
  component: SchedulingHomeRedirect,
  children: {
    workProjectSeriesAssignments: {
      type: 'leaf',
      component: WorkProjectSeriesAssignmentsPage
    },
    buildMetricQueueTreeGraph: {
      type: 'leaf',
      component: BuildMetricQueueTreeGraphFallback
    },
    buildMetricTable: {
      type: 'leaf',
      component: BuildMetricTableFallback
    },
    workProjectSeriesMetrics: {
      type: 'leaf',
      component: WorkProjectSeriesMetricFallback
    }
  }
};
