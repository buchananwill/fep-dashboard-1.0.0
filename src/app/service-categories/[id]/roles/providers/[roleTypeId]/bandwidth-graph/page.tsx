import { constructUrl } from '@/api/actions/template-base-endpoints';
import { getWithoutBody } from '@/api/actions/template-actions';
import { ForceGraphPage, ForceGraphPageOptions } from 'react-d3-force-wrapper';
import { convertGraphDtoToReactFlowState } from '@/react-flow/utils/convertGraphDtoToReactFlowState';
import { convertToClassificationNode } from '@/react-flow/utils/adaptors';
import { ReactFlowWrapper } from '@/react-flow/components/wrappers/ReactFlowWrapper';
import { defaultForceGraphPageOptions } from '@/app/service-categories/[id]/[levelOrdinal]/bundle-assignments/defaultForceGraphPageOptions';
import { BandwidthLayoutFlowWithForces } from '@/components/react-flow/bi-partite-graph/BandwidthLayoutFlowWithForces';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray
} from 'dto-stores';
import { EmptyArray } from '@/api/literals';

import { EntityClassMap } from '@/api/entity-class-map';
import { ProjectionClassificationValidationGraph } from '@/app/service-categories/[id]/roles/providers/[roleTypeId]/bandwidth-graph/types';
import { Api } from '@/api/clientApi';

const graphUrl = constructUrl(
  '/api/v2/resourceMetrics/bandwidthGraph?providerRoleTypeId='
);

const projectionUrl = constructUrl(
  '/api/v2/resourceMetrics/workTaskTypeProjection'
);

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
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workTaskTypeProjection}
        dtoList={workTaskTypeProjections}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.bandwidthValidationTraversal}
        dtoList={Object.values(validationTraversalMap)}
      />
      <ReactFlowWrapper>
        <BandwidthLayoutFlowWithForces></BandwidthLayoutFlowWithForces>
      </ReactFlowWrapper>
    </ForceGraphPage>
  );
}

const bandwidthOptions: ForceGraphPageOptions = {
  ...defaultForceGraphPageOptions,
  forces: {
    link: true,
    manyBody: true,
    forceY: true
  },
  forceAttributesInitial: {
    collideStrength: 10,
    linkDistance: 70,
    linkStrength: 25,
    manyBodyStrength: 134,
    manyBodyMinDistance: 1,
    manyBodyMaxDistance: 90,
    forceXStrength: 0,
    forceYStrength: 106,
    forceYSpacing: 87
  },
  normalizationCoefficients: {
    forceYSpacing: 1000,
    manyBodyMaxDistance: 10
  }
};
