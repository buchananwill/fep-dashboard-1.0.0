'use client';
import React, { useCallback } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { DtoTable } from '@/components/tables/DtoTable';
import { KnowledgeLevelDto } from '@/api/generated-types/generated-types';
import {
  BaseDtoStoreNumberInputProps,
  DtoStoreNumberInput
} from '@/components/generic/DtoStoreNumberInput';
import { LazyDtoUiWrapper } from 'dto-stores';
import {
  BaseDtoStoreStringInputProps,
  DtoStoreStringInput
} from '@/components/generic/DtoStoreStringInput';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import ChangeStartingOrdinal from '@/components/knowledge-levels/ChangeStartingOrdinal';
import { useKnowledgeDtoTableProps } from '@/components/knowledge-levels/useKnowledgeDtoTableProps';
import { KnowledgeLevelSeriesDto } from '@/api/generated-types/generated-types';
import { Paths } from 'type-fest';
import { getDomainAlias } from '@/api/getDomainAlias';
import { Column } from '@/types';
import { startCase } from 'lodash';
import { createNewLevel } from '@/components/knowledge-levels/createNewLevel';
import { sortLevelsOnOrdinal } from '@/components/knowledge-levels/sortLevelsOnOrdinal';
import { Button } from '@mantine/core';

const entityClass = EntityClassMap.knowledgeLevel;

const columns: Column<KnowledgeLevelDto>[] = [
  { name: startCase(getDomainAlias('knowledgeLevel')), uid: 'name' },
  { name: 'Ordinal', uid: 'levelOrdinal' }
];

export default function KnowledgeLevelTable({
  data,
  knowledgeLevelSeries
}: {
  data: KnowledgeLevelDto[];
  knowledgeLevelSeries: KnowledgeLevelSeriesDto;
}) {
  const createLevelWithinSeries = useCallback(
    (sortedLevels: KnowledgeLevelDto[]) => {
      return createNewLevel(sortedLevels, knowledgeLevelSeries);
    },
    [knowledgeLevelSeries]
  );

  const { handleRemoveRow, masterListInteraction, sortedRows } =
    useKnowledgeDtoTableProps(
      EntityClassMap.knowledgeLevel,
      sortLevelsOnOrdinal,
      createLevelWithinSeries
    );

  const renderCell = useCallback(
    (level: KnowledgeLevelDto, columnKey: React.Key) => {
      if (columnKey === 'name') {
        return (
          <LazyDtoUiWrapper<
            KnowledgeLevelDto,
            BaseDtoStoreStringInputProps<KnowledgeLevelDto>
          >
            entityClass={entityClass}
            entityId={level.id}
            renderAs={DtoStoreStringInput}
            stringKey={'name'}
            whileLoading={() => <PendingOverlay pending={true} />}
          />
        );
      } else if ((columnKey as Paths<KnowledgeLevelDto>) === 'levelOrdinal') {
        return (
          <LazyDtoUiWrapper<
            KnowledgeLevelDto,
            BaseDtoStoreNumberInputProps<KnowledgeLevelDto>
          >
            renderAs={DtoStoreNumberInput}
            className={'w-12'}
            entityClass={entityClass}
            numberKey={'levelOrdinal'}
            entityId={level.id}
            whileLoading={() => <PendingOverlay pending={true} />}
            disabled={true}
          />
        );
      } else return null;
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
          <Button onClick={masterListInteraction}>
            Add {knowledgeLevelSeries.knowledgeLevelDescriptor}
          </Button>
          <Button onClick={handleRemoveRow}>
            Remove {knowledgeLevelSeries.knowledgeLevelDescriptor}
          </Button>
          <ChangeStartingOrdinal />
        </div>
      }
    />
  );
}
