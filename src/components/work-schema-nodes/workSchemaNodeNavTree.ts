import { NavTreeBranch } from '@/app/core/navigation/types';
import WorkSchemaNodesHome from '@/components/work-schema-nodes/WorkSchemaNodesHome';
import CreateWorkSchemaNode from '@/components/work-schema-nodes/create/CreateWorkSchemaNode';
import { SunburstChartHome } from '@/components/work-schema-nodes/nivo-sunburst-chart/view/NivoSunburstChartPage';
import CreateViaSunburst from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CreateViaSunburst';

export const WorkSchemaNodeNavTree: NavTreeBranch = {
  component: WorkSchemaNodesHome,
  type: 'branch',
  children: {
    create: { type: 'leaf', component: CreateWorkSchemaNode },
    sunburstChart: { type: 'leaf', component: SunburstChartHome },
    createViaSunburst: { type: 'leaf', component: CreateViaSunburst }
  }
};
