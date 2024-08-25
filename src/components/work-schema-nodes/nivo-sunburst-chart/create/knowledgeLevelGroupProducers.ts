import { produce } from 'immer';
import { KnowledgeLevelGroupTemplate } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { KnowledgeLevelGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import {
  addDeliveryAllocationListToKdg,
  addKnowledgeDomainGroup,
  addLeafToKnowledgeDomainGroupChild,
  findKnowledgeDomainGroup,
  getKnowledgeDomainGroup,
  makeNewBundle,
  removeChildAnyLevel
} from './knowledgeLevelGroupFunctions';

export const addBundle = produce<KnowledgeLevelGroupTemplate>((draft) => {
  draft.children.push(makeNewBundle(draft));
});
export const produceKnowledgeDomainGroup = produce<
  KnowledgeLevelGroupTemplate,
  [string]
>((draft, bundlePath) =>
  addKnowledgeDomainGroup(draft as KnowledgeLevelGroup, bundlePath)
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
  KnowledgeLevelGroupTemplate,
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
  KnowledgeLevelGroupTemplate,
  [string, number]
>((draft, knowledgeDomainGroupId, size) => {
  addLeafToKnowledgeDomainGroupChild(draft, knowledgeDomainGroupId, size);
});
export const removeChildImmutably = produce<
  KnowledgeLevelGroupTemplate,
  [string]
>((draft, childId) => {
  removeChildAnyLevel(draft as KnowledgeLevelGroup, childId);
});
