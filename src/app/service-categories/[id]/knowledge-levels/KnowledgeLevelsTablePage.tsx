import * as KnowledgeLevelClient from '@/api/generated-actions/KnowledgeLevel';
import { getOne } from '@/api/generated-actions/ServiceCategory';
import ResourceContextProvider from '@/components/providers/resource-context/ResourceContextProvider';
import { EntityClassMap } from '@/api/entity-class-map';
import KnowledgeLevelTable from '@/app/service-categories/[id]/knowledge-levels/_components/KnowledgeLevelTable';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { LeafComponentProps } from '@/app/core/navigation/types';
import PathVariableSplit from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import { ServiceCategoryLinks } from '@/app/service-categories/[id]/knowledge-domains/ServiceCategoryLinks';

async function KnowledgeLevelsTablePage({
  pathVariables,
  depth
}: LeafComponentProps) {
  const serviceCategoryId = pathVariables[depth - 1];
  const data = await KnowledgeLevelClient.getDtoListByExampleList([
    { serviceCategoryId: parseInt(serviceCategoryId) }
  ]);

  const serviceCategoryDto = await getOne(parseInt(serviceCategoryId));

  return (
    <div className={'p-4'}>
      <ResourceContextProvider pathSegment={serviceCategoryId}>
        <EditAddDeleteDtoControllerArray
          dtoList={data}
          entityClass={EntityClassMap.knowledgeLevel}
          updateServerAction={KnowledgeLevelClient.putList}
          deleteServerAction={KnowledgeLevelClient.deleteIdList}
          postServerAction={KnowledgeLevelClient.postList}
        />
        <KnowledgeLevelTable data={data} serviceCategory={serviceCategoryDto} />
      </ResourceContextProvider>
    </div>
  );
}

export default function KnowledgeLevelsHome(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      {...props}
      homeComponent={ServiceCategoryLinks}
      subRouteComponent={KnowledgeLevelsTablePage}
    />
  );
}
