import {
  getDtoListByBodyList,
  putList
} from '@/api/generated-actions/KnowledgeDomain';
import { getDtoListByBodyList as getServiceCategoryByIdList } from '@/api/generated-actions/ServiceCategory';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  DataFetchingEditDtoControllerArray,
  DtoControllerArray
} from 'dto-stores';
import KnowledgeDomainCard from '@/app/service-categories/[id]/knowledge-domains/_components/KnowledgeDomainCard';

import { EmptyArray } from '@/api/literals';

export default async function Page({
  params: { id, domainId }
}: {
  params: { id: string; domainId: string };
}) {
  const kDomainId = parseInt(domainId);
  // let kDomain = await getOne(parseInt(domainId));

  // const serviceCategory = await getOneServiceCategory(parseInt(id));

  return (
    <>
      <DataFetchingEditDtoControllerArray
        entityClass={EntityClassMap.knowledgeDomain}
        updateServerAction={putList}
        idList={[kDomainId]}
        getServerAction={getDtoListByBodyList}
      />
      <DataFetchingEditDtoControllerArray
        entityClass={EntityClassMap.serviceCategory}
        idList={EmptyArray}
        getServerAction={getServiceCategoryByIdList}
      />
      <KnowledgeDomainCard id={kDomainId} />
    </>
  );
}
