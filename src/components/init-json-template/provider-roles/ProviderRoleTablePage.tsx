import { InitJsonTemplatePageProps } from '@/components/init-json-template/dataTypes';
import { IdWrapper } from '@/api/types';
import {
  PersonDto,
  RolePostRequest
} from '@/api/generated-types/generated-types_';
import { wrapListDataWithIndexId } from '@/functions/wrapListDataWithIndexId';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { ProviderRolePostRequestTable } from '@/components/tables/edit-tables/ProviderRolePostRequestTable';

export function ProviderRoleTablePage({
  initJsonTemplate
}: InitJsonTemplatePageProps) {
  const { content } = initJsonTemplate;
  const providerRoleRequests: IdWrapper<RolePostRequest<PersonDto>>[] =
    wrapListDataWithIndexId(JSON.parse(content));

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.providerRolePostRequest}
        dtoList={providerRoleRequests}
      />
      <ProviderRolePostRequestTable
        pathVariables={['data-entry', 'provider-roles']}
        depth={0}
      />
    </>
  );
}
