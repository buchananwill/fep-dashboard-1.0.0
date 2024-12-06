import { Api } from '@/api/clientApi_';

import { RoleAspects } from '@/components/roles/rolePageTree';
import {
  AssetRoleDtoSchema,
  ProviderRoleDtoSchema,
  UserRoleDtoSchema
} from '@/api/generated-schemas/schemas_';
import {
  AssetRoleTypeDto,
  ProviderRoleTypeDto,
  UserRoleDto,
  UserRoleTypeDto
} from '@/api/generated-types/generated-types_';
import { PartialDeep } from 'type-fest';

export type BaseRoleParams = {
  roleTypeId: string;
  roleCategory: RoleEntity;
  roleAspect: RoleAspect;
};

type StringProperties<Type> = {
  [Property in keyof Type]: string;
};

export interface RolePageProps {
  params: BaseRoleParams;
}

export type RoleEntity = keyof typeof RoleCategories;

export type RoleTypeEntities = {
  provider: ProviderRoleTypeDto;
  user: UserRoleTypeDto;
  asset: AssetRoleTypeDto;
};

export type RoleTypeEntity = RoleTypeEntities[RoleEntity];

export function isValidAspect(aspect: string) {
  return RoleAspects[aspect as RoleAspect] !== undefined;
}

export const RoleCategories = {
  user: UserRoleDtoSchema,
  provider: ProviderRoleDtoSchema,
  asset: AssetRoleDtoSchema
} as const;

export type RoleAspect = keyof typeof RoleAspects;

export const RoleApiByTypeIdList: {
  [Property in RoleEntity]: (typeIdList: number[]) => Promise<any>;
} = {
  user: (typeIdList) =>
    Api.UserRole.getDtoListByExampleList(
      typeIdList.map((id) => ({ type: { id } }) as PartialDeep<UserRoleDto>)
    ),
  provider: (typeIdList) =>
    Api.ProviderRole.getDtoListByExampleList(
      typeIdList.map((id) => ({ type: { id } }) as PartialDeep<UserRoleDto>)
    ),
  asset: (typeIdList) =>
    Api.AssetRole.getDtoListByExampleList(
      typeIdList.map((id) => ({ type: { id } }) as PartialDeep<UserRoleDto>)
    )
};
