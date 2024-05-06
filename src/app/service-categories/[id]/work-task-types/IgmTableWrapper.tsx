'use client';
import { useMemo } from 'react';
import IgmTable from '@/components/generic/IgmTable';
import { DtoControllerArray } from 'dto-stores';
import { SubmitTableButton } from '@/app/service-categories/[id]/work-task-types/SubmitTableButton';
import { HasNameDto } from '@/app/api/dtos/HasNameDtoSchema';
import {
  IntersectionGeneratorMatrix,
  IntersectionGeneratorRowWithHeader
} from '@/api/main';
import { createRows } from '@/components/generic/createRows';
import JoyrideWrapper from '@/components/react-joyride/JoyrideWrapper';
import { TableProps } from '@nextui-org/react';

export default function IgmTableWrapper<
  T extends HasNameDto,
  U extends HasNameDto
>({
  rowEntityName,
  columns,
  rows,
  submitTo,
  tableRows,
  tableColumns,
  ...tableProps
}: {
  rowEntityName: string;
  rows: T[];
  columns: U[];
  submitTo?: (matrix: IntersectionGeneratorMatrix<T, U>) => Promise<any>;
  tableRows: IntersectionGeneratorRowWithHeader<T>[];
  tableColumns: { name: string; uid: string }[];
} & TableProps) {
  return (
    <>
      <DtoControllerArray dtoList={tableRows} entityName={'generatorRow'} />
      <IgmTable
        rowEntityName={rowEntityName}
        entityList={rows}
        tableRows={tableRows}
        tableColumns={tableColumns}
        {...tableProps}
      />
      <div className={'absolute bottom-4 left-1/2 '}>
        <SubmitTableButton
          rows={rows}
          columns={columns}
          targetEndpoint={submitTo}
        />
      </div>
    </>
  );
}
