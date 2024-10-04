import { Api } from '@/api/clientApi_';
import { convertGraphDtoToReactFlowState } from '@/components/react-flow/generic/utils/convertGraphDtoToReactFlowState';
import {
  convertToWorkSchemaFlowNode,
  WorkSchemaNodeDto
} from '@/components/react-flow/generic/utils/adaptors';
import { workSchemaNodeForceGraphOptions } from '@/components/work-schema-nodes/workSchemaNodeForceGraphOptions';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import WorkSchemaNodeGraph from '@/components/work-schema-nodes/_components/WorkSchemaNodeGraph';
import { notFound } from 'next/navigation';
import { GraphDto } from 'react-d3-force-wrapper';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

export default async function WorkSchemaNodeRootGraph({
  pathVariables,
  depth
}: LeafComponentProps) {
  if (pathVariables.length > depth) notFound();
  const rootNodeId = pathVariables[depth - 1];
  const graphDto = await Api.WorkSchemaNode.getGraphByRootId({
    rootId: parseInt(rootNodeId, 10)
  });

  const flowData = convertGraphDtoToReactFlowState(
    graphDto as GraphDto<WorkSchemaNodeDto>,
    convertToWorkSchemaFlowNode
  );

  const schemas = await Api.WorkProjectSeriesSchema.getAll();

  const unassignedRootList = await getWithoutBody<WorkSchemaNodeDto[]>(
    constructUrl('/api/v2/workSchemaNodes/rootNodesWithNoAssignments')
  );

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
