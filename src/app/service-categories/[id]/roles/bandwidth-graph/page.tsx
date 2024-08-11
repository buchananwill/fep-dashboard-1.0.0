import { constructUrl } from '@/api/actions/template-base-endpoints';
import { getWithoutBody } from '@/api/actions/template-actions';
import { ForceGraphPage } from 'react-d3-force-wrapper';
import { convertGraphDtoToReactFlowState } from '@/react-flow/utils/convertGraphDtoToReactFlowState';
import { convertToClassificationNode } from '@/react-flow/utils/adaptors';
import { ReactFlowWrapper } from '@/react-flow/components/wrappers/ReactFlowWrapper';
import { BandwidthLayoutFlowWithForces } from '@/components/react-flow/bi-partite-graph/BandwidthLayoutFlowWithForces';
import { DataFetchingEditDtoControllerArray } from 'dto-stores';
import { EmptyArray } from '@/api/literals';

import { EntityClassMap } from '@/api/entity-class-map';
import { ProjectionClassificationValidationGraph } from '@/app/service-categories/[id]/roles/bandwidth-graph/types';
import { Api } from '@/api/clientApi_';
import { bandwidthOptions } from '@/app/service-categories/[id]/roles/bandwidth-graph/bandwidthForceGraphOptions';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';

const graphUrl = constructUrl(
  '/api/v2/schedule/bandwidthGraph?providerRoleTypeId='
);

const projectionUrl = constructUrl('/api/v2/schedule/workTaskTypeProjection');

export default async function page({
  params: { roleTypeId, id }
}: {
  params: { id: string; roleTypeId: string };
}) {
  const {
    classificationGraph,
    validationTraversalMap
  }: ProjectionClassificationValidationGraph = await getWithoutBody(
    `${graphUrl}${roleTypeId}`
  );
  const workTaskTypeProjections: {
    workTaskTypeDto: WorkTaskTypeDto;
    totalTaskVolume: number;
    id: number;
  }[] = await getWithoutBody(projectionUrl);

  const { dataNodes, dataLinks } = convertGraphDtoToReactFlowState(
    classificationGraph,
    convertToClassificationNode
  );

  return (
    <ForceGraphPage
      dataNodes={dataNodes}
      dataLinks={dataLinks}
      graphName={'task-bandwidth-graph'}
      options={bandwidthOptions}
    >
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.WorkTaskType.getDtoListByBodyList}
        entityClass={EntityClassMap.workTaskType}
      />
      {/*<EditAddDeleteDtoControllerArray*/}
      {/*  entityClass={EntityClassMap.workTaskTypeProjection}*/}
      {/*  dtoList={workTaskTypeProjections}*/}
      {/*/>*/}
      {/*<EditAddDeleteDtoControllerArray*/}
      {/*  entityClass={EntityClassMap.bandwidthValidationTraversal}*/}
      {/*  dtoList={Object.values(validationTraversalMap)}*/}
      {/*/>*/}
      <ReactFlowWrapper>
        <BandwidthLayoutFlowWithForces></BandwidthLayoutFlowWithForces>
      </ReactFlowWrapper>
    </ForceGraphPage>
  );
}
