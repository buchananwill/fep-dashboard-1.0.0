import { KnowledgeDomainTable } from '@/components/knowledge-domains/KnowledgeDomainTable';
import { EntityClassMap } from '@/api/entity-class-map';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { LeafComponentProps } from '@/app/core/navigation/types';
import PathVariableSplit from '@/components/generic/PathVariableSplit';
import KnowledgeDomainSingle from '@/components/knowledge-domains/KnowledgeDomainSingle';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-levels/KnowledgeLevelSeriesLinks';
import { Api } from '@/api/clientApi_';

async function Home({ pathVariables, depth }: LeafComponentProps) {
  const knowledgeDomainList = await Api.KnowledgeDomain.getAll();

  return (
    <div className={'p-4'}>
      <EditAddDeleteDtoControllerArray
        dtoList={knowledgeDomainList}
        entityClass={EntityClassMap.knowledgeDomain}
        updateServerAction={Api.KnowledgeDomain.putList}
        deleteServerAction={Api.KnowledgeDomain.deleteIdList}
      />
      <KnowledgeDomainTable data={knowledgeDomainList} />
    </div>
  );
}

export function KnowledgeDomainsList(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      homeComponent={Home}
      subRouteComponent={KnowledgeDomainSingle}
      {...props}
    />
  );
}
