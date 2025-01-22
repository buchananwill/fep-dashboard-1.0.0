import { EntityTypeMap } from '@/api/entity-type-map';

export const EntityClassMap = {
  buildMetric: 'BuildMetric',
  asset: 'Asset',
  assetRole: 'AssetRole',
  assetRolePostRequest: 'AssetRolePostRequest',
  assetRoleAvailability: 'AssetRoleAvailability',
  assetRoleType: 'AssetRoleType',
  assetRoleTypeWorkTypeSuitability: 'AssetRoleTypeWorkTypeSuitability',
  assetType: 'AssetType',
  carousel: 'Carousel',
  carouselGroup: 'CarouselGroup',
  carouselGroupOption: 'CarouselGroupOption',
  carouselOption: 'CarouselOption',
  carouselOrder: 'CarouselOrder',
  carouselOrderSummary: 'CarouselOrderSummary',
  carouselOrderItem: 'CarouselOrderItem',
  cycle: 'Cycle',
  cycleSubspan: 'CycleSubspan',
  cycleSubspanDefinition: 'CycleSubspanDefinition',
  cycleSubspanGroup: 'CycleSubspanGroup',
  initJsonTemplate: 'InitJsonTemplate',
  knowledgeDomain: 'KnowledgeDomain',
  knowledgeLevel: 'KnowledgeLevel',
  knowledgeLevelSeries: 'KnowledgeLevelSeries',
  organization: 'Organization',
  organizationType: 'OrganizationType',
  organizationWorkHierarchy: 'OrganizationWorkHierarchy',
  person: 'Person',
  providerRole: 'ProviderRole',
  providerRoleAvailability: 'ProviderRoleAvailability',
  providerRolePostRequest: 'ProviderRolePostRequest',
  providerRoleType: 'ProviderRoleType',
  providerRoleTypeWorkTypeSuitability: 'ProviderRoleTypeWorkTypeSuitability',
  queueTreeNode: 'QueueTreeNode',
  resourceRequirementItem: 'ResourceRequirementItem',
  schedule: 'Schedule',
  staticDeliveryAllocationItem: 'StaticDeliveryAllocationItem',
  timeDivision: 'TimeDivision',
  timeSpan: 'TimeSpan',
  userGuideMarkdown: 'UserGuideMarkdown',
  userRole: 'UserRole',
  userRoleType: 'UserRoleType',
  workProject: 'WorkProject',
  workProjectMetric: 'WorkProjectMetric',
  workSchema: 'WorkSchema',
  workSchemaNode: 'WorkSchemaNode',
  workSchemaNodeManualDefinition: 'WorkSchemaNodeManualDefinition',
  workSchemaNodeAssignment: 'WorkSchemaNodeAssignment',
  workType: 'WorkType',
  workTypeCategory: 'WorkTypeCategory',
  synchronizedWorkPlan: 'SynchronizedWorkPlan'
} as const satisfies { [Key in keyof EntityTypeMap]: string };

export type EntityClass = (typeof EntityClassMap)[keyof typeof EntityClassMap];
export {};
