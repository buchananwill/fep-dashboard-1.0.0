'use client';
import { SetOptional } from 'type-fest';
import {
  KnowledgeLevelGroup,
  KnowledgeLevelSeriesGroup
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { useGlobalController, useGlobalDispatch } from 'selective-context';
import { ChangesCallbackMap, NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/client-literals';
import { workTypeCategory } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CreateViaSunburst';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  HasNameDto,
  KnowledgeDomainDto,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types_';
import { HasNumberId } from '@/api/types';
import { usePathSelectionListener } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/usePathSelectionListener';
import { useHasChangesFlagCallback } from 'dto-stores/dist/hooks/internal/useHasChangesFlagCallback';
import submitKnowledgeLevelSeriesGroup from '@/components/work-schema-nodes/nivo-sunburst-chart/create/submitAction';
import { makeKnowledgeLevelGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupFunctions';

type WorkTypeCategoryDto = HasNameDto & HasNumberId;

const listenerKey = 'klg-controller';
export const KnowledgeLevelSeriesGroupContextKey = 'knowledgeLevelSeriesGroup';
export default function KnowledgeLevelSeriesGroupManager({
  initialGroup
}: {
  initialGroup: KnowledgeLevelSeriesGroupTemplate;
}) {
  const { dispatch, currentState } = useGlobalController({
    contextKey: KnowledgeLevelSeriesGroupContextKey,
    initialValue: initialGroup,
    listenerKey: listenerKey
  });
  const mutableRefObject = useRef(currentState);

  const knowledgeLevels = currentState.knowledgeLevelSeries?.knowledgeLevels;

  useEffect(() => {
    dispatch((previousGroup) =>
      initializeKnowledgeLevelGroups(
        { ...previousGroup, children: [] },
        knowledgeLevels ?? []
      )
    );
  }, [knowledgeLevels, dispatch]);

  const readCycle = useReadAnyDto(EntityClassMap.cycle);
  const readWorkTypeCategory = useReadAnyDto(workTypeCategory);
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
    setHasChanges(false);
  }, []);

  useHasChangesFlagCallback(
    handleCommit,
    hasChanges,
    dispatchUnsavedFlag,
    KnowledgeLevelSeriesGroupContextKey
  );

  const { currentState: selectedKnowledgeLevelIdList } =
    NamespacedHooks.useListen(
      EntityClassMap.knowledgeLevel,
      KEY_TYPES.SELECTED,
      listenerKey,
      EmptyArray
    );
  const { currentState: selectedWorkTypeCategoryIdList } =
    NamespacedHooks.useListen(
      workTypeCategory,
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

  return null;
}

function initializeKnowledgeLevelGroups(
  template: KnowledgeLevelSeriesGroupTemplate,
  knowledgeLevels: KnowledgeLevelDto[]
) {
  return knowledgeLevels.reduce((prev, curr) => {
    const knowledgeLevelGroup = makeKnowledgeLevelGroup(prev, curr);
    return { ...prev, children: [...prev.children, knowledgeLevelGroup] };
  }, template);
}

export type KnowledgeLevelGroupTemplate = SetOptional<
  KnowledgeLevelGroup,
  'knowledgeLevel'
>;

export const K_D_TEMPLATE_ID = 'template';

export const BlankKnowledgeDomain: KnowledgeDomainDto = {
  name: '',
  id: -1,
  shortCode: 'NA'
};

export type KnowledgeLevelSeriesGroupTemplate = SetOptional<
  KnowledgeLevelSeriesGroup,
  'knowledgeLevelSeries' | 'cycle' | 'workTypeCategory'
>;

export const klsgTemplate: KnowledgeLevelSeriesGroupTemplate = {
  path: 'template',
  type: 'knowledgeLevelSeriesGroup',
  children: []
};
