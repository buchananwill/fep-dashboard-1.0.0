import { ForceGraphPage, ForceGraphPageOptions } from 'react-d3-force-graph';
import { getGraphByRootId } from '@/api/generated-actions/Organization';
import {
  convertClosureDtoListToEdgeList,
  convertDataNodeDtoListToFlowNodeList
} from '@/react-flow/utils/adaptors';
import { ReactFlowWrapper } from '@/react-flow/components/wrappers/ReactFlowWrapper';
import { ClassHierarchyLayoutFlowWithForces } from '@/components/react-flow/organization/ClassHierarchyLayoutFlowWithForces';
import { EntityClassMap } from '@/api/entity-class-map';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';
import { getDtoListByBodyList } from '@/api/generated-actions/WorkSeriesBundleAssignment';
import { DtoControllerArrayChangesTracker } from '@/components/generic/DtoChangesTracker';
import { AllocationTotal } from '@/components/react-flow/organization/OrganizationNode';
import { DtoControllerArray } from 'dto-stores';

export default async function Page() {
  const classGraph = await getGraphByRootId({ rootId: 1446 });
  const dataNodes = convertDataNodeDtoListToFlowNodeList<OrganizationDto>(
    classGraph.nodes
  );
  const dataLinks = convertClosureDtoListToEdgeList(
    classGraph.closureDtos
  ).filter(
    (l) =>
      dataNodes.find((n) => l.target === n.id) &&
      dataNodes.find((n) => l.source === n.id)
  );

  const bundleAssignments = await getDtoListByBodyList(
    dataNodes.map((d) => d.data.workSeriesBundleAssignmentId)
  );

  return (
    <ForceGraphPage
      dataNodes={dataNodes}
      dataLinks={dataLinks}
      graphName={'test-graph'}
      options={defaultForceGraphPageOptions}
    >
      <DtoControllerArrayChangesTracker
        dtoList={bundleAssignments}
        entityName={EntityClassMap.workSeriesBundleAssignment}
      />

      <ReactFlowWrapper>
        <ClassHierarchyLayoutFlowWithForces></ClassHierarchyLayoutFlowWithForces>
      </ReactFlowWrapper>
    </ForceGraphPage>
  );
}

const defaultForceGraphPageOptions: ForceGraphPageOptions = {
  forceSlidersVisibleInitial: {
    manyBodyTheta: false,
    forceRadialXRelative: false,
    forceRadialYRelative: false,
    centerStrength: false
  },
  forceAttributesInitial: {
    forceYStrength: 50,
    linkStrength: 50
  },
  forces: { manyBody: true, link: true, center: true, forceY: true }
};
