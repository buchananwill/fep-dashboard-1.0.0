import {
  deleteIdList,
  getOne,
  putList
} from '@/api/generated-actions/KnowledgeDomain';
import { getOne as getOneServiceCategory } from '@/api/generated-actions/ServiceCategory';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  DtoControllerArray,
  EditAddDeleteDtoControllerArray
} from 'dto-stores';
import KnowledgeDomainCard from '@/app/service-categories/[id]/knowledge-domains/components/KnowledgeDomainCard';

export default async function Page({
  params: { id, domainId }
}: {
  params: { id: string; domainId: string };
}) {
  let kDomain = await getOne(parseInt(domainId));

  const serviceCategory = await getOneServiceCategory(parseInt(id));

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeDomain}
        dtoList={[kDomain]}
        updateServerAction={putList}
        deleteServerAction={deleteIdList}
      />
      <DtoControllerArray
        dtoList={[serviceCategory]}
        entityClass={EntityClassMap.serviceCategory}
      />
      <KnowledgeDomainCard id={kDomain.id} />
    </>
  );
}
