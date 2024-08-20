'use client';
import { SetOptional } from 'type-fest';
import { KnowledgeLevelGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { useGlobalController, useGlobalReadAny } from 'selective-context';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/literals';
import { workTaskTypeName } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CreateViaSunburst';
import { useEffect } from 'react';
import { getEntityNamespaceContextKey } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceContextKey';
import {
  CycleDto,
  HasName,
  KnowledgeDomainDto,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types';
import { HasNumberId } from '@/api/types';
import { produce } from 'immer';

type WorkTaskTypeNameDto = HasName & HasNumberId;

const listenerKey = 'klg-controller';
export const knowledgeLevelGroup = 'knowledgeLevelGroup';
export default function KnowledgeLevelGroupManager() {
  const { dispatch } = useGlobalController({
    contextKey: knowledgeLevelGroup,
    initialValue: knowledgeLevelGroupTemplate,
    listenerKey: listenerKey
  });
  const readCycle = useReadAnyDto(EntityClassMap.cycle);
  const readWorkTaskTypeName = useReadAnyDto(workTaskTypeName);
  const readKnowledgeLevel = useReadAnyDto(EntityClassMap.knowledgeLevel);

  const { currentState: selectedKnowledgeLevelIdList } =
    NamespacedHooks.useListen(
      EntityClassMap.knowledgeLevel,
      KEY_TYPES.SELECTED,
      listenerKey,
      EmptyArray
    );
  const { currentState: selectedWorkTaskTypeNameIdList } =
    NamespacedHooks.useListen(
      workTaskTypeName,
      KEY_TYPES.SELECTED,
      listenerKey,
      EmptyArray
    );
  const { currentState: selectedCycleIdList } = NamespacedHooks.useListen(
    EntityClassMap.cycle,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray
  );

  useEffect(() => {
    const [cycle] = selectedCycleIdList.map(
      (cycleId) => readCycle(cycleId) as CycleDto
    );
    const [workTaskTypeName] = selectedWorkTaskTypeNameIdList.map(
      (wttName) => readWorkTaskTypeName(wttName) as WorkTaskTypeNameDto
    );
    const [knowledgeLevel] = selectedKnowledgeLevelIdList.map(
      (klName) => readKnowledgeLevel(klName) as KnowledgeLevelDto
    );
    dispatch((group) => {
      return produce(group, (draft) => {
        draft.knowledgeLevel = knowledgeLevel;
        draft.workTaskTypeName = workTaskTypeName;
        draft.cycle = cycle;
      });
    });
  }, [
    selectedWorkTaskTypeNameIdList,
    selectedCycleIdList,
    selectedKnowledgeLevelIdList,
    dispatch,
    readWorkTaskTypeName,
    readKnowledgeLevel,
    readCycle
  ]);

  return null;
}

export type KnowledgeLevelGroupTemplate = SetOptional<
  KnowledgeLevelGroup,
  'cycle' | 'knowledgeLevel' | 'workTaskTypeName'
>;

export const knowledgeLevelGroupTemplate: SetOptional<
  KnowledgeLevelGroup,
  'cycle' | 'knowledgeLevel' | 'workTaskTypeName'
> = {
  children: [],
  type: knowledgeLevelGroup,
  id: 'template'
};

export const BlankKnowledgeDomain: KnowledgeDomainDto = {
  name: '',
  id: -1,
  shortCode: 'NA'
};
