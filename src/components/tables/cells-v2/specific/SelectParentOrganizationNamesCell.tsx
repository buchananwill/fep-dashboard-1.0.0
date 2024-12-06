import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { useCallback, useEffect, useMemo } from 'react';
import { nameAccessorInWrapper } from '@/functions/nameSetter';
import { EmptyArray } from '@/api/literals';
import { ModalConfirmationFooter } from '@/components/tables/cells-v2/specific/ModalConfirmationFooter';
import { useTransientState } from '@/hooks/useTransientState';
import { IdWrapper } from '@/api/types';
import { Identifier, NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { OrganizationWorkHierarchyDto } from '@/api/generated-types/generated-types';
import { EntityClassMap } from '@/api/entity-class-map';
import { isNotUndefined } from '@/api/main';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { SelectApiParamsMultiFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { TransferList } from '@/components/generic/combo-boxes/TransferList';

export function SelectParentOrganizationNamesCell(
  props: IdInnerCellProps<string[]>
) {
  return (
    <ModalEditCell buttonLabel={props.value ?? ''}>
      {({ onClose }) => (
        <SelectParentOrganizationNames {...props} onClose={onClose} />
      )}
    </ModalEditCell>
  );
}

function SelectParentOrganizationNames({
  value,
  onChange,
  entityClass,
  entityId,
  onClose
}: IdInnerCellProps<string[]> & { onClose?: () => void }) {
  const listenerKey = useUuidListenerKey();
  const { currentState: organizationIdList } = NamespacedHooks.useListen<
    string[]
  >(entityClass, KEY_TYPES.ID_LIST, listenerKey, EmptyArray);
  const {
    transientState,
    setTransientState,
    transientStateRef,
    propagateChange
  } = useTransientState<IdWrapper<OrganizationWorkHierarchyDto>[]>();
  const readAnyDto = useReadAnyDto<IdWrapper<OrganizationWorkHierarchyDto>>(
    EntityClassMap.organizationWorkHierarchy
  );

  const organizationList = useMemo(() => {
    return (
      organizationIdList?.map((id) => readAnyDto(id)).filter(isNotUndefined) ??
      []
    );
  }, [organizationIdList, readAnyDto]);

  useEffect(() => {
    const found = organizationList.filter((org) =>
      value.includes(org.data.name)
    );
    if (found) setTransientState(found);
  }, [organizationList, value, setTransientState]);

  const selectApi = useSelectApi<
    SelectApiParamsMultiFlat<IdWrapper<OrganizationWorkHierarchyDto>>
  >({
    type: 'multiFlat',
    rawData: organizationList ?? EmptyArray,
    propagateChange,
    labelMaker: nameAccessorInWrapper,
    value: transientState ?? EmptyArray
  });

  const parentIdFetcher = useCallback(
    (id: Identifier) => {
      const parentNames =
        organizationList?.find((org) => org.id === id)?.data.parentNames ?? [];
      return parentNames
        .map((name) => organizationList.find((org) => org.data.name === name))
        .filter(isNotUndefined)
        .map((wrapper) => wrapper.id);
    },
    [organizationList]
  );

  const checkForCycle = useCallback(() => {
    const startingParents =
      transientStateRef.current?.map((org) => org.id) ?? [];
    return hasCycleInDAG(startingParents, parentIdFetcher, entityId);
  }, [entityId, parentIdFetcher, transientStateRef]);

  const onConfirm = useCallback(() => {
    if (!onChange || !onClose) return;
    let confirmed = true;
    let selectedNames = value;

    if (transientStateRef.current !== undefined) {
      confirmed = !checkForCycle();
      selectedNames = transientStateRef.current?.map((org) => org.data.name);
    }
    if (confirmed) {
      onChange(selectedNames);
      onClose();
    }
  }, [transientStateRef, onChange, onClose, checkForCycle, value]);

  return (
    <>
      <TransferList {...selectApi} />
      <ModalConfirmationFooter onCancel={onClose} onConfirm={onConfirm} />
    </>
  );
}

function hasCycleInDAG(
  startParents: (string | number)[],
  getParentIds: (nodeId: string | number) => (string | number)[],
  startChild: string | number
): boolean {
  // A set to track visited nodes and avoid redundant processing
  const visited = new Set<string | number>();

  // Helper function to perform a DFS search for `startChild`
  function dfs(current: string | number): boolean {
    if (current === startChild) {
      // Cycle detected
      return true;
    }
    if (visited.has(current)) {
      // Skip already visited nodes
      return false;
    }
    // Mark the current node as visited
    visited.add(current);

    // Recursively check the ancestors of the current node
    for (const parent of getParentIds(current)) {
      if (dfs(parent)) {
        return true;
      }
    }

    return false;
  }

  // Iterate through all starting parents
  for (const startParent of startParents) {
    if (dfs(startParent)) {
      return true; // Cycle detected
    }
  }

  return false; // No cycle detected
}
