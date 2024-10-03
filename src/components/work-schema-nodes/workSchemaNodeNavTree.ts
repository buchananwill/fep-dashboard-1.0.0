import { NavTreeNode } from '@/app/core/navigation/types';
import WorkSchemaNodesHome from '@/components/work-schema-nodes/WorkSchemaNodesHome';
import CreateWorkSchemaNode from '@/components/work-schema-nodes/create/CreateWorkSchemaNode';
import { SunburstChartHome } from '@/components/work-schema-nodes/nivo-sunburst-chart/view/NivoSunburstChartPage';
import CreateViaSunburst from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CreateViaSunburst';

export const WorkSchemaNodeNavTree: NavTreeNode = {
  component: WorkSchemaNodesHome,
  children: {
    create: {
      component: CreateWorkSchemaNode
    },
    sunburstChart: { component: SunburstChartHome },
    createViaSunburst: { component: CreateViaSunburst }
  }
};
