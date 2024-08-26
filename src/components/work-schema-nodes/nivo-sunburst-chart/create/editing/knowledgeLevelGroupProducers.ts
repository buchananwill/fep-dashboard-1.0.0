import { produce } from 'immer';
import { KnowledgeLevelGroupTemplate } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import {
  KnowledgeLevelGroup,
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
  getKnowledgeDomainGroup,
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
  KnowledgeLevelGroupTemplate,
  [string, KnowledgeDomainDto]
>((draft, knowledgeDomainGroupId, knowledgeDomain) => {
  const kDomainGroup = findKnowledgeDomainGroup(draft, knowledgeDomainGroupId);
  kDomainGroup.knowledgeDomains.push(knowledgeDomain);
});

export const removeKnowledgeDomainFromGroup = produce<
  KnowledgeLevelGroupTemplate,
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
>((draft, knowledgeDomainGroupId, deliveryAllocationSize) => {
  const knowledgeDomainGroup = getKnowledgeDomainGroup(
    draft,
    knowledgeDomainGroupId
  );
  if (knowledgeDomainGroup.type === 'knowledgeDomainGroup') {
    addDeliveryAllocationListToKdg(
      knowledgeDomainGroup,
      deliveryAllocationSize
    );
  }
});

export const addDeliveryAllocationLeaf = produce<
  WorkNodeHierarchy,
  [string, number]
>((draft, knowledgeDomainGroupId, size) => {
  addLeafToKnowledgeDomainGroupChild(draft, knowledgeDomainGroupId, size);
});

export const removeChildImmutably = produce<WorkNodeHierarchy, [string]>(
  (draft, childId) => {
    removeChildAnyLevel(draft, childId);
  }
);
