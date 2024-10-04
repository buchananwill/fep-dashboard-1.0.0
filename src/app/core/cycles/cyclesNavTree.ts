import CreatePage from '@/app/core/cycles/createPage';
import EditCycleSubspanGroups from '@/app/core/cycles/EditCycleSubspanGroups';
import EditCycleSubspans from '@/app/core/cycles/EditCycleSubspans';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import CyclesChooser from '@/app/core/cycles/cyclesChooser';
import { NavTreeChildren, NavTreeNode } from '@/app/core/navigation/data/types';

const editSubspans: NavTreeNode[] = (
  [EditCycleSubspans, EditCycleSubspanGroups] as const
).map((component) => {
  const pathVariableSplitComponent = getPathVariableSplitComponent(
    CyclesChooser,
    component
  );
  return { component: pathVariableSplitComponent };
});

export const cyclesNavTree: NavTreeChildren = {
  create: { component: CreatePage },
  edit: {
    children: {
      cycleSubspans: editSubspans[0],
      cycleSubspanGroups: editSubspans[1]
    }
  }
};
