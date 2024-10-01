import { ForceGraphPage, GraphDto } from 'react-d3-force-wrapper';
import { ReactFlowWrapper } from '@/components/react-flow/generic/components/wrappers/ReactFlowWrapper';
import { ClassHierarchyLayoutFlowWithForces } from '@/components/react-flow/organization/ClassHierarchyLayoutFlowWithForces';
import { EntityClassMap } from '@/api/entity-class-map';
import { getDtoListByBodyList as getSchemasByBodyList } from '@/api/generated-actions/WorkProjectSeriesSchema';

import { ArrayPlaceholder } from 'selective-context';
import { getDtoListByExampleList } from '@/api/generated-actions/OrganizationType';
import { DataFetchingEditDtoControllerArray } from 'dto-stores';
import { convertGraphDtoToReactFlowState } from '@/components/react-flow/generic/utils/convertGraphDtoToReactFlowState';
import {
  convertToOrganizationNode,
  convertToWorkSchemaFlowNode,
  WorkSchemaNodeDto
} from '@/components/react-flow/generic/utils/adaptors';
import { defaultForceGraphPageOptions } from '@/components/work-schema-node-assignments/defaultForceGraphPageOptions';
import { Api } from '@/api/clientApi_';
import WorkSchemaNodeManager from '@/components/work-schema-node-assignments/_components/WorkSchemaNodeManager';
import { EmptyArray } from '@/api/literals';
import React from 'react';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import { KnowledgeLevelLinks } from '@/components/knowledge-levels/KnowledgeLevelLinks';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-levels/KnowledgeLevelSeriesLinks';
import { getLastNVariables } from '@/functions/getLastNVariables';

async function WorkSchemaNodeAssignmentsPage({
  pathVariables,
  depth
}: LeafComponentProps) {
  const [levelOrdinal] = getLastNVariables(pathVariables, 1);
  const [orgType] = await getDtoListByExampleList([
    // { name: `Year ${levelOrdinal}` }
    // { name: 'Class' },
    { name: 'Work Group' }
  ]);

  const orgList = await Api.Organization.getDtoListByExampleList([
    { type: { name: 'Work Group' } },
    { type: { name: 'Class' } }
  ]);

  const idList = orgList.map((org) => org.id);

  const workSchemaRootNodes = await Api.WorkSchemaNode.getRootNodeList();
  const rootNodeIdList = workSchemaRootNodes.map((node) => node.id);
  const graphList = await Promise.all(
    rootNodeIdList.map((rootNodeId) =>
      Api.WorkSchemaNode.getGraphByRootId({ rootId: rootNodeId }).then(
        (response) =>
          convertGraphDtoToReactFlowState(
            response as GraphDto<WorkSchemaNodeDto>,
            convertToWorkSchemaFlowNode
          )
      )
    )
  );

  const combinedGraphs = graphList.reduce(
    (prev, curr) => ({
      dataNodes: [...prev.dataNodes, ...curr.dataNodes],
      dataLinks: [...prev.dataLinks, ...curr.dataLinks]
    }),
    { dataNodes: [], dataLinks: [] }
  );

  const classesAndWorkGroups =
    await Api.Organization.getGraphByNodeList(idList);
  const { dataNodes, dataLinks } = convertGraphDtoToReactFlowState(
    classesAndWorkGroups, //classGraph,
    convertToOrganizationNode
  );

  return (
    <>
      <DataFetchingEditDtoControllerArray
        idList={rootNodeIdList}
        entityClass={EntityClassMap.workSchemaNode}
        getServerAction={Api.WorkSchemaNode.getDtoListByBodyList}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        entityClass={EntityClassMap.carouselOption}
        getServerAction={Api.CarouselOption.getDtoListByBodyList}
      />
      <DataFetchingEditDtoControllerArray
        idList={ArrayPlaceholder}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        getServerAction={getSchemasByBodyList}
      />

      <ForceGraphPage
        dataNodes={dataNodes}
        dataLinks={dataLinks}
        graphName={'work-schema-node-assignments-graph'}
        options={defaultForceGraphPageOptions}
      >
        <WorkSchemaNodeManager
          nodeList={combinedGraphs.dataNodes}
          linkList={combinedGraphs.dataLinks}
        />
        <ReactFlowWrapper>
          <ClassHierarchyLayoutFlowWithForces
            typeData={orgType}
          ></ClassHierarchyLayoutFlowWithForces>
        </ReactFlowWrapper>
      </ForceGraphPage>
    </>
  );
}

const AssignmentLevelLinks = getPathVariableSplitComponent(
  KnowledgeLevelLinks,
  WorkSchemaNodeAssignmentsPage
);
export const WorkSchemaNodeAssignmentsHome = getPathVariableSplitComponent(
  KnowledgeLevelSeriesLinks,
  AssignmentLevelLinks
);
