import { getEntityNamespaceContextKey } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceContextKey';

import { MutationCounter } from '@/components/roles/create-role/types';

export const MutationCounterContextKey = 'MutationCounter';
export const RoleFormMutationsList = [
  'baseEntity',
  'roleType',
  'taskTypes',
  'suitabilityCell',
  'availabilityList'
] as const;
export const initialMutationList = RoleFormMutationsList.map((mutation) => ({
  id: mutation,
  value: 0
})) as MutationCounter[];
export const mutationContextKeyList = RoleFormMutationsList.map((id) =>
  getEntityNamespaceContextKey(MutationCounterContextKey, id)
);
export const WorkTypeCategory = 'WorkTypeCategory';
