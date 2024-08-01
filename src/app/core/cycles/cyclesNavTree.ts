import { NavTree } from '@/app/core/navigation/types';
import CreatePage from '@/app/core/cycles/createPage';
import EditCycleSubspanGroups from '@/app/core/cycles/EditCycleSubspanGroups';
import EditCycleSubspans from '@/app/core/cycles/EditCycleSubspans';

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
