'use client';
import { ServiceCategoryDto } from '@/app/api/dtos/ServiceCategoryDtoSchema';
import React, { useCallback, useMemo } from 'react';
import { DtoStoreStringValueEdit } from '@/components/generic/DtoStoreStringValueEdit';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { DtoTable } from '@/components/generic/DtoTable';
import { KnowledgeLevelDto } from '@/app/api/dtos/KnowledgeLevelDtoSchema';
import { Chip } from '@nextui-org/chip';

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
      { name: 'Ordinal', uid: 'levelOrdinal' },
      { name: 'Task Types', uid: 'workTaskTypeCount' }
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
              entityType={EntityNamesMap.knowledgeLevel}
              valueAccessor={(level) => level.name}
              producer={(name, level) => ({ ...level, name })}
              listenerKey={`${EntityNamesMap.knowledgeLevel}${level.id}`}
            />
          );
        case 'levelOrdinal':
          return <Chip>{level.levelOrdinal}</Chip>;
        default:
          return cellValue;
      }
    },
    []
  );

  return <DtoTable data={data} columns={columns} renderCell={renderCell} />;
}
