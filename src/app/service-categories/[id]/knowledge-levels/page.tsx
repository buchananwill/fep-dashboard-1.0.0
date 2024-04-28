import {
  deleteIdList,
  getDtoListByExampleList,
  putList
} from '@/app/api/generated-actions/KnowledgeLevel';
import { getOne } from '@/app/api/generated-actions/ServiceCategory';
import { MissingData } from '@/components/generic/MissingData';
import ResourceContextProvider from '@/components/providers/resource-context/ResourceContextProvider';
import { DtoListChangesTracker } from '@/components/generic/DtoChangesTracker';
import { EntityClassMap } from '@/app/api/entity-class-map';
import KnowledgeLevelTable from '@/app/service-categories/[id]/knowledge-levels/_components/KnowledgeLevelTable';

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
        <DtoListChangesTracker
          dtoList={data}
          entityName={EntityClassMap.knowledgeLevel}
          updateServerAction={putList}
          deleteServerAction={deleteIdList}
        />
        <KnowledgeLevelTable data={data} serviceCategory={serviceCategoryDto} />
      </ResourceContextProvider>
    </div>
  );
}
