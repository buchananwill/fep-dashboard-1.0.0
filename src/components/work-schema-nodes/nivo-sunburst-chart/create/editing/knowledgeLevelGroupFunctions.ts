import {
  Bundle,
  DeliveryAllocationBase,
  DeliveryAllocationLeaf,
  DeliveryAllocationList,
  KnowledgeDomainGroup,
  NestedWorkNode,
  NestedWorkNodeDiscriminator,
  WorkNodeHierarchy
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { KnowledgeLevelGroupTemplate } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { WritableDraft } from 'immer/src/types/types-external';
import { interpolateRainbow } from 'd3';
import { getColorWithinSpace } from '@/components/work-schema-nodes/nivo-sunburst-chart/view/colorizeKnowledgeDomains';

export type Parent<T> = {
  children: T[];
};

function childNotFoundError(
  selectionPath: string,
  type: NestedWorkNodeDiscriminator
) {
  throw Error(`Did not find ${type} on path ${selectionPath}`);
}

export function getKnowledgeDomainGroup(
  draft: WritableDraft<WorkNodeHierarchy>,
  knowledgeDomainGroupId: string
) {
  const hierarchyList = getHierarchyList(
    draft as NestedWorkNode,
    knowledgeDomainGroupId
  );
  let hierarchyListElement = undefined;
  for (let i = 0; i < hierarchyList.length; i++) {
    hierarchyListElement =
      hierarchyList[i].type === 'knowledgeDomainGroup'
        ? hierarchyList[i]
        : undefined;
  }
  if (hierarchyListElement?.type === 'knowledgeDomainGroup') {
    return hierarchyListElement;
  } else childNotFoundError(knowledgeDomainGroupId, 'knowledgeDomainGroup');
}

export function addDeliveryAllocationListToKdg(
  knowledgeDomainGroup: KnowledgeDomainGroup,
  deliveryAllocationSize: number
) {
  const daList: DeliveryAllocationList = {
    path: joinPath(knowledgeDomainGroup.path, deliveryAllocationSize),
    type: 'leafList',
    children: [],
    selected: false
  };
  knowledgeDomainGroup.children.push(daList);
  knowledgeDomainGroup.children.sort(
    (a, b) =>
      getDeliveryAllocationListSize(a) - getDeliveryAllocationListSize(b)
  );
  return daList;
}

export function splitPath(path: string) {
  return path.split('/');
}

export function splitPathOf(node: DeliveryAllocationBase) {
  const { path } = node;
  return splitPath(path);
}

function getDeliveryAllocationListSize(list: DeliveryAllocationList) {
  const strings = splitPathOf(list);
  return parseInt(strings[strings.length - 1]);
}

export function joinPath(...args: (string | number)[]) {
  return args.join('/');
}

export function makeChildPath(parent: WorkNodeHierarchy) {
  if (parent.type === 'leaf') throw new Error('Cannot add child to leaf');
  const { children } = parent;
  let betterSuffix = parent.children.length;
  if (betterSuffix > 0) {
    const strings = splitPathOf(children[children.length - 1]);
    const lastNum = parseInt(strings[strings.length - 1]);
    betterSuffix = lastNum + 1;
  }
  const { path } = parent;
  return joinPath(path, betterSuffix);
}

export function makeNewBundle(
  knowledgeLevelGroup: KnowledgeLevelGroupTemplate
): Bundle {
  return {
    path: makeChildPath(knowledgeLevelGroup as WorkNodeHierarchy),
    children: [],
    type: 'bundle',
    selected: false
  };
}

export function findChildOrError<T extends Parent<U>, U extends HasPath>(
  draft: WritableDraft<T>,
  childPath: string
) {
  const child = draft.children.find((child) => child.path === childPath);
  if (!child) throw new Error(`Child not found with given path: ${childPath}`);
  return child;
}

function sliceSplitPath(splittedPath: string[], ancestorDistance: number) {
  return joinPath(
    ...splittedPath.slice(0, splittedPath.length - ancestorDistance)
  );
}

export function findChildOfType(
  root: NestedWorkNode,
  selectionPath: string,
  type: NestedWorkNodeDiscriminator
): WorkNodeHierarchy | undefined {
  const splittedPath = splitPath(selectionPath);
  let path = root.path;
  let nextParent = root;
  for (let i = 1; i < splittedPath.length; i++) {
    let nextPathSection = splittedPath[i];
    path = path === '' ? nextPathSection : joinPath(path, nextPathSection);
    const find = nextParent.children.find((child) => child.path === path);
    if (find && find.type === type) return find;
    else if (find && find.type !== 'leaf') {
      nextParent = find;
    }
  }
}

export function findChildOfWorkNodeHierarchy(
  draft: WritableDraft<WorkNodeHierarchy>,
  childPath: string
) {
  const hierarchyList = getHierarchyList(draft as NestedWorkNode, childPath);
  for (let hierarchyListElement of hierarchyList) {
    if (hierarchyListElement.path === childPath) return hierarchyListElement;
  }
  throw new Error(`Child not found with given path: ${childPath}`);
}

export type HasPath = { path: string };

function getAncestorPath(child: HasPath, ancestorDistance: number) {
  const splittedPath = splitPathOf(child);
  return sliceSplitPath(splittedPath, ancestorDistance);
}

export function findKnowledgeDomainGroup(
  root: NestedWorkNode,
  selectionPath: string
): KnowledgeDomainGroup {
  const kdg = findChildOfType(root, selectionPath, 'knowledgeDomainGroup');
  if (!kdg) childNotFoundError(selectionPath, 'knowledgeDomainGroup');
  return kdg as KnowledgeDomainGroup;
  // const bundleId = sliceSplitPath(selectionPath.split('/'), 1);
  // const bundle = findChildOrError<KnowledgeLevelGroupTemplate, Bundle>(
  //   knowledgeLevelGroup,
  //   bundleId
  // );
  // return findChildOrError<Bundle, KnowledgeDomainGroup>(
  //   bundle,
  //   selectionPath
  // );
}

export function getHierarchyList(
  root: NestedWorkNode,
  childPath: string
): WorkNodeHierarchy[] {
  const splittedPath = childPath.split('/');
  const depth = splittedPath.length;
  const hierarchyList: WorkNodeHierarchy[] = [root];
  for (let i = 1; i < depth; i++) {
    const nextChildPath = splittedPath.slice(0, i + 1).join('/');
    const localParent = hierarchyList[i - 1];
    if (localParent.type !== 'leaf') {
      const find = localParent.children.find(
        (child) => child.path === nextChildPath
      );
      if (find) hierarchyList.push(find);
    }
  }
  return hierarchyList;
}

export function removeChildAnyLevel(root: WorkNodeHierarchy, childId: string) {
  const hierarchyList = getHierarchyList(root as NestedWorkNode, childId);
  const [immediateParent, child] = hierarchyList.slice(
    hierarchyList.length - 2
  );
  if (immediateParent.type !== 'leaf') {
    const children = immediateParent.children as WorkNodeHierarchy[];
    const indexOf = children.indexOf(child);
    children.splice(indexOf, 1);
  }
}

export function addLeafToThisList(find: DeliveryAllocationList, size: number) {
  const leaf: DeliveryAllocationLeaf = {
    path: makeChildPath(find),
    type: 'leaf',
    size: size,
    selected: false
  };
  find.children.push(leaf);
}

export function findOrCreateList(
  knowledgeDomainGroup: KnowledgeDomainGroup,
  size: number
) {
  let find = knowledgeDomainGroup.children.find(
    (child) => child.path === joinPath(knowledgeDomainGroup.path, size)
  );
  if (find === undefined) {
    find = addDeliveryAllocationListToKdg(knowledgeDomainGroup, size);
  }
  return find;
}

/**
 * Mutates the tree. For data in React state, use the producer.
 * Doesn't work when the KnowledgeLevelGroup isn't the root: the IDs don't parse correctly (I believe that's the reason.)
 * */
export function addLeafToKnowledgeDomainGroupChild(
  draft: WritableDraft<WorkNodeHierarchy> | WorkNodeHierarchy,
  selectionPath: string,
  size: number
) {
  const knowledgeDomainGroup = findKnowledgeDomainGroup(
    draft as NestedWorkNode,
    selectionPath
  );

  let list = findOrCreateList(knowledgeDomainGroup, size);
  addLeafToThisList(list, size);
}

export function addKnowledgeDomainGroup(
  draft: WorkNodeHierarchy,
  bundleId: string
) {
  const bundle = findChildOfWorkNodeHierarchy(draft, bundleId);
  if (bundle.type === 'bundle') {
    bundle.children.push({
      type: 'knowledgeDomainGroup',
      children: [],
      knowledgeDomains: [],
      path: makeChildPath(bundle),
      selected: false
    });
    bundle.children.forEach((kdgc, index, array) => {
      kdgc.color = getColorWithinSpace(index, array.length);
    });
  }
}

export function deProxify(proxy: any) {
  return proxy ? JSON.parse(JSON.stringify(proxy)) : 'falsy';
}

export function addBundleMutable(
  draft: WorkNodeHierarchy,
  selectionPath: string
) {
  const knowledgeLevelGroupOptional = findChildOfType(
    draft as NestedWorkNode,
    selectionPath,
    'knowledgeLevelGroup'
  );
  const notProxy = deProxify(knowledgeLevelGroupOptional);

  console.log(notProxy);
  if (
    knowledgeLevelGroupOptional &&
    knowledgeLevelGroupOptional.type === 'knowledgeLevelGroup'
  ) {
    knowledgeLevelGroupOptional.children.push(
      makeNewBundle(knowledgeLevelGroupOptional)
    );
  }
  return draft;
}