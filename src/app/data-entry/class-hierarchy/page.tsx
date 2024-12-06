import { Api } from '@/api/clientApi';
import {
  OrganizationWorkHierarchyDto,
  WorkSchemaNodeManualDefinitionDto
} from '@/api/generated-types/generated-types_';
import { IdWrapper } from '@/api/types';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSchemaNodeManualDefinitionTable } from '@/components/tables/edit-tables/WorkSchemaNodeManualDefinitionTable';
import { OrganizationWorkHierarchyTable } from '@/components/tables/edit-tables/OrganizationWorkHierarchyTable';

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

      <OrganizationWorkHierarchyTable
        pathVariables={['data-entry', 'class-hierarchy']}
        depth={0}
      />
    </>
  );
}
