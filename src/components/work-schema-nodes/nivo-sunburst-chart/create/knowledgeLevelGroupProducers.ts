import { produce } from 'immer';
import { KnowledgeLevelGroupTemplate } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupManager';
import {
  Bundle,
  DeliveryAllocationLeaf,
  KnowledgeLevelGroup
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import {
  addDeliveryAllocationListToKdg,
  findChildOrError,
  findKnowledgeDomainGroup,
  getKnowledgeDomainGroup,
  makeChildId,
  makeNewBundle,
  removeChildAnyLevel
} from './knowledgeLevelGroupFunctions';

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
    id: makeChildId(bundle)
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
  const knowledgeDomainGroup = getKnowledgeDomainGroup(
    draft,
    knowledgeDomainGroupId
  );
  let find = knowledgeDomainGroup.children.find(
    (child) => child.id === `${knowledgeDomainGroupId}:${size}`
  );
  if (find === undefined) {
    find = addDeliveryAllocationListToKdg(knowledgeDomainGroup, size);
  }
  const leaf: DeliveryAllocationLeaf = {
    id: makeChildId(find),
    type: 'leaf',
    size: size
  };
  find.children.push(leaf);
});
export const removeChildImmutably = produce<
  KnowledgeLevelGroupTemplate,
  [string]
>((draft, childId) => {
  removeChildAnyLevel(draft as KnowledgeLevelGroup, childId);
});
