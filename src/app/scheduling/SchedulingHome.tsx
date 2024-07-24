import { Api } from '@/api/clientApi_';
import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getPathVariableSplitComponent } from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import ScheduleFallbackPage from '@/app/scheduling/[scheduleId]/ScheduleFallbackPage';

export default async function SchedulingHome({}: LeafComponentProps) {
  const passingSchedules = await Api.Schedule.getDtoListByExampleList([
    { status: 'PASS' }
  ]);
  return (
    <>
      {passingSchedules.map((passingSchedule) => (
        <Link
          href={`/core/scheduling/work-project-series-assignments/${passingSchedule.id}`}
          key={passingSchedule.id}
        >
          <Button variant={'ghost'}>Schedule {passingSchedule.id}</Button>
        </Link>
      ))}
    </>
  );
}

export const SchedulingHomeRedirect = getPathVariableSplitComponent(
  SchedulingHome,
  ScheduleFallbackPage
);
