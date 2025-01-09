'use client';
import { DeleteEntity } from '@/components/tables/cells-v2/generic/DeleteEntity';
import { useCallback } from 'react';
import { useGlobalDispatch } from 'selective-context';
import { workTypeIdInModal } from '@/components/tables/edit-tables/WorkTypeEditTable';
import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { Button, Popover } from '@mantine/core';

export function WorkTypeActionCell(props: IdInnerCellProps<number>) {
  const { entityId, value } = props;
  const { dispatchWithoutListen } = useGlobalDispatch(workTypeIdInModal);
  const openModal = useCallback(() => {
    dispatchWithoutListen(entityId);
  }, [dispatchWithoutListen, entityId]);

  return (
    <Popover shadow={'md'} zIndex={100}>
      <Popover.Target>
        <Button variant={'subtle'} fullWidth radius={'xs'}>
          {value}
        </Button>
      </Popover.Target>
      <Popover.Dropdown className={'flex flex-row items-center gap-2'}>
        <Button onClick={openModal}>Edit Resource Requirements</Button>
        <DeleteEntity {...props} columnKey={'id'} />
      </Popover.Dropdown>
    </Popover>
  );
}
