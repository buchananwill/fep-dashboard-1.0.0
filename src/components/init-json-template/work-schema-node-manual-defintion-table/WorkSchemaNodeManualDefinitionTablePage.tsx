import { WorkSchemaNodeManualDefinitionDto } from '@/api/generated-types/generated-types_';
import { IdWrapper } from '@/api/types';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSchemaNodeManualDefinitionTable } from '@/components/tables/edit-tables/WorkSchemaNodeManualDefinitionTable';
import { InitJsonTemplatePageProps } from '@/components/init-json-template/dataTypes';

export function WorkSchemaNodeManualDefinitionTablePage({
  initJsonTemplate
}: InitJsonTemplatePageProps) {
  const { content } = initJsonTemplate;
  const workSchemaNodeManualDefinitions = (
    JSON.parse(content) as WorkSchemaNodeManualDefinitionDto[]
  ).map(
    (dto) =>
      ({
        id: dto.name,
        data: dto
      }) as IdWrapper<WorkSchemaNodeManualDefinitionDto>
  );

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workSchemaNodeManualDefinition}
        dtoList={workSchemaNodeManualDefinitions}
      />

      <WorkSchemaNodeManualDefinitionTable
        pathVariables={['data-entry', 'work-schema-nodes']}
        depth={0}
      />
    </>
  );
}
