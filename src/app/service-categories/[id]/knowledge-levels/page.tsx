import {
  deleteIdList,
  getDtoListByExampleList,
  putList
} from '@/api/generated-actions/KnowledgeLevel';
import { getOne } from '@/api/generated-actions/ServiceCategory';
import ResourceContextProvider from '@/components/providers/resource-context/ResourceContextProvider';
import { EntityClassMap } from '@/api/entity-class-map';
import KnowledgeLevelTable from '@/app/service-categories/[id]/knowledge-levels/_components/KnowledgeLevelTable';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';

export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  const data = await getDtoListByExampleList([
    { serviceCategoryId: parseInt(id) }
  ]);

  const serviceCategoryDto = await getOne(parseInt(id));

  return (
    <div className={'p-4'}>
      <ResourceContextProvider pathSegment={id}>
        <EditAddDeleteDtoControllerArray
          dtoList={data}
          entityClass={EntityClassMap.knowledgeLevel}
          updateServerAction={putList}
          deleteServerAction={deleteIdList}
        />
        <KnowledgeLevelTable data={data} serviceCategory={serviceCategoryDto} />
      </ResourceContextProvider>
    </div>
  );
}
