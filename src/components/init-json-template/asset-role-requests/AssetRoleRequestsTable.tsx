import { InitJsonTemplatePageProps } from '@/components/init-json-template/dataTypes';
import { IdWrapper } from '@/api/types';
import {
  AssetDto,
  RolePostRequest
} from '@/api/generated-types/generated-types_';
import { wrapListDataWithIndexId } from '@/functions/wrapListDataWithIndexId';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { AssetRolePostRequestTable } from '@/components/tables/edit-tables/AssetRolePostRequestTable';

export function AssetRoleRequestsTablePage({
  initJsonTemplate
}: InitJsonTemplatePageProps) {
  const { content } = initJsonTemplate;
  const assetRoleRequests: IdWrapper<RolePostRequest<AssetDto>>[] =
    wrapListDataWithIndexId(JSON.parse(content));

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.assetRolePostRequest}
        dtoList={assetRoleRequests}
      />
      <AssetRolePostRequestTable
        pathVariables={['data-entry', 'asset-roles']}
        depth={0}
      />
    </>
  );
}
