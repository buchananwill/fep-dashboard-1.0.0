'use client';
import { SetOptional } from 'type-fest';
import {
  KnowledgeLevelGroup,
  KnowledgeLevelSeriesGroup,
  NestedWorkNode
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { useGlobalController, useGlobalReadAny } from 'selective-context';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/literals';
import { workTaskTypeName } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CreateViaSunburst';
import { useEffect, useRef } from 'react';
import { getEntityNamespaceContextKey } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceContextKey';
import {
  CycleDto,
  HasName,
  KnowledgeDomainDto,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types';
import { HasNumberId } from '@/api/types';
import { produce } from 'immer';
import { useSplitSelectionListener } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/Selectors';
import {
  getHierarchyList,
  joinPath
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/knowledgeLevelGroupFunctions';

type WorkTaskTypeNameDto = HasName & HasNumberId;

const listenerKey = 'klg-controller';
export const knowledgeLevelGroupContextKey = 'knowledgeLevelGroup';
export default function KnowledgeLevelGroupManager({
  initialGroup
}: {
  initialGroup: KnowledgeLevelGroupTemplate;
}) {
  const { dispatch } = useGlobalController({
    contextKey: knowledgeLevelGroupContextKey,
    initialValue: initialGroup,
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

  const selectionPath = useSplitSelectionListener(listenerKey);
  const selectionPathRef = useRef(selectionPath);

  useEffect(() => {
    if (selectionPath.length > 0) {
      const childId = joinPath(...selectionPath);
      dispatch((klg) => {
        return produce(klg, (draft) => {
          const hierarchyList = getHierarchyList(
            draft as NestedWorkNode,
            childId
          );
          const hierarchyListElement = hierarchyList[hierarchyList.length - 1];
          hierarchyListElement.selected = true;
        });
      });
      if (selectionPathRef.current.length > 0) {
        const childId = joinPath(...selectionPathRef.current);
        dispatch((klg) => {
          return produce(klg, (draft) => {
            const hierarchyList = getHierarchyList(
              draft as NestedWorkNode,
              childId
            );
            const hierarchyListElement =
              hierarchyList[hierarchyList.length - 1];
            hierarchyListElement.selected = false;
          });
        });
      }
      selectionPathRef.current = selectionPath;
    }
  }, [selectionPath, dispatch]);

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

export const K_D_TEMPLATE_ID = 'template';
type KLGTemplate = SetOptional<
  KnowledgeLevelGroup,
  'cycle' | 'knowledgeLevel' | 'workTaskTypeName'
>;
export const knowledgeLevelGroupTemplate: KLGTemplate = {
  children: [],
  type: 'knowledgeLevelGroup',
  path: K_D_TEMPLATE_ID,
  selected: true
};

export const BlankKnowledgeDomain: KnowledgeDomainDto = {
  name: '',
  id: -1,
  shortCode: 'NA'
};

type KLSGTemplate = SetOptional<
  KnowledgeLevelSeriesGroup,
  'knowledgeLevelSeries'
>;

export const klsgTemplate: KLSGTemplate = {
  path: 'template',
  type: 'knowledgeLevelSeriesGroup',
  children: []
};
