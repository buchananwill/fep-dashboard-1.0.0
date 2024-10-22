import { produce } from 'immer';
import {
  NestedWorkNode,
  WorkNodeHierarchy
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import {
  addBundleMutable,
  addDeliveryAllocationListToKdg,
  addKnowledgeDomainGroup,
  addLeafToKnowledgeDomainGroupChild,
  findKnowledgeDomainGroup,
  removeChildAnyLevel
} from './knowledgeLevelGroupFunctions';

import { parseToCssRgba } from '@/components/tables/edit-v2/parseToCssRgba';

export const addBundle = produce<WorkNodeHierarchy, [string]>(addBundleMutable);
export const produceKnowledgeDomainGroup = produce<WorkNodeHierarchy, [string]>(
  (draft, bundlePath) => addKnowledgeDomainGroup(draft, bundlePath)
);

export const replaceKnowledgeDomainsInGroup = produce<
  NestedWorkNode,
  [string, KnowledgeDomainDto[]]
>((draft, selectionPath, knowledgeDomainsReplacement) => {
  const kDomainGroup = findKnowledgeDomainGroup(draft, selectionPath);
  kDomainGroup.knowledgeDomains = knowledgeDomainsReplacement;
  if (knowledgeDomainsReplacement.length === 1) {
    kDomainGroup.color = parseToCssRgba(knowledgeDomainsReplacement[0].color);
  } else {
    delete kDomainGroup.color;
  }
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
