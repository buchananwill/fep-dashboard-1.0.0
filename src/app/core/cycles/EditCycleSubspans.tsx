import CycleViewer from '@/components/cycles/CycleViewer';
import { getOne } from '@/api/generated-actions/Cycle';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import CyclesChooser from '@/app/core/cycles/cyclesChooser';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

export default async function EditCycleSubspans({
  pathVariables,
  depth
}: LeafComponentProps) {
  const [cycleIdString] = getLastNVariables(pathVariables, 1);
  const cycleId = parseInt(cycleIdString);
  const cycle = await getOne(cycleId);

  return <CycleViewer cycle={cycle} />;
}
