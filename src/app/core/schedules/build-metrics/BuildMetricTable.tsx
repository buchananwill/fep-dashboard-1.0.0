'use client';
import {
  BuildMetricDto,
  QueueTreeNodeDto
} from '@/api/generated-types/generated-types_';
import { Column } from '@/types';
import { startCase } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import QueueTreeNodeModal from '@/app/core/schedules/build-metrics/QueueTreeNodeModal';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import { useGlobalController } from 'selective-context';
import { useDisclosure } from '@mantine/hooks';
import QueueTreeNodeCell from '@/app/core/schedules/build-metrics/QueueTreeNodeCell';

const initialRowsPerPage = 10;
const entityClass = 'QueueTreeNode';
export const NodeInModal = 'nodeInModal';
export default function BuildMetricTable({
  buildMetric
}: {
  buildMetric: BuildMetricDto;
}) {
  const { currentState: nodeInModal } = useGlobalController<
    QueueTreeNodeDto | undefined
  >({
    contextKey: NodeInModal,
    initialValue: undefined,
    listenerKey: 'table'
  });

  const [opened, { open, close }] = useDisclosure();

  useEffect(() => {
    if (nodeInModal === undefined) {
      close();
    } else {
      open();
    }
  }, [nodeInModal, open, close]);

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={entityClass}
        dtoList={buildMetric.queueTreeNodes}
      />
      <EntityTable
        defaultSort={{ direction: 'desc', path: 'netFailureCount' }}
        entityClass={entityClass}
        columns={simpleKeys}
        cellModel={QueueTreeNodeCellModel}
      />
      <QueueTreeNodeModal
        queueTreeNode={nodeInModal}
        opened={opened}
        onClose={close}
      />
    </>
  );
}

const simpleKeys: Column<QueueTreeNodeDto>[] = [
  'nodeNumber',
  'netFailureCount',
  'taskSize'
].map((qtnKey) => ({
  uid: qtnKey as keyof QueueTreeNodeDto,
  name: startCase(qtnKey),
  sortable: true
}));

const QueueTreeNodeCellComponentRecord: CellComponentRecord<QueueTreeNodeDto> =
  {
    nodeNumber: { type: 'EntityInnerCell', component: QueueTreeNodeCell },
    netFailureCount: { type: 'EntityInnerCell', component: QueueTreeNodeCell },
    taskSize: { type: 'EntityInnerCell', component: QueueTreeNodeCell }
  };

const QueueTreeNodeCellModel = getCellRenderFunction(
  'queueTreeNode',
  QueueTreeNodeCellComponentRecord
);
