import {
  KnowledgeDomainGroup,
  KnowledgeLevelSeriesGroup
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { DispatchState } from '@/types';
import { NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EntityClassMap } from '@/api/entity-class-map';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { useCallback, useMemo, useRef } from 'react';
import { isNotUndefined } from '@/api/main';
import { replaceKnowledgeDomainsInGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupProducers';
import { MultiSelectMaxDisplayedItems } from '@/components/generic/MultiSelectMaxDisplayedItems';
import { useSimpleSelectableListMapAndIdMap } from '@/hooks/useSimpleSelectableListMapAndIdMap';
import { EmptyArray } from '@/api/literals';
import { useLabelMaker } from '@/hooks/useLabelMaker';
import { isEqual } from 'lodash';

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
  const { knowledgeDomains } = knowledgeDomainGroup;
  const { currentState } = NamespacedHooks.useListen<KnowledgeDomainDto[]>(
    EntityClassMap.knowledgeDomain,
    KEY_TYPES.MASTER_LIST,
    `edit:${knowledgeDomainGroup.path}`,
    EmptyArray as KnowledgeDomainDto[]
  );

  console.log(currentState);

  const labelMaker = useLabelMaker<KnowledgeDomainDto>('name');

  const { selectableMap, idMap, selectableList } =
    useSimpleSelectableListMapAndIdMap(currentState, labelMaker);
  const valueRef = useRef([] as string[]);

  const value = useMemo(() => {
    const valueList = knowledgeDomains.map((kd) => String(kd.id));
    if (!isEqual(valueList, valueRef.current)) {
      valueRef.current = valueList;
    }
    return valueRef.current;
  }, [knowledgeDomains]);

  const onSelectionChange = useCallback(
    (selection: string[]) => {
      const updatedDomains = selection
        .map((value) => selectableMap.get(value))
        .filter(isNotUndefined);
      dispatch(
        (prev) =>
          replaceKnowledgeDomainsInGroup(
            prev,
            currentPath,
            updatedDomains
          ) as KnowledgeLevelSeriesGroup
      );
    },
    [currentPath, selectableMap, dispatch]
  );

  return (
    <MultiSelectMaxDisplayedItems
      data={selectableList}
      onChange={onSelectionChange}
      value={value}
      position={'bottom'}
      withinPortal={true}
      scrollArea={{ mah: 200 }}
    />
  );
}
