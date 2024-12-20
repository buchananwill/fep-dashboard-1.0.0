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
  finishWith: zod.enum(['BASELINE', 'CLEAN', 'MIGRATE'])
});

export const HierarchyEnrollmentRequestSchema = zod.object({
  scheduleId: zod.number().int(),
  organizationIdToUserRoleIdList: zod.record(
    zod.string(),
    zod.array(zod.number().int())
  )
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
  status: zod.string()
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
  email: zod.string()
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
  name: zod.string().max(63),
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

export const HasDescriptionSchema = zod.object({
  description: zod.string()
});

export const HasNameDtoSchema = zod.object({
  name: zod.string()
});

export const HasNumberIdDtoSchema = zod.object({
  id: zod.number().int()
});

export const HasUuidDtoSchema = zod.object({
  id: zod.string().uuid()
});

export const ClosureDtoSchema = zod.object({
  id: zod.number().int(),
  closureType: zod.string(),
  source: zod.number().int(),
  target: zod.number().int(),
  value: zod.number().int(),
  weighting: zod.number()
});

export const CarouselGroupDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  carousels: zod.array(zod.lazy(() => CarouselLeanDtoSchema)),
  carouselGroupOptions: zod.array(zod.lazy(() => CarouselGroupOptionDtoSchema)),
  knowledgeLevel: zod.lazy(() => KnowledgeLevelDtoSchema)
});

export const ColorDtoSchema = zod.object({
  id: zod.number().int(),
  r: zod.number().int().min(0).max(255),
  g: zod.number().int().min(0).max(255),
  b: zod.number().int().min(0).max(255),
  a: zod.number().int().min(0).max(255),
  name: zod.string()
});

export const CycleDtoSchema = zod.object({
  id: zod.number().int(),
  cycleSubspanGroupSizes: zod.array(zod.number().int()),
  cycleDayZero: zod.enum([
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
  ]),
  cycleLengthInWeeks: zod
    .number()
    .int()
    .min(1, { message: 'Cycle length must be at least 1 week' }),
  nominalCycleSubspanLengthInMinutes: zod.number().int()
});

export const CycleSubspanGroupDtoSchema = zod.object({
  cycleSubspanJoins: zod.array(zod.lazy(() => CycleSubspanJoinDtoSchema)),
  id: zod.number().int()
});

export const KnowledgeDomainDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  shortCode: zod.string().optional(),
  color: zod.lazy(() => ColorDtoSchema.optional())
});

export const KnowledgeLevelSeriesDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  knowledgeLevelDescriptor: zod.string().optional(),
  knowledgeLevels: zod.array(zod.lazy(() => KnowledgeLevelDtoSchema))
});

export const PartyDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  partyType: zod.enum(['PERSON', 'ORGANIZATION'])
});

export const TimeDivisionDtoSchema = zod.object({
  id: zod.number().int(),
  instant: zod.string().time()
});

export const AssetDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  ownerId: zod.number().int().optional(),
  type: zod.lazy(() => AssetTypeDtoSchema)
});

export const AssetRoleDtoSchema = zod.object({
  assetId: zod.number().int(),
  assetAssetCode: zod.string(),
  assetName: zod.string(),
  name: zod.string(),
  type: zod.lazy(() => AssetRoleTypeDtoSchema),
  id: zod.number().int()
});

export const BuildMetricDtoSchema = zod.object({
  id: zod.number().int(),
  finalState: zod.string(),
  totalAllocationLoops: zod.number().int(),
  scheduleId: zod.number().int(),
  queueTreeNodes: zod.array(zod.lazy(() => QueueTreeNodeDtoSchema))
});

export const CarouselDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  carouselOrdinal: zod.number().int(),
  carouselGroupId: zod.number().int(),
  carouselOptionDtos: zod.array(zod.lazy(() => CarouselOptionDtoSchema))
});

export const CarouselLeanDtoSchema = zod.object({
  id: zod.number().int(),
  carouselOrdinal: zod.number().int()
});

