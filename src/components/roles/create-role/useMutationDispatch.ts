import {
  MutationCounter,
  RoleFormMutation
} from '@/components/roles/create-role/types';
import { useDtoStoreDispatch } from 'dto-stores';
import { MutationCounterContextKey } from '@/components/roles/create-role/literals';
import { useCallback } from 'react';

export function useMutationDispatch(mutation: RoleFormMutation) {
  const { dispatchWithoutListen } = useDtoStoreDispatch<MutationCounter>(
    mutation,
    MutationCounterContextKey
  );

  return useCallback(() => {
    dispatchWithoutListen((counter) => ({ ...counter, value: counter.value }));
  }, [dispatchWithoutListen]);
}