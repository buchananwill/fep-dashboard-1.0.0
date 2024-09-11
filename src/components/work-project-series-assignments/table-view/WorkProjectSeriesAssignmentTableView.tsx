import { Api } from '@/api/clientApi_';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import TableViewFallbackPage from '@/components/work-project-series-assignments/table-view/TableViewFallbackPage';
import { LinkButton } from '@/app/service-categories/LinkButton';

export default async function WorkProjectSeriesAssignmentTableView({}: LeafComponentProps) {
  const passingSchedules = await Api.Schedule.getDtoListByExampleList([
    { status: 'PASS' }
  ]);
  if (passingSchedules.length === 0)
    return 'No successfully completed schedules available.';

  return (
    <>
      <h1>Completed Schedules</h1>
      <div className={'flex flex-col'}>
        {passingSchedules.map((passingSchedule) => (
          <LinkButton
            href={`/core/schedules/work-project-series-assignments/${passingSchedule.id}`}
            key={passingSchedule.id}
          >
            Schedule {passingSchedule.id}
          </LinkButton>
        ))}
        <LinkButton href={'/core/schedules/build-metric-queue-tree-graph'}>
          Build Metrics
        </LinkButton>
      </div>
    </>
  );
}

export const SchedulesHomeRedirect = getPathVariableSplitComponent(
  WorkProjectSeriesAssignmentTableView,
  TableViewFallbackPage
);
