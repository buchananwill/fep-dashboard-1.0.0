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
import { InteractionBasedValidationDto } from '@/api/zod-schemas/InteractionBasedValidationDtoSchema';
import { CycleDto } from '@/api/zod-schemas/CycleDtoSchema';
import { FeasibilityReportDto } from '@/api/zod-schemas/FeasibilityReportDtoSchema';

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
  feasibilityReport: FeasibilityReportDto;
  interactionBasedValidation: InteractionBasedValidationDto;
  knowledgeDomain: KnowledgeDomainDto;
  knowledgeLevel: KnowledgeLevelDto;
  knowledgeLevelSeries: KnowledgeLevelSeriesDto;
  organization: OrganizationDto;
  organizationType: OrganizationTypeDto;
  person: PersonDto;
  providerRole: ProviderRoleDto;
  providerRoleAvailability: ProviderRoleAvailabilityDto;
  providerRoleType: ProviderRoleTypeDto;
  providerRoleTypeWorkTaskTypeSuitability: ProviderRoleTypeWorkTaskTypeSuitabilityDto;
  schedule: ScheduleDto;
  staticDeliveryAllocationItem: StaticDeliveryAllocationItemDto;
  timeDivision: TimeDivisionDto;
  timeSpan: TimeSpanDto;
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
