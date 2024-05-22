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
import { getDtoListByBodyList as getSchemasByBodyList } from '@/api/generated-actions/WorkProjectSeriesSchema';
import { TrackChangesController } from 'dto-stores';
import { ArrayPlaceholder } from 'selective-context';
import { MasterChangesTrackWrapper } from '@/components/generic/DtoChangesTracker';
import { IdListDataFetchingController } from '@/components/generic/IdListDataFetchingController';

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

  const bundleAssignmentIdList = dataNodes.map(
    (d) => d.data.workSeriesBundleAssignmentId
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
      <MasterChangesTrackWrapper />
      <TrackChangesController
        idList={ArrayPlaceholder}
        entityClass={EntityClassMap.workSeriesBundleAssignment}
      />
      <IdListDataFetchingController
        idList={ArrayPlaceholder}
        entityClass={EntityClassMap.workSeriesBundleAssignment}
        getServerAction={getDtoListByBodyList}
      />
      <TrackChangesController
        idList={ArrayPlaceholder}
        entityClass={EntityClassMap.workProjectSeriesSchema}
      />
      <IdListDataFetchingController
        idList={ArrayPlaceholder}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        getServerAction={getSchemasByBodyList}
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
