import {
  AssetDto,
  AssetRoleAvailabilityDto,
  AssetRoleDto,
  AssetRoleTypeDto,
  AssetRoleTypeWorkTypeSuitabilityDto,
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
  SynchronizedWorkPlanRequest,
  PersonDto,
  ProviderRoleAvailabilityDto,
  ProviderRoleDto,
  ProviderRoleTypeDto,
  ProviderRoleTypeWorkTypeSuitabilityDto,
  QueueTreeNodeDto,
  ResourceRequirementItemDto,
  RolePostRequest,
  ScheduleDto,
  StaticDeliveryAllocationItemDto,
  TimeDivisionDto,
  TimeSpanDto,
  UserRoleDto,
  UserRoleTypeDto,
  WorkProjectDto,
  WorkProjectMetricDto,
  WorkSchemaDto,
  WorkSchemaNodeAssignmentDto,
  WorkSchemaNodeDto,
  WorkSchemaNodeManualDefinitionDto,
  WorkTypeDto
} from './generated-types/generated-types_';
import { InitJsonTemplateNodeData } from '@/components/react-flow/init-json-template/types';
import { UserGuideMarkdown } from '@/app/user-guide/parseMarkdownToTree';
import { HasNumberId, IdWrapper } from '@/api/types';
import { HasName } from 'react-d3-force-wrapper';

export type EntityTypeMap = {
  asset: AssetDto;
  assetRole: AssetRoleDto;
  assetRolePostRequest: IdWrapper<RolePostRequest<AssetDto>>;
  assetRoleAvailability: AssetRoleAvailabilityDto;
  assetRoleType: AssetRoleTypeDto;
  assetRoleTypeWorkTypeSuitability: AssetRoleTypeWorkTypeSuitabilityDto;
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
  synchronizedWorkPlan: SynchronizedWorkPlanRequest;
  providerRole: ProviderRoleDto;
  providerRolePostRequest: IdWrapper<RolePostRequest<PersonDto>>;
  providerRoleAvailability: ProviderRoleAvailabilityDto;
  providerRoleType: ProviderRoleTypeDto;
  providerRoleTypeWorkTypeSuitability: ProviderRoleTypeWorkTypeSuitabilityDto;
  resourceRequirementItem: ResourceRequirementItemDto;
  schedule: ScheduleDto;
  staticDeliveryAllocationItem: StaticDeliveryAllocationItemDto;
  timeDivision: TimeDivisionDto;
  timeSpan: TimeSpanDto;
  userGuideMarkdown: UserGuideMarkdown;
  userRole: UserRoleDto;
  userRoleType: UserRoleTypeDto;
  workProject: WorkProjectDto;
  workProjectMetric: WorkProjectMetricDto;
  workSchema: WorkSchemaDto;
  workSchemaNode: WorkSchemaNodeDto;
  workSchemaNodeManualDefinition: IdWrapper<WorkSchemaNodeManualDefinitionDto>;
  workSchemaNodeAssignment: WorkSchemaNodeAssignmentDto;
  workType: WorkTypeDto;
  workTypeCategory: HasName & HasNumberId;
};
