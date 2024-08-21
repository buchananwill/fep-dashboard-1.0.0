'use client';
import { useGlobalDispatch, useGlobalListener } from 'selective-context';
import { SelectionIdPathKey } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/EditButtons';
import {
  knowledgeLevelGroupContextKey,
  knowledgeLevelGroupTemplate
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupManager';
import React, { useCallback, useMemo } from 'react';
import { getHierarchyList } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/knowledgeLevelGroupFunctions';
import { EmptyArray } from '@/api/literals';
import { NestedWorkNode } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { Select, Selection, SelectProps } from '@nextui-org/react';
import { SelectItem } from '@nextui-org/select';
import { MonoFunction } from '@/types';
import { getAnyIdAsString } from 'react-d3-force-wrapper';

export default function NestedWorkNodeChildSelector({
  parentId,
  selectionId,
  labelAccessor = getAnyIdAsString,
  ...selectProps
}: {
  parentId: string;
  selectionId: string;
  labelAccessor?: MonoFunction<NestedWorkNode, string>;
} & Omit<SelectProps, 'children'>) {
  const listenerKey = `${parentId}:selectChild`;
  const { currentState } = useGlobalListener({
    contextKey: knowledgeLevelGroupContextKey,
    initialValue: knowledgeLevelGroupTemplate,
    listenerKey
  });

  const [parent, childList] = useMemo(() => {
    const hierarchyList = getHierarchyList(currentState, parentId);
    const parent = hierarchyList[hierarchyList.length - 1];
    console.log(hierarchyList, parent);
    if (parent.type === 'leaf')
      return [parent, EmptyArray] as [NestedWorkNode, NestedWorkNode[]];
    else return [parent, parent.children] as [NestedWorkNode, NestedWorkNode[]];
  }, [parentId, currentState]);

  const depth = useMemo(() => {
    return parentId.split(':').length;
  }, [parentId]);

  if (parent.type === 'leaf' || !parent) return null;

  return (
    <>
      <InnerSelectorMemo
        childList={childList}
        selectionId={selectionId}
        labelAccessor={labelAccessor}
        depth={depth}
        {...selectProps}
      />
    </>
  );
}

const InnerSelectorMemo = React.memo(InnerSelector);

function InnerSelector({
  childList,
  labelAccessor,
  selectionId,
  depth,
  ...selectProps
}: {
  childList: NestedWorkNode[];
  selectionId: string;
  depth: number;
  labelAccessor: MonoFunction<NestedWorkNode, string>;
}) {
  const { dispatchWithoutListen } =
    useGlobalDispatch<string>(SelectionIdPathKey);

  const onSelectionChange = useCallback(
    (selection: Selection) => {
      if (selection === 'all') {
        throw new Error('Only single selection is supported');
      } else {
        const selectionList = [...selection.values()] as string[];
        if (selectionList.length === 0) {
          dispatchWithoutListen((selectionPathId) => {
            return selectionPathId.split(':').slice(0, depth).join(':');
          });
        } else if (selectionList.length === 1) {
          dispatchWithoutListen(selectionList[0] as string);
        } else {
          throw new Error('Only single selection is supported');
        }
      }
    },
    [depth, dispatchWithoutListen]
  );

  return (
    <Select
      items={childList}
      {...selectProps}
      selectedKeys={[selectionId]}
      onSelectionChange={onSelectionChange}
      className={'w-60'}
    >
      {(item) => (
        <SelectItem
          key={item.id}
          value={item.id}
          aria-label={`${item.type}:${labelAccessor(item)}`}
        >
          {`${item.type}:${labelAccessor(item)}`}
        </SelectItem>
      )}
    </Select>
  );
}
