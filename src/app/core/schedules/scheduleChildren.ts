import { WorkProjectAssignmentsPage } from '@/components/work-project-assignments/table-view/WorkProjectAssignmentsPage';
import { CalendarViewPageSplit } from '@/components/work-project-assignments/calendar-view/CalendarViewPage';
import {
  BuildMetricQueueTreeGraphFallback,
  BuildMetricTableFallback,
  WorkProjectMetricFallback
} from '@/app/core/schedules/build-metrics/BuildMetricListHome';

import { NavTreeChildren } from '@/app/core/navigation/data/types';

export const scheduleChildren: NavTreeChildren = {
  workProjectAssignments: {
    component: WorkProjectAssignmentsPage
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
  workProjectMetrics: {
    component: WorkProjectMetricFallback
  }
} as const;
