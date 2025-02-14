import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import UserRoleEditTable from '@/components/tables/edit-tables/UserRoleEditTable';
import { Api } from '@/api/clientApi_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

export default async function UserRoleTablePage({
  pathVariables,
  depth
}: LeafComponentProps) {
  const userRoleDtos = await Api.UserRole.getAll();
  return (
    <RootCard
      layoutId={getRootCardLayoutId(pathVariables)}
      displayHeader={getStartCaseDomainAlias('userRoles')}
    >
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.userRole}
        dtoList={userRoleDtos}
        updateServerAction={Api.UserRole.putList}
        deleteServerAction={Api.UserRole.deleteIdList}
      />
      <UserRoleEditTable pathVariables={pathVariables} depth={depth} />
    </RootCard>
  );
}
