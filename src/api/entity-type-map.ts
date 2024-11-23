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
  CycleDto,
  CycleSubspanDto,
  CycleSubspanGroupDto,
  KnowledgeDomainDto,
  KnowledgeLevelDto,
  KnowledgeLevelSeriesDto,
  OrganizationDto,
  OrganizationTypeDto,
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
  WorkTaskTypeDto
} from './generated-types/generated-types';
import { InitJsonTemplateNodeData } from '@/components/react-flow/init-json-template/types';
import { UserGuideMarkdown } from '@/app/user-guide/parseMarkdownToTree';

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
  cycle: CycleDto;
  cycleSubspan: CycleSubspanDto;
  cycleSubspanGroup: CycleSubspanGroupDto;
  knowledgeDomain: KnowledgeDomainDto;
  knowledgeLevel: KnowledgeLevelDto;
  knowledgeLevelSeries: KnowledgeLevelSeriesDto;
  initJsonTemplate: InitJsonTemplateNodeData;
  organization: OrganizationDto;
  organizationType: OrganizationTypeDto;
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
  workSchemaNodeAssignment: WorkSchemaNodeAssignmentDto;
  workTaskType: WorkTaskTypeDto;
};
