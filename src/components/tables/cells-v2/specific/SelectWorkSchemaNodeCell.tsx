import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';
import { EntityClassMap } from '@/api/entity-class-map';
import { useCallback, useEffect } from 'react';
import { nameAccessor } from '@/functions/nameSetter';
import { EmptyArray } from '@/api/literals';
import { useSelectAutocompleteApi } from '@/hooks/select-adaptors/useSelectAutocompleteApi';
import { Autocomplete } from '@mantine/core';
import { ModalConfirmationFooter } from '@/components/tables/cells-v2/specific/ModalConfirmationFooter';
import { useTransientState } from '@/hooks/useTransientState';
import { WorkSchemaNodeDto } from '@/components/react-flow/generic/utils/adaptors';

export function SelectWorkSchemaNodeCell(
  props: IdInnerCellProps<string | null>
) {
  return (
    <ModalEditCell buttonLabel={props.value ?? ''}>
      {({ onClose }) => (
        <SelectWorkSchemaNodeName {...props} onClose={onClose} />
      )}
    </ModalEditCell>
  );
}

function SelectWorkSchemaNodeName({
  value,
  onChange,
  entityClass,
  entityId,
  onClose
}: IdInnerCellProps<string | null> & { onClose?: () => void }) {
  const { data, isLoading } = useQuery({
    queryFn: Api.WorkSchemaNode.getRootNodeList,
    queryKey: [EntityClassMap.workSchemaNode, 'rootNodeList']
  });
  const {
    transientState: workSchemaNode,
    setTransientState: setWorkSchemaNode,
    transientStateRef: workSchemaNodeSelectionRef,
    propagateChange
  } = useTransientState<WorkSchemaNodeDto>();

  useEffect(() => {
    const found = data?.find((kd) => kd.name === value);
    if (found) setWorkSchemaNode(found);
  }, [data, value, setWorkSchemaNode]);
  const autocompleteApi = useSelectAutocompleteApi({
    type: 'singleFlat',
    rawData: data ?? EmptyArray,
    propagateChange,
    labelMaker: nameAccessor,
    value: workSchemaNode,
    allowUndefined: true
  });

  const onConfirm = useCallback(() => {
    onChange && onChange(workSchemaNodeSelectionRef.current?.name ?? null);
    onClose && onClose();
  }, [workSchemaNodeSelectionRef, onChange, onClose]);

  return (
    <>
      <Autocomplete {...autocompleteApi} />
      <ModalConfirmationFooter onCancel={onClose} onConfirm={onConfirm} />
    </>
  );
}
