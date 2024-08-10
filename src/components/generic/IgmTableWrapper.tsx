'use client';
import IgmTable from '@/components/generic/IgmTable';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { SubmitTableButton } from '@/components/generic/SubmitTableButton';

import { TableProps } from '@nextui-org/react';
import { HasNameDto } from '@/api/zod-schemas/HasNameDtoSchema';
import {
  IntersectionGeneratorMatrix,
  IntersectionGeneratorRowWithHeader
} from '@/api/types';

export interface IgmTableWrapperProps<
  T extends HasNameDto,
  U extends HasNameDto
> {
  rowEntityClass: string;
  rows: T[];
  columns: U[];
  submitTo?: (matrix: IntersectionGeneratorMatrix<T, U>) => Promise<any>;
  tableRows: IntersectionGeneratorRowWithHeader<T>[];
  tableColumns: { name: string; uid: string }[];
}

export default function IgmTableWrapper<
  T extends HasNameDto,
  U extends HasNameDto
>({
  rowEntityClass,
  columns,
  rows,
  submitTo,
  tableRows,
  tableColumns,
  ...tableProps
}: IgmTableWrapperProps<T, U> & TableProps) {
  return (
    <>
      <EditAddDeleteDtoControllerArray
        dtoList={tableRows}
        entityClass={'generatorRow'}
      />
      <IgmTable
        rowEntityClass={rowEntityClass}
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
