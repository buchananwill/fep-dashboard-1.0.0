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
import { OrganizationWorkHierarchyDto } from '@/api/generated-types/generated-types_';
import { EntityClassMap } from '@/api/entity-class-map';
import { isNotUndefined } from '@/api/main';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { SelectApiParamsMultiFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { TransferList } from '@/components/generic/combo-boxes/TransferList';
import { notifications } from '@mantine/notifications';

export function SelectParentOrganizationNamesCell(
  props: IdInnerCellProps<string | null>
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
}: IdInnerCellProps<string | null> & { onClose?: () => void }) {
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
    if (value === null) {
      setTransientState(EmptyArray);
    } else {
      const found = organizationList.filter((org) =>
        value.includes(org.data.name)
      );
      setTransientState(found);
    }
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
        organizationList?.find((org) => org.id === id)?.data.parentNames ??
        null;
      return parentNames
        ?.split(',')
        .map((str) => str.trim())
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

    if (
      transientStateRef.current !== undefined &&
      transientStateRef.current.length > 0
    ) {
      const parentFormingCycle = checkForCycle();
      confirmed = parentFormingCycle === null;
      if (!confirmed && parentFormingCycle !== null) {
        notifications.show({
          message: `Could not update parents. Cycle formed via ${readAnyDto(parentFormingCycle)?.data.name}`,
          color: 'red'
        });
      }
      selectedNames = transientStateRef.current
        ?.map((org) => org.data.name)
        .join(', ');
    }
    if (confirmed) {
      onChange(selectedNames);
      onClose();
    }
  }, [transientStateRef, onChange, onClose, checkForCycle, value, readAnyDto]);

  return (
    <>
      <TransferList {...selectApi} mah={'24em'} />
      <ModalConfirmationFooter onCancel={onClose} onConfirm={onConfirm} />
    </>
  );
}

function hasCycleInDAG(
  startParents: (string | number)[],
  getParentIds: (nodeId: string | number) => (string | number)[] | undefined,
  startChild: string | number
): (string | number) | null {
  // A set to track visited nodes and avoid redundant processing
  const visited = new Set<string | number>();

  // Helper function to perform a DFS search for `startChild`
  function dfs(current: string | number): (string | number) | null {
    if (current === startChild) {
      // Cycle detected
      return current;
    }
    if (visited.has(current)) {
      // Skip already visited nodes
      return null;
    }
    // Mark the current node as visited
    visited.add(current);
    const nextParents = getParentIds(current);
    if (nextParents === undefined) {
      return null;
    } else {
      for (const parent of nextParents) {
        if (dfs(parent) !== null) {
          return parent;
        }
      }
    }
    // Recursively check the ancestors of the current node

    return null;
  }

  // Iterate through all starting parents
  for (const startParent of startParents) {
    if (dfs(startParent) !== null) {
      return startParent; // Cycle detected
    }
  }

  return null; // No cycle detected
}
