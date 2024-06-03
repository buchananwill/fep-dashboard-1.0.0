'use client';
import React, { useCallback, useMemo } from 'react';

import { EntityClassMap } from '@/api/entity-class-map';
import { DtoStoreStringValueEdit } from '@/components/generic/DtoStoreStringValueEdit';
import { DtoTable } from '@/components/generic/DtoTable';
import { KnowledgeDomainDto } from '@/api/dtos/KnowledgeDomainDtoSchema';
import { ServiceCategoryDto } from '@/api/dtos/ServiceCategoryDtoSchema';

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
      { name: serviceCategory.knowledgeDomainDescriptor, uid: 'name' }
    ];
  }, [serviceCategory]);

  const renderCell = useCallback(
    (domain: KnowledgeDomainDto, columnKey: React.Key) => {
      const cellValue = domain[columnKey as keyof KnowledgeDomainDto];

      switch (columnKey) {
        case 'name':
          return (
            <DtoStoreStringValueEdit
              entity={domain}
              entityClass={EntityClassMap.knowledgeDomain}
              listenerKey={`${domain.id}:nameEdit`}
              valueAccessor={(domain) => domain.name}
              producer={(name, domain) => ({ ...domain, name })}
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
