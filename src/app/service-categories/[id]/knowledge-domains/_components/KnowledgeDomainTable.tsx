'use client';
import React, { useCallback, useMemo } from 'react';

import { EntityClassMap } from '@/api/entity-class-map';
import { DtoTable } from '@/components/generic/DtoTable';
import { KnowledgeDomainDto } from '@/api/dtos/KnowledgeDomainDtoSchema';
import { ServiceCategoryDto } from '@/api/dtos/ServiceCategoryDtoSchema';
import { LazyDtoUiWrapper } from 'dto-stores';
import {
  BaseDtoStoreStringInputProps,
  DtoStoreStringInput
} from '@/components/generic/DtoStoreStringInput';
import { Skeleton } from '@nextui-org/skeleton';

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
            <LazyDtoUiWrapper<
              KnowledgeDomainDto,
              BaseDtoStoreStringInputProps<KnowledgeDomainDto>
            >
              renderAs={DtoStoreStringInput}
              entityClass={EntityClassMap.knowledgeDomain}
              stringKey={'name'}
              entityId={domain.id}
              whileLoading={() => (
                <Skeleton>
                  <div className={'w-12'} />
                </Skeleton>
              )}
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
