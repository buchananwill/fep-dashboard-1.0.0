import { OrganizationWorkHierarchyDto } from '@/api/generated-types/generated-types_';
import { IdWrapper } from '@/api/types';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { OrganizationWorkHierarchyTable } from '@/components/tables/edit-tables/OrganizationWorkHierarchyTable';
import { InitJsonTemplatePageProps } from '@/components/init-json-template/dataTypes';

export function OrganizationWorkHierarchyTablePage({
  initJsonTemplate
}: InitJsonTemplatePageProps) {
  const { content } = initJsonTemplate;
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
