import { LeafComponentProps } from '@/app/core/navigation/data/types';
import ProviderRoleEditTable from '@/components/tables/edit-tables/ProviderRoleEditTable';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { Api } from '@/api/clientApi';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import AssetRoleEditTable from '@/components/tables/edit-tables/AssetRoleEditTable';

export default async function EditRolePage({
  pathVariables,
  depth
}: LeafComponentProps) {
  const roleEntity = pathVariables[0];

  let children = null;

  if (roleEntity === 'providers') {
    const allProviders = await Api.ProviderRole.getAll();
    children = (
      <>
        <EditAddDeleteDtoControllerArray
          entityClass={EntityClassMap.providerRole}
          dtoList={allProviders}
          updateServerAction={Api.ProviderRole.putList}
        />
        <ProviderRoleEditTable pathVariables={pathVariables} depth={depth} />
      </>
    );
  } else if (roleEntity === 'assets') {
    const allAssets = await Api.AssetRole.getAll();
    children = (
      <>
        <EditAddDeleteDtoControllerArray
          entityClass={EntityClassMap.assetRole}
          dtoList={allAssets}
          updateServerAction={Api.AssetRole.putList}
        />
        <AssetRoleEditTable pathVariables={pathVariables} depth={depth} />
      </>
    );
  }

  return (
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      {children}
    </RootCard>
  );
}
