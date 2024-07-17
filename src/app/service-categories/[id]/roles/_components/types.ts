import { SuitabilityTypes } from '@/app/service-categories/[id]/roles/_components/SuitabilityTable';
import { Api } from '@/api/clientApi';

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
  user: {},
  provider: {},
  asset: {}
} as const;

type RoleAspects = 'suitability' | 'availability';

export const RoleApiByTypeIdList: {
  [Property in keyof typeof RoleCategories]: (
    typeIdList: number[]
  ) => Promise<any>;
} = {
  user: Api.UserRole.getByTypeIdList,
  provider: Api.ProviderRole.getByTypeIdList,
  asset: Api.ProviderRole.getByTypeIdList
};
