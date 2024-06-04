'use client';
import { DtoTable } from '@/components/generic/DtoTable';
import React, { useCallback } from 'react';
import { IntersectionGeneratorRowWithHeader } from '@/api/main';
import { TableProps } from '@nextui-org/react';
import { HasNameDto } from '@/api/dtos/HasNameDtoSchema';
import {
  BaseDtoStoreNumberInputProps,
  DtoStoreNumberInput,
  NumberPropertyKey
} from '@/components/generic/DtoStoreNumberInput';
import { DtoUiWrapper } from 'dto-stores';

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
            <DtoUiWrapper<
              IntersectionGeneratorRowWithHeader<T>,
              BaseDtoStoreNumberInputProps<
                IntersectionGeneratorRowWithHeader<T>
              >
            >
              entityClass={'generatorRow'}
              entityId={rowWithHeader.id}
              renderAs={DtoStoreNumberInput}
              numberKey={
                columnKey as NumberPropertyKey<
                  IntersectionGeneratorRowWithHeader<T>
                >
              }
            />
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
