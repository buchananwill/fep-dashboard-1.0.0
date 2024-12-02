import { z as zod } from 'zod';

export const AutoBuildParametersDtoSchema = zod.object({
  multiStepUndoTimeoutMs: zod.number().int().positive().max(72000000),
  multiUndoIncrement: zod.number().int().positive().max(20),
  saveBuild: zod.boolean(),
  forceSaveMetrics: zod.boolean()
});

export const AutoCarouselGroupOptionDtoSchema = zod.object({
  carouselGroupName: zod.string().max(255),
  taskTypeName: zod.string().max(255),
  knowledgeDomainName: zod.string().max(255),
  knowledgeLevelName: zod.string().max(255),
  allocationList: zod.string()
});

export const AvailabilityPostRequestSchema = zod.object({
  day: zod.enum([
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
  ]),
  startTime: zod.string().time(),
  endTime: zod.string().time(),
  roleTypeNames: zod
    .array(zod.string())
    .min(1, { message: 'Please provide exactly one role type' })
    .max(1, { message: 'Please provide exactly one role type' }),
  availabilityCode: zod.enum(['NEVER', 'FALSE', 'MAYBE', 'TRUE'])
});

export const AvailabilitySummaryDtoSchema = zod.object({
  day: zod.enum([
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
  ]),
  startTime: zod.string().time(),
  endTime: zod.string().time(),
  roleTypeName: zod.string(),
  availabilityCode: zod.enum(['NEVER', 'FALSE', 'MAYBE', 'TRUE'])
});

export const CarouselOrderSummaryDtoSchema = zod.object({
  id: zod.number().int(),
  dateOfBirth: zod.string().date(),
  orderItems: zod.string(),
  carouselGroupName: zod.string().max(255),
  fname: zod.string(),
  lname: zod.string()
});

export const CostParameterDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  scheduleId: zod.number().int(),
  position: zod.number().int()
});

export const CycleSubspanDefinitionDtoSchema = zod.object({
  startTime: zod.string().time(),
  zeroIndexedCycleDay: zod.number().int(),
  endTime: zod.string().time(),
  beginsGroupsOfSize: zod.string(),
  name: zod.string().max(255),
  beginsGroupsOfSizeIntList: zod.array(zod.number().int())
});

export const CycleSubspanGroupIndexDtoSchema = zod.object({
  groupStartTime: zod.string().time(),
  groupEndTime: zod.string().time(),
  id: zod.number().int(),
  startTime: zod.string().time(),
  cycleSubspanIndexIntSetZeroIndexed: zod.any(),
  endTime: zod.string().time(),
  zeroIndexed: zod.number().int(),
  cycleDay: zod.number().int(),
  cycleSubspanGroupSubsetIdList: zod.array(zod.number().int())
});

export const CycleSubspanJoinNestedDtoSchema = zod.object({
  id: zod.number().int(),
  cycleSubspanId: zod.number().int(),
  cycleSubspanGroupSize: zod.number().int(),
  cycleSubspanGroupId: zod.number().int(),
  joinOrdinal: zod.number().int()
});

export const CycleSubspanViewDtoSchema = zod.object({
  id: zod.number().int(),
  startTime: zod.string().time(),
  endTime: zod.string().time(),
  name: zod.string(),
  zeroIndexedCycleDay: zod.number().int()
});

export const CycleSubspanWithJoinsListDtoSchema = zod.object({
  id: zod.number().int(),
  timeSpan: zod.lazy(() => TimeSpanDtoSchema),
  parentCycleId: zod.number().int(),
  name: zod.string(),
  cycleSubspanJoins: zod.record(
    zod.string(),
    zod.lazy(() => CycleSubspanJoinNestedDtoSchema)
  ),
  zeroIndexedCycleDay: zod.number().int(),
  dayOrdinal: zod.number().int(),
  joinsIfNotFirst: zod.record(
    zod.string(),
    zod.array(zod.lazy(() => CycleSubspanJoinNestedDtoSchema))
  )
});

