'use client';
import { SetOptional } from 'type-fest';
import {
  KnowledgeLevelGroup,
  KnowledgeLevelSeriesGroup,
  NestedWorkNode
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import {
  useGlobalController,
  useGlobalDispatch,
  useGlobalReadAny
} from 'selective-context';
import { ChangesCallbackMap, NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/literals';
import { workTaskTypeName } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CreateViaSunburst';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getEntityNamespaceContextKey } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceContextKey';
import {
  CycleDto,
  HasName,
  KnowledgeDomainDto,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types';
import { HasNumberId } from '@/api/types';
import { produce } from 'immer';
import {
  findChildOrError,
  getHierarchyList,
  joinPath
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupFunctions';
import { usePathSelectionListener } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/usePathSelectionListener';
import { Api } from '@/api/clientApi_';
import { useHasChangesFlagCallback } from 'dto-stores/dist/hooks/internal/useHasChangesFlagCallback';
import submitKnowledgeLevelSeriesGroup from '@/components/work-schema-nodes/nivo-sunburst-chart/create/submitAction';

type WorkTaskTypeNameDto = HasName & HasNumberId;

const listenerKey = 'klg-controller';
export const knowledgeLevelSeriesGroupContextKey = 'knowledgeLevelSeriesGroup';
export default function KnowledgeLevelSeriesGroupManager({
  initialGroup
}: {
  initialGroup: KLSGTemplate;
}) {
  const { dispatch, currentState } = useGlobalController({
    contextKey: knowledgeLevelSeriesGroupContextKey,
    initialValue: initialGroup,
    listenerKey: listenerKey
  });
  const mutableRefObject = useRef(currentState);

  const readCycle = useReadAnyDto(EntityClassMap.cycle);
  const readWorkTaskTypeName = useReadAnyDto(workTaskTypeName);
  const readKnowledgeLevel = useReadAnyDto(EntityClassMap.knowledgeLevel);

  const { dispatchWithoutListen: dispatchUnsavedFlag } =
    useGlobalDispatch<ChangesCallbackMap>('unsavedChanges');

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (mutableRefObject.current !== currentState) {
      setHasChanges(true);
      mutableRefObject.current = currentState;
    }
  }, [currentState]);

  const handleCommit = useCallback(async () => {
    const response = await submitKnowledgeLevelSeriesGroup(
      mutableRefObject.current as KnowledgeLevelSeriesGroup
    );
    console.log(response);
    setHasChanges(false);
  }, []);

  useHasChangesFlagCallback(
    handleCommit,
    hasChanges,
    dispatchUnsavedFlag,
    knowledgeLevelSeriesGroupContextKey
  );

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

  const [joinedPath, selectionPath] = usePathSelectionListener(listenerKey);
  const selectionPathRef = useRef(selectionPath);
  /*
  useEffect(() => {
    if (selectionPath.length > 0) {
      const childId = joinPath(...selectionPath);
      dispatch((klsg) => {
        return produce(klsg, (draft) => {
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
        dispatch((klsg) => {
          return produce(klsg, (draft) => {
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
  
 */

  /*
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

    if (selectionPathRef.current.length > 2) {
      dispatch((group) => {
        return produce(group, (draft) => {
          const child = findChildOrError<
            KnowledgeLevelSeriesGroup,
            KnowledgeLevelGroup
          >(
            draft as KnowledgeLevelSeriesGroup,
            joinPath(...selectionPathRef.current.slice(0, 2))
          );
          if (child.type === 'knowledgeLevelGroup') {
            child.knowledgeLevel = knowledgeLevel;
            child.workTaskTypeName = workTaskTypeName;
            child.cycle = cycle;
          }
        });
      });
    }
  }, [
    selectedWorkTaskTypeNameIdList,
    selectedCycleIdList,
    selectedKnowledgeLevelIdList,
    dispatch,
    readWorkTaskTypeName,
    readKnowledgeLevel,
    readCycle
  ]);
    */

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

export type KLSGTemplate = SetOptional<
  KnowledgeLevelSeriesGroup,
  'knowledgeLevelSeries'
>;

export const klsgTemplate: KLSGTemplate = {
  path: 'template',
  type: 'knowledgeLevelSeriesGroup',
  children: []
};