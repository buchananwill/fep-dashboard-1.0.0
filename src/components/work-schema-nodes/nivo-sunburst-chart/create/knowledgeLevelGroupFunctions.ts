import {
  Bundle,
  KnowledgeDomainGroup
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { produce } from 'immer';
import { KnowledgeLevelGroupTemplate } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupManager';
import { HasId } from '@/api/types';
import { Identifier } from 'dto-stores';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { WritableDraft } from 'immer/src/types/types-external';

export const addBundle = produce<KnowledgeLevelGroupTemplate>((draft) => {
  draft.children.push(makeNewBundle(draft));
});

type Parent<T extends HasId> = {
  children: T[];
};

export const removeBundle = produce<KnowledgeLevelGroupTemplate, [string]>(
  (draft, bundleId) => {
    draft.children = filterOutChild(draft, bundleId);
  }
);

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
    id: makeChildId(bundle, String(bundle.children.length))
  });
});

export const removeKnowledgeDomainGroup = produce<
  KnowledgeLevelGroupTemplate,
  [string]
>((draft, knowledgeDomainGroupId) => {
  const bundleId = getAncestorId(knowledgeDomainGroupId, 1);
  const bundle = findChildOrError<KnowledgeLevelGroupTemplate, Bundle>(
    draft,
    bundleId
  );
  bundle.children = filterOutChild(bundle, knowledgeDomainGroupId).map(
    (child, index) => ({
      ...child,
      id: makeChildId(bundle, String(index))
    })
  );
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

function makeChildId(parent: HasId, suffix: string) {
  return `${parent.id}:${suffix}`;
}

function makeNewBundle(
  knowledgeLevelGroup: KnowledgeLevelGroupTemplate
): Bundle {
  return {
    id: `${knowledgeLevelGroup.id}:${knowledgeLevelGroup.children.length}`,
    children: [],
    type: 'bundle'
  };
}

function filterOutChild<T extends HasId>(
  parent: Parent<T>,
  childId: Identifier
) {
  return parent.children.filter((child) => child.id !== childId);
}

function findChildOrError<T extends Parent<U>, U extends HasId>(
  draft: WritableDraft<T>,
  childId: string
) {
  const child = draft.children.find((bundle) => bundle.id === childId);
  if (!child) throw new Error(`Bundle not found with given id: ${childId}`);
  return child;
}

function getAncestorId(colonSeparatedId: string, ancestorDistance: number) {
  const idList = colonSeparatedId.split(':');
  return idList[idList.length - (ancestorDistance + 1)];
}

function findKnowledgeDomainGroup(
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
