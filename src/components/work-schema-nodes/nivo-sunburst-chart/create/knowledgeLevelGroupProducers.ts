import { produce } from 'immer';
import { KnowledgeLevelGroupTemplate } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupManager';
import {
  Bundle,
  KnowledgeLevelGroup
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import {
  addDeliveryAllocationListToKdg,
  addLeafToKnowledgeDomainGroupChild,
  findChildOrError,
  findKnowledgeDomainGroup,
  getKnowledgeDomainGroup,
  makeChildId,
  makeNewBundle,
  removeChildAnyLevel
} from './knowledgeLevelGroupFunctions';
import { interpolateRainbow } from 'd3';

export const addBundle = produce<KnowledgeLevelGroupTemplate>((draft) => {
  draft.children.push(makeNewBundle(draft));
});
export const addKnowledgeDomainGroup = produce<
  KnowledgeLevelGroupTemplate,
  [string]
>((draft, bundleId) => {
  const bundle = findChildOrError<KnowledgeLevelGroupTemplate, Bundle>(
    draft,
    bundleId
  );
  bundle.children.push({
    type: 'knowledgeDomainGroup',
    children: [],
    knowledgeDomains: [],
    id: makeChildId(bundle),
    selected: false
  });
  bundle.children.forEach((kdgc, index, array) => {
    kdgc.color = interpolateRainbow(index / array.length);
  });
});
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
