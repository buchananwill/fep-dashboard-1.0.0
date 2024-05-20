import { ForceGraphPage, ForceGraphPageOptions } from 'react-d3-force-graph';
import {
  getGraph
  // getGraphByRootId
} from '@/api/generated-actions/WorkTaskType';
import {
  // getGraph,
  getGraphByRootId
} from '@/api/generated-actions/Organization';
import {
  convertClosureDtoListToEdgeList,
  convertDataNodeDtoListToFlowNodeList
} from '@/react-flow/utils/adaptors';
import { ReactFlowWrapper } from '@/react-flow/components/wrappers/ReactFlowWrapper';
import { ClassHierarchyLayoutFlowWithForces } from '@/components/react-flow/organization/ClassHierarchyLayoutFlowWithForces';

export default async function Page() {
  const graph = await getGraph();
  // const frenchGraph = await getGraphByRootId({ rootId: 30 });
  const classGraph = await getGraphByRootId({ rootId: 1446 });
  const dataNodes = convertDataNodeDtoListToFlowNodeList(classGraph.nodes);
  // .slice(0, 80);
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
