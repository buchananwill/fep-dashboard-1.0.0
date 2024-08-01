import CycleViewer from '@/components/cycles/CycleViewer';
import { getOne } from '@/api/generated-actions/Cycle';
import { LeafComponentProps } from '@/app/core/navigation/types';

export default async function EditCycleSubspans({
  pathVariables,
  depth
}: LeafComponentProps) {
  const cycleId = parseInt(pathVariables[depth]);
  const cycle = await getOne(cycleId);

  return <CycleViewer cycle={cycle} />;
}
