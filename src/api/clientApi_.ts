import * as Asset from './generated-actions/Asset';
import * as AssetRole from './generated-actions/AssetRole';
import * as AssetRoleType from './generated-actions/AssetRoleType';
import * as AssetRoleTypeWorkTaskTypeSuitability from './generated-actions/AssetRoleTypeWorkTaskTypeSuitability';
import * as AssetType from './generated-actions/AssetType';
import * as BuildMetric from './generated-actions/BuildMetric';
import * as Carousel from './generated-actions/Carousel';
import * as CarouselGroup from './generated-actions/CarouselGroup';
import * as CarouselGroupOption from './generated-actions/CarouselGroupOption';
import * as CarouselOption from './generated-actions/CarouselOption';
import * as CarouselOrder from './generated-actions/CarouselOrder';
import * as CarouselOrderItem from './generated-actions/CarouselOrderItem';
import * as Cycle from './generated-actions/Cycle';
import * as CycleSubspan from './generated-actions/CycleSubspan';
import * as CycleSubspanGroup from './generated-actions/CycleSubspanGroup';
import * as FeasibilityReport from './generated-actions/FeasibilityReport';
import * as InteractionBasedValidation from './generated-actions/InteractionBasedValidation';
import * as KnowledgeDomain from './generated-actions/KnowledgeDomain';
import * as KnowledgeLevel from './generated-actions/KnowledgeLevel';
import * as Organization from './generated-actions/Organization';
import * as OrganizationType from './generated-actions/OrganizationType';
import * as Person from './generated-actions/Person';
import * as ProviderRole from './generated-actions/ProviderRole';
import * as ProviderRoleAvailability from './generated-actions/ProviderRoleAvailability_';
import * as ProviderRoleType from './generated-actions/ProviderRoleType';
import * as ProviderRoleTypeWorkTaskTypeSuitability from './generated-actions/ProviderRoleTypeWorkTaskTypeSuitability';
import * as Schedule from './generated-actions/Schedule';
import * as StaticDeliveryAllocationItem from '@/api/generated-actions/StaticDeliveryAllocationItem';
import * as TimeDivision from './generated-actions/TimeDivision';
import * as UserRole from './generated-actions/UserRole';
import * as UserRoleType from './generated-actions/UserRoleType';
import * as WorkProjectSeries from './generated-actions/WorkProjectSeries';
import * as WorkProjectSeriesAssignment from './generated-actions/WorkProjectSeriesAssignment';
import * as WorkProjectSeriesMetric from '@/api/generated-actions/WorkProjectSeriesMetric';
import * as WorkProjectSeriesSchema from './generated-actions/WorkProjectSeriesSchema';
import * as WorkSchemaNode from './generated-actions/WorkSchemaNode_';
import * as WorkSchemaNodeAssignment from './generated-actions/WorkSchemaNodeAssignment_';
import * as WorkTaskType from './generated-actions/WorkTaskType';
import * as KnowledgeLevelSeries from '@/api/generated-actions/KnowledgeLevelSeries';
import * as AssetRoleAvailability from '@/api/generated-actions/AssetRoleAvailability_';

export const Api = {
  Asset,
  AssetRole,
  AssetRoleAvailability,
  AssetRoleType,
  AssetRoleTypeWorkTaskTypeSuitability,
  AssetType,
  BuildMetric,
  Carousel,
  CarouselGroup,
  CarouselGroupOption,
  CarouselOption,
  CarouselOrder,
  CarouselOrderItem,
  Cycle,
  CycleSubspan,
  CycleSubspanGroup,
  FeasibilityReport,
  InteractionBasedValidation,
  KnowledgeDomain,
  KnowledgeLevel,
  KnowledgeLevelSeries,
  Organization,
  OrganizationType,
  Person,
  ProviderRole,
  ProviderRoleAvailability,
  ProviderRoleType,
  ProviderRoleTypeWorkTaskTypeSuitability,
  Schedule,
  StaticDeliveryAllocationItem,
  TimeDivision,
  UserRole,
  UserRoleType,
  WorkProjectSeries,
  WorkProjectSeriesAssignment,
  WorkProjectSeriesMetric,
  WorkProjectSeriesSchema,
  WorkSchemaNode,
  WorkSchemaNodeAssignment,
  WorkTaskType
} as const;
