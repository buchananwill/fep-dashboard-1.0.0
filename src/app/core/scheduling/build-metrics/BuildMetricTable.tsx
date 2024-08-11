'use client';
import {
  BuildMetricDto,
  QueueTreeNodeDto
} from '@/api/generated-types/generated-types';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/table';
import { Column } from '@/types';
import { startCase } from 'lodash';
import { useClientSidePagination } from '@/hooks/useClientSidePagination';
import { useClientSideSorting } from '@/hooks/useClientSorting';
import { useClientFilteredSortedPagination } from '@/hooks/useClientFilteredSortedPagination';
import React, { useCallback, useMemo, useState } from 'react';
import { Pagination } from '@nextui-org/react';
import { WorkProjectSeriesNodeLink } from '@/app/core/scheduling/build-metrics/WorkProjectSeriesNodeLink';
import QueueTreeNodeModal from '@/app/core/scheduling/build-metrics/QueueTreeNodeModal';
import { LinkButton } from '@/app/service-categories/LinkButton';

const initialRowsPerPage = 10;
export default function BuildMetricTable({
  buildMetric
}: {
  buildMetric: BuildMetricDto;
}) {
  const { queueTreeNodes } = buildMetric;
  const nodeMap = useMemo(() => {
    return queueTreeNodes.reduce(
      (prev, curr) => prev.set(curr.id, curr),
      new Map<string, QueueTreeNodeDto>()
    );
  }, [queueTreeNodes]);

  const { rowsPerPage, page, setPage, onRowsPerPageChange } =
    useClientSidePagination(initialRowsPerPage);

  const pages = Math.ceil(queueTreeNodes.length / rowsPerPage);

  const { sortDescriptor, onSortChange, sortedItems } = useClientSideSorting(
    queueTreeNodes,
    'netFailureCount',
    'descending'
  );

  const { visibleItems, visibleItemsRef } = useClientFilteredSortedPagination(
    page,
    rowsPerPage,
    sortedItems
  );
  const [nodeInModal, setNodeInModal] = useState<QueueTreeNodeDto | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = useState(false);

  const onRowAction = useCallback(
    (key: React.Key) => {
      setNodeInModal(nodeMap.get(key as string));
      setIsOpen(true);
    },
    [setNodeInModal, nodeMap, setIsOpen]
  );

  const topContent = useMemo(() => {
    return (
      <div className={'flex justify-end'}>
        <label className="flex items-center text-small text-default-400">
          Rows per page:
          <select
            className="bg-transparent text-small text-default-400 outline-none"
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    );
  }, [rowsPerPage, onRowsPerPageChange]);

  const onModalClose = useCallback(() => setIsOpen(false), []);

  const classNames = useMemo(
    () => ({
      tr: 'odd:bg-default-100 ',
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-lg',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-lg'
      ]
    }),
    []
  );

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages, setPage]);

  return (
    <>
      <Table
        aria-label={'Queue Tree Node Details'}
        sortDescriptor={sortDescriptor}
        onSortChange={onSortChange}
        topContent={topContent}
        bottomContent={bottomContent}
        onRowAction={onRowAction}
        classNames={classNames}
      >
        <TableHeader columns={simpleKeys}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={'end'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={visibleItems}>
          {(item) => (
            <TableRow
              key={item.id}
              className={'cursor-pointer hover:bg-primary-500 hover:text-white'}
            >
              {(columnKey) => (
                <TableCell>
                  {renderQueueTreeNodeEntry(
                    columnKey as keyof QueueTreeNodeDto,
                    item
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <QueueTreeNodeModal
        queueTreeNode={nodeInModal}
        isOpen={isOpen}
        onClose={onModalClose}
      />
    </>
  );
}

export function renderQueueTreeNodeEntry(
  key: keyof QueueTreeNodeDto,
  entity: QueueTreeNodeDto
) {
  switch (key) {
    case 'workProjectSeriesNodeLinks':
      return entity[key].map((nodeLink) => (
        <WorkProjectSeriesNodeLink nodeLink={nodeLink} key={nodeLink.id} />
      ));
    default:
      return entity[key];
  }
}

const simpleKeys: Column<QueueTreeNodeDto>[] = [
  'nodeNumber',
  'netFailureCount',
  'batchSize',
  'taskSize',
  'degreeOfNesting',
  'totalAllocationArea'
].map((qtnKey) => ({
  uid: qtnKey as keyof QueueTreeNodeDto,
  name: startCase(qtnKey),
  sortable: true
}));
