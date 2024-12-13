import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { useCallback, useEffect } from 'react';
import { nameAccessorInWrapper } from '@/functions/nameSetter';
import { EmptyArray } from '@/api/literals';
import { ModalConfirmationFooter } from '@/components/tables/cells-v2/specific/ModalConfirmationFooter';
import { useTransientState } from '@/hooks/useTransientState';
import { IdWrapper } from '@/api/types';
import { Identifier } from 'dto-stores';
import { OrganizationWorkHierarchyDto } from '@/api/generated-types/generated-types_';
import { isNotUndefined } from '@/api/main';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { SelectApiParamsMultiFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { TransferList } from '@/components/generic/combo-boxes/TransferList';
import { notifications } from '@mantine/notifications';
import { useMemoFromIdList } from '@/components/tables/cells-v2/specific/useMemoFromIdList';
import { hasCycleInDAG } from '@/components/tables/cells-v2/specific/hasCycleInDAG';
import { useValidateBeforeConfirming } from '@/components/tables/cells-v2/specific/useValidateBeforeConfirming';

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
  const {
    transientState,
    setTransientState,
    transientStateRef,
    propagateChange
  } = useTransientState<IdWrapper<OrganizationWorkHierarchyDto>[]>();
  const { readAnyDto, entityList } =
    useMemoFromIdList<IdWrapper<OrganizationWorkHierarchyDto>>(entityClass);

  useEffect(() => {
    if (value === null) {
      setTransientState(EmptyArray);
    } else {
      const found = entityList.filter((org) => value.includes(org.data.name));
      setTransientState(found);
    }
  }, [entityList, value, setTransientState]);

  const selectApi = useSelectApi<
    SelectApiParamsMultiFlat<IdWrapper<OrganizationWorkHierarchyDto>>
  >({
    type: 'multiFlat',
    rawData: entityList ?? EmptyArray,
    propagateChange,
    labelMaker: nameAccessorInWrapper,
    value: transientState ?? EmptyArray
  });

  const parentIdFetcher = useCallback(
    (id: Identifier) => {
      const parentNames =
        entityList?.find((org) => org.id === id)?.data.parentNames ?? null;
      return parentNames
        ?.split(',')
        .map((str) => str.trim())
        .map((name) => entityList.find((org) => org.data.name === name))
        .filter(isNotUndefined)
        .map((wrapper) => wrapper.id);
    },
    [entityList]
  );

  const checkForCycle = useCallback(() => {
    const startingParents =
      transientStateRef.current?.map((org) => org.id) ?? [];
    return hasCycleInDAG(startingParents, parentIdFetcher, entityId);
  }, [entityId, parentIdFetcher, transientStateRef]);

  const interceptConfirmationToCheckForCycle = useCallback(() => {
    let confirmedResponse = true;
    let updateResponse = value;
    if (
      transientStateRef.current !== undefined &&
      transientStateRef.current.length > 0
    ) {
      const parentFormingCycle = checkForCycle();
      confirmedResponse = parentFormingCycle === null;
      if (!confirmedResponse && parentFormingCycle !== null) {
        notifications.show({
          message: `Could not update parents. Cycle formed via ${readAnyDto(parentFormingCycle)?.data.name}`,
          color: 'red'
        });
      }
      updateResponse = transientStateRef.current
        ?.map((org) => org.data.name)
        .join(', ');
    }
    return { confirmedResponse, updateResponse };
  }, [transientStateRef, readAnyDto, checkForCycle, value]);
  const onConfirm = useValidateBeforeConfirming(
    onChange,
    onClose,
    interceptConfirmationToCheckForCycle
  );

  return (
    <>
      <TransferList {...selectApi} mah={'24em'} />
      <ModalConfirmationFooter onCancel={onClose} onConfirm={onConfirm} />
    </>
  );
}
