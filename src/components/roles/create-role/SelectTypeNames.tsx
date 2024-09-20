import { NamespacedHooks } from 'dto-stores';
import { useEntitySelection } from '@/hooks/useEntitySelection';
import FilteredEntitySelector from '@/components/generic/FilteredEntitySelector';
import { EntityClassMap } from '@/api/entity-class-map';
import { RoleEntity } from '@/components/roles/types';
import { OneOf } from '@/components/types/oneOf';
import {
  AssetRoleTypeDto,
  HasName,
  ProviderRoleTypeDto,
  UserRoleTypeDto
} from '@/api/generated-types/generated-types';
import { HasNumberId } from '@/api/types';
import { WorkTaskTypeName } from '@/components/roles/create-role/RoleSubmissionHandler';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

export default function SelectTypeNames({
  roleEntity
}: {
  roleEntity: RoleEntity;
}) {
  return (
    <Card>
      <CardHeader className={'items-center justify-center align-middle'}>
        New Role
      </CardHeader>
      <CardBody className={'gap-2'}>
        <FilteredEntitySelector<RoleType>
          entityClass={EntityClassMap[`${roleEntity}RoleType`]}
          labelAccessor={'name'}
          label={'Role Type'}
          className={'w-full'}
        />
        <FilteredEntitySelector<HasNumberId & HasName>
          entityClass={WorkTaskTypeName}
          labelAccessor={'name'}
          selectionMode={'multiple'}
          label={'Task Types'}
          className={'w-full'}
        />
      </CardBody>
    </Card>
  );
}

type RoleType = OneOf<[ProviderRoleTypeDto, UserRoleTypeDto, AssetRoleTypeDto]>;
