import { NamespacedHooks } from 'dto-stores';
import { useEntitySelection } from '@/hooks/useEntitySelection';
import FilteredEntitySelector from '@/components/generic/FilteredEntitySelector';
import { EntityClassMap } from '@/api/entity-class-map';
import { RoleEntity } from '@/components/roles/types';
import { OneOf } from '@/components/types/oneOf';
import {
  AssetRoleTypeDto,
  HasNameDto,
  ProviderRoleTypeDto,
  UserRoleTypeDto
} from '@/api/generated-types/generated-types';
import { HasNumberId } from '@/api/types';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { WorkTaskTypeName } from '@/components/roles/create-role/literals';

export default function SelectTypeNames({
  roleEntity
}: {
  roleEntity: RoleEntity;
}) {
  return <></>;
}
