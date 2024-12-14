import { useGlobalController } from 'selective-context';
import { getRowsPerPageContextKey } from '@/hooks/table-hooks/useClientSidePaginationController';
import { useEntityTableContext } from '@/hooks/table-hooks/table-context';
import { useCallback } from 'react';
import { Select } from '@mantine/core';

export default function SelectRowsPerPage() {
  const { entityClass } = useEntityTableContext();
  const { dispatch, currentState } = useGlobalController({
    contextKey: getRowsPerPageContextKey(entityClass),
    initialValue: 10,
    listenerKey: 'selectRowsPerPage'
  });

  const onChange = useCallback(
    (value: string | null) => {
      if (!value) throw Error('Empty selection not allowed');
      const number = parseInt(value);
      if (isNaN(number)) throw Error(`Number did not parse: ${value}`);
      dispatch(number);
    },
    [dispatch]
  );

  return (
    <label className={'flex items-center gap-2 text-sm'}>
      <Select
        comboboxProps={{ withinPortal: false }}
        data={rowOptions}
        // checkIconPosition={'right'}
        classNames={{
          wrapper: 'w-fit',
          option: 'text-right justify-end'
        }}
        styles={{
          input: {
            textAlign: 'right',
            width: '64px'
          }
        }}
        id={'perPage'}
        onChange={onChange}
        value={String(currentState)}
      />
      Per page
    </label>
  );
}

const rowOptions = [4, 6, 8, 10, 12, 16, 24, 48].map((num) => String(num));
