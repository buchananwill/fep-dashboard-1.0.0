import { NavTree, NavTreeLeaf } from '@/app/core/navigation/types';
import CreatePage from '@/app/core/cycles/createPage';
import EditCycleSubspanGroups from '@/app/core/cycles/EditCycleSubspanGroups';
import EditCycleSubspans from '@/app/core/cycles/EditCycleSubspans';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import CyclesChooser from '@/app/core/cycles/cyclesChooser';

const editSubspans: NavTreeLeaf[] = (
  [EditCycleSubspans, EditCycleSubspanGroups] as const
).map((component) => {
  const pathVariableSplitComponent = getPathVariableSplitComponent(
    CyclesChooser,
    component
  );
  return { type: 'leaf', component: pathVariableSplitComponent };
});

export const cyclesNavTree: NavTree = {
  create: { type: 'leaf', component: CreatePage },
  edit: {
    type: 'branch',
    children: {
      cycleSubspans: editSubspans[0],
      cycleSubspanGroups: editSubspans[1]
    }
  }
};
