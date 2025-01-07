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
import { EmptyArray } from '@/api/client-literals';
import {
  KnowledgeLevelSeriesGroup,
  NestedWorkNode,
  NestedWorkNodeDiscriminator,
  WorkNodeHierarchy
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { MonoFunction } from '@/types';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { getCycleSubspanSize } from '@/components/work-schema-nodes/nivo-sunburst-chart/WorkNodeResponsiveSunburst';
import { getDomainAlias } from '@/api/getDomainAlias';
import { Select } from '@mantine/core';
import { SimpleSelectable } from '@/components/types/types';

export default function NestedWorkNodeChildSelector({
  selectionPath,
  discriminator,
  discriminatorIndex,
  splittedPath,
  labelAccessor = nodeLabelAccessor
}: {
  selectionPath: string;
  splittedPath: string[];
  discriminator: NestedWorkNodeDiscriminator;
  discriminatorIndex: number;
  labelAccessor?: MonoFunction<WorkNodeHierarchy, string>;
}) {
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
        discriminator={discriminator}
        parent={parent}
      />
    </>
  );
}

const InnerSelectorMemo = React.memo(InnerSelector);

function InnerSelector({
  childList,
  labelAccessor,
  selectionPath,
  discriminator,
  depth
}: {
  childList: WorkNodeHierarchy[];
  parent?: NestedWorkNode;
  selectionPath?: string;
  discriminator: NestedWorkNodeDiscriminator;
  depth: number;
  labelAccessor: MonoFunction<WorkNodeHierarchy, string>;
}) {
  const [isPending, startTransition] = useTransition();
  const { dispatchWithoutListen } = useGlobalDispatch<string>(SelectionPathKey);

  const simpleSelectables: SimpleSelectable[] = useMemo(() => {
    return childList.map((child) => ({
      label: labelAccessor(child),
      value: child.path
    }));
  }, [childList, labelAccessor]);

  const onSelectionChange = useCallback(
    (selection: string | null) => {
      startTransition(() => {
        if (selection === null) {
          dispatchWithoutListen((selectionPathId) => {
            return selectionPathId.split('/').slice(0, depth).join('/');
          });
        } else {
          dispatchWithoutListen(selection);
        }
      });
    },
    [depth, dispatchWithoutListen]
  );

  const label = childList.length > 0 ? childList[0].type : 'no options';

  const currentSelectionList = selectionPath ? selectionPath.split('/') : [];
  const currentSelection =
    currentSelectionList.length >= depth
      ? currentSelectionList.slice(0, depth + 1).join('/')
      : null;

  return (
    <div className={'relative h-fit w-fit'}>
      <PendingOverlay pending={isPending} />
      <Select
        label={label}
        data={simpleSelectables}
        value={currentSelection}
        placeholder={getDomainAlias(discriminator)}
        onChange={onSelectionChange}
      />
    </div>
  );
}

function nodeLabelAccessor(node: WorkNodeHierarchy) {
  const pathOf = splitPathOf(node);
  switch (node.type) {
    case 'leaf': {
      return getCycleSubspanSize(node.size);
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
      return [
        'Size: ',
        getCycleSubspanSize(parseInt(pathOf[pathOf.length - 1]))
      ].join('');
    }
    default: {
      return node.path;
    }
  }
}
