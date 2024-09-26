import { Api } from '@/api/clientApi_';

import { RoleAspects } from '@/components/roles/rolePageTree';
import {
  AssetRoleDtoSchema,
  ProviderRoleDtoSchema,
  UserRoleDtoSchema
} from '@/api/generated-schemas/schemas';

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
  user: Api.UserRole.getByTypeIdList,
  provider: Api.ProviderRole.getByTypeIdList,
  asset: Api.AssetRole.getByTypeIdList
};
