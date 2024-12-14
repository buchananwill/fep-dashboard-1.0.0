import { Api } from '@/api/clientApi';
import {
  AssetDto,
  RolePostRequest
} from '@/api/generated-types/generated-types_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { wrapListDataWithIndexId } from '@/functions/wrapListDataWithIndexId';
import { IdWrapper } from '@/api/types';
import { AssetRolePostRequestTable } from '@/components/tables/edit-tables/AssetRolePostRequestTable';

export default async function Page() {
  const newVar = await Api.InitJsonTemplate.getOne(19);
  const { content } = newVar;
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
