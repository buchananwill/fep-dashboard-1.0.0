'use client';
import { DtoTable } from '@/components/generic/DtoTable';
import React, { useCallback } from 'react';
import { IntersectionGeneratorRowWithHeader } from '@/api/main';

import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';
import { TableProps } from '@nextui-org/react';
import { HasNameDto } from '@/api/dtos/HasNameDtoSchema';

export default function IgmTable<T extends HasNameDto>({
  rowEntityClass,
  tableRows,
  tableColumns,
  entityList,
  ...tableProps
}: {
  rowEntityClass: string;
  entityList: T[];
  tableRows: IntersectionGeneratorRowWithHeader<T>[];
  tableColumns: { name: string; uid: string }[];
} & TableProps) {
  const renderCell = useCallback(
    (
      rowWithHeader: IntersectionGeneratorRowWithHeader<T>,
      columnKey: React.Key
    ) => {
      const cellValue =
        rowWithHeader[columnKey as keyof IntersectionGeneratorRowWithHeader<T>];

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
              className={
                'rounded-md py-0.5 px-1 max-w-fit w-8 outline-blue-400 outline-offset-1 no-spinner text-right'
              }
            ></DtoStoreNumberInput>
          );
      }
    },
    [entityList]
  );

  return (
    <DtoTable
      columns={tableColumns}
      data={tableRows}
      renderCell={renderCell}
      {...tableProps}
    />
  );
}
