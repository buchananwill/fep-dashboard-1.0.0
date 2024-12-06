'use client';

import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselOrderSummaryDto } from '@/api/generated-types/generated-types';
import { Column } from '@/types';
import RootCard from '@/components/generic/RootCard';

import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import { DeleteEntity } from '@/components/tables/cells-v2/generic/DeleteEntity';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import { getStringUpdater } from '@/functions/cellUpdaterFunctions';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { ExportDataButton } from '@/components/export/ExportDataButton';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { ImportDataButton } from '@/components/import/ImportDataButton';
import { useUploadData } from '@/hooks/useUploadData';
import { validate } from '@/functions/validation/validateCarouselOrderSummaryList';
import { EditDateCell } from '@/components/tables/cells-v2/generic/EditDateCell';
import { SelectCarouselGroupNameCell } from '@/components/tables/cells-v2/specific/SelectCarouselGroupCell';
import { OrderItemTransferListCell } from '@/components/tables/cells-v2/specific/OrderItemTransferListCell';
import EditTextWithModalCell from '@/components/tables/cells-v2/generic/EditTextWithModalCell';
import { useDataExportCallback } from '@/hooks/useDataExportCallback';

const entityType = EntityClassMap.carouselOrderSummary;

export function CarouselOrderSummaryTable({
  pathVariables
}: LeafComponentProps) {
  const readAnyDto = useReadAnyDto<CarouselOrderSummaryDto>(entityType);
  const { currentState } = NamespacedHooks.useListen(
    entityType,
    KEY_TYPES.ID_LIST,
    'carousel-order-summary-table',
    EmptyArray as number[]
  );
  const getData = useDataExportCallback({
    idList: currentState,
    readAnyDto,
    type: 'raw'
  });

  const dispatch = NamespacedHooks.useDispatch<CarouselOrderSummaryDto[]>(
    entityType,
    KEY_TYPES.MASTER_LIST
  );

  const onChange = useUploadData({ validate, dispatch, type: 'single' });

  return (
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      <div className={'flex h-[600px] max-w-[80rem] flex-col p-2'}>
        <EntityTable
          entityClass={entityType}
          columns={carouselOrderSummaryColumns}
          cellModel={carouselOrderSummaryCellModel}
          defaultSort={Sorts.carouselGroupName}
        />
      </div>
      <div className={'center-all-margin flex w-fit gap-2 p-2'}>
        <ImportDataButton onChange={onChange} accept={'application/json'} />
        <ExportDataButton
          downloadProps={{ getData }}
          rightSection={<ArrowDownTrayIcon className={'w-6'} />}
        >
          Export
        </ExportDataButton>
      </div>
    </RootCard>
  );
}

export const carouselOrderSummaryColumns: Column<CarouselOrderSummaryDto>[] = [
  {
    uid: 'fName',
    name: 'First Name',
    sortable: true
  },
  {
    uid: 'lName',
    name: 'Last Name',
    sortable: true
  },
  {
    uid: 'dateOfBirth',
    name: 'Date of Birth',
    sortable: true
  },
  {
    uid: 'carouselGroupName',
    name: 'Carousel Group',
    sortable: true
  },
  {
    uid: 'orderItems',
    name: 'Order Items',
    sortable: false
  }
];

const carouselOrderSummaryCellRecord: CellComponentRecord<CarouselOrderSummaryDto> =
  {
    id: { type: 'CustomCell', component: DeleteEntity },
    fName: {
      type: 'IdInnerCell',
      component: EditTextWithModalCell,
      updater: getStringUpdater('fName')
    },
    lName: {
      type: 'IdInnerCell',
      component: EditTextWithModalCell,
      updater: getStringUpdater('lName')
    },
    dateOfBirth: {
      type: 'IdInnerCell',
      component: EditDateCell,
      updater: getStringUpdater('dateOfBirth')
    },
    carouselGroupName: {
      type: 'IdInnerCell',
      component: SelectCarouselGroupNameCell,
      updater: getStringUpdater('carouselGroupName')
    },
    orderItems: {
      type: 'IdInnerCell',
      component: OrderItemTransferListCell,
      updater: getStringUpdater('orderItems')
    }
  };

export const carouselOrderSummaryCellModel = getCellRenderFunction(
  'carouselOrderSummary',
  carouselOrderSummaryCellRecord
);
