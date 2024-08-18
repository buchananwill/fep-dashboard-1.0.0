import {
  getDtoListByBodyList,
  putList
} from '@/api/generated-actions/KnowledgeDomain';
import { EntityClassMap } from '@/api/entity-class-map';
import { DataFetchingEditDtoControllerArray } from 'dto-stores';
import KnowledgeDomainCard from '@/app/service-categories/[id]/knowledge-domains/_components/KnowledgeDomainCard';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { parseTen } from '@/api/date-and-time';
import { Api } from '@/api/clientApi_';

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
        entityClass={EntityClassMap.knowledgeLevelSeries}
        idList={[parseTen(pathVariables[depth])]}
        getServerAction={Api.KnowledgeLevelSeries.getDtoListByBodyList}
      />
      <KnowledgeDomainCard id={kDomainId} />
    </>
  );
}
