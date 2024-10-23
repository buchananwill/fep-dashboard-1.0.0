'use client';
import { DeleteEntity } from '@/components/tables/cells-v2/DeleteEntity';
import { useCallback } from 'react';
import { useGlobalDispatch } from 'selective-context';
import { workTaskTypeIdInModal } from '@/components/tables/edit-v2/WorkTaskTypeEditTable';
import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { Button, Popover } from '@mantine/core';

export function WorkTaskTypeActionCell(props: IdInnerCellProps<number>) {
  const { entityId, value } = props;
  const { dispatchWithoutListen } = useGlobalDispatch(workTaskTypeIdInModal);
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
