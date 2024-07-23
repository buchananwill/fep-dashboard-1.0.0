import { ForceGraphPage, GraphDto } from 'react-d3-force-wrapper';
import { ReactFlowWrapper } from '@/react-flow/components/wrappers/ReactFlowWrapper';
import { ClassHierarchyLayoutFlowWithForces } from '@/components/react-flow/organization/ClassHierarchyLayoutFlowWithForces';
import { EntityClassMap } from '@/api/entity-class-map';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema_';
import { getDtoListByBodyList as getSchemasByBodyList } from '@/api/generated-actions/WorkProjectSeriesSchema';

import { ArrayPlaceholder } from 'selective-context';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { getDtoListByExampleList } from '@/api/generated-actions/OrganizationType';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray
} from 'dto-stores';
import { convertGraphDtoToReactFlowState } from '@/react-flow/utils/convertGraphDtoToReactFlowState';
import {
  convertToOrganizationNode,
  convertToWorkSchemaFlowNode
} from '@/react-flow/utils/adaptors';
import { defaultForceGraphPageOptions } from '@/app/service-categories/[id]/[levelOrdinal]/work-schema-node-assignments/defaultForceGraphPageOptions';
import { Api } from '@/api/clientApi';
import WorkSchemaNodeManager from '@/app/service-categories/[id]/[levelOrdinal]/work-schema-node-assignments/_components/WorkSchemaNodeManager';
import { AllocationRollupEntityClass } from '@/components/react-flow/work-schema-node/WorkSchemaNodeLayoutFlowWithForces';
import { EmptyArray } from '@/api/literals';
import React from 'react';
import { LeafComponentProps } from '@/app/core/navTree';
import { getLastNVariables } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/WorkProjectSeriesSchemaLevelTable';
import { getPathVariableSplitComponent } from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import { ServiceCategoryLevelLinks } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/ServiceCategoryLevelLinks';
import { ServiceCategoryLinks } from '@/app/service-categories/[id]/knowledge-domains/ServiceCategoryLinks';

async function WorkSchemaNodeAssignmentsPage({
  pathVariables,
  depth
}: LeafComponentProps) {
  const [levelOrdinal] = getLastNVariables(pathVariables, 1);
  const [orgType] = await getDtoListByExampleList([
    { name: `Year ${levelOrdinal}` }
  ]);

  const workSchemaRootNodes = await Api.WorkSchemaNode.getRootNodeList();
  const rootNodeIdList = workSchemaRootNodes.map((node) => node.id);
  const graphList = await Promise.all(
    rootNodeIdList.map((rootNodeId) =>
      Api.WorkSchemaNode.getGraphByRootId({ rootId: rootNodeId }).then(
        (response) =>
          convertGraphDtoToReactFlowState(response, convertToWorkSchemaFlowNode)
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

  const classGraph = await getWithoutBody<GraphDto<OrganizationDto>>(
    constructUrl(
      `/api/v2/organizations/graphs/byOrganizationType/${orgType.id}`
    )
  );
  const { dataNodes, dataLinks } = convertGraphDtoToReactFlowState(
    classGraph,
    convertToOrganizationNode
  );

  return (
    <ForceGraphPage
      dataNodes={dataNodes}
      dataLinks={dataLinks}
      graphName={'bundle-assignments-graph'}
      options={defaultForceGraphPageOptions}
    >
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
      <EditAddDeleteDtoControllerArray
        entityClass={AllocationRollupEntityClass}
        dtoList={EmptyArray}
      />

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
  );
}

const AssignmentLevelLinks = getPathVariableSplitComponent(
  ServiceCategoryLevelLinks,
  WorkSchemaNodeAssignmentsPage
);
export const WorkSchemaNodeAssignmentsHome = getPathVariableSplitComponent(
  ServiceCategoryLinks,
  AssignmentLevelLinks
);