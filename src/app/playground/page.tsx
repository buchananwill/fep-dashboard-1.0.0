import { ForceGraphPage, ForceGraphPageOptions } from 'react-d3-force-graph';
import { getGraphByRootId } from '@/api/generated-actions/Organization';
import {
  convertClosureDtoListToEdgeList,
  convertDataNodeDtoListToFlowNodeList
} from '@/react-flow/utils/adaptors';
import { ReactFlowWrapper } from '@/react-flow/components/wrappers/ReactFlowWrapper';
import { ClassHierarchyLayoutFlowWithForces } from '@/components/react-flow/organization/ClassHierarchyLayoutFlowWithForces';
import { getDtoListByExampleList as getBundlesByExampleList } from '@/api/generated-actions/WorkSeriesSchemaBundle';
import { DtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getDtoListByExampleList as getSchemasByExampleList } from '@/api/generated-actions/WorkProjectSeriesSchema';

export default async function Page() {
  const classGraph = await getGraphByRootId({ rootId: 1446 });
  const workSeriesSchemaBundleList = await getBundlesByExampleList([
    { knowledgeLevel: { levelOrdinal: 8 } }
  ]);

  const dataNodes = convertDataNodeDtoListToFlowNodeList(classGraph.nodes);
  const dataLinks = convertClosureDtoListToEdgeList(
    classGraph.closureDtos
  ).filter(
    (l) =>
      dataNodes.find((n) => l.target === n.id) &&
      dataNodes.find((n) => l.source === n.id)
  );

  return (
    <ForceGraphPage
      dataNodes={dataNodes}
      dataLinks={dataLinks}
      graphName={'test-graph'}
      options={defaultForceGraphPageOptions}
    >
      <DtoControllerArray
        dtoList={workSeriesSchemaBundleList}
        entityName={EntityClassMap.workSeriesSchemaBundle}
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
