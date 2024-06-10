'use client';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { DtoTable } from '@/components/generic/DtoTable';
import { KnowledgeLevelDto } from '@/api/dtos/KnowledgeLevelDtoSchema';
import { ServiceCategoryDto } from '@/api/dtos/ServiceCategoryDtoSchema';
import {
  BaseDtoStoreNumberInputProps,
  DtoStoreNumberInput
} from '@/components/generic/DtoStoreNumberInput';
import {
  DtoUiWrapper,
  Identifier,
  LazyDtoUiWrapper,
  NamespacedHooks,
  useMasterListInteraction
} from 'dto-stores';
import {
  BaseDtoStoreStringInputProps,
  DtoStoreStringInput
} from '@/components/generic/DtoStoreStringInput';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray, TransientIdOffset } from '@/api/literals';
import { Button } from '@nextui-org/button';
import { DispatchState } from '@/types';
import ChangeStartingOrdinal from '@/app/service-categories/[id]/knowledge-levels/_components/ChangeStartingOrdinal';

function sortLevelsOnOrdinal(
  level1: KnowledgeLevelDto,
  level2: KnowledgeLevelDto
) {
  return level1.levelOrdinal - level2.levelOrdinal;
}

const entityClass = EntityClassMap.knowledgeLevel;
export default function KnowledgeLevelTable({
  data,
  serviceCategory
}: {
  data: KnowledgeLevelDto[];
  serviceCategory: ServiceCategoryDto;
}) {
  const listenerKey = useUuidListenerKey();
  const { currentState, dispatchWithoutControl } =
    NamespacedHooks.useDispatchAndListen<KnowledgeLevelDto[]>(
      EntityClassMap.knowledgeLevel,
      KEY_TYPES.MASTER_LIST,
      listenerKey,
      EmptyArray as KnowledgeLevelDto[]
    );

  const dispatchDeleted = NamespacedHooks.useDispatch<number[]>(
    EntityClassMap.knowledgeLevel,
    KEY_TYPES.DELETED
  );
  const sortedLevels = useMemo(() => {
    return currentState.toSorted(sortLevelsOnOrdinal);
  }, [currentState]);

  const columns = useMemo(() => {
    return [
      { name: serviceCategory.knowledgeLevelDescriptor, uid: 'name' },
      { name: 'Ordinal', uid: 'levelOrdinal' }
    ];
  }, [serviceCategory]);

  const handleAddRow = useCallback(
    (
      dispatchMasterList: DispatchState<KnowledgeLevelDto[]>,
      dispatchAddedlist: DispatchState<Identifier[]>
    ) => {
      const levelOrdinal =
        sortedLevels.length > 0
          ? sortedLevels[sortedLevels.length - 1].levelOrdinal + 1
          : 1;
      const name = `${serviceCategory.knowledgeLevelDescriptor} ${levelOrdinal}`;
      const id = TransientIdOffset + levelOrdinal;
      const nextLevel: KnowledgeLevelDto = {
        name,
        levelOrdinal,
        id,
        serviceCategoryId: serviceCategory.id
      };
      dispatchMasterList((list) => [...list, nextLevel]);
      dispatchAddedlist((list) => [...list, id]);
    },
    [serviceCategory, sortedLevels]
  );

  const masterListInteraction = useMasterListInteraction(
    EntityClassMap.knowledgeLevel,
    handleAddRow
  );

  const handleRemoveRow = useCallback(() => {
    dispatchWithoutControl((list) => {
      return list.length > 1 ? list.slice(0, list.length - 1) : [];
    });

    dispatchDeleted((list) => [
      ...list,
      sortedLevels[sortedLevels.length - 1].id
    ]);
  }, [dispatchWithoutControl, sortedLevels, dispatchDeleted]);

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
      data={sortedLevels}
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
          <ChangeStartingOrdinal serviceCategory={serviceCategory} />
        </div>
      }
    />
  );
}
