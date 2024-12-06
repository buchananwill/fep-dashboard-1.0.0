import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { useCallback, useEffect } from 'react';
import { nameAccessorInWrapper } from '@/functions/nameSetter';
import { EmptyArray } from '@/api/literals';
import { useSelectAutocompleteApi } from '@/hooks/select-adaptors/useSelectAutocompleteApi';
import { Autocomplete } from '@mantine/core';
import { ModalConfirmationFooter } from '@/components/tables/cells-v2/specific/ModalConfirmationFooter';
import { useTransientState } from '@/hooks/useTransientState';
import { IdWrapper } from '@/api/types';
import { NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { WorkSchemaNodeManualDefinitionDto } from '@/api/generated-types/generated-types_';
import { notifications } from '@mantine/notifications';

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
  const listenerKey = useUuidListenerKey();
  const { currentState: parentNodeList } = NamespacedHooks.useListen<
    IdWrapper<WorkSchemaNodeManualDefinitionDto>[]
  >(entityClass, KEY_TYPES.MASTER_LIST, listenerKey, EmptyArray);
  const {
    transientState,
    setTransientState,
    transientStateRef,
    propagateChange
  } = useTransientState<IdWrapper<WorkSchemaNodeManualDefinitionDto>>();

  useEffect(() => {
    const found = parentNodeList?.find((wsn) => wsn.data.name === value);
    if (found) setTransientState(found);
  }, [parentNodeList, value, setTransientState]);

  const autocompleteApi = useSelectAutocompleteApi({
    type: 'singleFlat',
    rawData: parentNodeList ?? EmptyArray,
    propagateChange,
    labelMaker: nameAccessorInWrapper,
    value: transientState,
    allowUndefined: true
  });

  const onConfirm = useCallback(() => {
    if (!onChange || !onClose) return;
    let confirmed = true;
    let selectedName: string | undefined = undefined;

    if (transientStateRef.current !== undefined) {
      selectedName = transientStateRef.current.data.name;
      const seenSet = new Set<string>();
      seenSet.add(String(entityId));
      let currentParent:
        | IdWrapper<WorkSchemaNodeManualDefinitionDto>
        | undefined = transientStateRef.current;
      while (currentParent?.data?.parentNodeName !== undefined) {
        seenSet.add(String(currentParent.id));
        currentParent = parentNodeList.find(
          (n) => n.data.parentNodeName === currentParent?.data.parentNodeName
        );
        if (currentParent && seenSet.has(currentParent.id)) {
          notifications.show({
            message: `Unable to set parent: ${selectedName}; cycle detected.`,
            color: 'red'
          });
          confirmed = false;
          break;
        }
      }
    }
    if (confirmed) {
      onChange(selectedName);
      onClose();
    }
  }, [parentNodeList, transientStateRef, onChange, onClose, entityId]);

  return (
    <>
      <Autocomplete {...autocompleteApi} w={'16em'} />
      <ModalConfirmationFooter onCancel={onClose} onConfirm={onConfirm} />
    </>
  );
}
