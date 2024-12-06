'use client';
import React, { useCallback } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  KnowledgeLevelDto,
  KnowledgeLevelSeriesDto
} from '@/api/generated-types/generated-types_';
import ChangeStartingOrdinal from '@/components/knowledge-levels/ChangeStartingOrdinal';
import { useKnowledgeDtoTableProps } from '@/components/knowledge-levels/useKnowledgeDtoTableProps';
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

  return (
    <>
      {/* TODO Reimplement table. */}
      <div className={'grid grid-cols-3 gap-2'}>
        <Button onClick={masterListInteraction}>
          Add {knowledgeLevelSeries.knowledgeLevelDescriptor}
        </Button>
        <Button onClick={handleRemoveRow}>
          Remove {knowledgeLevelSeries.knowledgeLevelDescriptor}
        </Button>
        <ChangeStartingOrdinal />
      </div>
    </>
  );
}