export const CarouselOrderDtoSchema = zod.object({
  id: zod.string().uuid(),
  carouselOrderItems: zod.record(
    zod.string(),
    zod.lazy(() => CarouselOrderItemDtoSchema)
  ),
  userRoleId: zod.number().int(),
  carouselGroupId: zod.number().int()
});

export const DeliveryAllocationDtoSchema = zod.object({
  id: zod.number().int(),
  deliveryAllocationSize: zod.number().int(),
  count: zod.number().int(),
  workProjectSeriesSchemaId: zod.number().int()
});

export const KnowledgeLevelDtoSchema = zod.object({
  name: zod.string(),
  id: zod.number().int(),
  levelOrdinal: zod.number().int(),
  knowledgeLevelSeriesId: zod.number().int()
});

export const OrganizationDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  type: zod.lazy(() => OrganizationTypeDtoSchema),
  workSchemaNodeAssignment: zod.lazy(() =>
    WorkSchemaNodeAssignmentDtoSchema.optional()
  )
});

export const QueueTreeNodeDtoSchema = zod.object({
  id: zod.string(),
  nodeNumber: zod.number().int(),
  taskSize: zod.number().int(),
  degreeOfNesting: zod.number().int(),
  netFailureCount: zod.number().int(),
  batchSize: zod.number().int(),
  totalAllocationArea: zod.number().int(),
  workProjectSeriesNodeLinks: zod.array(
    zod.lazy(() => WorkProjectSeriesNodeLinkDtoSchema)
  )
});

export const WorkProjectSeriesSchemaDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  deliveryAllocations: zod.record(
    zod.string(),
    zod.lazy(() => DeliveryAllocationDtoSchema)
  ),
  userToProviderRatio: zod.number(),
  workTaskType: zod.lazy(() => WorkTaskTypeDtoSchema)
});

export const WorkTaskDtoSchema = zod.object({
  id: zod.number().int(),
  dueDate: zod.string().datetime(),
  serviceProductSeriesSchemaId: zod.number().int(),
  workProjectSeriesSchemaName: zod.string(),
  workTaskTypeDto: zod.lazy(() => WorkTaskTypeDtoSchema),
  completedDate: zod.string().datetime(),
  notes: zod.string()
});

export const AssetRoleTypeWorkTaskTypeSuitabilityDtoSchema = zod.object({
  id: zod.number().int(),
  rating: zod.number(),
  assetRoleTypeName: zod.string(),
  assetRoleTypeId: zod.number().int(),
  workTaskTypeName: zod.string(),
  workTaskTypeId: zod.number().int(),
  assetId: zod.number().int(),
  assetName: zod.string(),
  dynamic: zod.boolean(),
  idEntityC: zod.number().int()
});

export const CarouselGroupOptionDtoSchema = zod.object({
  id: zod.number().int(),
  carouselGroupId: zod.number().int(),
  workProjectSeriesSchemaId: zod.number().int()
});

export const CarouselOptionDtoSchema = zod.object({
  carouselId: zod.number().int(),
  id: zod.number().int(),
  workProjectSeriesSchemaId: zod.number().int()
});

export const CarouselOrderItemDtoSchema = zod.object({
  id: zod.number().int(),
  carouselOrderId: zod.string().uuid(),
  workProjectSeriesSchemaId: zod.number().int(),
  preferencePosition: zod.number().int(),
  active: zod.boolean(),
  carouselOptionId: zod.number().int().optional()
});

export const CycleSubspanDtoSchema = zod.object({
  id: zod.number().int(),
  timeSpanDto: zod.lazy(() => TimeSpanDtoSchema),
  parentCycleId: zod.number().int(),
  name: zod.string(),
  zeroIndexedCycleDay: zod.number().int(),
  dayOrdinal: zod.number().int()
});

export const CycleSubspanGroupEditDtoSchema = zod.object({
  id: zod.number().int(),
  timeSpanDto: zod.lazy(() => TimeSpanDtoSchema),
  parentCycleId: zod.number().int(),
  name: zod.string(),
  zeroIndexedCycleDay: zod.number().int(),
  sizesStartingAtCycleSubspanId: zod.array(zod.number().int())
});

