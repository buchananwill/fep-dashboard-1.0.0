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
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types_';
import { useTransientState } from '@/hooks/useTransientState';

export function SelectKnowledgeDomainNameCell(
  props: IdInnerCellProps<string | undefined>
) {
  return (
    <ModalEditCell buttonLabel={props.value ?? ''}>
      {({ onClose }) => (
        <SelectKnowledgeDomainName {...props} onClose={onClose} />
      )}
    </ModalEditCell>
  );
}

function SelectKnowledgeDomainName({
  value,
  onChange,
  entityClass,
  entityId,
  onClose
}: IdInnerCellProps<string | undefined> & { onClose?: () => void }) {
  const { data, isLoading } = useQuery({
    queryFn: Api.KnowledgeDomain.getAll,
    queryKey: [EntityClassMap.knowledgeDomain, 'all']
  });
  const {
    transientState: knowledgeDomain,
    setTransientState: setKnowledgeDomain,
    transientStateRef: knowledgeDomainRef,
    propagateChange
  } = useTransientState<KnowledgeDomainDto>();

  useEffect(() => {
    const found = data?.find((kd) => kd.name === value);
    if (found) setKnowledgeDomain(found);
  }, [data, value, setKnowledgeDomain]);
  const autocompleteApi = useSelectAutocompleteApi({
    type: 'singleFlat',
    rawData: data ?? EmptyArray,
    propagateChange,
    labelMaker: nameAccessor,
    value: knowledgeDomain,
    allowUndefined: true
  });

  const onConfirm = useCallback(() => {
    onChange && onChange(knowledgeDomainRef.current?.name);
    onClose && onClose();
  }, [knowledgeDomainRef, onChange, onClose]);

  return (
    <>
      <Autocomplete {...autocompleteApi} />
      <ModalConfirmationFooter onCancel={onClose} onConfirm={onConfirm} />
    </>
  );
}
