import { HasIdClass, HasNumberId } from '@/api/types';
import {
  getHierarchicalDataLayout,
  HierarchicalDataOptions
} from '@/components/react-flow/generic/hooks/getHierarchicalDataLayout';
import { DataLink, HasStringId } from 'react-d3-force-wrapper';
import { HierarchyPointNode } from 'd3';
import { getIdFromLinkReference } from 'react-d3-force-wrapper/dist/editing/functions/resetLinks';
import { Layoutable } from '@/components/react-flow/generic/hooks/getCustomForce';

export type StringIdHierarchyMap = Map<string, Set<string>>;

export interface NestedEntity<T> extends HasIdClass<T> {
  children: NestedEntity<T>[];
}

export type NestedWithStringId = NestedEntity<string>;

function createNesting(
  rootId: string,
  childMap: StringIdHierarchyMap
): NestedWithStringId {
  const childrenIdSet = childMap.get(rootId);
  const childrenIdList = childrenIdSet ? [...childrenIdSet.values()] : [];
  const children = childrenIdList.map((id) => createNesting(id, childMap));
  return {
    id: rootId,
    children
  };
}

export function findRootList(childMap: StringIdHierarchyMap): string[] {
  const keys = [...childMap.keys()];
  const setValues = [...childMap.values()];
  return keys.filter((stringId) => {
    return !setValues.some((stringSet) => stringSet.has(stringId));
  });
}

export function createNestedWithStringId(childMap: Map<string, Set<string>>) {
  const rootList = findRootList(childMap);
  return rootList.map((rootId) => {
    return createNesting(rootId, childMap);
  });
}

function getOrientationCorrector(orientation: 'horizontal' | 'vertical') {
  return function correctOrientation<T extends HasStringId>(
    map: Map<string, HierarchyPointNode<T>>,
    index: number
  ) {
    if (orientation === 'vertical') {
      [...map.values()].forEach((hpn) => {
        const { x, y } = hpn;
        // noinspection JSSuspiciousNameCombination
        hpn.x = y || 0;
        // noinspection JSSuspiciousNameCombination
        hpn.y = x || 0;
      });
    }
    return map;
  };
}

export function getIdToNestedNodeMapList(
  rootNodeList: NestedWithStringId[],
  options?: HierarchicalDataOptions
) {
  if (rootNodeList.length === 0)
    return [new Map()] as Map<string, Layoutable>[];
  const correctOrientation = getOrientationCorrector(
    options?.orientation ?? 'horizontal'
  );
  return rootNodeList
    .map((rootNode) => getHierarchicalDataLayout(rootNode, options))
    .map(flattenHierarchicalLayoutDataStructure)
    .map(correctOrientation);
}

function flattenHierarchicalLayoutDataStructure<T extends HasStringId>(
  node: HierarchyPointNode<T>
): Map<string, HierarchyPointNode<T>> {
  const responseMap = new Map<string, HierarchyPointNode<T>>();
  responseMap.set(node.data.id, node);
  node.children
    ?.map((child) => flattenHierarchicalLayoutDataStructure(child))
    .forEach((childMap) => {
      [...childMap.entries()].forEach(([key, value]) =>
        responseMap.set(key, value)
      );
    });
  return responseMap;
}

export function fallbackComparator(id1: string, id2: string) {
  return id1.localeCompare(id2);
}

export function createIdToChildIdMap<T extends HasNumberId>(
  dataLinkList: DataLink<T>[]
) {
  const responseMap = new Map<string, Set<string>>();
  dataLinkList.forEach((edge) => {
    const sourceId = getIdFromLinkReference(edge.source);
    const targetId = getIdFromLinkReference(edge.target);
    const childIdset = responseMap.get(sourceId) ?? new Set<string>();
    childIdset.add(targetId);
    responseMap.set(sourceId, childIdset);
  });

  return responseMap;
}
