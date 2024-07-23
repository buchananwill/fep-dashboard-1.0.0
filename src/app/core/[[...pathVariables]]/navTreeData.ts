import { NavTree } from '@/app/core/navTree';
import { cyclesNavTree } from '@/app/cycles/cyclesNavTree';
import CyclesHome from '@/app/cycles/cyclesHome';
import { schedulingNavTree } from '@/app/scheduling/schedulingNavTree';
import { WorkSchemaNodeNavTree } from '@/app/service-categories/[id]/work-schema-nodes/workSchemaNodeNavTree';
import ServiceCategoriesHome from '@/app/service-categories/ServiceCategoriesHome';
import KnowledgeDomains from '@/app/service-categories/[id]/knowledge-domains/KnowledgeDomains';
import KnowledgeLevelsHome from '@/app/service-categories/[id]/knowledge-levels/KnowledgeLevelsTablePage';
import WorkTaskTypeHome from '@/app/service-categories/[id]/work-task-types/WorkTaskTypeTablePage';
import WorkProjectSeriesSchemaHome from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/WorkProjectSeriesSchemaLevelTable';
import {
  CarouselGroupHome,
  CarouselGroupsAndOrders
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/CarouselGroupLevelPage';
import { CarouselGroupOrdersHome } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/carouselGroupOrdersPage';

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
  workTaskType: { type: 'branch', children: {}, component: WorkTaskTypeHome },
  workProjectSeriesSchema: {
    type: 'branch',
    children: {},
    component: WorkProjectSeriesSchemaHome
  },
  workSchemaNodes: WorkSchemaNodeNavTree,
  workSchemaNodeAssignments: { type: 'branch', children: {} },
  users: { type: 'branch', children: {} },
  providers: { type: 'branch', children: {} },
  assets: { type: 'branch', children: {} },
  carouselGroups: {
    type: 'branch',
    children: { orders: { type: 'leaf', component: CarouselGroupOrdersHome } },
    component: CarouselGroupsAndOrders
  },
  navigation: { type: 'branch', children: {} }
};
