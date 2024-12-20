import { Api } from '@/api/clientApi';
import { OrganizationWorkHierarchyDto } from '@/api/generated-types/generated-types_';
import { IdWrapper } from '@/api/types';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { OrganizationWorkHierarchyTable } from '@/components/tables/edit-tables/OrganizationWorkHierarchyTable';

export default async function page() {
  const newVar = await Api.InitJsonTemplate.getOne(15);
}
