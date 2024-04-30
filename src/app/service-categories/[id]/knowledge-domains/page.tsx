import {
  deleteIdList,
  getDtoListByExampleList,
  putList
} from '@/app/api/generated-actions/KnowledgeDomain';
import ResourceContextProvider from '@/components/providers/resource-context/ResourceContextProvider';
import { KnowledgeDomainTable } from '@/app/service-categories/[id]/knowledge-domains/components/KnowledgeDomainTable';
import { EntityClassMap } from '@/app/api/entity-class-map';
import { DtoListChangesTracker } from '@/components/generic/DtoChangesTracker';
import { getOne } from '@/app/api/generated-actions/ServiceCategory';

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
          entityName={EntityClassMap.knowledgeDomain}
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
