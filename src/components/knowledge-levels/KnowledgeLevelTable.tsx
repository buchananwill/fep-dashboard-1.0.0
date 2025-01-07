'use client';
import React, { useCallback } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  KnowledgeLevelDto,
  KnowledgeLevelSeriesDto
} from '@/api/generated-types/generated-types_';
import ChangeStartingOrdinal from '@/components/knowledge-levels/ChangeStartingOrdinal';
import { useSimpleDtoTableProps } from '@/components/knowledge-levels/useSimpleDtoTableProps';
import { getDomainAlias } from '@/api/getDomainAlias';
import { Column } from '@/types';
import { startCase } from 'lodash';
import { createNewLevel } from '@/components/knowledge-levels/createNewLevel';
import { sortLevelsOnOrdinal } from '@/components/knowledge-levels/sortLevelsOnOrdinal';
import { Button, Card, Table } from '@mantine/core';
import {
  BaseDtoStoreStringInputProps,
  DtoStoreStringInput
} from '@/components/generic/DtoStoreStringInput';
import { DtoUiWrapper } from 'dto-stores';

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
    useSimpleDtoTableProps(
      EntityClassMap.knowledgeLevel,
      sortLevelsOnOrdinal,
      createLevelWithinSeries
    );

  return (
    <Card>
      <Table>
        <Table.Tbody>
          {sortedRows.map((row) => (
            <Table.Tr key={row.id}>
              <Table.Td>
                <DtoUiWrapper<
                  KnowledgeLevelDto,
                  BaseDtoStoreStringInputProps<KnowledgeLevelDto>
                >
                  stringKey={'name'}
                  entityClass={EntityClassMap.knowledgeLevel}
                  entityId={row.id}
                  renderAs={DtoStoreStringInput}
                />
              </Table.Td>
              <Table.Td>{row.levelOrdinal}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <div className={'grid grid-cols-3 gap-2'}>
        <Button onClick={masterListInteraction}>
          Add {knowledgeLevelSeries.knowledgeLevelDescriptor}
        </Button>
        <Button onClick={handleRemoveRow}>
          Remove {knowledgeLevelSeries.knowledgeLevelDescriptor}
        </Button>
        <ChangeStartingOrdinal />
      </div>
    </Card>
  );
}
