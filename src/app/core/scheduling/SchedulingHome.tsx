import { Api } from '@/api/clientApi_';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getPathVariableSplitComponent } from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import ScheduleFallbackPage from '@/app/core/scheduling/ScheduleFallbackPage';
import { LinkButton } from '@/app/service-categories/LinkButton';

export default async function SchedulingHome({}: LeafComponentProps) {
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
            href={`/core/scheduling/work-project-series-assignments/${passingSchedule.id}`}
            key={passingSchedule.id}
          >
            Schedule {passingSchedule.id}
          </LinkButton>
        ))}
        <LinkButton href={'/core/scheduling/build-metric'}>
          Build Metrics
        </LinkButton>
      </div>
    </>
  );
}

export const SchedulingHomeRedirect = getPathVariableSplitComponent(
  SchedulingHome,
  ScheduleFallbackPage
);
