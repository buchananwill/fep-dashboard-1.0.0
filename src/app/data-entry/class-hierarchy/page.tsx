import { Api } from '@/api/clientApi';
import {
  OrganizationWorkHierarchyDto,
  WorkSchemaNodeManualDefinitionDto
} from '@/api/generated-types/generated-types';
import { IdWrapper } from '@/api/types';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSchemaNodeManualDefinitionTable } from '@/components/tables/edit-tables/WorkSchemaNodeManualDefinitionTable';

export default async function page() {
  const newVar = await Api.InitJsonTemplate.getOne(15);

  const { content } = newVar;
  const organizationWorkHierarchy = (
    JSON.parse(content) as OrganizationWorkHierarchyDto[]
  ).map(
    (dto) =>
      ({
        id: dto.name,
        data: dto
      }) as IdWrapper<OrganizationWorkHierarchyDto>
  );

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.organizationWorkHierarchy}
        dtoList={organizationWorkHierarchy}
      />

      <WorkSchemaNodeManualDefinitionTable
        pathVariables={['data-entry', 'work-schema-nodes']}
        depth={0}
      />
    </>
  );
}
