import { Api } from '@/api/clientApi';
import { ForceGraphPage } from 'react-d3-force-wrapper';
import { convertGraphDtoToReactFlowState } from '@/react-flow/utils/convertGraphDtoToReactFlowState';
import { convertToWorkSchemaFlowNode } from '@/react-flow/utils/adaptors';
import { ReactFlowWrapper } from '@/react-flow/components/wrappers/ReactFlowWrapper';
import { WorkSchemaNodeLayoutFlowWithForces } from '@/components/react-flow/work-schema-node/WorkSchemaNodeLayoutFlowWithForces';
import { bandwidthOptions } from '@/app/service-categories/[id]/roles/providers/[roleTypeId]/bandwidth-graph/bandwidthForceGraphOptions';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray,
  EmptyArray
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { workSchemaNodeForceGraphOptions } from '@/app/service-categories/[id]/work-schema-nodes/[rootNodeId]/workSchemaNodeForceGraphOptions';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import WorkSchemaNodeGraph from '@/app/service-categories/[id]/work-schema-nodes/_components/WorkSchemaNodeGraph';

export default async function page({
  params: { id, rootNodeId }
}: {
  params: { id: string; rootNodeId: string };
}) {
  const graphDto = await Api.WorkSchemaNode.getGraphByRootId({
    rootId: parseInt(rootNodeId, 10)
  });

  const flowData = convertGraphDtoToReactFlowState(
    graphDto,
    convertToWorkSchemaFlowNode
  );

  const schemas = await Api.WorkProjectSeriesSchema.getAll();

  const unassignedRootList = await getWithoutBody<WorkSchemaNodeDto[]>(
    constructUrl('/api/v2/workSchemaNode/rootNodesWithNoAssignments')
  );

  console.log();

  return (
    <WorkSchemaNodeGraph
      forceGraphPageProps={{
        ...flowData,
        graphName: 'workSchemaNode',
        options: workSchemaNodeForceGraphOptions
      }}
      schemas={schemas}
      unassignedRootList={unassignedRootList}
    />
  );
}
