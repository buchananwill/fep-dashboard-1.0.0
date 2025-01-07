import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';
import { EntityClassMap } from '@/api/entity-class-map';
import { useCallback, useEffect } from 'react';
import { nameAccessor } from '@/functions/nameSetter';
import { EmptyArray } from '@/api/client-literals';
import { useSelectAutocompleteApi } from '@/hooks/select-adaptors/useSelectAutocompleteApi';
import { Autocomplete } from '@mantine/core';
import { ModalConfirmationFooter } from '@/components/tables/cells-v2/specific/ModalConfirmationFooter';
import { OrganizationTypeDto } from '@/api/generated-types/generated-types_';
import { useTransientState } from '@/hooks/useTransientState';

export function SelectOrganizationTypeNameCell(
  props: IdInnerCellProps<string>
) {
  return (
    <ModalEditCell buttonLabel={props.value ?? ''}>
      {({ onClose }) => (
        <SelectOrganizationTypeName {...props} onClose={onClose} />
      )}
    </ModalEditCell>
  );
}

function SelectOrganizationTypeName({
  value,
  onChange,
  entityClass,
  entityId,
  onClose
}: IdInnerCellProps<string> & { onClose?: () => void }) {
  const { data, isLoading } = useQuery({
    queryFn: Api.OrganizationType.getAll,
    queryKey: [EntityClassMap.organizationType, 'all']
  });
  const {
    transientState,
    setTransientState,
    transientStateRef,
    propagateChange
  } = useTransientState<OrganizationTypeDto>();

  useEffect(() => {
    const found = data?.find((orgType) => orgType.name === value);
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
    const name = transientStateRef.current?.name;
    if (onChange && name) {
      onChange(name);
    }
    onClose && onClose();
  }, [transientStateRef, onChange, onClose]);

  return (
    <>
      <Autocomplete {...autocompleteApi} />
      <ModalConfirmationFooter
        onCancel={onClose}
        onConfirm={onConfirm}
        confirmLabel={'Confirm Type'}
      />
    </>
  );
}
