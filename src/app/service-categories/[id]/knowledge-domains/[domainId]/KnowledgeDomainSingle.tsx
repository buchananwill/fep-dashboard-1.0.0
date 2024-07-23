import {
  getDtoListByBodyList,
  putList
} from '@/api/generated-actions/KnowledgeDomain';
import { getDtoListByBodyList as getServiceCategoryByIdList } from '@/api/generated-actions/ServiceCategory';
import { EntityClassMap } from '@/api/entity-class-map';
import { DataFetchingEditDtoControllerArray } from 'dto-stores';
import KnowledgeDomainCard from '@/app/service-categories/[id]/knowledge-domains/_components/KnowledgeDomainCard';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { parseTen } from '@/api/date-and-time';

export default async function KnowledgeDomainSingle({
  pathVariables,
  depth
}: LeafComponentProps) {
  const kDomainId = parseTen(pathVariables[depth - 1]);

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
        idList={[parseTen(pathVariables[depth])]}
        getServerAction={getServiceCategoryByIdList}
      />
      <KnowledgeDomainCard id={kDomainId} />
    </>
  );
}
