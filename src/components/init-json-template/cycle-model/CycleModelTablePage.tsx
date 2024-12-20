import {
  CycleInitWithCycleSubspanDefinitions,
  CycleSubspanDefinitionDto
} from '@/api/generated-types/generated-types_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { IdWrapper } from '@/api/types';
import CycleSubspanDefinitionTable from '@/components/tables/edit-tables/CycleSubspanDefinitionTable';
import { InitJsonTemplatePageProps } from '@/components/init-json-template/dataTypes';

export function CycleModelTablePage({
  initJsonTemplate
}: InitJsonTemplatePageProps) {
  const { content } = initJsonTemplate;
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
