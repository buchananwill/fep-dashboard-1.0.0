'use client';
import React, { useCallback, useMemo } from 'react';

import { EntityClassMap } from '@/api/entity-class-map';
import { DtoTable } from '@/components/generic/DtoTable';
import { KnowledgeDomainDto } from '@/api/zod-schemas/KnowledgeDomainDtoSchema';
import { LazyDtoUiWrapper } from 'dto-stores';
import {
  BaseDtoStoreStringInputProps,
  DtoStoreStringInput
} from '@/components/generic/DtoStoreStringInput';
import { Skeleton } from '@nextui-org/skeleton';
import { useKnowledgeDtoTableProps } from '@/components/knowledge-levels/useKnowledgeDtoTableProps';
import { getEntityStringComparator } from '@/functions/sortEntityListOnStringProperty';
import { TransientIdOffset } from '@/api/literals';
import { Button } from '@nextui-org/button';
import { getDomainAlias } from '@/api/getDomainAlias';
import { startCase } from 'lodash';
import { TypedPaths } from '@/functions/typePaths';

export function KnowledgeDomainTable({ data }: { data: KnowledgeDomainDto[] }) {
  const columns = useMemo(() => {
    return [
      { name: startCase(getDomainAlias('knowledgeDomain')), uid: 'name' },
      { name: 'ShortCode', uid: 'shortCode' }
    ];
  }, []);

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
  let nextId = TransientIdOffset;
  return function (current: KnowledgeDomainDto[]) {
    const newDomain: KnowledgeDomainDto = {
      id: nextId,
      name: `${getDomainAlias('knowledgeDomain')} ${nextId}`
    };
    nextId++;
    return newDomain;
  };
};

const domainFactory = getDomainFactory();
