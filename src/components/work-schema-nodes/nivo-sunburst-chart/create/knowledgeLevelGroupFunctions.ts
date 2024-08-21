import {
  Bundle,
  DeliveryAllocationList,
  KnowledgeDomainGroup,
  KnowledgeLevelGroup,
  NestedWorkNode
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { KnowledgeLevelGroupTemplate } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupManager';
import { HasId } from '@/api/types';
import { Identifier } from 'dto-stores';
import { WritableDraft } from 'immer/src/types/types-external';

type Parent<T extends HasId> = {
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
    id: `${knowledgeDomainGroup.id}:${deliveryAllocationSize}`,
    type: 'leafList',
    children: []
  };
  knowledgeDomainGroup.children.push(daList);
  knowledgeDomainGroup.children.sort(
    (a, b) =>
      getDeliveryAllocationListSize(a) - getDeliveryAllocationListSize(b)
  );
  return daList;
}

function getDeliveryAllocationListSize(list: DeliveryAllocationList) {
  const strings = list.id.split(':');
  return parseInt(strings[strings.length - 1]);
}

export function makeChildId(parent: NestedWorkNode) {
  if (parent.type === 'leaf') throw new Error('Cannot add child to leaf');
  const { children } = parent;
  let betterSuffix = parent.children.length;
  if (betterSuffix > 0) {
    const lastId = children[children.length - 1].id;
    const strings = lastId.split(':');
    const lastNum = parseInt(strings[strings.length - 1]);
    betterSuffix = lastNum + 1;
  }
  return `${parent.id}:${betterSuffix}`;
}

export function makeNewBundle(
  knowledgeLevelGroup: KnowledgeLevelGroupTemplate
): Bundle {
  return {
    id: makeChildId(knowledgeLevelGroup as NestedWorkNode),
    children: [],
    type: 'bundle'
  };
}

export function filterOutChild<T extends HasId>(
  parent: Parent<T>,
  childId: Identifier
) {
  return parent.children.filter((child) => child.id !== childId);
}

export function findChildOrError<T extends Parent<U>, U extends HasId>(
  draft: WritableDraft<T>,
  childId: string
) {
  const child = draft.children.find((bundle) => bundle.id === childId);
  if (!child) throw new Error(`Bundle not found with given id: ${childId}`);
  return child;
}

function getAncestorId(colonSeparatedId: string, ancestorDistance: number) {
  const idList = colonSeparatedId.split(':');
  return idList.slice(idList.length - ancestorDistance).join(':');
}

export function findKnowledgeDomainGroup(
  knowledgeLevelGroup: KnowledgeLevelGroupTemplate,
  knowledgeDomainGroupId: string
) {
  const bundleId = getAncestorId(knowledgeDomainGroupId, 1);
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
  root: KnowledgeLevelGroupTemplate,
  childId: string
): NestedWorkNode[] {
  const idPath = childId.split(':');
  const depth = idPath.length;
  const hierarchyList: NestedWorkNode[] = [root as KnowledgeLevelGroup];
  for (let i = 1; i < depth; i++) {
    const id = idPath.slice(0, i).join(':');
    const localParent = hierarchyList[i - 1];
    if (localParent.type !== 'leaf') {
      const find = localParent.children.find((child) => child.id === id);
      if (find) hierarchyList.push(find);
    }
  }
  return hierarchyList;
}

export function removeChildAnyLevel(
  root: KnowledgeLevelGroupTemplate,
  childId: string
) {
  const hierarchyList = getHierarchyList(root, childId);
  const [immediateParent, child] = hierarchyList.slice(
    hierarchyList.length - 2
  );
  if (immediateParent.type !== 'leaf') {
    const children = immediateParent.children as NestedWorkNode[];
    const indexOf = children.indexOf(child);
    children.splice(indexOf, 1);
  }
}
