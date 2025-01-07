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
import { AssetTypeDto } from '@/api/generated-types/generated-types_';

export function SelectAssetTypeCell(props: IdInnerCellProps<AssetTypeDto>) {
  return (
    <ModalEditCell buttonLabel={props.value?.name ?? ''}>
      {({ onClose }) => <SelectAssetType {...props} onClose={onClose} />}
    </ModalEditCell>
  );
}

function SelectAssetType({
  value,
  onChange,
  entityClass,
  entityId,
  onClose
}: IdInnerCellProps<AssetTypeDto> & { onClose?: () => void }) {
  const { data, isLoading } = useQuery({
    queryFn: async () => await api('assetType', 'getAll', {}),
    queryKey: [EntityClassMap.assetType, 'all']
  });
  const {
    transientState,
    setTransientState,
    transientStateRef,
    propagateChange
  } = useTransientState<AssetTypeDto>();

  useEffect(() => {
    const found = data?.find((assetType) => assetType.name === value.name);
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
    if (onChange && transientStateRef.current) {
      onChange(transientStateRef.current);
    }
    onClose && onClose();
  }, [transientStateRef, onChange, onClose]);

  return (
    <>
      <Autocomplete {...autocompleteApi} />
      <ModalConfirmationFooter
        onCancel={onClose}
        onConfirm={onConfirm}
        confirmLabel={'Confirm Asset Type'}
      />
    </>
  );
}
