'use client';
import { useGlobalDispatch, useGlobalListener } from 'selective-context';
import { SelectionIdPathKey } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/EditButtons';
import {
  knowledgeLevelSeriesGroupContextKey,
  knowledgeLevelGroupTemplate
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import React, { useCallback, useMemo } from 'react';
import {
  getHierarchyList,
  joinPath,
  splitPath
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/knowledgeLevelGroupFunctions';
import { EmptyArray } from '@/api/literals';
import {
  NestedWorkNode,
  WorkNodeHierarchy
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { Select, Selection, SelectProps } from '@nextui-org/react';
import { SelectItem } from '@nextui-org/select';
import { MonoFunction } from '@/types';
import { getAnyIdAsString } from 'react-d3-force-wrapper';

export default function NestedWorkNodeChildSelector({
  parentId,
  selectionId,
  labelAccessor = nodeLabelAccessor,
  ...selectProps
}: {
  parentId: string;
  selectionId: string;
  labelAccessor?: MonoFunction<WorkNodeHierarchy, string>;
} & Omit<SelectProps, 'children'>) {
  const listenerKey = `${parentId}:selectChild`;
  const { currentState } = useGlobalListener({
    contextKey: knowledgeLevelSeriesGroupContextKey,
    initialValue: knowledgeLevelGroupTemplate,
    listenerKey
  });

  const [parent, childList] = useMemo(() => {
    const hierarchyList = getHierarchyList(
      currentState as NestedWorkNode,
      parentId
    );
    const parent = hierarchyList[hierarchyList.length - 1];
    console.log(hierarchyList, parent);
    if (parent.type === 'leaf')
      return [parent, EmptyArray] as [WorkNodeHierarchy, WorkNodeHierarchy[]];
    else
      return [parent, parent.children] as [
        WorkNodeHierarchy,
        WorkNodeHierarchy[]
      ];
  }, [parentId, currentState]);

  const depth = useMemo(() => {
    return parentId.split('/').length;
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
  childList: WorkNodeHierarchy[];
  selectionId: string;
  depth: number;
  labelAccessor: MonoFunction<WorkNodeHierarchy, string>;
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
            return selectionPathId.split('/').slice(0, depth).join('/');
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

  const label = childList.length > 0 ? childList[0].type : 'no options';

  return (
    <Select
      items={childList}
      {...selectProps}
      selectedKeys={[selectionId]}
      onSelectionChange={onSelectionChange}
      className={'w-60'}
      label={label}
      labelPlacement={'outside-left'}
    >
      {(item) => (
        <SelectItem
          key={item.path}
          value={item.path}
          aria-label={labelAccessor(item)}
        >
          {labelAccessor(item)}
        </SelectItem>
      )}
    </Select>
  );
}

function nodeLabelAccessor(node: WorkNodeHierarchy) {
  switch (node.type) {
    case 'leaf': {
      const strings = splitPath(node);
      return joinPath(...strings.slice(strings.length - 3, strings.length));
    }
    case 'bundle': {
      return node.name ?? node.path;
    }
    default: {
      return node.path;
    }
  }
}
