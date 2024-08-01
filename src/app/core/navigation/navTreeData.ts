import { NavTree } from '@/app/core/navigation/types';
import { cyclesNavTree } from '@/app/core/cycles/cyclesNavTree';
import CyclesHome from '@/app/core/cycles/cyclesHome';
import { schedulingNavTree } from '@/app/scheduling/schedulingNavTree';
import { WorkSchemaNodeNavTree } from '@/app/service-categories/[id]/work-schema-nodes/workSchemaNodeNavTree';
import ServiceCategoriesHome from '@/app/service-categories/ServiceCategoriesHome';
import KnowledgeDomains from '@/app/service-categories/[id]/knowledge-domains/KnowledgeDomains';
import KnowledgeLevelsHome from '@/app/service-categories/[id]/knowledge-levels/KnowledgeLevelsTablePage';
import WorkTaskTypeHome from '@/app/service-categories/[id]/work-task-types/WorkTaskTypeTablePage';
import WorkProjectSeriesSchemaHome from '@/app/work-project-series-schemas/WorkProjectSeriesSchemaLevelTable';
import { CarouselGroupsAndOrders } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/CarouselGroupLevelPage';
import { CarouselGroupOrdersHome } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/carouselGroupOrdersPage';
import { WorkSchemaNodeAssignmentsHome } from '@/app/service-categories/[id]/[levelOrdinal]/work-schema-node-assignments/WorkSchemaNodeAssignmentsPage';
import { rolePageTree } from '@/app/roles/rolePage';
import NavigationHome from '@/app/core/navigation/NavigationHome';
import CreateServiceCategoryPage from '@/app/service-categories/create/createServiceCategoryPage';
import BuildSchedulePage from '@/app/scheduling/build/BuildSchedulePage';
import { feasibilityBranch } from '@/app/scheduling/feasibility-report/FeasibilityHome';
import { StaticAllocationPage } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationPage';

export const navTreeData: NavTree = {
  navigation: { type: 'leaf', component: NavigationHome },
  cycles: { type: 'branch', children: cyclesNavTree, component: CyclesHome },
  serviceCategories: {
    type: 'branch',
    children: {
      create: { type: 'leaf', component: CreateServiceCategoryPage }
    },
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
    children: {
      staticAllocations: { type: 'leaf', component: StaticAllocationPage }
    },
    component: WorkProjectSeriesSchemaHome
  },
  users: rolePageTree,
  providers: rolePageTree,
  assets: rolePageTree,
  carouselGroups: {
    type: 'branch',
    children: { orders: { type: 'leaf', component: CarouselGroupOrdersHome } },
    component: CarouselGroupsAndOrders
  },
  workSchemaNodes: WorkSchemaNodeNavTree,
  workSchemaNodeAssignments: {
    type: 'leaf',
    component: WorkSchemaNodeAssignmentsHome
  },
  feasibility: feasibilityBranch,
  autoSchedule: { type: 'leaf', component: BuildSchedulePage },
  scheduling: schedulingNavTree
} as const;