export const CycleSubspanJoinDtoSchema = zod.object({
  id: zod.number().int(),
  cycleSubspanGroupId: zod.number().int(),
  cycleSubspanGroupSize: zod.number().int(),
  joinOrdinal: zod.number().int(),
  cycleSubspanId: zod.number().int(),
  cycleSubspanDescription: zod.string()
});

export const CycleSubspanLeanDtoSchema = zod.object({
  id: zod.number().int(),
  start: zod.string().time(),
  end: zod.string().time(),
  zeroIndexedCycleDay: zod.number().int().min(0),
  timeSpanId: zod.number().int(),
  parentCycleId: zod.number().int(),
  name: zod.string()
});

export const ProviderRoleAvailabilityDtoSchema = zod.object({
  id: zod.number().int(),
  providerRoleId: zod.number().int(),
  partyId: zod.number().int(),
  cycleSubspanId: zod.number().int(),
  availabilityCode: zod.number().int(),
  type: zod.string(),
  baseEntityId: zod.number().int(),
  roleEntityId: zod.number().int()
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

export const ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema = zod.object({
  id: zod.number().int(),
  rating: zod.number().min(0, { message: 'Rating must be non-negative' }),
  partyId: zod.number().int(),
  providerRoleTypeId: zod.number().int(),
  providerRoleTypeName: zod.string(),
  workTaskTypeId: zod.number().int(),
  workTaskTypeName: zod.string(),
  isDynamic: zod.boolean(),
  idEntityC: zod.number().int()
});

export const TimeSpanDtoSchema = zod.object({
  startTimeDivisionInstant: zod.string().time(),
  endTimeDivisionInstant: zod.string().time(),
  id: zod.number().int(),
  startTimeDivisionId: zod.number().int(),
  endTimeDivisionId: zod.number().int(),
  name: zod.string()
});

export const UserRoleDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  startDate: zod.string().datetime(),
  thruDate: zod.string().datetime().optional(),
  knowledgeLevelSeriesName: zod.string(),
  knowledgeLevelSeriesId: zod.number().int(),
  partyName: zod.string(),
  partyId: zod.number().int(),
  partyType: zod.enum(['PERSON', 'ORGANIZATION']),
  partyDateOfBirth: zod.string().date(),
  userRoleType: zod.lazy(() => UserRoleTypeDtoSchema)
});

export const WorkSchemaNodeAssignmentDtoSchema = zod.object({
  id: zod.number().int(),
  organizationId: zod.number().int(),
  workSchemaNodeId: zod.number().int().optional()
});

export const WorkSchemaNodeDtoSchema = zod.object({
  dominanceFactor: zod.number(),
  priority: zod.number(),
  carouselOptionId: zod.number().int().optional(),
  id: zod.number().int(),
  knowledgeDomainId: zod.number().int().optional(),
  knowledgeLevelId: zod.number().int().optional(),
  name: zod.string().min(1).max(50),
  carouselGroupId: zod.number().int().optional(),
  carouselId: zod.number().int().optional(),
  workProjectSeriesSchemaId: zod.number().int().optional(),
  resolutionMode: zod.enum([
    'OPEN',
    'LEAF',
    'CAROUSEL',
    'SERIAL',
    'CAROUSEL_OPTION',
    'CAROUSEL_GROUP'
  ]),
  childrenAs: zod.enum(['BUNDLE', 'CAROUSEL', 'SERIAL'])
});

export const WorkTaskSeriesDtoSchema = zod.object({
  id: zod.number().int(),
  workTaskTypeId: zod.number().int(),
  cycleSubSpanGroupSize: zod.number().int(),
  cycleSubspanGroupId: zod.number().int(),
  workTaskSeriesUnits: zod.array(zod.lazy(() => WorkTaskSeriesUnitDtoSchema))
});

export const WorkTaskSeriesUnitDtoSchema = zod.object({
  id: zod.number().int(),
  scheduleId: zod.number().int(),
  cycleSubspanId: zod.number().int()
});

