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
import { EmptyArray } from '@/api/literals';
import { workTaskTypeName } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CreateViaSunburst';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  HasName,
  KnowledgeDomainDto
} from '@/api/generated-types/generated-types';
import { HasNumberId } from '@/api/types';
import { usePathSelectionListener } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/usePathSelectionListener';
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

  return null;
}

export type KnowledgeLevelGroupTemplate = SetOptional<
  KnowledgeLevelGroup,
  'knowledgeLevel' | 'workTaskTypeName'
>;

export const K_D_TEMPLATE_ID = 'template';
type KLGTemplate = SetOptional<
  KnowledgeLevelGroup,
  'knowledgeLevel' | 'workTaskTypeName'
>;

export const BlankKnowledgeDomain: KnowledgeDomainDto = {
  name: '',
  id: -1,
  shortCode: 'NA'
};

export type KLSGTemplate = SetOptional<
  KnowledgeLevelSeriesGroup,
  'knowledgeLevelSeries' | 'cycle'
>;

export const klsgTemplate: KLSGTemplate = {
  path: 'template',
  type: 'knowledgeLevelSeriesGroup',
  children: []
};
