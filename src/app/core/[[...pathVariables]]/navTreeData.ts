import { NavTree } from '@/app/core/navTree';
import { cyclesNavTree } from '@/app/cycles/cyclesNavTree';
import CyclesHome from '@/app/cycles/cyclesHome';

export const navTreeData: NavTree = {
  cycles: { type: 'branch', children: cyclesNavTree, component: CyclesHome },
  scheduling: { type: 'branch', children: {} },
  serviceCategories: { type: 'branch', children: {} },
  knowledgeDomains: { type: 'branch', children: {} },
  knowledgeLevels: { type: 'branch', children: {} },
  workTaskType: { type: 'branch', children: {} },
  workProjectSeriesSchema: { type: 'branch', children: {} },
  workSchemaNodes: { type: 'branch', children: {} },
  workSchemaNodeAssignments: { type: 'branch', children: {} },
  users: { type: 'branch', children: {} },
  providers: { type: 'branch', children: {} },
  assets: { type: 'branch', children: {} },
  carouselGroups: { type: 'branch', children: {} },
  navigation: { type: 'branch', children: {} }
};
