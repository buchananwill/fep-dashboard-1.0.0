import {
  AssetDto,
  AssetRoleAvailabilityDto,
  AssetRoleDto,
  AssetRoleTypeDto,
  AssetRoleTypeWorkTaskTypeSuitabilityDto,
  AssetTypeDto,
  BuildMetricDto,
  CarouselDto,
  CarouselGroupDto,
  CarouselGroupOptionDto,
  CarouselOptionDto,
  CarouselOrderDto,
  CarouselOrderItemDto,
  CarouselOrderSummaryDto,
  CycleDto,
  CycleSubspanDefinitionDto,
  CycleSubspanDto,
  CycleSubspanGroupDto,
  KnowledgeDomainDto,
  KnowledgeLevelDto,
  KnowledgeLevelSeriesDto,
  OrganizationDto,
  OrganizationTypeDto,
  OrganizationWorkHierarchyDto,
  PersonDto,
  ProviderRoleAvailabilityDto,
  ProviderRoleDto,
  ProviderRoleTypeDto,
  ProviderRoleTypeWorkTaskTypeSuitabilityDto,
  QueueTreeNodeDto,
  ResourceRequirementItemDto,
  ScheduleDto,
  StaticDeliveryAllocationItemDto,
  TimeDivisionDto,
  TimeSpanDto,
  UserRoleDto,
  UserRoleTypeDto,
  WorkProjectSeriesAssignmentDto,
  WorkProjectSeriesDto,
  WorkProjectSeriesMetricDto,
  WorkProjectSeriesSchemaDto,
  WorkSchemaNodeAssignmentDto,
  WorkSchemaNodeDto,
  WorkSchemaNodeManualDefinitionDto,
  WorkTaskTypeDto
} from './generated-types/generated-types_';
import { InitJsonTemplateNodeData } from '@/components/react-flow/init-json-template/types';
import { UserGuideMarkdown } from '@/app/user-guide/parseMarkdownToTree';
import { HasNumberId, IdWrapper } from '@/api/types';
import { HasName } from 'react-d3-force-wrapper';

export type EntityTypeMap = {
  asset: AssetDto;
  assetRole: AssetRoleDto;
  assetRoleAvailability: AssetRoleAvailabilityDto;
  assetRoleType: AssetRoleTypeDto;
  assetRoleTypeWorkTaskTypeSuitability: AssetRoleTypeWorkTaskTypeSuitabilityDto;
  assetType: AssetTypeDto;
  buildMetric: BuildMetricDto;
  carousel: CarouselDto;
  carouselGroup: CarouselGroupDto;
  carouselGroupOption: CarouselGroupOptionDto;
  carouselOption: CarouselOptionDto;
  carouselOrder: CarouselOrderDto;
  carouselOrderItem: CarouselOrderItemDto;
  carouselOrderSummary: CarouselOrderSummaryDto;
  cycle: CycleDto;
  cycleSubspan: CycleSubspanDto;
  cycleSubspanDefinition: IdWrapper<CycleSubspanDefinitionDto>;
  cycleSubspanGroup: CycleSubspanGroupDto;
  knowledgeDomain: KnowledgeDomainDto;
  knowledgeLevel: KnowledgeLevelDto;
  knowledgeLevelSeries: KnowledgeLevelSeriesDto;
  initJsonTemplate: InitJsonTemplateNodeData;
  organization: OrganizationDto;
  organizationType: OrganizationTypeDto;
  organizationWorkHierarchy: IdWrapper<OrganizationWorkHierarchyDto>;
  person: PersonDto;
  queueTreeNode: QueueTreeNodeDto;
  providerRole: ProviderRoleDto;
  providerRoleAvailability: ProviderRoleAvailabilityDto;
  providerRoleType: ProviderRoleTypeDto;
  providerRoleTypeWorkTaskTypeSuitability: ProviderRoleTypeWorkTaskTypeSuitabilityDto;
  resourceRequirementItem: ResourceRequirementItemDto;
  schedule: ScheduleDto;
  staticDeliveryAllocationItem: StaticDeliveryAllocationItemDto;
  timeDivision: TimeDivisionDto;
  timeSpan: TimeSpanDto;
  userGuideMarkdown: UserGuideMarkdown;
  userRole: UserRoleDto;
  userRoleType: UserRoleTypeDto;
  workProjectSeries: WorkProjectSeriesDto;
  workProjectSeriesAssignment: WorkProjectSeriesAssignmentDto;
  workProjectSeriesMetric: WorkProjectSeriesMetricDto;
  workProjectSeriesSchema: WorkProjectSeriesSchemaDto;
  workSchemaNode: WorkSchemaNodeDto;
  workSchemaNodeManualDefinition: IdWrapper<WorkSchemaNodeManualDefinitionDto>;
  workSchemaNodeAssignment: WorkSchemaNodeAssignmentDto;
  workTaskType: WorkTaskTypeDto;
  workTaskTypeName: HasName & HasNumberId;
};
