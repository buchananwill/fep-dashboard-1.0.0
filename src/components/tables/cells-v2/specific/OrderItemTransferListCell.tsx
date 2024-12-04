import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { Button } from '@mantine/core';
import { QueueListIcon } from '@heroicons/react/24/outline';

export function OrderItemTransferListCell({
  value,
  onChange
}: IdInnerCellProps<string>) {
  return (
    <Button leftSection={<QueueListIcon className={'w-6'} />} fullWidth>
      Order Items
    </Button>
  );
}
