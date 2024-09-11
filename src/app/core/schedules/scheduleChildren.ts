import { WorkProjectSeriesAssignmentsPage } from '@/components/work-project-series-assignments/table-view/WorkProjectSeriesAssignmentsPage';
import { CalendarViewPageSplit } from '@/components/work-project-series-assignments/calendar-view/CalendarViewPage';
import {
  BuildMetricQueueTreeGraphFallback,
  BuildMetricTableFallback,
  WorkProjectSeriesMetricFallback
} from '@/app/core/schedules/build-metrics/BuildMetricListHome';

export const scheduleChildren = {
  workProjectSeriesAssignments: {
    type: 'leaf',
    component: WorkProjectSeriesAssignmentsPage
  },
  calendarView: {
    type: 'leaf',
    component: CalendarViewPageSplit
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
} as const;
