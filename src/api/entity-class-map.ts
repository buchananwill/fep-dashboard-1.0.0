export const EntityClassMap = {
   buildMetric: 'BuildMetric', 
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
 interactionBasedValidation: 'InteractionBasedValidation', 
 carouselOrderItem: 'CarouselOrderItem', 
 asset: 'Asset', 
 cycleSubspan: 'CycleSubspan', 
 workProjectSeries: 'WorkProjectSeries', 
 providerRoleType: 'ProviderRoleType', 
 serviceCategory: 'ServiceCategory', 
 workSchemaNode: 'WorkSchemaNode', 
 cycleSubspanGroup: 'CycleSubspanGroup', 
 workProjectSeriesMetric: 'WorkProjectSeriesMetric', 
 assetRoleTypeWorkTaskTypeSuitability: 'AssetRoleTypeWorkTaskTypeSuitability', 
 workSchemaNodeAssignment: 'WorkSchemaNodeAssignment', 
 carouselGroupOption: 'CarouselGroupOption', 
 userRoleType: 'UserRoleType', 
 carouselGroup: 'CarouselGroup', 
 workProjectSeriesAssignment: 'WorkProjectSeriesAssignment', 
 cycle: 'Cycle', 
 timeSpan: 'TimeSpan', 
 feasibilityReport: 'FeasibilityReport', 
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

