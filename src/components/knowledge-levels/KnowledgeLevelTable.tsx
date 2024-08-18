'use client';
import React, { useCallback, useMemo } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { DtoTable } from '@/components/generic/DtoTable';
import { KnowledgeLevelDto } from '@/api/zod-schemas/KnowledgeLevelDtoSchema';
import { ServiceCategoryDto } from '@/api/zod-schemas/ServiceCategoryDtoSchema';
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
import { TransientIdOffset } from '@/api/literals';
import { Button } from '@nextui-org/button';
import ChangeStartingOrdinal from '@/components/knowledge-levels/ChangeStartingOrdinal';
import { useKnowledgeDtoTableProps } from '@/components/knowledge-levels/useKnowledgeDtoTableProps';
import { KnowledgeLevelSeriesDto } from '@/api/generated-types/generated-types';

function sortLevelsOnOrdinal(
  level1: KnowledgeLevelDto,
  level2: KnowledgeLevelDto
) {
  return level1.levelOrdinal - level2.levelOrdinal;
}

const entityClass = EntityClassMap.knowledgeLevel;

function createNewLevel(
  sortedLevels: KnowledgeLevelDto[],
  knowledgeLevelSeriesDto: KnowledgeLevelSeriesDto
) {
  const levelOrdinal =
    sortedLevels.length > 0
      ? sortedLevels[sortedLevels.length - 1].levelOrdinal + 1
      : 1;
  const name = `${knowledgeLevelSeriesDto.knowledgeLevelDescriptor} ${levelOrdinal}`;
  const id = TransientIdOffset + levelOrdinal;
  const nextLevel: KnowledgeLevelDto = {
    name,
    levelOrdinal,
    id,
    serviceCategoryId: knowledgeLevelSeriesDto.id
  };
  return nextLevel;
}

export default function KnowledgeLevelTable({
  data,
  serviceCategory
}: {
  data: KnowledgeLevelDto[];
  serviceCategory: KnowledgeLevelSeriesDto;
}) {
  const columns = useMemo(() => {
    return [
      { name: serviceCategory.knowledgeLevelDescriptor, uid: 'name' },
      { name: 'Ordinal', uid: 'levelOrdinal' }
    ];
  }, [serviceCategory]);

  const { handleRemoveRow, masterListInteraction, sortedRows } =
    useKnowledgeDtoTableProps(
      serviceCategory,
      EntityClassMap.knowledgeLevel,
      sortLevelsOnOrdinal,
      createNewLevel
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
      } else {
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
      }
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
            Add {serviceCategory.knowledgeLevelDescriptor}
          </Button>
          <Button onPress={handleRemoveRow}>
            Remove {serviceCategory.knowledgeLevelDescriptor}
          </Button>
          <ChangeStartingOrdinal />
        </div>
      }
    />
  );
}
