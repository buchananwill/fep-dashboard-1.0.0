import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import JsonTree from '@/components/generic/JsonTree';
import { ScheduleDto } from '@/api/dtos/ScheduleDtoSchema';

export default async function page({
  params: { scheduleId }
}: {
  params: { scheduleId: string };
}) {
  const schedule = await getWithoutBody<ScheduleDto>(
    constructUrl(`/api/v2/schedule/${scheduleId}`)
  );

  return <JsonTree data={schedule} />;
}