export const FlywayOperationRequestSchema = zod.object({
  schemaName: zod.string(),
  beginWith: zod.enum(['BASELINE', 'CLEAN', 'MIGRATE']),
  finishWith: zod.enum(['BASELINE', 'CLEAN', 'MIGRATE']),
  targetTemplateId: zod.number().int()
});

export const HasParentNameStringListSchema = zod.object({
  parentNames: zod.array(zod.string()),
  name: zod.string()
});

export const HierarchyEnrollmentRequestSchema = zod.object({
  scheduleId: zod.number().int(),
  organizationIdToUserRoleIdList: zod.record(
    zod.string(),
    zod.array(zod.number().int())
  )
});

export const InitDataTypeDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string()
});

export const InitJsonTemplateDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  content: zod.string(),
  dataType: zod.lazy(() => InitDataTypeDtoSchema)
});

export const OrganizationWorkHierarchyDtoSchema = zod.object({
  name: zod.string(),
  typeName: zod.string().max(255),
  parentNames: zod.array(zod.string()),
  workSchemaNodeName: zod.string().max(63)
});

export const PersonDtoSchema = zod.object({
  id: zod.number().int(),
  dateOfBirth: zod.string().date(),
  fName: zod
    .string()
    .regex(/\S/, { message: 'Must not be blank' })
    .min(1, { message: 'Please supply a name.' }),
  lName: zod
    .string()
    .regex(/\S/, { message: 'Must not be blank' })
    .min(1, { message: 'Please supply a name.' })
});

export const PersonProviderSuitabilitySummaryDtoSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  providerRoleTypeName: zod.string(),
  taskTypeName: zod.string(),
  knowledgeDomainName: zod.string(),
  knowledgeLevelName: zod.string(),
  rating: zod.number()
});

export const ResourceRequirementItemDtoSchema = zod.object({
  workTaskTypeId: zod.number().int(),
  providerRoleType: zod.lazy(() => ProviderRoleTypeDtoSchema.optional()),
  assetRoleType: zod.lazy(() => AssetRoleTypeDtoSchema.optional()),
  id: zod.number().int()
});

export const ResourceRequirementItemRequestSchema = zod.object({
  providerRoleTypeName: zod.string(),
  assetRoleTypeName: zod.string(),
  requiredNumber: zod.number().int()
});

export const ResourceRequirementItemSummaryDtoSchema = zod.object({
  id: zod.number().int(),
  taskTypeName: zod.string(),
  knowledgeDomainName: zod.string(),
  knowledgeLevelName: zod.string(),
  providerRoleTypeName: zod.string().max(255),
  assetRoleTypeName: zod.string().max(255)
});

export const RolePostRequestSchema = zod.object({
  baseEntity: zod.any(),
  roleDataMap: zod.record(
    zod.string(),
    zod.lazy(() => RoleDataSchema)
  )
});

export const ScheduleDtoSchema = zod.object({
  id: zod.number().int(),
  creationDateTime: zod.string().datetime(),
  fromDate: zod.string().datetime(),
  thruDate: zod.string().datetime(),
  active: zod.boolean(),
  cycleId: zod.number().int(),
  status: zod.string(),
  autoBuildParameters: zod.lazy(() => AutoBuildParametersDtoSchema),
  costParameters: zod.array(zod.lazy(() => CostParameterDtoSchema))
});

export const ScheduleParametersDtoSchema = zod.object({
  autoBuildParametersDto: zod.lazy(() => AutoBuildParametersDtoSchema),
  costParameters: zod.array(zod.string())
});

export const StaticDeliveryAllocationDtoSchema = zod.object({
  id: zod.number().int(),
  cycleId: zod.number().int(),
  deliveryAllocation: zod.lazy(() => DeliveryAllocationDtoSchema)
});

export const StaticDeliveryAllocationItemDtoSchema = zod.object({
  id: zod.number().int(),
  cycleSubspanGroupId: zod.number().int(),
  staticDeliveryAllocation: zod.lazy(() => StaticDeliveryAllocationDtoSchema),
  workProjectSeriesSchemaId: zod.number().int()
});

