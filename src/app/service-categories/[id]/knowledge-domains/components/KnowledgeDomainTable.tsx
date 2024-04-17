'use client';
import { KnowledgeDomainDto } from '@/app/api/dtos/KnowledgeDomainDtoSchema';
import React, { useCallback, useMemo } from 'react';
import { ServiceCategoryDto } from '@/app/api/dtos/ServiceCategoryDtoSchema';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { DtoStoreRename } from '@/components/generic/DtoStoreRename';
import { DtoTable } from '@/components/generic/DtoTable';

export function KnowledgeDomainTable({
  data,
  serviceCategory
}: {
  data: KnowledgeDomainDto[];
  serviceCategory: ServiceCategoryDto;
}) {
  const columns = useMemo(() => {
    return [
      { name: 'id', uid: 'id' },
      { name: serviceCategory.knowledgeDomainDescriptor, uid: 'name' },
      { name: 'Task Types', uid: 'workTaskTypeCount' }
    ];
  }, [serviceCategory]);

  const renderCell = useCallback(
    (domain: KnowledgeDomainDto, columnKey: React.Key) => {
      const cellValue = domain[columnKey as keyof KnowledgeDomainDto];

      switch (columnKey) {
        case 'name':
          return (
            <DtoStoreRename
              entity={domain}
              entityType={EntityNamesMap.knowledgeDomain}
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
