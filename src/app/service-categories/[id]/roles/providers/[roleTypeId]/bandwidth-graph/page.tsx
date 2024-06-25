import { constructUrl } from '@/api/actions/template-base-endpoints';
import { getWithoutBody } from '@/api/actions/template-actions';
import {
  ForceGraphPage,
  ForceGraphPageOptions,
  GraphDto
} from 'react-d3-force-wrapper';
import { Classification } from '@/components/react-flow/bi-partite-graph/ClassificationNode';
import { convertGraphDtoToReactFlowState } from '@/react-flow/utils/convertGraphDtoToReactFlowState';
import { convertToClassificationNode } from '@/react-flow/utils/adaptors';
import { ReactFlowWrapper } from '@/react-flow/components/wrappers/ReactFlowWrapper';
import { defaultForceGraphPageOptions } from '@/app/service-categories/[id]/[levelOrdinal]/bundle-assignments/defaultForceGraphPageOptions';
import { BandwidthLayoutFlowWithForces } from '@/components/react-flow/bi-partite-graph/BandwidthLayoutFlowWithForces';

const url = constructUrl(
  '/api/v2/resourceMetrics/bandwidthGraph?providerRoleTypeId='
);

export default async function page({
  params: { roleTypeId, id }
}: {
  params: { id: string; roleTypeId: string };
}) {
  const bandwidthNetwork: GraphDto<Classification> = await getWithoutBody(
    `${url}${roleTypeId}`
  );

  const { dataNodes, dataLinks } = convertGraphDtoToReactFlowState(
    bandwidthNetwork,
    convertToClassificationNode
  );

  return (
    <ForceGraphPage
      dataNodes={dataNodes}
      dataLinks={dataLinks}
      graphName={'task-bandwidth-graph'}
      options={bandwidthOptions}
    >
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
