'use client';
import React, { useCallback, useMemo } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { DtoTable } from '@/components/generic/DtoTable';
import { KnowledgeLevelDto } from '@/api/dtos/KnowledgeLevelDtoSchema';
import { ServiceCategoryDto } from '@/api/dtos/ServiceCategoryDtoSchema';
import {
  BaseDtoStoreNumberInputProps,
  DtoStoreNumberInput
} from '@/components/generic/DtoStoreNumberInput';
import { DtoUiWrapper, LazyDtoUiWrapper } from 'dto-stores';
import {
  BaseDtoStoreStringInputProps,
  DtoStoreStringInput
} from '@/components/generic/DtoStoreStringInput';
import { PendingOverlay } from '@/components/overlays/pending-overlay';

const entityClass = EntityClassMap.knowledgeLevel;
export default function KnowledgeLevelTable({
  data,
  serviceCategory
}: {
  data: KnowledgeLevelDto[];
  serviceCategory: ServiceCategoryDto;
}) {
  const columns = useMemo(() => {
    return [
      { name: 'id', uid: 'id' },
      { name: serviceCategory.knowledgeLevelDescriptor, uid: 'name' },
      { name: 'Ordinal', uid: 'levelOrdinal' }
    ];
  }, [serviceCategory]);

  const renderCell = useCallback(
    (level: KnowledgeLevelDto, columnKey: React.Key) => {
      const cellValue = level[columnKey as keyof KnowledgeLevelDto];

      switch (columnKey) {
        case 'name':
          return (
            <LazyDtoUiWrapper<
              KnowledgeLevelDto,
              BaseDtoStoreStringInputProps<KnowledgeLevelDto>
            >
              entityClass={entityClass}
              entityId={level.id}
              renderAs={DtoStoreStringInput}
              stringKey={'name'}
              whileLoading={() => <PendingOverlay pending={true} />}
            />
          );
        case 'levelOrdinal':
          return (
            <LazyDtoUiWrapper<
              KnowledgeLevelDto,
              BaseDtoStoreNumberInputProps<KnowledgeLevelDto>
            >
              renderAs={DtoStoreNumberInput}
              entityClass={entityClass}
              numberKey={'levelOrdinal'}
              entityId={level.id}
              whileLoading={() => <PendingOverlay pending={true} />}
            />
          );

        default:
          return cellValue;
      }
    },
    []
  );

  return <DtoTable data={data} columns={columns} renderCell={renderCell} />;
}
