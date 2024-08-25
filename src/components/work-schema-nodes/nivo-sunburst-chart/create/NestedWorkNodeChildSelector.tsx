'use client';
import { useGlobalDispatch, useGlobalListener } from 'selective-context';
import { SelectionPathKey } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/EditButtons';
import {
  klsgTemplate,
  knowledgeLevelSeriesGroupContextKey
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import React, { useCallback, useMemo } from 'react';
import {
  getHierarchyList,
  joinPath,
  splitPath
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/knowledgeLevelGroupFunctions';
import { EmptyArray } from '@/api/literals';
import {
  KnowledgeLevelSeriesGroup,
  NestedWorkNode,
  NestedWorkNodeDiscriminator,
  WorkNodeHierarchy
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { Select, Selection, SelectProps } from '@nextui-org/react';
import { SelectItem } from '@nextui-org/select';
import { MonoFunction } from '@/types';

export default function NestedWorkNodeChildSelector({
  selectionPath,
  discriminator,
  discriminatorIndex,
  splittedPath,
  labelAccessor = nodeLabelAccessor,
  ...selectProps
}: {
  selectionPath: string;
  splittedPath: string[];
  discriminator: NestedWorkNodeDiscriminator;
  discriminatorIndex: number;
  labelAccessor?: MonoFunction<WorkNodeHierarchy, string>;
} & Omit<SelectProps, 'children'>) {
  const listenerKey = `${discriminator}:selectChild`;
  const { currentState } = useGlobalListener({
    contextKey: knowledgeLevelSeriesGroupContextKey,
    initialValue: klsgTemplate,
    listenerKey
  });

  console.log(selectionPath, discriminator, discriminatorIndex, splittedPath);

  const [parent, childList, selectionThisLevel] = useMemo(() => {
    const selectionThisLevel =
      splittedPath.length > discriminatorIndex
        ? joinPath(...splittedPath.slice(0, discriminatorIndex + 1))
        : '';
    if (discriminator === 'knowledgeLevelGroup') {
      return [
        currentState as KnowledgeLevelSeriesGroup,
        currentState.children,
        selectionThisLevel
      ];
    }
    const hierarchyList = getHierarchyList(
      currentState as NestedWorkNode,
      selectionPath
    );
    const { length } = hierarchyList;
    const parent =
      length >= discriminatorIndex
        ? hierarchyList[discriminatorIndex - 1]
        : undefined;
    if (parent?.type === 'leaf')
      return [parent, EmptyArray, ''] as [
        WorkNodeHierarchy,
        WorkNodeHierarchy[],
        string
      ];
    else
      return [parent, parent?.children ?? [], selectionThisLevel] as [
        WorkNodeHierarchy,
        WorkNodeHierarchy[],
        string
      ];
  }, [
    currentState,
    discriminatorIndex,
    selectionPath,
    splittedPath,
    discriminator
  ]);

  if (parent?.type === 'leaf') return null;

  return (
    <>
      <InnerSelectorMemo
        childList={childList}
        selectionPath={selectionThisLevel}
        labelAccessor={labelAccessor}
        depth={discriminatorIndex}
        parent={parent}
        {...selectProps}
      />
    </>
  );
}

const InnerSelectorMemo = React.memo(InnerSelector);

function InnerSelector({
  childList,
  labelAccessor,
  selectionPath,
  depth,
  ...selectProps
}: {
  childList: WorkNodeHierarchy[];
  parent?: NestedWorkNode;
  selectionPath?: string;
  depth: number;
  labelAccessor: MonoFunction<WorkNodeHierarchy, string>;
}) {
  const { dispatchWithoutListen } = useGlobalDispatch<string>(SelectionPathKey);

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
      selectedKeys={selectionPath ? [selectionPath] : ['']}
      onSelectionChange={onSelectionChange}
      className={'w-60'}
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
