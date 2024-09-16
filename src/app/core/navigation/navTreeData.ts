import { NavTree } from '@/app/core/navigation/types';
import { cyclesNavTree } from '@/app/core/cycles/cyclesNavTree';
import { schedulesNavTree } from '@/app/core/schedules/schedulesNavTree';
import { WorkSchemaNodeNavTree } from '@/components/work-schema-nodes/workSchemaNodeNavTree';
import { KnowledgeDomains } from '@/components/knowledge-domains/KnowledgeDomains';
import KnowledgeLevelsHome from '@/components/knowledge-levels/KnowledgeLevelsTablePage';
import WorkProjectSeriesSchemaHome from '@/components/work-project-series-schema/WorkProjectSeriesSchemaLevelPage';
import { CarouselGroupsAndOrders } from '@/components/carousel-groups/CarouselGroupLevelPage';
import { CarouselGroupOrdersHome } from '@/components/carousel-groups/orders/carouselGroupOrdersPage';
import { WorkSchemaNodeAssignmentsHome } from '@/components/work-schema-node-assignments/WorkSchemaNodeAssignmentsPage';
import NavigationHome from '@/app/core/navigation/NavigationHome';
import BuildSchedulePage from '@/app/core/auto-scheduling/BuildSchedulePage';
import { feasibilityBranch } from '@/app/core/feasibility/FeasibilityHome';
import { StaticAllocationPage } from '@/components/work-project-series-schema/static-allocation/StaticAllocationPage';
import WorkTaskTypeTablePage from '@/components/work-task-types/WorkTaskTypeTablePage';
import EnrollmentTablePage from '@/components/work-schema-node-assignments/enrollment-table/EnrollmentTablePage';
import CyclesHome from '@/app/core/cycles/CyclesHome';
import { rolePageTree } from '@/components/roles/rolePageTree';
import CreateWorkTaskTypeWithAuth from '@/components/work-task-types/CreateWorkTaskTypeWithAuth';

export const navTreeData: NavTree = {
  navigation: { type: 'leaf', component: NavigationHome },
  cycles: { type: 'branch', children: cyclesNavTree, component: CyclesHome },
  knowledgeDomains: {
    type: 'branch',
    children: {},
    component: KnowledgeDomains
  },
  knowledgeLevelSeries: {
    type: 'branch',
    children: {},
    component: KnowledgeLevelsHome
  },
  workTaskTypes: {
    type: 'branch',
    children: {
      create: { type: 'leaf', component: CreateWorkTaskTypeWithAuth }
    },
    component: WorkTaskTypeTablePage
  },
  workProjectSeriesSchemas: {
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
    type: 'branch',
    component: WorkSchemaNodeAssignmentsHome,
    children: {
      enrollments: {
        type: 'leaf',
        component: EnrollmentTablePage
      }
    }
  },
  feasibility: feasibilityBranch,
  autoScheduling: { type: 'leaf', component: BuildSchedulePage },
  schedules: schedulesNavTree
} as const;
