import { EntityClassMap } from '@/api/entity-class-map';
import CycleViewer from '@/app/cycles/_components/CycleViewer';
import { getOne } from '@/api/generated-actions/Cycle';
import { LeafComponentProps } from '@/app/core/navTree';

const entityClass = EntityClassMap.cycleSubspan;

export default async function EditCycleSubspans({
  pathVariables,
  depth
}: LeafComponentProps) {
  const cycleId = parseInt(pathVariables[depth]);
  const cycle = await getOne(cycleId);

  return <CycleViewer cycle={cycle} />;
}
