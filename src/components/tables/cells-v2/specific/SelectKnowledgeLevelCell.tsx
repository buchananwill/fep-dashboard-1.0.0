import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { useQuery } from '@tanstack/react-query';
import { EntityClassMap } from '@/api/entity-class-map';
import { useCallback, useEffect } from 'react';
import { nameAccessor } from '@/functions/nameSetter';
import { EmptyArray } from '@/api/literals';
import { useSelectAutocompleteApi } from '@/hooks/select-adaptors/useSelectAutocompleteApi';
import { Autocomplete } from '@mantine/core';
import { ModalConfirmationFooter } from '@/components/tables/cells-v2/specific/ModalConfirmationFooter';
import { useTransientState } from '@/components/tables/cells-v2/specific/useTransientState';
import { api } from '@/api/v3/clientApiV3';
import { KnowledgeLevelDto } from '@/api/generated-types/generated-types';

export function SelectKnowledgeLevelCell(
  props: IdInnerCellProps<string | undefined>
) {
  return (
    <ModalEditCell buttonLabel={props.value ?? ''}>
      {({ onClose }) => <SelectKnowledgeLevel {...props} onClose={onClose} />}
    </ModalEditCell>
  );
}

function SelectKnowledgeLevel({
  value,
  onChange,
  entityClass,
  entityId,
  onClose
}: IdInnerCellProps<string | undefined> & { onClose?: () => void }) {
  const { data, isLoading } = useQuery({
    queryFn: async () => await api('knowledgeLevel', 'getAll', {}),
    queryKey: [EntityClassMap.knowledgeLevel, 'all']
  });
  const {
    transientState,
    setTransientState,
    transientStateRef,
    propagateChange
  } = useTransientState<KnowledgeLevelDto>();

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
      <ModalConfirmationFooter
        onCancel={onClose}
        onConfirm={onConfirm}
        confirmLabel={'Confirm Knowledge Level'}
      />
    </>
  );
}
