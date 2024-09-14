import { Api } from '@/api/clientApi_';
import { UserRoleDtoSchema } from '@/api/zod-schemas/UserRoleDtoSchema';
import { ProviderRoleDtoSchema } from '@/api/zod-schemas/ProviderRoleDtoSchema';
import { AssetRoleDtoSchema } from '@/api/zod-schemas/AssetRoleDtoSchema';

import { RoleAspects } from '@/components/roles/rolePageTree';

export type BaseRoleParams = {
  roleTypeId: string;
  roleCategory: keyof typeof RoleCategories;
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
