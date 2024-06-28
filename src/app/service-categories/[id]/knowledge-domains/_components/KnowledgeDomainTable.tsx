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
import { useKnowledgeDtoTableProps } from '@/app/service-categories/[id]/knowledge-levels/_components/useKnowledgeDtoTableProps';
import {
  getEntityStringComparator,
  sortEntityListOnStringProperty
} from '@/functions/sortEntityListOnStringProperty';
import { TransientIdOffset } from '@/api/literals';
import { Button } from '@nextui-org/button';
import ChangeStartingOrdinal from '@/app/service-categories/[id]/knowledge-levels/_components/ChangeStartingOrdinal';

export function KnowledgeDomainTable({
  data,
  serviceCategory
}: {
  data: KnowledgeDomainDto[];
  serviceCategory: ServiceCategoryDto;
}) {
  const columns = useMemo(() => {
    return [{ name: serviceCategory.knowledgeDomainDescriptor, uid: 'name' }];
  }, [serviceCategory]);

  const { sortedRows, handleRemoveRow, masterListInteraction } =
    useKnowledgeDtoTableProps(
      serviceCategory,
      EntityClassMap.knowledgeDomain,
      domainSort,
      domainFactory
    );

  const renderCell = useCallback(
    (domain: KnowledgeDomainDto, columnKey: React.Key) => {
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
    },
    []
  );

  return (
    <DtoTable
      data={sortedRows}
      columns={columns}
      renderCell={renderCell}
      bottomContent={
        <div className={'grid grid-cols-3 gap-2'}>
          <Button onPress={masterListInteraction}>
            Add {serviceCategory.knowledgeDomainDescriptor}
          </Button>
          <Button onPress={handleRemoveRow}>
            Remove {serviceCategory.knowledgeDomainDescriptor}
          </Button>
        </div>
      }
    />
  );
}

const domainSort = getEntityStringComparator<KnowledgeDomainDto>('name');

const getDomainFactory = () => {
  let nextId = TransientIdOffset;
  return function (
    current: KnowledgeDomainDto[],
    serviceCategory: ServiceCategoryDto
  ) {
    const { knowledgeDomainDescriptor, id } = serviceCategory;
    const newDomain: KnowledgeDomainDto = {
      id: nextId,
      name: `${knowledgeDomainDescriptor} ${nextId}`,
      serviceCategoryId: id,
      knowledgeDomainDescriptor
    };
    nextId++;
    return newDomain;
  };
};

const domainFactory = getDomainFactory();
