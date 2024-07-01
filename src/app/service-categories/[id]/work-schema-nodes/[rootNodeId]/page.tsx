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
      options={workSchemaNodeForceGraphOptions}
    >
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workProjectSeriesSchema}
        dtoList={schemas}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.CarouselOption.getDtoListByBodyList}
        entityClass={EntityClassMap.carouselOption}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.Carousel.getDtoListByBodyList}
        entityClass={EntityClassMap.carousel}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.CarouselGroup.getDtoListByBodyList}
        entityClass={EntityClassMap.carouselGroup}
      />
      <ReactFlowWrapper>
        <WorkSchemaNodeLayoutFlowWithForces></WorkSchemaNodeLayoutFlowWithForces>
      </ReactFlowWrapper>
    </ForceGraphPage>
  );
}
