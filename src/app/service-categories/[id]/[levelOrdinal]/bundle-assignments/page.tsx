import {
  ForceGraphPage,
  ForceGraphPageOptions,
  GraphDto
} from 'react-d3-force-wrapper';
import {
  convertClosureDtoListToEdgeList,
  convertDataNodeDtoListToFlowNodeList
} from '@/react-flow/utils/adaptors';
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
import { getGraph } from '@/api/generated-actions/WorkTaskType';

export default async function Page({
  params: { levelOrdinal }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const [orgType] = await getDtoListByExampleList([
    { name: `Year ${levelOrdinal}` }
  ]);

  const schemaBundles = await getBundleListByExampleList([
    { knowledgeLevel: { levelOrdinal: parseTen(levelOrdinal) } }
  ]);

  const classGraph = await getWithoutBody<GraphDto<OrganizationDto>>(
    constructUrl(
      `/api/v2/organizations/graphs/byOrganizationType/${orgType.id}`
    )
  );
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

  return (
    <ForceGraphPage
      dataNodes={dataNodes}
      dataLinks={dataLinks}
      graphName={'test-graph'}
      options={defaultForceGraphPageOptions}
    >
      <EditAddDeleteDtoControllerArray
        dtoList={schemaBundles}
        entityClass={EntityClassMap.workSeriesSchemaBundle}
      />

      <DataFetchingEditDtoControllerArray
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
    linkStrength: 50,
    linkDistance: 150
  },
  forces: { manyBody: true, link: true, center: true, forceY: true }
};
