'use client';
import React, { useMemo } from 'react';

import { EntityClassMap } from '@/api/entity-class-map';
import {
  DtoUiWrapper,
  LazyDtoUiWrapper,
  NamespacedHooks,
  useLazyDtoListListener
} from 'dto-stores';
import {
  BaseDtoStoreStringInputProps,
  DtoStoreStringInput
} from '@/components/generic/DtoStoreStringInput';
import { Skeleton } from '@nextui-org/skeleton';
import { getEntityStringComparator } from '@/functions/sortEntityListOnStringProperty';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID, EmptyArray } from '@/api/literals';
import { getDomainAlias } from '@/api/getDomainAlias';
import { startCase } from 'lodash';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { Column } from '@/types';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { useGlobalListener, useGlobalListenerGroup } from 'selective-context';
import { initialMap } from '@/app/_literals';
import { getCellRenderFunction } from '@/components/tables/GetCellRenderFunction';
import { RenameAndDeleteCell } from '@/components/work-project-series-schema/_components/RenameAndDeleteCell';
import { StringValueChip } from '@/components/generic/StringValueChip';
import { useFilterOutDeletedEntities } from '@/components/tables/edit-tables/useFilterOutDeletedEntities';

const columns: Column<KnowledgeDomainDto>[] = [
  { name: startCase(getDomainAlias('knowledgeDomain')), uid: 'name' },
  { name: 'ShortCode', uid: 'shortCode' }
];

const entityType = EntityClassMap.knowledgeDomain;

const cellRenderFunction = getCellRenderFunction<KnowledgeDomainDto>(
  {
    name: RenameAndDeleteCell,
    shortCode: StringValueChip
  },
  entityType
);

const renderCell = (domain: KnowledgeDomainDto, columnKey: React.Key) => {
  return (
    <DtoUiWrapper<
      KnowledgeDomainDto,
      BaseDtoStoreStringInputProps<KnowledgeDomainDto>
    >
      renderAs={DtoStoreStringInput}
      entityClass={EntityClassMap.knowledgeDomain}
      stringKey={columnKey as TypedPaths<KnowledgeDomainDto, string>}
      entityId={domain.id}
    />
  );
};

export function KnowledgeDomainTable() {
  const entities = useFilterOutDeletedEntities<KnowledgeDomainDto>(entityType);

  return (
    <FilterSelectEntityTable
      columns={columns}
      entityClass={entityType}
      entities={entities}
      selectionMode={'none'}
      initialColumns={['name', 'shortCode']}
      filterProperty={'name'}
      renderCell={cellRenderFunction}
    />
  );
}

const domainSort = getEntityStringComparator<KnowledgeDomainDto>('name');

const getDomainFactory = () => {
  let nextId = ABSOLUTE_SMALLEST_TRANSIENT_ID;
  return function (current: KnowledgeDomainDto[]) {
    const newDomain: KnowledgeDomainDto = {
      id: nextId,
      name: `${getDomainAlias('knowledgeDomain')} ${nextId * -1}`
    };
    nextId--;
    return newDomain;
  };
};

const domainFactory = getDomainFactory();
