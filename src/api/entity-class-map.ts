export const EntityClassMap = {
   buildMetric: 'BuildMetric', 
 assetRoleAvailability: 'AssetRoleAvailability', 
 schedule: 'Schedule', 
 staticDeliveryAllocationItem: 'StaticDeliveryAllocationItem', 
 providerRole: 'ProviderRole', 
 assetRole: 'AssetRole', 
 knowledgeDomain: 'KnowledgeDomain', 
 userRole: 'UserRole', 
 carouselOption: 'CarouselOption', 
 assetRoleType: 'AssetRoleType', 
 knowledgeLevel: 'KnowledgeLevel', 
 workTaskType: 'WorkTaskType', 
 providerRoleAvailability: 'ProviderRoleAvailability', 
 carouselOrder: 'CarouselOrder', 
 providerRoleTypeWorkTaskTypeSuitability: 'ProviderRoleTypeWorkTaskTypeSuitability', 
 timeDivision: 'TimeDivision', 
 carouselOrderItem: 'CarouselOrderItem', 
 asset: 'Asset', 
 cycleSubspan: 'CycleSubspan', 
 workProjectSeries: 'WorkProjectSeries', 
 providerRoleType: 'ProviderRoleType', 
 workSchemaNode: 'WorkSchemaNode', 
 cycleSubspanGroup: 'CycleSubspanGroup', 
 workProjectSeriesMetric: 'WorkProjectSeriesMetric', 
 assetRoleTypeWorkTaskTypeSuitability: 'AssetRoleTypeWorkTaskTypeSuitability', 
 workSchemaNodeAssignment: 'WorkSchemaNodeAssignment', 
 resourceRequirementItem: 'ResourceRequirementItem', 
 carouselGroupOption: 'CarouselGroupOption', 
 userRoleType: 'UserRoleType', 
 initJsonTemplate: 'InitJsonTemplate', 
 carouselGroup: 'CarouselGroup', 
 workProjectSeriesAssignment: 'WorkProjectSeriesAssignment', 
 knowledgeLevelSeries: 'KnowledgeLevelSeries', 
 cycle: 'Cycle', 
 timeSpan: 'TimeSpan', 
 person: 'Person', 
 organizationType: 'OrganizationType', 
 assetType: 'AssetType', 
 workProjectSeriesSchema: 'WorkProjectSeriesSchema', 
 carousel: 'Carousel', 
 organization: 'Organization'
} as const;

export type EntityClass = (typeof EntityClassMap)[keyof typeof EntityClassMap];
export {
    
}

