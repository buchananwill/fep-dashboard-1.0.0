import {
  deleteIdList,
  getDtoListByExampleList,
  putList
} from '@/api/generated-actions/KnowledgeDomain';
import ResourceContextProvider from '@/components/providers/resource-context/ResourceContextProvider';
import { KnowledgeDomainTable } from '@/app/service-categories/[id]/knowledge-domains/components/KnowledgeDomainTable';
import { EntityClassMap } from '@/api/entity-class-map';
import { getOne } from '@/api/generated-actions/ServiceCategory';
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
          entityClass={EntityClassMap.knowledgeDomain}
          updateServerAction={putList}
          deleteServerAction={deleteIdList}
        />
        <KnowledgeDomainTable
          data={data}
          serviceCategory={serviceCategoryDto}
        />
      </ResourceContextProvider>
    </div>
  );
}
