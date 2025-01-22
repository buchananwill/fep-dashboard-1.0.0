import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import JsonTree from '@/components/generic/JsonTree';
import { ScheduleDto } from '@/api/generated-types/generated-types_';
import { WorkProjectAssignmentsPage } from '@/components/work-project-assignments/table-view/WorkProjectAssignmentsPage';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

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
      <WorkProjectAssignmentsPage pathVariables={pathVariables} depth={depth} />
    );
}
