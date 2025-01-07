import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { useCallback, useEffect } from 'react';
import { nameAccessorInWrapper } from '@/functions/nameSetter';
import { EmptyArray } from '@/api/client-literals';
import { useSelectAutocompleteApi } from '@/hooks/select-adaptors/useSelectAutocompleteApi';
import { Autocomplete } from '@mantine/core';
import { ModalConfirmationFooter } from '@/components/tables/cells-v2/specific/ModalConfirmationFooter';
import { useTransientState } from '@/hooks/useTransientState';
import { IdWrapper } from '@/api/types';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import {
  OrganizationWorkHierarchyDto,
  WorkSchemaNodeManualDefinitionDto
} from '@/api/generated-types/generated-types_';
import { notifications } from '@mantine/notifications';
import { EntityClassMap } from '@/api/entity-class-map';
import { useMemoFromIdList } from '@/components/tables/cells-v2/specific/useMemoFromIdList';
import { hasCycleInDAG } from '@/components/tables/cells-v2/specific/hasCycleInDAG';
import { isNotUndefined } from '@/api/main';
import { useValidateBeforeConfirming } from '@/components/tables/cells-v2/specific/useValidateBeforeConfirming';

export function SelectParentNodeNameCell(
  props: IdInnerCellProps<string | undefined>
) {
  return (
    <ModalEditCell buttonLabel={props.value ?? ''}>
      {({ onClose }) => <SelectParentNodeName {...props} onClose={onClose} />}
    </ModalEditCell>
  );
}

function SelectParentNodeName({
  value,
  onChange,
  entityClass,
  entityId,
  onClose
}: IdInnerCellProps<string | undefined> & { onClose?: () => void }) {
  const {
    transientState,
    setTransientState,
    transientStateRef,
    propagateChange
  } = useTransientState<IdWrapper<WorkSchemaNodeManualDefinitionDto>>();

  const { readAnyDto, entityList: nodeList } =
    useMemoFromIdList<IdWrapper<WorkSchemaNodeManualDefinitionDto>>(
      entityClass
    );

  useEffect(() => {
    const found = nodeList?.find((wsn) => wsn.data.name === value);
    if (found) setTransientState(found);
  }, [nodeList, value, setTransientState]);

  const autocompleteApi = useSelectAutocompleteApi({
    type: 'singleFlat',
    rawData: nodeList ?? EmptyArray,
    propagateChange,
    labelMaker: nameAccessorInWrapper,
    value: transientState,
    allowUndefined: true
  });

  const checkForCycle = useCallback(() => {
    if (transientStateRef.current === undefined) return null;
    else {
      return hasCycleInDAG(
        [transientStateRef.current.id],
        (childId) => {
          const parentNodeName = readAnyDto(childId)?.data.parentNodeName;
          if (parentNodeName === undefined) return undefined;
          else {
            const parentId = nodeList.find(
              (node) => node.data.name === parentNodeName
            )?.id;
            return parentId ? [parentId] : undefined;
          }
        },
        entityId
      );
    }
  }, [readAnyDto, transientStateRef, entityId, nodeList]);

  const validationInterceptor = useCallback(() => {
    let confirmedResponse = true;
    let selectedName: string | undefined = undefined;

    if (transientStateRef.current !== undefined) {
      const cycleDetected = checkForCycle();
      if (cycleDetected !== null) {
        notifications.show({
          message: `Unable to set parent: ${cycleDetected}; cycle detected.`,
          color: 'red'
        });
        confirmedResponse = false;
      } else {
        selectedName = transientStateRef.current.data.name;
      }
    }
    return { confirmedResponse, updateResponse: selectedName };
  }, [transientStateRef, checkForCycle]);

  const confirm = useValidateBeforeConfirming(
    onChange,
    onClose,
    validationInterceptor
  );

  return (
    <>
      <Autocomplete {...autocompleteApi} w={'16em'} />
      <ModalConfirmationFooter onCancel={onClose} onConfirm={confirm} />
    </>
  );
}
