import { NavTree } from '@/app/core/navTree';
import { cyclesNavTree } from '@/app/cycles/cyclesNavTree';
import CyclesHome from '@/app/cycles/cyclesHome';
import { schedulingNavTree } from '@/app/scheduling/schedulingNavTree';
import { WorkSchemaNodeNavTree } from '@/app/service-categories/[id]/work-schema-nodes/workSchemaNodeNavTree';
import ServiceCategoriesHome from '@/app/service-categories/ServiceCategoriesHome';
import KnowledgeDomains from '@/app/service-categories/[id]/knowledge-domains/KnowledgeDomains';
import KnowledgeLevelsHome from '@/app/service-categories/[id]/knowledge-levels/KnowledgeLevelsTablePage';

export const navTreeData: NavTree = {
  cycles: { type: 'branch', children: cyclesNavTree, component: CyclesHome },
  scheduling: schedulingNavTree,
  serviceCategories: {
    type: 'branch',
    children: {},
    component: ServiceCategoriesHome
  },
  knowledgeDomains: {
    type: 'branch',
    children: {},
    component: KnowledgeDomains
  },
  knowledgeLevels: {
    type: 'branch',
    children: {},
    component: KnowledgeLevelsHome
  },
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
