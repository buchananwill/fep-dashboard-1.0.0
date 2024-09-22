import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { WorkTaskTypeName } from '@/components/roles/create-role/literals';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { HasName } from '@/api/generated-types/generated-types';
import { HasNumberId } from '@/api/types';
import { useReadSelectedEntities } from '@/api/typed-dto-store-hooks';
import { useGlobalReadAny } from 'selective-context';
import { useCallback } from 'react';
import { isNotUndefined } from '@/api/main';
import { listenerKey } from '@/components/roles/create-role/CreateRoleForm';

export function useRoleTypeAndTaskTypeSelections(roleEntity: 'provider' | 'asset' | 'user') {
  const { currentState: wttTaskNameIdList } = NamespacedHooks.useListen(
    WorkTaskTypeName,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray
  );
  const readAnyWttName = useReadAnyDto<HasName & HasNumberId>(WorkTaskTypeName);
  const roleTypeNames = useReadSelectedEntities(`${roleEntity}RoleType`);
  const readAny = useGlobalReadAny();

  const getWttNameStrings = useCallback(() => {
    return wttTaskNameIdList
      .map((id) => readAnyWttName(id))
      .filter(isNotUndefined)
      .map((name) => name.name);
  }, [wttTaskNameIdList, readAnyWttName]);

  const getRoleTypeNames = useCallback(() => {
    return roleTypeNames().map((type) => type.name);
  }, [roleTypeNames]);
  return { readAny, getWttNameStrings, getRoleTypeNames };
}