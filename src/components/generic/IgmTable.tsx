'use client';
import { DtoTable } from '@/components/generic/DtoTable';
import React, { useCallback } from 'react';
import { TableProps } from '@nextui-org/react';
import { HasNameDto } from '@/api/zod-schemas/HasNameDtoSchema';
import {
  BaseDtoStoreNumberInputProps,
  DtoStoreNumberInput
} from '@/components/generic/DtoStoreNumberInput';
import { DtoUiWrapper } from 'dto-stores';
import { IntersectionGeneratorRowWithHeader } from '@/api/types';
import { NumberPropertyKey } from '@/types';

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
              className={'w-12'}
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