export const SuitabilityPostRequestSchema = zod.object({
  workTaskTypeMatrix: zod.lazy(() => WorkTaskTypeListMatrixSchema),
  roleTypeNames: zod
    .array(zod.string())
    .min(1, { message: 'Please provide exactly one role type' })
    .max(1, { message: 'Please provide exactly one role type' }),
  rating: zod.number()
});

export const SuitabilitySummaryDtoSchema = zod.object({
  roleTypeName: zod.string(),
  taskTypeName: zod.string(),
  knowledgeLevelName: zod.string(),
  knowledgeDomainName: zod.string(),
  rating: zod.number()
});

export const TenancyDtoSchema = zod.object({
  id: zod.number().int(),
  schemaName: zod.string().max(63).optional(),
  active: zod.boolean(),
  email: zod.string(),
  initJsonTemplateBaseline: zod.number().int().optional()
});

export const ValidationErrorMessagesSchema = zod.object({});

export const ValidationTypeDtoSchema = zod.object({});

export const WorkProjectSeriesEnrollmentDtoSchema = zod.object({
  id: zod.number().int(),
  userRoleId: zod.number().int(),
  workProjectSeriesId: zod.string().uuid(),
  fromDate: zod.string().date(),
  thruDate: zod.string().date()
});

export const WorkProjectSeriesMetricDtoSchema = zod.object({
  id: zod.number().int(),
  finiteCostCount: zod.number().int(),
  infinityCostCount: zod.number().int()
});

export const WorkProjectSeriesNodeLinkDtoSchema = zod.object({
  id: zod.number().int(),
  workProjectSeriesId: zod.string().uuid(),
  outcomeId: zod.number().int()
});

export const WorkProjectSeriesSchemaWithLabelsDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  workTaskType: zod.lazy(() => WorkTaskTypeDtoSchema),
  userToProviderRatio: zod.number()
});

export const WorkProjectSeriesWithSchemaLabelsDtoSchema = zod.object({
  id: zod.string().uuid(),
  scheduleId: zod.number().int(),
  completedStatus: zod.boolean(),
  workProjectSeriesSchema: zod.lazy(
    () => WorkProjectSeriesSchemaWithLabelsDtoSchema
  ),
  workTaskType: zod.lazy(() => WorkTaskTypeDtoSchema)
});

export const WorkSchemaNodeManualDefinitionDtoSchema = zod.object({
  name: zod.string(),
  childrenAs: zod.enum(['BUNDLE', 'CAROUSEL', 'SERIAL']),
  dominanceFactor: zod.number(),
  priority: zod.number(),
  taskTypeName: zod.string().max(255),
  knowledgeDomainName: zod.string().max(255),
  knowledgeLevelName: zod.string().max(255),
  allocationList: zod.string(),
  parentNodeName: zod.string().max(63),
  auto: zod.enum(['NONE', 'CAROUSEL_GROUP', 'CAROUSEL'])
});

export const WorkTaskSeriesEventDtoSchema = zod.object({
  start: zod.string().datetime(),
  end: zod.string().datetime(),
  id: zod.number().int(),
  title: zod.string(),
  workTaskTypeId: zod.number().int(),
  providerRoleList: zod.array(zod.lazy(() => ProviderRoleDtoSchema)),
  assetRoleList: zod.array(zod.lazy(() => AssetRoleDtoSchema))
});

export const WorkTaskSeriesResourceRequirementItemDtoSchema = zod.object({
  id: zod.number().int(),
  workTaskSeriesId: zod.number().int(),
  assetRoleTypeId: zod.number().int(),
  providerRoleTypeId: zod.number().int(),
  assetRoleFulfillmentId: zod.number().int(),
  providerRoleFulfillmentId: zod.number().int()
});

