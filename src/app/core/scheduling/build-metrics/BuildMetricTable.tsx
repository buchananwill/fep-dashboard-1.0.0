'use client';
import {
  BuildMetricDto,
  QueueTreeNodeDto,
  WorkProjectSeriesNodeLinkDto
} from '@/api/generated-types/generated-types_';
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
import React, { useMemo } from 'react';
import { Pagination } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

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
    'nodeNumber',
    'ascending'
  );

  const { visibleItems, visibleItemsRef } = useClientFilteredSortedPagination(
    page,
    rowsPerPage,
    sortedItems
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
    <Table
      aria-label={'Queue Tree Node Details'}
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
      topContent={topContent}
      bottomContent={bottomContent}
      onRowAction={(key) =>
        alert(JSON.stringify(nodeMap.get(key).workProjectSeriesNodeLinks))
      }
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
          <TableRow key={item.id}>
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
  );
}

function renderQueueTreeNodeEntry(
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

function WorkProjectSeriesNodeLink(props: {
  nodeLink: WorkProjectSeriesNodeLinkDto;
}) {
  return null;
}
