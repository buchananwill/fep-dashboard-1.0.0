import { Api } from '@/api/clientApi';
import {
  CycleInitWithCycleSubspanDefinitions,
  CycleSubspanDefinitionDto
} from '@/api/generated-types/generated-types';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { IdWrapper } from '@/api/types';
import CycleSubspanDefinitionTable from '@/components/tables/edit-tables/CycleSubspanDefinitionTable';

export default async function Page() {
  const newVar = await Api.InitJsonTemplate.getOne(10);
  const { content } = newVar;
  const cycleDefinition: CycleInitWithCycleSubspanDefinitions =
    JSON.parse(content);

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycleSubspanDefinition}
        dtoList={cycleDefinition.cycleSubspanDefinitions.map(
          (csd, index) =>
            ({
              id: `${index}`,
              data: csd
            }) as IdWrapper<CycleSubspanDefinitionDto>
        )}
      />
      <CycleSubspanDefinitionTable
        pathVariables={['data-entry', 'cycle-model']}
        depth={0}
      />
    </>
  );
}
