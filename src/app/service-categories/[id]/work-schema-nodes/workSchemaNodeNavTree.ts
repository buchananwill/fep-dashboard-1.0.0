import { NavTreeBranch } from '@/app/core/navigation/types';
import WorkSchemaNodesHome from '@/app/service-categories/[id]/work-schema-nodes/WorkSchemaNodesHome';
import CreateWorkSchemaNode from '@/app/service-categories/[id]/work-schema-nodes/create/CreateWorkSchemaNode';

export const WorkSchemaNodeNavTree: NavTreeBranch = {
  component: WorkSchemaNodesHome,
  type: 'branch',
  children: { create: { type: 'leaf', component: CreateWorkSchemaNode } }
};
