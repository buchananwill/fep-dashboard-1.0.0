import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { useQuery } from '@tanstack/react-query';
import { EntityClassMap } from '@/api/entity-class-map';
import { useCallback, useEffect } from 'react';
import { nameAccessor } from '@/functions/nameSetter';
import { EmptyArray } from '@/api/client-literals';
import { useSelectAutocompleteApi } from '@/hooks/select-adaptors/useSelectAutocompleteApi';
import { Autocomplete } from '@mantine/core';
import { ModalConfirmationFooter } from '@/components/tables/cells-v2/specific/ModalConfirmationFooter';
import { useTransientState } from '@/hooks/useTransientState';
import { api } from '@/api/v3/clientApiV3';
import { HasName } from 'react-d3-force-wrapper';
import { HasNumberId } from '@/api/types';

export function SelectTaskTypeNameNameCell(
  props: IdInnerCellProps<string | undefined>
) {
  return (
    <ModalEditCell buttonLabel={props.value ?? ''}>
      {({ onClose }) => <SelectTaskTypeName {...props} onClose={onClose} />}
    </ModalEditCell>
  );
}

function SelectTaskTypeName({
  value,
  onChange,
  entityClass,
  entityId,
  onClose
}: IdInnerCellProps<string | undefined> & { onClose?: () => void }) {
  const { data, isLoading } = useQuery({
    queryFn: async () => await api('workTypeCategory', 'getAll', {}),
    queryKey: [EntityClassMap.workTypeCategory, 'all']
  });
  const {
    transientState,
    setTransientState,
    transientStateRef,
    propagateChange
  } = useTransientState<HasName & HasNumberId>();

  useEffect(() => {
    const found = data?.find((kd) => kd.name === value);
    if (found) setTransientState(found);
  }, [data, value, setTransientState]);
  const autocompleteApi = useSelectAutocompleteApi({
    type: 'singleFlat',
    rawData: data ?? EmptyArray,
    propagateChange,
    labelMaker: nameAccessor,
    value: transientState,
    allowUndefined: true
  });

  const onConfirm = useCallback(() => {
    onChange && onChange(transientStateRef.current?.name);
    onClose && onClose();
  }, [transientStateRef, onChange, onClose]);

  return (
    <>
      <Autocomplete {...autocompleteApi} />
      <ModalConfirmationFooter onCancel={onClose} onConfirm={onConfirm} />
    </>
  );
}
