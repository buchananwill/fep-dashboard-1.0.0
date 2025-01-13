import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { WorkTypeCategory } from '@/components/roles/create-role/literals';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/client-literals';
import { HasNumberId } from '@/api/types';
import { useReadSelectedEntities } from '@/api/typed-dto-store-hooks';
import { useGlobalReadAny } from 'selective-context';
import { useCallback } from 'react';
import { isNotUndefined } from '@/api/main';
import { listenerKey } from '@/components/roles/create-role/CreateRoleForm';
import { HasName } from 'react-d3-force-wrapper';
import { WorkTypeCategoryDto } from '@/api/generated-types/generated-types_';

export function useRoleTypeAndTaskTypeSelections(
  roleEntity: 'provider' | 'asset' | 'user'
) {
  const { currentState: workTypeCategoryIdList } = NamespacedHooks.useListen(
    WorkTypeCategory,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray
  );
  const readAnyWorkTypeCategory =
    useReadAnyDto<WorkTypeCategoryDto>(WorkTypeCategory);
  const roleTypeNames = useReadSelectedEntities(`${roleEntity}RoleType`);
  const readAny = useGlobalReadAny();

  const getWorkTypeCategoryNameStrings = useCallback(() => {
    return workTypeCategoryIdList
      .map((id) => readAnyWorkTypeCategory(id))
      .filter(isNotUndefined)
      .map((name) => name.name);
  }, [workTypeCategoryIdList, readAnyWorkTypeCategory]);

  const getRoleTypeNames = useCallback(() => {
    return roleTypeNames().map((type) => type.name);
  }, [roleTypeNames]);
  return { readAny, getWorkTypeCategoryNameStrings, getRoleTypeNames };
}