export const WorkTaskTypeListMatrixSchema = zod.object({
  knowledgeLevelSeriesDtoList: zod
    .array(zod.lazy(() => KnowledgeLevelSeriesDtoSchema))
    .min(1, { message: 'Please supply at least oneknowledgeLevelSeries' }),
  knowledgeDomainDtoList: zod
    .array(zod.lazy(() => KnowledgeDomainDtoSchema))
    .min(1, { message: 'Please supply at least oneknowledgeDomain' }),
  workTaskTypeNames: zod
    .array(zod.string())
    .min(1, { message: 'Please supply at least oneworkTaskTypeName' })
});

export const WorkTaskTypeResourceRequirementPostRequestSchema = zod.object({
  resourceRequirementItemRequests: zod.array(
    zod.lazy(() => ResourceRequirementItemRequestSchema)
  ),
  workTaskTypeMatrix: zod.lazy(() => WorkTaskTypeListMatrixSchema)
});

export const WorkProjectSeriesSchemaSummaryIdSchema = zod.object({
  taskTypeName: zod.string().max(255),
  knowledgeDomainName: zod.string().max(255),
  knowledgeLevelName: zod.string().max(255),
  allocationList: zod.string()
});

export const TimeSpanDtoSchema = zod.object({
  startTimeDivisionInstant: zod.string().time(),
  endTimeDivisionInstant: zod.string().time(),
  id: zod.number().int(),
  startTimeDivisionId: zod.number().int(),
  endTimeDivisionId: zod.number().int(),
  name: zod.string()
});

export const ProviderRoleTypeDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string()
});

export const AssetRoleTypeDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string()
});

export const RoleDataSchema = zod.object({
  suitabilities: zod.array(zod.lazy(() => SuitabilitySummaryDtoSchema)),
  availabilities: zod.array(zod.lazy(() => AvailabilitySummaryDtoSchema))
});

export const DeliveryAllocationDtoSchema = zod.object({
  id: zod.number().int(),
  deliveryAllocationSize: zod.number().int(),
  count: zod.number().int(),
  workProjectSeriesSchemaId: zod.number().int()
});

export const HasWorkTaskTypeViewIdSchema = zod.object({});

export const WorkTaskTypeDtoSchema = zod.object({
  name: zod.string().regex(/\S/).min(1),
  id: zod.number().int(),
  knowledgeDomain: zod.lazy(() => KnowledgeDomainDtoSchema),
  knowledgeLevel: zod.lazy(() => KnowledgeLevelDtoSchema.optional()),
  knowledgeLevelSeriesId: zod.number().int().optional()
});

export const ProviderRoleDtoSchema = zod.object({
  name: zod.string(),
  id: zod.number().int(),
  partyName: zod.string(),
  partyId: zod.number().int(),
  knowledgeDomainId: zod.number().int().optional(),
  knowledgeDomainName: zod.string().optional(),
  type: zod.lazy(() => ProviderRoleTypeDtoSchema)
});

export const AssetRoleDtoSchema = zod.object({
  assetId: zod.number().int(),
  assetAssetCode: zod.string(),
  assetName: zod.string(),
  name: zod.string(),
  type: zod.lazy(() => AssetRoleTypeDtoSchema),
  id: zod.number().int()
});

export const KnowledgeLevelSeriesDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  knowledgeLevelDescriptor: zod.string().optional(),
  knowledgeLevels: zod.array(zod.lazy(() => KnowledgeLevelDtoSchema))
});

export const KnowledgeDomainDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  shortCode: zod.string().optional(),
  color: zod.lazy(() => ColorDtoSchema.optional())
});

export const KnowledgeLevelDtoSchema = zod.object({
  name: zod.string(),
  id: zod.number().int(),
  levelOrdinal: zod.number().int(),
  knowledgeLevelSeriesId: zod.number().int()
});

export const ColorDtoSchema = zod.object({
  id: zod.number().int(),
  r: zod.number().int().min(0).max(255),
  g: zod.number().int().min(0).max(255),
  b: zod.number().int().min(0).max(255),
  a: zod.number().int().min(0).max(255),
  name: zod.string()
});

export const TypeDtoSchema = zod.object({
  name: zod.string(),
  id: zod.number().int()
});
