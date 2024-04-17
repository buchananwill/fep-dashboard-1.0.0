'use client';
import { DtoTable } from '@/components/generic/DtoTable';
import React, { useCallback, useMemo } from 'react';
import {
  IntersectionGeneratorRow,
  IntersectionGeneratorRowWithHeader
} from '@/app/api/main';
import { HasNameDto } from '@/app/api/dtos/HasNameDtoSchema';
import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';

export function createRows<T, U>(
  rows: T[],
  columns: U[]
): IntersectionGeneratorRowWithHeader<T>[] {
  return rows.map((row, index) => ({
    id: index, // Plus any other details you need from the subject
    ...columns.reduce(
      (acc, level, index) => ({
        ...acc,
        [index.toString()]: 0 // Initialize level columns to 0
      }),
      {} as IntersectionGeneratorRow
    )
  }));
}

export default function IgmTable<T extends HasNameDto, U extends HasNameDto>({
  rowEntityName,
  tableRows,
  tableColumns,
  entityList
}: {
  rowEntityName: string;
  entityList: T[];
  tableRows: IntersectionGeneratorRowWithHeader<T>[];
  tableColumns: { name: string; uid: string }[];
}) {
  console.log(tableRows);

  const renderCell = useCallback(
    (
      rowWithHeader: IntersectionGeneratorRowWithHeader<T>,
      columnKey: React.Key
    ) => {
      const cellValue =
        rowWithHeader[columnKey as keyof IntersectionGeneratorRowWithHeader<T>];
      console.log(cellValue);

      switch (columnKey) {
        case 'id':
          return entityList[cellValue].name;
        default:
          return (
            <DtoStoreNumberInput<
              IntersectionGeneratorRowWithHeader<T>,
              string | number
            >
              entityType={'generatorRow'}
              listenerKey={`${rowWithHeader.id}:${columnKey}`}
              entityId={rowWithHeader.id}
              numberAccessor={(entity) =>
                entity[columnKey as keyof IntersectionGeneratorRowWithHeader<T>]
              }
              numberUpdater={(entity, value) => ({
                ...entity,
                [columnKey as keyof IntersectionGeneratorRowWithHeader<T>]:
                  value
              })}
            ></DtoStoreNumberInput>
          );
      }
    },
    [entityList, tableRows]
  );

  return (
    <DtoTable columns={tableColumns} data={tableRows} renderCell={renderCell} />
  );
}
