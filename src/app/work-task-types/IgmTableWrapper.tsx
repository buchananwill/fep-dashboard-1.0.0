'use client';
import { useMemo } from 'react';
import IgmTable, { createRows } from '@/components/generic/IgmTable';
import { DtoControllerArray } from 'dto-stores';
import { SubmitTable } from '@/app/work-task-types/SubmitTable';
import { HasNameDto } from '@/app/api/dtos/HasNameDtoSchema';

export default function IgmTableWrapper<
  T extends HasNameDto,
  U extends HasNameDto
>({
  rowEntityName,
  columns,
  rows
}: {
  rowEntityName: string;
  rows: T[];
  columns: U[];
}) {
  const tableRows = useMemo(() => {
    return createRows(rows, columns);
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
        <SubmitTable rows={rows} columns={columns} />
      </div>
    </>
  );
}
