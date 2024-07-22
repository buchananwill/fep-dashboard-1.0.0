import { NavTreeBranch } from '@/app/core/navTree';
import WorkSchemaNodesHome from '@/app/service-categories/[id]/work-schema-nodes/WorkSchemaNodesHome';

export const WorkSchemaNodeNavTree: NavTreeBranch = {
  component: WorkSchemaNodesHome,
  type: 'branch',
  children: {}
};
