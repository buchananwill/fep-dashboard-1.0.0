import { KnowledgeDomainTable } from '@/components/tables/edit-tables/KnowledgeDomainTable';
import { EntityClassMap } from '@/api/entity-class-map';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';

export async function KnowledgeDomains({}: LeafComponentProps) {
  const knowledgeDomainList = await Api.KnowledgeDomain.getAll();

  return (
    <div className={'p-4'}>
      <EditAddDeleteDtoControllerArray
        dtoList={knowledgeDomainList}
        entityClass={EntityClassMap.knowledgeDomain}
        updateServerAction={Api.KnowledgeDomain.putList}
        deleteServerAction={Api.KnowledgeDomain.deleteIdList}
        postServerAction={Api.KnowledgeDomain.postList}
      />
      <KnowledgeDomainTable />
    </div>
  );
}
