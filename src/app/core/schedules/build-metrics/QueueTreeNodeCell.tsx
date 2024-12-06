import { EntityInnerCellProps } from '@/components/tables/core-table-types';
import { QueueTreeNodeDto } from '@/api/generated-types/generated-types_';
import { ColumnUid } from '@/types';
import { useGlobalDispatch } from 'selective-context';
import { NodeInModal } from '@/app/core/schedules/build-metrics/BuildMetricTable';
import { Button } from '@mantine/core';
import { get } from 'lodash';

export default function QueueTreeNodeCell({
  entity,
  columnKey
}: EntityInnerCellProps<
  QueueTreeNodeDto,
  string,
  ColumnUid<QueueTreeNodeDto>
>) {
  const { dispatchWithoutListen } = useGlobalDispatch(NodeInModal);

  const value = get(entity, columnKey);

  if (columnKey === 'workProjectSeriesNodeLinks') return null;

  return (
    <Button
      variant={'subtle'}
      fullWidth
      radius={'xs'}
      onClick={() => dispatchWithoutListen(entity)}
    >
      {String(value)}
    </Button>
  );
}
