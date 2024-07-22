import { Api } from '@/api/clientApi';
import { UserRoleDtoSchema } from '@/api/dtos/UserRoleDtoSchema';
import { ProviderRoleDtoSchema } from '@/api/dtos/ProviderRoleDtoSchema';
import { AssetRoleDtoSchema } from '@/api/dtos/AssetRoleDtoSchema';

export type BaseRoleParams = {
  id: string;
  roleTypeId: string;
  roleCategory: keyof typeof RoleCategories;
  roleAspect: RoleAspects;
};

type StringProperties<Type> = {
  [Property in keyof Type]: string;
};

export interface RolePageProps {
  params: BaseRoleParams;
}

export const RoleCategories = {
  user: UserRoleDtoSchema,
  provider: ProviderRoleDtoSchema,
  asset: AssetRoleDtoSchema
} as const;

type RoleAspects = 'suitability' | 'availability';

export const RoleApiByTypeIdList: {
  [Property in keyof typeof RoleCategories]: (
    typeIdList: number[]
  ) => Promise<any>;
} = {
  user: Api.UserRole.getByTypeIdList,
  provider: Api.ProviderRole.getByTypeIdList,
  asset: Api.AssetRole.getByTypeIdList
};
