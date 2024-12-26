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
import { StaticAllocationHome } from '@/components/work-project-series-schema/static-allocation/StaticAllocationPage';
import WorkTaskTypeTablePage from '@/components/work-task-types/pages/WorkTaskTypeTablePage';
import EnrollmentTablePage from '@/components/work-schema-node-assignments/enrollment-table/EnrollmentTablePage';
import CyclesHome from '@/app/core/cycles/CyclesHome';
import { rolePageTree } from '@/components/roles/rolePageTree';
import CreateWorkTaskTypeWithAuth from '@/components/work-task-types/CreateWorkTaskTypeWithAuth';
import { CreateUserRolePage } from '@/components/user-role/create-user-role/CreateUserRolePage';
import UserRoleTablePage from '@/components/user-role/table-page/UserRoleTablePage';
import { NavTreeNode } from '@/app/core/navigation/data/types';
import CreateSeriesFormPage from '@/components/knowledge-levels/createSeriesFormPage';

export const navTreeData: NavTreeNode = {
  component: NavigationHome,
  children: {
    navigation: { component: NavigationHome },
    cycles: { children: cyclesNavTree, component: CyclesHome },
    knowledgeDomains: {
      component: KnowledgeDomains
    },
    knowledgeLevelSeries: {
      component: KnowledgeLevelsHome,
      children: {
        createNewSeries: { component: CreateSeriesFormPage }
      }
    },
    workTaskTypes: {
      children: {
        create: { component: CreateWorkTaskTypeWithAuth }
      },
      component: WorkTaskTypeTablePage
    },
    workProjectSeriesSchemas: {
      children: {
        staticAllocations: { component: StaticAllocationHome }
      },
      component: WorkProjectSeriesSchemaHome
    },
    users: {
      component: UserRoleTablePage,
      children: {
        create: { component: CreateUserRolePage }
      }
    },
    providers: rolePageTree,
    assets: rolePageTree,
    carouselGroups: {
      children: {
        orders: { component: CarouselGroupOrdersHome }
      },
      component: CarouselGroupsAndOrders
    },
    workSchemaNodes: WorkSchemaNodeNavTree,
    organizations: { component: WorkSchemaNodeAssignmentsHome },
    workSchemaNodeAssignments: {
      component: WorkSchemaNodeAssignmentsHome,
      children: {
        enrollments: {
          component: EnrollmentTablePage
        }
      }
    },
    feasibility: feasibilityBranch,
    autoScheduling: { component: BuildSchedulePage },
    schedules: schedulesNavTree
  }
} as const;
