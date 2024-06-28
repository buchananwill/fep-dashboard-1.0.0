import { Api } from '@/api/clientApi';
import { ForceGraphPage } from 'react-d3-force-wrapper';
import { convertGraphDtoToReactFlowState } from '@/react-flow/utils/convertGraphDtoToReactFlowState';
import { convertToWorkSchemaFlowNode } from '@/react-flow/utils/adaptors';
import { ReactFlowWrapper } from '@/react-flow/components/wrappers/ReactFlowWrapper';
import { WorkSchemaNodeLayoutFlowWithForces } from '@/components/react-flow/work-schema-node/WorkSchemaNodeLayoutFlowWithForces';
import { bandwidthOptions } from '@/app/service-categories/[id]/roles/providers/[roleTypeId]/bandwidth-graph/bandwidthForceGraphOptions';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';

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

  return (
    <ForceGraphPage
      {...flowData}
      graphName={'workSchemaNode'}
      options={bandwidthOptions}
    >
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workProjectSeriesSchema}
        dtoList={schemas}
      />
      <ReactFlowWrapper>
        <WorkSchemaNodeLayoutFlowWithForces></WorkSchemaNodeLayoutFlowWithForces>
      </ReactFlowWrapper>
    </ForceGraphPage>
  );
}
