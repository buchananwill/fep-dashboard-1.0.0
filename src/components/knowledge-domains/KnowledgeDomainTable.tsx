'use client';
import React, { useCallback } from 'react';

import { EntityClassMap } from '@/api/entity-class-map';
import { DtoTable } from '@/components/generic/DtoTable';
import { LazyDtoUiWrapper } from 'dto-stores';
import {
  BaseDtoStoreStringInputProps,
  DtoStoreStringInput
} from '@/components/generic/DtoStoreStringInput';
import { Skeleton } from '@nextui-org/skeleton';
import { useKnowledgeDtoTableProps } from '@/components/knowledge-levels/useKnowledgeDtoTableProps';
import { getEntityStringComparator } from '@/functions/sortEntityListOnStringProperty';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/literals';
import { Button } from '@nextui-org/button';
import { getDomainAlias } from '@/api/getDomainAlias';
import { startCase } from 'lodash';
import { TypedPaths } from '@/functions/typePaths';
import { Column } from '@/types';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';

const columns: Column<KnowledgeDomainDto>[] = [
  { name: startCase(getDomainAlias('knowledgeDomain')), uid: 'name' },
  { name: 'ShortCode', uid: 'shortCode' }
];

export function KnowledgeDomainTable() {
  const { sortedRows, handleRemoveRow, masterListInteraction } =
    useKnowledgeDtoTableProps(
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
          stringKey={columnKey as TypedPaths<KnowledgeDomainDto, string>}
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

  const domainAlias = getDomainAlias('knowledgeDomain');
  return (
    <DtoTable
      data={sortedRows}
      columns={columns}
      renderCell={renderCell}
      bottomContent={
        <div className={'grid grid-cols-3 gap-2'}>
          <Button onPress={masterListInteraction}>Add {domainAlias}</Button>
          <Button onPress={handleRemoveRow}>Remove {domainAlias}</Button>
        </div>
      }
    />
  );
}

const domainSort = getEntityStringComparator<KnowledgeDomainDto>('name');

const getDomainFactory = () => {
  let nextId = ABSOLUTE_SMALLEST_TRANSIENT_ID;
  return function (current: KnowledgeDomainDto[]) {
    const newDomain: KnowledgeDomainDto = {
      id: nextId,
      name: `${getDomainAlias('knowledgeDomain')} ${nextId}`
    };
    nextId--;
    return newDomain;
  };
};

const domainFactory = getDomainFactory();
