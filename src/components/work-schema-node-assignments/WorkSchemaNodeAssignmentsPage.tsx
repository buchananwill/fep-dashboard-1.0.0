import { ForceGraphPage, ForceGraphPageOptions } from 'react-d3-force-wrapper';
import { ReactFlowWrapper } from '@/components/react-flow/generic/components/wrappers/ReactFlowWrapper';
import { ClassHierarchyLayoutFlowWithForces } from '@/components/react-flow/organization/components/ClassHierarchyLayoutFlowWithForces';
import { EntityClassMap } from '@/api/entity-class-map';
import { getDtoListByBodyList as getSchemasByBodyList } from '@/api/generated-actions/WorkSchema';

import { ArrayPlaceholder } from 'selective-context';
import { getDtoListByExampleList } from '@/api/generated-actions/OrganizationType';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray
} from 'dto-stores';
import { convertGraphDtoToReactFlowState } from '@/components/react-flow/generic/utils/convertGraphDtoToReactFlowState';
import { convertToOrganizationNode } from '@/components/react-flow/generic/utils/adaptors';
import { defaultForceGraphPageOptions } from '@/components/work-schema-node-assignments/defaultForceGraphPageOptions';
import { Api } from '@/api/clientApi_';
import React from 'react';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { getWorkSchemaNodeRollUps } from '@/api/actions-custom/workSchemaNodeRollUpsAction';
import { EdgeAnimationContextType } from '@/components/react-flow/generic/components/wrappers/edgeAnimationContext';
import { OrganizationTypeLinks } from '@/components/organizations/OrganizationTypeLinks';

export const workSchemaNodeRollUp = `${EntityClassMap.workSchemaNode}RollUp`;

async function WorkSchemaNodeAssignmentsPage({
  pathVariables,
  depth
}: LeafComponentProps) {
  const [typeName] = getLastNVariables(pathVariables, 1);
  const organizationTypeDtos = await getDtoListByExampleList([
    { name: typeName }
  ]);
  const [orgType] = organizationTypeDtos;

  const orgList = await Api.Organization.getDtoListByExampleList([
    ...organizationTypeDtos.map((typeDto) => ({ type: typeDto }))
  ]);

  const idList = orgList.map((org) => org.id);

  const classesAndWorkGroups =
    await Api.Organization.getGraphByNodeList(idList);
  const { dataNodes, dataLinks } = convertGraphDtoToReactFlowState(
    classesAndWorkGroups, //classGraph,
    convertToOrganizationNode
  );

  const deliveryAllocationRollupDtos = await getWorkSchemaNodeRollUps();

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={workSchemaNodeRollUp}
        dtoList={deliveryAllocationRollupDtos}
      />
      <DataFetchingEditDtoControllerArray
        idList={ArrayPlaceholder}
        entityClass={EntityClassMap.workSchema}
        getServerAction={getSchemasByBodyList}
      />
      <ForceGraphPage
        dataNodes={dataNodes}
        dataLinks={dataLinks}
        graphName={'work-schema-node-assignments-graph'}
        options={WorkSchemaNodeAssignmentsForceGraphDefaults}
      >
        <ReactFlowWrapper edgeAnimationContext={EdgeAnimation}>
          <ClassHierarchyLayoutFlowWithForces
            typeData={orgType}
          ></ClassHierarchyLayoutFlowWithForces>
        </ReactFlowWrapper>
      </ForceGraphPage>
    </>
  );
}

export const WorkSchemaNodeAssignmentsHome = getPathVariableSplitComponent(
  OrganizationTypeLinks,
  WorkSchemaNodeAssignmentsPage
);

const WorkSchemaNodeAssignmentsForceGraphDefaults: ForceGraphPageOptions = {
  ...defaultForceGraphPageOptions,
  forces: {
    custom: true
    // forceX: true,
    // forceY: true
  }
};

const EdgeAnimation: EdgeAnimationContextType = {
  direction: 'to-target'
};
