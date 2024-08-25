import {
  Bundle,
  DeliveryAllocationBase,
  DeliveryAllocationLeaf,
  DeliveryAllocationList,
  KnowledgeDomainGroup,
  KnowledgeLevelGroup,
  NestedWorkNode,
  WorkNodeHierarchy
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { KnowledgeLevelGroupTemplate } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupManager';
import { WritableDraft } from 'immer/src/types/types-external';
import { interpolateRainbow } from 'd3';

export type Parent<T> = {
  children: T[];
};

export function getKnowledgeDomainGroup(
  draft: WritableDraft<KnowledgeLevelGroupTemplate>,
  knowledgeDomainGroupId: string
) {
  const hierarchyList = getHierarchyList(
    draft as KnowledgeLevelGroup,
    knowledgeDomainGroupId
  );
  const hierarchyListElement = hierarchyList[hierarchyList.length - 1];
  if (hierarchyListElement.type === 'knowledgeDomainGroup') {
    return hierarchyListElement;
  } else
    throw Error(
      `Did not find knowledgeDomainGroup at id ${knowledgeDomainGroupId}`
    );
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

export function splitPath(node: DeliveryAllocationBase) {
  return node.path.split('/');
}

function getDeliveryAllocationListSize(list: DeliveryAllocationList) {
  const strings = splitPath(list);
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
    const strings = splitPath(children[children.length - 1]);
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

export type HasPath = { path: string };

function getAncestorPath(child: HasPath, ancestorDistance: number) {
  const splittedPath = splitPath(child);
  return sliceSplitPath(splittedPath, ancestorDistance);
}

export function findKnowledgeDomainGroup(
  knowledgeLevelGroup: KnowledgeLevelGroupTemplate,
  knowledgeDomainGroupId: string
) {
  const bundleId = sliceSplitPath(knowledgeDomainGroupId.split('/'), 1);
  const bundle = findChildOrError<KnowledgeLevelGroupTemplate, Bundle>(
    knowledgeLevelGroup,
    bundleId
  );
  return findChildOrError<Bundle, KnowledgeDomainGroup>(
    bundle,
    knowledgeDomainGroupId
  );
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

export function removeChildAnyLevel(
  root: KnowledgeLevelGroupTemplate,
  childId: string
) {
  const hierarchyList = getHierarchyList(root as KnowledgeLevelGroup, childId);
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
  draft: WritableDraft<KnowledgeLevelGroupTemplate> | KnowledgeLevelGroup,
  knowledgeDomainGroupId: string,
  size: number
) {
  const knowledgeDomainGroup = getKnowledgeDomainGroup(
    draft,
    knowledgeDomainGroupId
  );
  let list = findOrCreateList(knowledgeDomainGroup, size);
  addLeafToThisList(list, size);
}

export function addKnowledgeDomainGroup(
  draft: KnowledgeLevelGroup,
  bundleId: string
) {
  const bundle = findChildOrError<KnowledgeLevelGroupTemplate, Bundle>(
    draft,
    bundleId
  );
  bundle.children.push({
    type: 'knowledgeDomainGroup',
    children: [],
    knowledgeDomains: [],
    path: makeChildPath(bundle),
    selected: false
  });
  bundle.children.forEach((kdgc, index, array) => {
    kdgc.color = interpolateRainbow(index / array.length);
  });
}
