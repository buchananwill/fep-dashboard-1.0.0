import { NavTreeBranch } from '@/app/core/navigation/types';
import WorkSchemaNodesHome from '@/components/work-schema-nodes/WorkSchemaNodesHome';
import CreateWorkSchemaNode from '@/components/work-schema-nodes/create/CreateWorkSchemaNode';
import { SunburstChartHome } from '@/components/work-schema-nodes/nivo-sunburst-chart/NivoSunburstChartPage';

export const WorkSchemaNodeNavTree: NavTreeBranch = {
  component: WorkSchemaNodesHome,
  type: 'branch',
  children: {
    create: { type: 'leaf', component: CreateWorkSchemaNode },
    sunburstChart: { type: 'leaf', component: SunburstChartHome }
  }
};
