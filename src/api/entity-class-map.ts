import { EntityTypeMap } from '@/api/entity-type-map';
import { EntityTypeKey } from '@/components/tables/types';

export const EntityClassMap = {
  asset: 'Asset',
  assetRole: 'AssetRole',
  assetRoleAvailability: 'AssetRoleAvailability',
  assetRoleType: 'AssetRoleType',
  assetRoleTypeWorkTaskTypeSuitability: 'AssetRoleTypeWorkTaskTypeSuitability',
  assetType: 'AssetType',
  buildMetric: 'BuildMetric',
  carousel: 'Carousel',
  carouselGroup: 'CarouselGroup',
  carouselGroupOption: 'CarouselGroupOption',
  carouselOption: 'CarouselOption',
  carouselOrder: 'CarouselOrder',
  carouselOrderItem: 'CarouselOrderItem',
  cycle: 'Cycle',
  cycleSubspan: 'CycleSubspan',
  cycleSubspanGroup: 'CycleSubspanGroup',
  knowledgeDomain: 'KnowledgeDomain',
  knowledgeLevel: 'KnowledgeLevel',
  knowledgeLevelSeries: 'KnowledgeLevelSeries',
  organization: 'Organization',
  organizationType: 'OrganizationType',
  person: 'Person',
  providerRole: 'ProviderRole',
  providerRoleAvailability: 'ProviderRoleAvailability',
  providerRoleType: 'ProviderRoleType',
  providerRoleTypeWorkTaskTypeSuitability:
    'ProviderRoleTypeWorkTaskTypeSuitability',
  queueTreeNode: 'QueueTreeNode',
  resourceRequirementItem: 'ResourceRequirementItem',
  schedule: 'Schedule',
  staticDeliveryAllocationItem: 'StaticDeliveryAllocationItem',
  timeDivision: 'TimeDivision',
  timeSpan: 'TimeSpan',
  userRole: 'UserRole',
  userRoleType: 'UserRoleType',
  workProjectSeries: 'WorkProjectSeries',
  workProjectSeriesAssignment: 'WorkProjectSeriesAssignment',
  workProjectSeriesMetric: 'WorkProjectSeriesMetric',
  workProjectSeriesSchema: 'WorkProjectSeriesSchema',
  workSchemaNode: 'WorkSchemaNode',
  workSchemaNodeAssignment: 'WorkSchemaNodeAssignment',
  workTaskType: 'WorkTaskType'
} as const satisfies NameSpaceMap<EntityTypeMap>;

export type EntityClass = (typeof EntityClassMap)[keyof typeof EntityClassMap];

type NameSpaceMap<T> = {
  [Key in keyof T]: string;
};

export type EntityNameSpace<T extends EntityTypeKey> =
  (typeof EntityClassMap)[T];
