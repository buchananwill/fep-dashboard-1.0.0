import { NavTree } from '@/app/core/navTree';
import CreatePage from '@/app/cycles/create/createPage';
import EditCycleSubspanGroups from '@/app/cycles/edit/[id]/cycleSubspanGroups/EditCycleSubspanGroups';
import EditCycleSubspans from '@/app/cycles/edit/[id]/cycleSubspans/EditCycleSubspans';

export const cyclesNavTree: NavTree = {
  create: { type: 'leaf', component: CreatePage },
  edit: {
    type: 'branch',
    children: {
      cycleSubspans: { type: 'leaf', component: EditCycleSubspans },
      cycleSubspanGroups: { type: 'leaf', component: EditCycleSubspanGroups }
    }
  }
};
