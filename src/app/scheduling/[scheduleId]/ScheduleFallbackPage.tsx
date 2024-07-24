import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import JsonTree from '@/components/generic/JsonTree';
import { ScheduleDto } from '@/api/dtos/ScheduleDtoSchema';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/WorkProjectSeriesSchemaLevelTable';
import WorkProjectSeriesAssignmentsPage from '@/app/scheduling/[scheduleId]/work-project-series-assignments/WorkProjectSeriesAssignmentsPage';

export default async function ScheduleFallbackPage({
  pathVariables,
  depth
}: LeafComponentProps) {
  const [scheduleId] = getLastNVariables(pathVariables, 1);
  const schedule = await getWithoutBody<ScheduleDto>(
    constructUrl(`/api/v2/schedule/${scheduleId}`)
  );

  if (schedule.status === 'PENDING') return <JsonTree data={schedule} />;
  else
    return (
      <WorkProjectSeriesAssignmentsPage
        pathVariables={pathVariables}
        depth={depth}
      />
    );
}
