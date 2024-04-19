'use client';
import { useMemo } from 'react';
import IgmTable from '@/components/generic/IgmTable';
import { DtoControllerArray } from 'dto-stores';
import { SubmitTable } from '@/app/service-categories/[id]/work-task-types/SubmitTable';
import { HasNameDto } from '@/app/api/dtos/HasNameDtoSchema';
import { IntersectionGeneratorMatrix } from '@/app/api/main';
import { createRows } from '@/components/generic/createRows';

export default function IgmTableWrapper<
  T extends HasNameDto,
  U extends HasNameDto
>({
  rowEntityName,
  columns,
  rows,
  submitTo,
  defaultValue = 1
}: {
  rowEntityName: string;
  rows: T[];
  columns: U[];
  submitTo?: (matrix: IntersectionGeneratorMatrix<T, U>) => Promise<any>;
  defaultValue?: number;
}) {
  const tableRows = useMemo(() => {
    return createRows(rows, columns, defaultValue);
  }, [rows, columns]);

  const tableColumns = useMemo(() => {
    return [
      { name: rowEntityName, uid: 'id' },
      ...columns.map((column, index) => ({
        name: column.name,
        uid: `${index}`
      }))
    ];
  }, [columns, rowEntityName]);

  return (
    <>
      <DtoControllerArray dtoList={tableRows} entityName={'generatorRow'} />
      <IgmTable
        rowEntityName={rowEntityName}
        entityList={rows}
        tableRows={tableRows}
        tableColumns={tableColumns}
      />
      <div className={'fixed bottom-4 left-1/2 '}>
        <SubmitTable rows={rows} columns={columns} targetEndpoint={submitTo} />
      </div>
    </>
  );
}
