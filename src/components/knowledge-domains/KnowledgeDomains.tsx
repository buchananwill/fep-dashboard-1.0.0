import { KnowledgeDomainTable } from '@/components/tables/edit-v2/KnowledgeDomainTable';
import { EntityClassMap } from '@/api/entity-class-map';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { Api } from '@/api/clientApi_';
import RootCard from '@/components/generic/RootCard';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import pluralize from 'pluralize';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { ScrollArea } from '@mantine/core';

export async function KnowledgeDomains({ pathVariables }: LeafComponentProps) {
  const knowledgeDomainList = await Api.KnowledgeDomain.getAll();

  return (
    <div className={'p-4'}>
      <RootCard
        layoutId={'/' + ['core', ...pathVariables].join('/')}
        displayHeader={pluralize(getStartCaseDomainAlias('knowledgeDomain'))}
        navigationType={'knowledgeDomains'}
      >
        <EditAddDeleteDtoControllerArray
          dtoList={knowledgeDomainList}
          entityClass={EntityClassMap.knowledgeDomain}
          updateServerAction={Api.KnowledgeDomain.putList}
          deleteServerAction={Api.KnowledgeDomain.deleteIdList}
          postServerAction={Api.KnowledgeDomain.postList}
        />
        <KnowledgeDomainTable />
      </RootCard>
    </div>
  );
}
