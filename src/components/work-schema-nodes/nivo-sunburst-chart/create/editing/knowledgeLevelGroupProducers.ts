import { produce, setAutoFreeze } from 'immer';
import {
  NestedWorkNode,
  WorkNodeHierarchy
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import {
  addDeliveryAllocationListToKdg,
  addKnowledgeDomainGroup,
  addLeafToKnowledgeDomainGroupChild,
  findKnowledgeDomainGroup,
  getHierarchyList,
  makeNewBundle,
  removeChildAnyLevel
} from './knowledgeLevelGroupFunctions';

export const addBundle = produce<WorkNodeHierarchy, [string]>(
  (draft, selectionPath) => {
    const hierarchyList = getHierarchyList(
      draft as NestedWorkNode,
      selectionPath
    );
    for (let hierarchyListElement of hierarchyList) {
      if (hierarchyListElement.type === 'knowledgeLevelGroup') {
        hierarchyListElement.children.push(makeNewBundle(hierarchyListElement));
      }
    }
  }
);
export const produceKnowledgeDomainGroup = produce<WorkNodeHierarchy, [string]>(
  (draft, bundlePath) => addKnowledgeDomainGroup(draft, bundlePath)
);

export const addKnowledgeDomainToGroup = produce<
  NestedWorkNode,
  [string, KnowledgeDomainDto]
>((draft, selectionPath, knowledgeDomain) => {
  const kDomainGroup = findKnowledgeDomainGroup(draft, selectionPath);
  kDomainGroup.knowledgeDomains.push(knowledgeDomain);
});

export const removeKnowledgeDomainFromGroup = produce<
  NestedWorkNode,
  [string, number]
>((draft, knowledgeDomainGroupId, knowledgeDomainId) => {
  const knowledgeDomainGroup = findKnowledgeDomainGroup(
    draft,
    knowledgeDomainGroupId
  );
  knowledgeDomainGroup.knowledgeDomains =
    knowledgeDomainGroup.knowledgeDomains.filter(
      (kd) => kd.id !== knowledgeDomainId
    );
});

export const addDeliveryAllocationList = produce<
  NestedWorkNode,
  [string, number]
>((draft, selectionPath, deliveryAllocationSize) => {
  const knowledgeDomainGroup = findKnowledgeDomainGroup(draft, selectionPath);

  addDeliveryAllocationListToKdg(knowledgeDomainGroup, deliveryAllocationSize);
});

export const addDeliveryAllocationLeaf = produce<
  WorkNodeHierarchy,
  [string, number]
>((draft, selectionPath, size) => {
  addLeafToKnowledgeDomainGroupChild(draft, selectionPath, size);
});

export const removeChildImmutably = produce<WorkNodeHierarchy, [string]>(
  (draft, childId) => {
    removeChildAnyLevel(draft, childId);
  }
);
