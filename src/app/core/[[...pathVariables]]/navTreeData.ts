import { NavTree } from '@/app/core/navTree';
import { cyclesNavTree } from '@/app/cycles/cyclesNavTree';
import CyclesHome from '@/app/cycles/cyclesHome';
import { schedulingNavTree } from '@/app/scheduling/schedulingNavTree';
import { WorkSchemaNodeNavTree } from '@/app/service-categories/[id]/work-schema-nodes/workSchemaNodeNavTree';

export const navTreeData: NavTree = {
  cycles: { type: 'branch', children: cyclesNavTree, component: CyclesHome },
  scheduling: schedulingNavTree,
  serviceCategories: { type: 'branch', children: {} },
  knowledgeDomains: { type: 'branch', children: {} },
  knowledgeLevels: { type: 'branch', children: {} },
  workTaskType: { type: 'branch', children: {} },
  workProjectSeriesSchema: { type: 'branch', children: {} },
  workSchemaNodes: WorkSchemaNodeNavTree,
  workSchemaNodeAssignments: { type: 'branch', children: {} },
  users: { type: 'branch', children: {} },
  providers: { type: 'branch', children: {} },
  assets: { type: 'branch', children: {} },
  carouselGroups: { type: 'branch', children: {} },
  navigation: { type: 'branch', children: {} }
};
