import { ForceGraphPage, GraphDto } from 'react-d3-force-wrapper';
import { ReactFlowWrapper } from '@/react-flow/components/wrappers/ReactFlowWrapper';
import { ClassHierarchyLayoutFlowWithForces } from '@/components/react-flow/organization/ClassHierarchyLayoutFlowWithForces';
import { EntityClassMap } from '@/api/entity-class-map';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';
import { getDtoListByExampleList as getBundleListByExampleList } from '@/api/generated-actions/WorkSeriesSchemaBundle';
import { getDtoListByBodyList as getSchemasByBodyList } from '@/api/generated-actions/WorkProjectSeriesSchema';

import { ArrayPlaceholder } from 'selective-context';
import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/serviceCategoryRouteParams';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { getDtoListByExampleList } from '@/api/generated-actions/OrganizationType';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray
} from 'dto-stores';
import { parseTen } from '@/api/date-and-time';
import { convertGraphDtoToReactFlowState } from '@/react-flow/utils/convertGraphDtoToReactFlowState';
import { convertToOrganizationNode } from '@/react-flow/utils/adaptors';
import { defaultForceGraphPageOptions } from '@/app/service-categories/[id]/[levelOrdinal]/bundle-assignments/defaultForceGraphPageOptions';
import { Api } from '@/api/clientApi';

export default async function Page({
  params: { levelOrdinal }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const [orgType] = await getDtoListByExampleList([
    { name: `Year ${levelOrdinal}` }
  ]);

  // const schemaBundles = await getBundleListByExampleList([
  //   { knowledgeLevel: { levelOrdinal: parseTen(levelOrdinal) } }
  // ]);

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
      {/*<EditAddDeleteDtoControllerArray*/}
      {/*  dtoList={schemaBundles}*/}
      {/*  entityClass={EntityClassMap.workSeriesSchemaBundle}*/}
      {/*/>*/}

      <DataFetchingEditDtoControllerArray
        idList={ArrayPlaceholder}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        getServerAction={getSchemasByBodyList}
      />
      <DataFetchingEditDtoControllerArray
        idList={ArrayPlaceholder}
        entityClass={EntityClassMap.workSchemaNode}
        getServerAction={Api.WorkSchemaNode.getDtoListByBodyList}
      />

      <ReactFlowWrapper>
        <ClassHierarchyLayoutFlowWithForces
          typeData={orgType}
        ></ClassHierarchyLayoutFlowWithForces>
      </ReactFlowWrapper>
    </ForceGraphPage>
  );
}
