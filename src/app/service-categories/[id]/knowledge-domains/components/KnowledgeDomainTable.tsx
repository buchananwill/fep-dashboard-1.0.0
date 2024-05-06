'use client';
import { KnowledgeDomainDto } from '@/app/api/dtos/KnowledgeDomainDtoSchema';
import React, { useCallback, useMemo } from 'react';
import { ServiceCategoryDto } from '@/app/api/dtos/ServiceCategoryDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { DtoStoreStringValueEdit } from '@/components/generic/DtoStoreStringValueEdit';
import { DtoTable } from '@/components/generic/DtoTable';
import { d } from '@nextui-org/slider/dist/use-slider-64459b54';

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
              entityType={EntityClassMap.knowledgeDomain}
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
