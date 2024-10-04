import WorkSchemaNodesHome from '@/components/work-schema-nodes/WorkSchemaNodesHome';
import CreateWorkSchemaNode from '@/components/work-schema-nodes/create/CreateWorkSchemaNode';
import {
  SunburstChartByKnowledgeLevelSeries,
  SunburstChartByRootIdHome
} from '@/components/work-schema-nodes/nivo-sunburst-chart/view/NivoSunburstChartPage';
import CreateViaSunburst from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CreateViaSunburst';
import { NavTreeNode } from '@/app/core/navigation/data/types';

export const WorkSchemaNodeNavTree: NavTreeNode = {
  component: WorkSchemaNodesHome,
  children: {
    create: {
      component: CreateWorkSchemaNode
    },
    sunburstChart: {
      children: {
        byRootId: {
          component: SunburstChartByRootIdHome
        },
        byKnowledgeLevelSeries: {
          component: SunburstChartByKnowledgeLevelSeries
        }
      }
    },
    createViaSunburst: { component: CreateViaSunburst }
  }
};
