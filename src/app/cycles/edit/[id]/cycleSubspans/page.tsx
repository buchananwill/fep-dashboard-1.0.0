import { EntityClassMap } from '@/api/entity-class-map';
import { groupCycleSubspansByDay } from '@/app/cycles/_functions/groupCycleSubspansByDay';
import CycleViewer from '@/app/cycles/_components/CycleViewer';
import { getOne } from '@/app/api/generated-actions/Cycle';
import { getDtoListByExampleList } from '@/app/api/generated-actions/CycleSubspan';

const entityClass = EntityClassMap.cycleSubspan;

export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  const cycleId = parseInt(id);
  const cycle = await getOne(cycleId);

  return <CycleViewer cycle={cycle} />;
}