export const AssetRoleTypeDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string()
});

export const AssetTypeDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  isMoveable: zod.boolean()
});

export const OrganizationTypeDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string()
});

export const PartyNodeRelationshipTypeDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string(),
  hierarchical: zod.boolean()
});

export const ProviderRoleTypeDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string()
});

export const UserRoleTypeDtoSchema = zod.object({
  id: zod.number().int(),
  name: zod.string()
});

export const WorkTaskTypeDtoSchema = zod.object({
  name: zod.string().regex(/\S/).min(1),
  id: zod.number().int(),
  knowledgeDomain: zod.lazy(() => KnowledgeDomainDtoSchema),
  knowledgeLevel: zod.lazy(() => KnowledgeLevelDtoSchema.optional()),
  validationType: zod.lazy(() => ValidationTypeDtoSchema.optional()),
  partyClassificationSetId: zod.number().int().optional(),
  assetClassificationSetId: zod.number().int(),
  knowledgeLevelSeriesId: zod.number().int().optional()
});

export const LongIdStringNameTupleSchema = zod.object({
  id: zod.number().int(),
  name: zod.string()
});

export const LongLongTupleSchema = zod.object({
  longOne: zod.number().int(),
  longTwo: zod.number().int()
});

export const NameIdStringTupleSchema = zod.object({
  name: zod.string(),
  id: zod.string()
});

export const StringIntegerTupleSchema = zod.object({
  name: zod.string(),
  value: zod.number().int()
});

export const StringLongTupleSchema = zod.object({
  string: zod.string(),
  aLong: zod.number().int()
});

export const WorkProjectSeriesAssignmentDtoSchema = zod.object({
  id: zod.number().int(),
  sourceNodeId: zod.number().int(),
  workProjectSeries: zod.lazy(() => WorkProjectSeriesDtoSchema),
  organizationId: zod.number().int()
});

export const WorkProjectSeriesDtoSchema = zod.object({
  id: zod.string().uuid(),
  scheduleId: zod.number().int(),
  workTaskSeries: zod.array(zod.lazy(() => WorkTaskSeriesDtoSchema)),
  workProjectSeriesSchemaId: zod.number().int(),
  completedStatus: zod.boolean(),
  workTaskType: zod.lazy(() => WorkTaskTypeDtoSchema)
});

export const AssetRolePostRequestSchema = zod.object({
  workTaskTypeExampleList: zod.array(zod.lazy(() => WorkTaskTypeDtoSchema)),
  roleTypeExample: zod.lazy(() => AssetRoleTypeDtoSchema),
  rating: zod.number()
});

export const ProviderRolePostRequestSchema = zod.object({
  workTaskTypeExampleList: zod.array(zod.lazy(() => WorkTaskTypeDtoSchema)),
  roleTypeExample: zod.lazy(() => ProviderRoleTypeDtoSchema),
  rating: zod.number()
});

export const RoleDataSchema = zod.object({
  suitabilities: zod.array(zod.lazy(() => SuitabilitySummaryDtoSchema)),
  availabilities: zod.array(zod.lazy(() => AvailabilitySummaryDtoSchema))
});

export const HasWorkTaskTypeViewIdSchema = zod.object({});

export const DescribableDtoSchema = zod.object({
  description: zod.string()
});

export const RoleAvailabilityDtoSchema = zod.object({
  type: zod.string(),
  cycleSubspanId: zod.number().int(),
  baseEntityId: zod.number().int(),
  roleEntityId: zod.number().int(),
  availabilityCode: zod.number().int(),
  id: zod.number().int()
});

export const CollectionDtoSchema = zod.object({});

export const TriIntersectionDtoSchema = zod.object({
  idEntityC: zod.any()
});

export const IntersectionDtoSchema = zod.object({});

export const TypeDtoSchema = zod.object({
  name: zod.string(),
  id: zod.number().int()
});

export const RoleSuitabilityPostRequestSchema = zod.object({});
