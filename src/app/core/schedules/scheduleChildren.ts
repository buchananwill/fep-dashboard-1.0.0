import { WorkProjectSeriesAssignmentsPage } from '@/components/work-project-series-assignments/table-view/WorkProjectSeriesAssignmentsPage';
import { CalendarViewPageSplit } from '@/components/work-project-series-assignments/calendar-view/CalendarViewPage';
import {
  BuildMetricQueueTreeGraphFallback,
  BuildMetricTableFallback,
  WorkProjectSeriesMetricFallback
} from '@/app/core/schedules/build-metrics/BuildMetricListHome';

import { NavTreeChildren } from '@/app/core/navigation/data/types';

export const scheduleChildren: NavTreeChildren = {
  workProjectSeriesAssignments: {
    component: WorkProjectSeriesAssignmentsPage
  },
  calendarView: {
    component: CalendarViewPageSplit
  },
  buildMetricQueueTreeGraph: {
    component: BuildMetricQueueTreeGraphFallback
  },
  buildMetricTable: {
    component: BuildMetricTableFallback
  },
  workProjectSeriesMetrics: {
    component: WorkProjectSeriesMetricFallback
  }
} as const;
