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
import { DataFetchingEditDtoControllerArray } from 'dto-stores';
import { convertGraphDtoToReactFlowState } from '@/react-flow/utils/convertGraphDtoToReactFlowState';
import {
  convertToOrganizationNode,
  convertToWorkSchemaFlowNode
} from '@/react-flow/utils/adaptors';
import { defaultForceGraphPageOptions } from '@/components/work-schema-node-assignments/defaultForceGraphPageOptions';
import { Api } from '@/api/clientApi_';
import WorkSchemaNodeManager from '@/components/work-schema-node-assignments/_components/WorkSchemaNodeManager';
import { EmptyArray } from '@/api/literals';
import React from 'react';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getPathVariableSplitComponent } from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import { ServiceCategoryLevelLinks } from '@/app/work-project-series-schemas/ServiceCategoryLevelLinks';
import { ServiceCategoryLinks } from '@/app/service-categories/[id]/knowledge-domains/ServiceCategoryLinks';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';

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
  ServiceCategoryLevelLinks,
  WorkSchemaNodeAssignmentsPage
);
export const WorkSchemaNodeAssignmentsHome = getPathVariableSplitComponent(
  ServiceCategoryLinks,
  AssignmentLevelLinks
);
