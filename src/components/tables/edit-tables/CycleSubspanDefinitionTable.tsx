'use client';

import React, { useCallback, useRef, useState } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  CycleInitWithCycleSubspanDefinitions,
  CycleSubspanDefinitionDto,
  DayOfWeek as DayOfWeekUpper
} from '@/api/generated-types/generated-types_';
import { Column, ColumnUid } from '@/types';
import RootCard from '@/components/generic/RootCard';

import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import EditNameCell from '@/components/tables/cells-v2/generic/EditNameCell';
import { DeleteEntity } from '@/components/tables/cells-v2/generic/DeleteEntity';
import { NumberEditCell } from '@/components/tables/cells-v2/generic/NumberEditCell';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import { IdWrapper } from '@/api/types';
import { TimeEditCell } from '@/components/tables/cells-v2/generic/TimeEditCell';
import { StringNumberListParserCell } from '@/components/tables/cells-v2/generic/StringNumberListParserCell';
import {
  getNumberUpdater,
  getStringUpdater
} from '@/functions/cellUpdaterFunctions';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/client-literals';
import { ExportDataButton } from '@/components/export/ExportDataButton';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { ImportDataButton } from '@/components/import/ImportDataButton';
import { useUploadData } from '@/hooks/useUploadData';
import { validate } from '@/functions/validateCycleSubspanDefinitionList';
import { useDataExportCallback } from '@/hooks/useDataExportCallback';
import { DayOfWeek, DayOfWeekArray } from '@/api/date-and-time';
import { Select } from '@mantine/core';
import classes from './cycleSubspanTable.module.css';

const entityType = EntityClassMap.cycleSubspanDefinition;

export default function CycleSubspanDefinitionTable({
  pathVariables
}: LeafComponentProps) {
  const [cycleStartDay, setCycleStartDay] = useState<DayOfWeek>(
    DayOfWeekArray[0]
  );

  const cycleStartDayRef = useRef(cycleStartDay);
  cycleStartDayRef.current = cycleStartDay;

  const onChangeStartDay = useCallback((v: string | null) => {
    if (v !== null) {
      setCycleStartDay(v as DayOfWeek);
    }
  }, []);

  const readAnyDto =
    useReadAnyDto<IdWrapper<CycleSubspanDefinitionDto>>(entityType);
  const { currentState } = NamespacedHooks.useListen(
    entityType,
    KEY_TYPES.ID_LIST,
    'cycle-definition-table',
    EmptyArray as string[]
  );
  const getCycleSubspanData = useDataExportCallback({
    idList: currentState,
    readAnyDto,
    type: 'unwrap'
  });

  const getData = useCallback(() => {
    const cycleSubspans: CycleSubspanDefinitionDto[] = JSON.parse(
      getCycleSubspanData()
    );
    const cycleInit: CycleInitWithCycleSubspanDefinitions = {
      cycleDayZero: cycleStartDayRef.current.toUpperCase() as DayOfWeekUpper,
      cycleSubspanDefinitions: cycleSubspans
    };
    return JSON.stringify(cycleInit);
  }, [getCycleSubspanData]);

  const dispatch = NamespacedHooks.useDispatch<
    IdWrapper<CycleSubspanDefinitionDto>[]
  >(entityType, KEY_TYPES.MASTER_LIST);

  const onChange = useUploadData({ validate, dispatch, type: 'single' });

  return (
    <>
      <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
        <div className={classes.selectDay}>
          <Select
            label={'Cycle Start Day'}
            allowDeselect={false}
            data={DayOfWeekArray}
            value={cycleStartDay}
            onChange={onChangeStartDay}
          />
        </div>
        <div className={'flex h-[500px] max-w-[80rem] flex-col p-2'}>
          <EntityTable
            entityClass={entityType}
            columns={cycleSubspanDefinitionColumns}
            cellModel={cycleSubspanDefinitionCellModel}
            defaultSort={Sorts['data.name']}
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
    </>
  );
}

export const cycleSubspanDefinitionColumns: Column<
  IdWrapper<CycleSubspanDefinitionDto>
>[] = [
  { uid: 'data.name', name: 'Name', sortable: true },
  {
    uid: 'data.zeroIndexedCycleDay',
    name: 'Zero-Indexed Cycle Day',
    sortable: true
  },
  {
    uid: 'data.startTime',
    name: 'Start Time',
    sortable: true
  },
  {
    uid: 'data.endTime',
    name: 'End Time',
    sortable: true
  },
  {
    uid: 'data.beginsGroupsOfSize',
    name: 'Begins Groups of Size',
    sortable: true
  }
];

const initialColumns: ColumnUid<IdWrapper<CycleSubspanDefinitionDto>>[] = [
  'data.name',
  'data.zeroIndexedCycleDay',
  'data.startTime',
  'data.endTime',
  'data.beginsGroupsOfSize'
];

const WorkSchemaEditTableCellRecord: CellComponentRecord<
  IdWrapper<CycleSubspanDefinitionDto>
> = {
  id: { type: 'CustomCell', component: DeleteEntity },
  'data.name': {
    type: 'IdInnerCell',
    component: EditNameCell,
    updater: getStringUpdater('data.name')
  },
  'data.zeroIndexedCycleDay': {
    type: 'IdInnerCell',
    component: NumberEditCell,
    updater: getNumberUpdater('data.zeroIndexedCycleDay')
  },
  'data.startTime': {
    type: 'IdInnerCell',
    component: TimeEditCell,
    updater: getStringUpdater('data.startTime')
  },
  'data.endTime': {
    type: 'IdInnerCell',
    component: TimeEditCell,
    updater: getStringUpdater('data.endTime')
  },
  'data.beginsGroupsOfSize': {
    type: 'IdInnerCell',
    component: StringNumberListParserCell,
    updater: getStringUpdater('data.beginsGroupsOfSize')
  }
};

export const cycleSubspanDefinitionCellModel = getCellRenderFunction(
  'cycleSubspanDefinition',
  WorkSchemaEditTableCellRecord
);
