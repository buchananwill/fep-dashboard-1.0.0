import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import JsonTree from '@/components/generic/JsonTree';
import { ScheduleDto } from '@/api/zod-schemas/ScheduleDtoSchema';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { WorkProjectSeriesAssignmentsPage } from '@/components/work-project-series-assignments/table-view/WorkProjectSeriesAssignmentsPage';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';

export default async function TableViewFallbackPage({
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
