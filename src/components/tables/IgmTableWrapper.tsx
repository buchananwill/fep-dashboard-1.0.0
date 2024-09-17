'use client';
import IgmTable from '@/components/tables/IgmTable';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { SubmitTableButton } from '@/components/generic/SubmitTableButton';

import { TableProps } from '@nextui-org/react';
import { HasName } from '@/api/generated-types/generated-types';
import {
  IntersectionGeneratorMatrix,
  IntersectionGeneratorRowWithHeader
} from '@/api/types';

export interface IgmTableWrapperProps<T extends HasName, U extends HasName> {
  rowEntityClass: string;
  rows: T[];
  columns: U[];
  submitTo?: (matrix: IntersectionGeneratorMatrix<T, U>) => Promise<any>;
  tableRows: IntersectionGeneratorRowWithHeader<T>[];
  tableColumns: { name: string; uid: string }[];
}

export default function IgmTableWrapper<T extends HasName, U extends HasName>({
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
