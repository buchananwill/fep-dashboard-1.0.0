import { RoleFormMutationsList } from '@/components/roles/create-role/literals';
import { OneOf } from '@/components/types/oneOf';
import {
  AssetRoleTypeDto,
  ProviderRoleTypeDto,
  UserRoleTypeDto
} from '@/api/generated-types/generated-types';

export type RoleType = OneOf<
  [ProviderRoleTypeDto, UserRoleTypeDto, AssetRoleTypeDto]
>;
export type RoleFormMutation = (typeof RoleFormMutationsList)[number];

export interface MutationCounter<
  T extends RoleFormMutation = RoleFormMutation
> {
  id: T;
  value: number;
}