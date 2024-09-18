import { LeafComponentProps } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/literals';
import WorkTaskTypeMatrix from '@/components/work-task-types/WorkTaskTypeMatrix';
import FinderTableButton from '@/components/tables/FinderTableButton';

export default async function SuitabilityMatrixPage({}: LeafComponentProps) {
  const knowledgeDomainDtos = await Api.KnowledgeDomain.getAll();
  const knowledgeLevelSeriesDtos = await Api.KnowledgeLevelSeries.getAll();
  const initialKnowledgeLevels =
    knowledgeLevelSeriesDtos.length > 0
      ? knowledgeLevelSeriesDtos[0].knowledgeLevels
      : EmptyArray;

  return (
    <div className={'h-[100vh] w-[100vw] p-4'}>
      <FinderTableButton
        knowledgeDomain={knowledgeDomainDtos}
        knowledgeLevel={initialKnowledgeLevels}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeDomain}
        dtoList={knowledgeDomainDtos}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeLevelSeries}
        dtoList={knowledgeLevelSeriesDtos}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeLevel}
        dtoList={initialKnowledgeLevels}
      />
      <WorkTaskTypeMatrix />
    </div>
  );
}
