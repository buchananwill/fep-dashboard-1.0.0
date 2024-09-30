import {
  KnowledgeDomainGroup,
  KnowledgeLevelSeriesGroup
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { DispatchState } from '@/types';
import { getWorkNodeHierarchyLabel } from '@/components/work-schema-nodes/nivo-sunburst-chart/nestedWorkNodeArcLabel';
import { InitialMap, NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/literals';
import { Select, Selection } from '@nextui-org/react';
import { SelectItem } from '@nextui-org/select';
import {
  KnowledgeDomain,
  KnowledgeDomainDto
} from '@/api/generated-types/generated-types';
import { useCallback, useMemo, useRef } from 'react';
import { isNotUndefined } from '@/api/main';
import { replaceKnowledgeDomainsInGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupProducers';
import * as os from 'node:os';

export function KnowledgeDomainGroupEdit({
  knowledgeDomainGroup,
  dispatch,
  currentPath
}: {
  currentTree: KnowledgeLevelSeriesGroup;
  dispatch: DispatchState<KnowledgeLevelSeriesGroup>;
  currentPath: string;
  knowledgeDomainGroup: KnowledgeDomainGroup;
}) {
  const { path, knowledgeDomains } = knowledgeDomainGroup;
  const { currentState } = NamespacedHooks.useListen<
    Map<string, KnowledgeDomainDto>
  >(
    EntityClassMap.knowledgeDomain,
    KEY_TYPES.MASTER_MAP,
    `edit:${knowledgeDomainGroup.path}`,
    InitialMap as Map<string, KnowledgeDomainDto>
  );

  const selectionKeys = useMemo(() => {
    return knowledgeDomains.map((kd) => String(kd.id));
  }, [knowledgeDomains]);

  const selectionKeysRef = useRef(selectionKeys);
  selectionKeysRef.current = selectionKeys;

  const onSelectionChange = useCallback(
    (selection: Selection) => {
      let updatedDomains = [...currentState.values()];
      if (selection !== 'all') {
        const setOfAdded = [...selection.values()] as string[];
        updatedDomains = setOfAdded
          .map((addedKd) =>
            currentState.get(`${EntityClassMap.knowledgeDomain}:${addedKd}`)
          )
          .filter(isNotUndefined);
      }
      dispatch(
        (prev) =>
          replaceKnowledgeDomainsInGroup(
            prev,
            currentPath,
            updatedDomains
          ) as KnowledgeLevelSeriesGroup
      );
    },
    [currentPath, currentState, dispatch]
  );

  return (
    <Select
      items={currentState.values()}
      selectionMode={'multiple'}
      selectedKeys={selectionKeys}
      onSelectionChange={onSelectionChange}
    >
      {(item) => (
        <SelectItem key={item.id} aria-label={item.name} value={item.id}>
          {item.name}
        </SelectItem>
      )}
    </Select>
  );
}
