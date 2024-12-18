import { Api } from '@/api/clientApi_';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import TableViewFallbackPage from '@/components/work-project-series-assignments/table-view/TableViewFallbackPage';
import { LinkButton } from '@/components/navigation/LinkButton';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

export default async function WorkProjectSeriesAssignmentTableView({
  pathVariables
}: LeafComponentProps) {
  const passingSchedules = await Api.Schedule.getDtoListByExampleList([
    { status: 'PASS' }
  ]);
  if (passingSchedules.length === 0)
    return 'No successfully completed schedules available.';

  return (
    <div className={'p-4'}>
      <RootCard
        layoutId={getRootCardLayoutId(pathVariables)}
        displayHeader={'Completed Schedules'}
      >
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
      </RootCard>
    </div>
  );
}

export const SchedulesHomeRedirect = getPathVariableSplitComponent(
  WorkProjectSeriesAssignmentTableView,
  TableViewFallbackPage
);
