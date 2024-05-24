import { EntityClassMap } from '@/api/entity-class-map';
import CycleViewer from '@/app/cycles/_components/CycleViewer';
import { getOne } from '@/api/generated-actions/Cycle';

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
