'use client';
import { ServiceCategoryDto } from '@/app/api/dtos/ServiceCategoryDtoSchema';
import React, { useCallback, useMemo } from 'react';
import { DtoStoreStringValueEdit } from '@/components/generic/DtoStoreStringValueEdit';
import { EntityClassMap } from '@/app/api/entity-class-map';
import { DtoTable } from '@/components/generic/DtoTable';
import { KnowledgeLevelDto } from '@/app/api/dtos/KnowledgeLevelDtoSchema';
import { Chip } from '@nextui-org/chip';
import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';

const entityType = EntityClassMap.knowledgeLevel;
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
            <DtoStoreStringValueEdit
              entity={level}
              entityType={entityType}
              valueAccessor={(level) => level.name}
              producer={(name, level) => ({ ...level, name })}
              listenerKey={`${entityType}${level.id}`}
            />
          );
        case 'levelOrdinal':
          return (
            <DtoStoreNumberInput<KnowledgeLevelDto, number>
              entityId={level.id}
              entityType={entityType}
              numberUpdater={(entity, value) => ({
                ...entity,
                levelOrdinal: value
              })}
              numberAccessor={(entity) => entity.levelOrdinal}
              listenerKey={'levelOrdinalEdit'}
              className={
                'no-spinner w-12 rounded-lg p-2 bg-default-100 text-right'
              }
            />
          );
        // return <Chip>{level.levelOrdinal}</Chip>;
        default:
          return cellValue;
      }
    },
    []
  );

  return <DtoTable data={data} columns={columns} renderCell={renderCell} />;
}
