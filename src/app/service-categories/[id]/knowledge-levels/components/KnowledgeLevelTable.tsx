'use client';
import { ServiceCategoryDto } from '@/app/api/dtos/ServiceCategoryDtoSchema';
import React, { useCallback, useMemo } from 'react';
import { DtoStoreRename } from '@/app/service-categories/[id]/knowledge-domains/components/DtoStoreRename';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { DtoTable } from '@/app/service-categories/[id]/knowledge-domains/components/DtoTable';
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
            <DtoStoreRename
              entity={level}
              entityType={EntityNamesMap.knowledgeLevel}
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
