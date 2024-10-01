'use client';
import { useGlobalDispatch, useGlobalListener } from 'selective-context';
import { SelectionPathKey } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/SelectionController';
import {
  klsgTemplate,
  KnowledgeLevelSeriesGroupContextKey
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import React, { useCallback, useMemo, useTransition } from 'react';
import {
  getHierarchyList,
  joinPath,
  splitPathOf
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupFunctions';
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
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { getHours } from '@/components/work-schema-nodes/nivo-sunburst-chart/WorkNodeResponsiveSunburst';
import { getDomainAlias } from '@/api/getDomainAlias';

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
    contextKey: KnowledgeLevelSeriesGroupContextKey,
    initialValue: klsgTemplate,
    listenerKey
  });

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
  const [isPending, startTransition] = useTransition();
  const { dispatchWithoutListen } = useGlobalDispatch<string>(SelectionPathKey);

  const onSelectionChange = useCallback(
    (selection: Selection) => {
      startTransition(() => {
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
      });
    },
    [depth, dispatchWithoutListen]
  );

  const label = childList.length > 0 ? childList[0].type : 'no options';

  return (
    <div className={'relative h-fit w-fit'}>
      <PendingOverlay pending={isPending} />
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
    </div>
  );
}

function nodeLabelAccessor(node: WorkNodeHierarchy) {
  const pathOf = splitPathOf(node);
  switch (node.type) {
    case 'leaf': {
      return getHours(node.size);
    }
    case 'bundle': {
      return node.name ?? node.path;
    }
    case 'knowledgeLevelGroup': {
      return node.knowledgeLevel?.name ?? node.path;
    }
    case 'knowledgeDomainGroup': {
      return node.knowledgeDomains.length > 0
        ? node.knowledgeDomains.map((kd) => kd.name).join(', ')
        : `no ${getDomainAlias('knowledgeDomains')}`;
    }
    case 'leafList': {
      return ['Size: ', getHours(parseInt(pathOf[pathOf.length - 1]))].join('');
    }
    default: {
      return node.path;
    }
  }
}
