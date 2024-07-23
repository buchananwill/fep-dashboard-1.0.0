import { Api } from '@/api/clientApi';
import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';
import { LeafComponentProps } from '@/app/core/navTree';

export default async function SchedulingHome({}: LeafComponentProps) {
  console.log('scheduling home');
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