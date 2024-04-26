import {
  deleteIdList,
  getOne,
  putList
} from '@/app/api/generated-actions/KnowledgeDomain';
import { getOne as getOneServiceCategory } from '@/app/api/generated-actions/ServiceCategory';
import { MissingData } from '@/components/generic/MissingData';
import DtoChangesTracker from '@/components/generic/DtoChangesTracker';
import { EntityClassMap } from '@/app/api/entity-class-map';

import { DtoController } from 'dto-stores/dist/controllers/DtoController';
import ServiceCategoryCard from '@/app/service-categories/components/ServiceCategoryCard';
import { DtoControllerArray } from 'dto-stores';
import KnowledgeDomainCard from '@/app/service-categories/[id]/knowledge-domains/components/KnowledgeDomainCard';

export default async function Page({
  params: { id, domainId }
}: {
  params: { id: string; domainId: string };
}) {
  let one = await getOne(parseInt(domainId));
  let actionResponse = await getOneServiceCategory(parseInt(id));

  const kDomain = one.data;

  const serviceCategory = actionResponse.data;

  if (kDomain === undefined) return <MissingData response={one} />;
  if (serviceCategory === undefined)
    return <MissingData response={actionResponse} />;

  return (
    <>
      <DtoControllerArray
        dtoList={[serviceCategory]}
        entityName={EntityClassMap.serviceCategory}
      />
      <DtoChangesTracker
        dtoList={[kDomain]}
        entityName={EntityClassMap.serviceCategory}
        updateServerAction={putList}
        deleteServerAction={deleteIdList}
      />
      <DtoController
        dto={kDomain}
        entityName={EntityClassMap.serviceCategory}
      />
      <KnowledgeDomainCard id={kDomain.id} />
    </>
  );
}
