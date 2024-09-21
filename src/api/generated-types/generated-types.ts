/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-09-16 14:26:19.

export interface AutoBuildParametersDto extends Serializable {
  multiStepUndoTimeoutMs: number;
  multiUndoIncrement: number;
  saveBuild: boolean;
  forceSaveMetrics: boolean;
}

export interface AvailabilityPostRequest {
  day: DayOfWeek;
  startTime: DateAsString;
  endTime: DateAsString;
  roleTypeNames: string[];
  availabilityCode: AvailabilityCode;
}

export interface CycleSubspanJoinNestedDto extends Serializable {
  id: number;
  cycleSubspanId: number;
  cycleSubspanGroupSize: number;
  cycleSubspanGroupId: string;
  joinOrdinal: number;
}

export interface CycleSubspanWithJoinsListDto
  extends Serializable,
    Identifiable<number> {
  id: number;
  timeSpan: TimeSpanDto;
  parentCycleId: number;
  name: string;
  cycleSubspanJoins: { [index: string]: CycleSubspanJoinNestedDto };
  zeroIndexedCycleDay: number;
  dayOrdinal: number;
  joinsIfNotFirst: { [index: string]: CycleSubspanJoinNestedDto[] };
}

export interface EventSource<T> {
  id: string;
  sourceData: T;
  events: EventDto[];
}

export interface GenericNestedDto<T> extends NestedDto<T> {}

export interface HierarchyEnrollmentRequest {
  scheduleId: number;
  organizationIdToUserRoleIdList: { [index: string]: number[] };
}

export interface PersonDto
  extends Serializable,
    DtoWrapper<Person, PersonDto, number> {
  id: number;
  dateOfBirth: DateAsString;
  personalName: string;
  familyName: string;
}

export interface ResourceRequirementItemRequest {
  providerRoleTypeName: string;
  assetRoleTypeName: string;
  requiredNumber: number;
}

export interface RolePostRequest<T> {
  baseEntity: T;
  suitabilities: SuitabilityPostRequest[];
  availabilities: AvailabilityPostRequest[];
}

export interface ScheduleDto
  extends Serializable,
    DtoWrapper<Schedule, ScheduleDto, number> {
  id: number;
  creationDateTime: DateAsString;
  fromDate: DateAsString;
  thruDate: DateAsString;
  active: boolean;
  cycleId: number;
  status: string;
}

export interface ScheduleParametersDto {
  autoBuildParametersDto: AutoBuildParametersDto;
  costParameters: string[];
}

export interface StaticDeliveryAllocationDto extends Serializable {
  id: number;
  cycleId: number;
  deliveryAllocation: DeliveryAllocationDto;
}

export interface StaticDeliveryAllocationItemDto
  extends Serializable,
    DtoWrapper<
      StaticDeliveryAllocationItem,
      StaticDeliveryAllocationItemDto,
      number
    > {
  id: number;
  cycleSubspanGroupId: string;
  staticDeliveryAllocation: StaticDeliveryAllocationDto;
  workProjectSeriesSchemaId: number;
}

export interface SuitabilityPostRequest {
  workTaskTypeMatrix: WorkTaskTypeListMatrix;
  roleTypeNames: string[];
  rating: number;
}

export interface ValidationTypeDto extends Serializable {}

export interface WorkProjectSeriesEnrollmentDto
  extends Serializable,
    DtoWrapper<
      WorkProjectSeriesEnrollment,
      WorkProjectSeriesEnrollmentDto,
      number
    > {
  id: number;
  userRoleId: number;
  workProjectSeriesId: string;
  fromDate: DateAsString;
  thruDate: DateAsString;
}

export interface WorkProjectSeriesMetricDto
  extends DtoWrapper<
    WorkProjectSeriesMetric,
    WorkProjectSeriesMetricDto,
    number
  > {
  id: number;
  finiteCostCount: number;
  infinityCostCount: number;
}

export interface WorkProjectSeriesNodeLinkDto extends Serializable {
  id: number;
  workProjectSeriesId: string;
  outcomeId: string;
}

export interface WorkProjectSeriesSchemaWithLabelsDto extends Serializable {
  id: number;
  name: string;
  workTaskType: WorkTaskTypeDto;
  workProjectBandwidth: number;
  userToProviderRatio: number;
}

export interface WorkProjectSeriesWithSchemaLabelsDto
  extends Serializable,
    Identifiable<string> {
  id: string;
  scheduleId: number;
  completedStatus: boolean;
  workProjectSeriesSchema: WorkProjectSeriesSchemaWithLabelsDto;
  workTaskType: WorkTaskTypeDto;
}

export interface WorkTaskSeriesEventDto {
  start: DateAsString;
  end: DateAsString;
  id: number;
  title: string;
  workTaskTypeId: number;
  providerRoleList: ProviderRoleDto[];
  assetRoleList: AssetRoleDto[];
}

export interface WorkTaskSeriesResourceRequirementItemDto extends Serializable {
  id: number;
  workTaskSeriesId: number;
  assetRoleTypeId: number;
  providerRoleTypeId: number;
  assetRoleFulfillmentId: number;
  providerRoleFulfillmentId: number;
}

export interface WorkTaskTypeListMatrix {
  knowledgeLevelSeriesDtoList: KnowledgeLevelSeriesDto[];
  knowledgeDomainDtoList: KnowledgeDomainDto[];
  workTaskTypeNames: string[];
}

export interface WorkTaskTypeMatrix {
  knowledgeLevelSeriesDtoSet: KnowledgeLevelSeriesDto[];
  knowledgeDomainDtoInclusionSet: KnowledgeDomainDto[];
  knowledgeDomainDtoExclusionSet: KnowledgeDomainDto[];
  workTaskTypeNames: string[];
}

export interface WorkTaskTypeResourceRequirementPostRequest {
  resourceRequirementItemRequests: ResourceRequirementItemRequest[];
  workTaskTypeMatrix: WorkTaskTypeListMatrix;
}

export interface Serializable {}

export interface TimeSpanDto
  extends Serializable,
    TypeDto<TimeSpan, TimeSpanDto> {
  startTimeDivisionInstant: DateAsString;
  endTimeDivisionInstant: DateAsString;
  startTimeDivisionId: number;
  endTimeDivisionId: number;
}

export interface EventDto extends Serializable {
  id: string;
  title: string;
  description: string;
  creationTime: DateAsString;
  start: DateAndTimeAndZoneDto;
  end: DateAndTimeAndZoneDto;
  calendarId: string;
}

export interface NestedDto<T> {
  children: NestedDto<T>[];
  data: T;
}

export interface DeliveryAllocationDto
  extends Serializable,
    DtoWrapper<DeliveryAllocation, DeliveryAllocationDto, number> {
  id: number;
  deliveryAllocationSize: number;
  count: number;
  workProjectSeriesSchemaId: number;
}

export interface WorkTaskTypeDto
  extends Serializable,
    TypeDto<WorkTaskType, WorkTaskTypeDto> {
  knowledgeDomain?: KnowledgeDomainDto;
  knowledgeLevel?: KnowledgeLevelDto;
  validationType?: ValidationTypeDto;
  knowledgeLevelSeriesId?: number;
}

export interface ProviderRoleDto
  extends DtoWrapper<ProviderRole, ProviderRoleDto, number>,
    LongIdentifiable {
  name: string;
  partyName: string;
  partyId: number;
  knowledgeDomainId: number;
  knowledgeDomainName: string;
  type: ProviderRoleTypeDto;
}

export interface AssetRoleDto
  extends Serializable,
    DtoWrapper<AssetRole, AssetRoleDto, number> {
  assetId: number;
  assetAssetCode: string;
  assetName: string;
  name: string;
  type: AssetRoleTypeDto;
  id: number;
}

export interface KnowledgeLevelSeriesDto
  extends Serializable,
    DtoWrapper<KnowledgeLevelSeries, KnowledgeLevelSeriesDto, number> {
  name: string;
  id: number;
  knowledgeLevelDescriptor?: string;
  knowledgeLevels: KnowledgeLevelDto[];
}

export interface KnowledgeDomainDto
  extends Serializable,
    DtoWrapper<KnowledgeDomain, KnowledgeDomainDto, number>,
    LongIdentifiable {
  name: string;
  shortCode?: string;
}

export interface Identifiable<I> {
  id: I;
}

export interface DateAndTimeAndZoneDto extends Serializable {
  dateTime: DateAsString;
  date: DateAsString;
  timeZone: string | null;
}

export interface DtoWrapper<E, D, I> extends Identifiable<I>, Serializable {}

export interface Person
  extends Party,
    SelfSerializing<Person, PersonDto, number> {
  id: number;
  personNameJoins: PersonNameJoin[];
  personNameStrategy: PersonNameStrategy;
  fullName: string;
  familyName: string;
  personalAndFamilyNames: string;
  middleNames: string;
  personalName: string;
}

export interface Schedule
  extends SelfSerializing<Schedule, ScheduleDto, number> {
  id: number;
  autoBuildParameters: AutoBuildParameters;
  status: ReportStatus;
  creationDateTime: DateAsString;
  fromDate: DateAsString;
  thruDate: DateAsString;
  active: boolean;
  cycle: Cycle;
  workTaskSeriesUnits: WorkTaskSeriesUnit[];
  workProjectSeries: WorkProjectSeries[];
  costParameters: CostParameter[];
  multiUndoIncrement: number;
  multiUndoTimeoutMs: number;
  serviceProductEnrollments: WorkTaskSeriesUnitEnrollment[];
  workTaskSeries: WorkTaskSeries[];
}

export interface StaticDeliveryAllocationItem
  extends SelfSerializing<
    StaticDeliveryAllocationItem,
    StaticDeliveryAllocationItemDto,
    number
  > {
  id: number;
  staticDeliveryAllocation: StaticDeliveryAllocation;
  cycleSubspanGroup: CycleSubspanGroup;
  staticDeliveryAllocationItemUnits: StaticDeliveryAllocationItemUnit[];
  workProjectSeriesSchema: WorkProjectSeriesSchema;
  cycleSubspans: CycleSubspan[];
}

export interface WorkProjectSeriesEnrollment
  extends LongIdentifiable,
    IntersectionEntityRead<UserRole, WorkProjectSeries>,
    SelfSerializing<
      WorkProjectSeriesEnrollment,
      WorkProjectSeriesEnrollmentDto,
      number
    > {
  id: number;
  userRole: UserRole;
  workProjectSeries: WorkProjectSeries;
  thruDate: DateAsString;
  fromDate: DateAsString;
  workTaskSeriesEnrollments: WorkTaskSeriesEnrollment[];
  entityB: WorkProjectSeries;
  entityA: UserRole;
  serviceProductCycle: WorkProjectSeries;
}

export interface WorkProjectSeriesMetric
  extends SelfSerializing<
    WorkProjectSeriesMetric,
    WorkProjectSeriesMetricDto,
    number
  > {
  id: number;
  workProjectSeries: WorkProjectSeries;
  infinityCostCount: number;
  cycleSubspanGroup: CycleSubspanGroup;
  buildMetric: BuildMetric;
  finiteCostCount: number;
}

export interface KnowledgeLevelDto
  extends Serializable,
    DtoWrapper<KnowledgeLevel, KnowledgeLevelDto, number> {
  name: string;
  id: number;
  levelOrdinal: number;
  knowledgeLevelSeriesId: number;
}

export interface ProviderRoleTypeDto
  extends Serializable,
    TypeDto<ProviderRoleType, ProviderRoleTypeDto> {}

export interface LongIdentifiable extends Identifiable<number> {
  id: number;
}

export interface AssetRoleTypeDto
  extends Serializable,
    TypeDto<AssetRoleType, AssetRoleTypeDto> {}

export interface TypeDto<T, D>
  extends HasName,
    DtoWrapper<T, D, number>,
    LongIdentifiable {}

export interface TimeSpan
  extends Comparable<TimeSpan>,
    TypeFor<CycleSubspan, TimeSpan, TimeSpanDto> {
  startTimeDivision: TimeDivision;
  endTimeDivision: TimeDivision;
  cycleSubspans: CycleSubspan[];
  startTime: DateAsString;
  endTime: DateAsString;
  entities: CycleSubspan[];
}

export interface ZoneId extends Serializable {}

export interface ProviderRole
  extends Role,
    PartyRole<ProviderRole>,
    EntityWithType<ProviderRole, ProviderRoleType, ProviderRoleTypeDto>,
    SelfSerializing<ProviderRole, ProviderRoleDto, number>,
    ResourceRole,
    HasEmail {
  id: number;
  knowledgeDomain: KnowledgeDomain;
  maximumWeeklyHours: number;
  type: ProviderRoleType;
  workTaskSeriesResourceRequirementItems: WorkTaskSeriesResourceRequirementItem[];
  providerAvailabilities: ProviderRoleAvailability[];
  workTaskSeries: WorkTaskSeries[];
  roleType: ProviderRole;
  providerAvailability: ProviderRoleAvailability[];
}

export interface ProviderRoleTypeWorkTaskTypeSuitability
  extends SelfSerializing<
      ProviderRoleTypeWorkTaskTypeSuitability,
      ProviderRoleTypeWorkTaskTypeSuitabilityDto,
      number
    >,
    TriIntersectionEntityRead<Party, WorkTaskType, ProviderRoleType>,
    RatingEntity,
    SuitabilityEntity<Party, WorkTaskType, ProviderRoleType>,
    IdSettable<number> {
  id: number;
  party: Party;
  providerRoleType: ProviderRoleType;
  workTaskType: WorkTaskType;
  entityB: WorkTaskType;
  entityA: Party;
  entityC: ProviderRoleType;
}

export interface PersonNameJoin {
  id: number;
  person: Person;
  personName: PersonName;
  nameOrdinal: number;
}

export interface ProviderRoleAvailability
  extends SelfSerializing<
      ProviderRoleAvailability,
      ProviderRoleAvailabilityDto,
      number
    >,
    LongIdentifiable,
    IdSettable<number>,
    RoleAvailability<ProviderRole> {
  providerRole: ProviderRole;
  party: Party;
  entityA: ProviderRole;
  neverAvailable: boolean;
}

export interface PartyNode
  extends ClosureNode<PartyNode, PartyNodeRelationship> {
  closureManager: ClosureManager<PartyNode, PartyNodeRelationship>;
  party: Party;
  closuresAsChild: PartyNodeRelationship[];
  closuresAsParent: PartyNodeRelationship[];
  allClosures: PartyNodeRelationship[];
  allNodes: PartyNode[];
}

export interface Party extends Nameable, LongIdentifiable {
  dateOfBirth: DateAsString;
  providerRoles: ProviderRole[];
  workTaskTypeProviderRoleTypeSuitabilities: ProviderRoleTypeWorkTaskTypeSuitability[];
  providerRoleAvailabilities: ProviderRoleAvailability[];
  partyType: string;
  partyGraphNodes: PartyNode[];
}

export interface AutoBuildParameters {
  multiStepUndoTimeoutMs: number;
  multiUndoIncrement: number;
  saveBuild: boolean;
  forceSaveMetrics: boolean;
}

export interface Cycle
  extends CycleModel,
    SelfSerializing<Cycle, CycleDto, number> {
  id: number;
  cycleDayZero: DayOfWeek;
  /**
   * @deprecated
   */
  maxGroupSize: number;
  schedules: Schedule[];
  staticDeliveryAllocations: StaticDeliveryAllocation[];
}

export interface WorkTaskSeriesUnit {
  id: number;
  schedule: Schedule;
  workTaskSeries: WorkTaskSeries;
  cycleSubspan: CycleSubspan;
  workTaskSeriesUnitEnrollments: WorkTaskSeriesUnitEnrollment[];
}

export interface WorkProjectSeries
  extends SelfSerializing<WorkProjectSeries, WorkProjectSeriesDto, string> {
  id: string;
  schedule: Schedule;
  workProjectSeriesEnrollments: WorkProjectSeriesEnrollment[];
  workProjectSeriesSchema: WorkProjectSeriesSchema;
  workTaskType: WorkTaskType;
  completedStatus: boolean;
  size: number;
  providerRoleTypeCountMap: { [index: string]: number };
  workTaskSeriesDtoList: WorkTaskSeriesDto[];
  knowledgeDomain: KnowledgeDomain;
  cycleSubspanSetView: CycleSubspan[];
  workTaskSeriesSetView: WorkTaskSeries[];
  cycleSubspanGroupListView: CycleSubspanGroup[];
  serviceProductCycleSchema: WorkProjectSeriesSchema;
}

export interface CostParameter {
  id: number;
  name: string;
  schedule: Schedule;
  position: number;
}

export interface WorkTaskSeriesUnitEnrollment
  extends IntersectionEntityRead<Party, CycleSubspan> {
  schedule: Schedule;
  id: number;
  workTaskSeriesUnit: WorkTaskSeriesUnit;
  cycleSubspan: CycleSubspan;
  workTaskSeriesEnrollment: WorkTaskSeriesEnrollment;
  userRole: UserRole;
  party: Party;
  entityB: CycleSubspan;
  entityA: Party;
}

export interface WorkTaskSeries {
  id: number;
  workTaskType: WorkTaskType;
  workProjectSeries: WorkProjectSeries;
  cycleSubspanGroup: CycleSubspanGroup;
  workTaskSeriesUnits: WorkTaskSeriesUnit[];
  workTaskSeriesResourceRequirementItems: WorkTaskSeriesResourceRequirementItem[];
  workTaskSeriesEnrollments: WorkTaskSeriesEnrollment[];
  size: number;
  startTime: DateAsString;
  subject: string;
  endTime: DateAsString;
  schedule: Schedule;
  assetRoles: AssetRole[];
  providerRoles: ProviderRole[];
  cycleSubspans: CycleSubspan[];
}

export interface DeliveryAllocation
  extends SelfSerializing<DeliveryAllocation, DeliveryAllocationDto, number> {
  id: number;
  workProjectSeriesSchema: WorkProjectSeriesSchema;
  allocationArea: IntegerScalarProduct;
  staticDeliveryAllocations: StaticDeliveryAllocation[];
  size: number;
  count: number;
  workTaskType: WorkTaskType;
  volume: number;
}

export interface StaticDeliveryAllocation {
  id: number;
  cycle: Cycle;
  deliveryAllocation: DeliveryAllocation;
  staticDeliveryAllocationItems: StaticDeliveryAllocationItem[];
  cycleSubspanGroups: CycleSubspanGroup[];
}

export interface CycleSubspanGroup
  extends Comparable<CycleSubspanGroup>,
    CollectionEntity<CycleSubspanGroup, CycleSubspanJoin, CycleSubspan, string>,
    SelfSerializing<CycleSubspanGroup, CycleSubspanGroupDto, string>,
    CycleSlice {
  size: number;
  cycleSubspanJoins: CycleSubspanJoin[];
  id: string;
  staticDeliveryAllocationItems: StaticDeliveryAllocationItem[];
  cycleLayerItems: CycleLayerItem[];
  dayOfWeek: DayOfWeek;
  cycle?: Cycle;
  cycleSubSpans: CycleSubspan[];
  cycleSubspansList: CycleSubspan[];
  intersectionItems: CycleSubspanJoin[];
}

export interface StaticDeliveryAllocationItemUnit {
  id: number;
  workProjectSeriesSchema: WorkProjectSeriesSchema;
  cycleSubspan: CycleSubspan;
  staticDeliveryAllocationItem: StaticDeliveryAllocationItem;
}

export interface WorkProjectSeriesSchema
  extends LongIdentifiable,
    Nameable,
    SelfSerializing<
      WorkProjectSeriesSchema,
      WorkProjectSeriesSchemaDto,
      number
    > {
  id: number;
  workTaskType: WorkTaskType;
  deliveryAllocations: DeliveryAllocation[];
  workProjectBandwidth: number;
  userToProviderRatio: number;
  carouselGroupOptions: CarouselGroupOption[];
  carouselOptions: CarouselOption[];
  workSchemaNodes: WorkSchemaNode[];
  knowledgeLevel: KnowledgeLevel;
  shortCode: string;
  knowledgeDomain: KnowledgeDomain;
  deliveryAllocationsPerCycle: number;
  subjectNamePrefix: string;
  deliveryAllocationsMap: { [index: string]: DeliveryAllocation };
  allocationEntryTokens: EntryToken<
    WorkProjectSeriesFactory,
    CycleWorkerGrouping
  >[];
  intersectionItems: DeliveryAllocation[];
}

export interface CycleSubspan
  extends Comparable<CycleSubspan>,
    LongIdentifiable,
    SelfSerializing<CycleSubspan, CycleSubspanDto, number>,
    EntityWithType<CycleSubspan, TimeSpan, TimeSpanDto>,
    Nameable {
  id: number;
  timeSpan: TimeSpan;
  cycle: Cycle;
  cycleSubspanJoins: CycleSubspanJoin[];
  singletonGroup: CycleSubspanGroup;
  zeroIndexedCycleDay: number;
  type: TimeSpan;
  duration: Duration;
  dayOfWeek: DayOfWeek;
  startTime: DateAsString;
  endTime: DateAsString;
  dayOrdinal: number;
  zeroIndexedWeekNumber: number;
}

export interface UserRole
  extends Role,
    PartyRole<UserRole>,
    EntityWithType<UserRole, UserRoleType, UserRoleTypeDto>,
    SelfSerializing<UserRole, UserRoleDto, number> {
  id: number;
  knowledgeLevelSeries: KnowledgeLevelSeries;
  userRoleType: UserRoleType;
  carouselOrders: CarouselOrder[];
  workTaskSeriesEnrollments: WorkTaskSeriesEnrollment[];
  workProjectSeriesEnrollment: WorkProjectSeriesEnrollment[];
  type: UserRoleType;
  roleType: UserRole;
}

export interface WorkTaskSeriesEnrollment {
  workProjectSeriesEnrollment: WorkProjectSeriesEnrollment;
  id: number;
  userRole: UserRole;
  workTaskSeries: WorkTaskSeries;
  workTaskSeriesUnitEnrollments: WorkTaskSeriesUnitEnrollment[];
}

export interface BuildMetric
  extends GenericBuildMetric<WorkProjectSeriesFactory, CycleWorkerGrouping>,
    SelfSerializing<BuildMetric, BuildMetricDto, number> {
  id: number;
  schedule: Schedule;
  workProjectSeriesMetrics: WorkProjectSeriesMetric[];
  queueTreeNodes: QueueTreeNode[];
  finalState: AuctionState;
  totalAllocationLoops: number;
}

export interface WorkTaskType
  extends SelfSerializing<WorkTaskType, WorkTaskTypeDto, number>,
    IntersectionEntityRead<KnowledgeDomain, KnowledgeLevel>,
    TypeFor<WorkTask, WorkTaskType, WorkTaskTypeDto> {
  knowledgeDomain: KnowledgeDomain;
  knowledgeLevel: KnowledgeLevel;
  validationType: ValidationType;
  durationInCycleSubspans: number;
  durationInMinutes: number;
  workProjectSeriesSchemas: WorkProjectSeriesSchema[];
  assetRoleTypeWorkTaskTypeSuitabilities: AssetRoleTypeWorkTaskTypeSuitability[];
  providerRoleTypeWorkTaskTypeSuitabilities: ProviderRoleTypeWorkTaskTypeSuitability[];
  entities: WorkTask[];
  workTaskSeries: WorkTaskSeries[];
  resourceRequirementItems: ResourceRequirementItem[];
  knowledgeLevelOrdinal: number;
  workProjectSchemaItems: TaskSequenceSchemaItem[];
  providerRoleTypeCountMap: { [index: string]: number };
  workTaskTypeName: WorkTaskTypeName;
  knowledgeLevelSeries: KnowledgeLevelSeries;
  nameSpaceIdentifier: string;
  shortCode: string;
  entityB: KnowledgeLevel;
  entityA: KnowledgeDomain;
  workTaskTypeCycleLayerPermissions: WorkTaskTypeCycleLayerExclusion[];
  serviceProductCycleSchemas: WorkProjectSeriesSchema[];
}

export interface AssetRole
  extends SelfSerializing<AssetRole, AssetRoleDto, number>,
    EntityWithType<AssetRole, AssetRoleType, AssetRoleTypeDto>,
    LongIdentifiable,
    ResourceRole {
  asset: Asset;
  name: string;
  type: AssetRoleType;
  workTaskUtilizations: WorkTaskUtilization[];
  assetRoleAvailabilities: AssetRoleAvailability[];
  workTaskSeriesResourceRequirementItems: WorkTaskSeriesResourceRequirementItem[];
  location: boolean;
}

export interface KnowledgeLevelSeries
  extends LongIdentifiable,
    Nameable,
    SelfSerializing<KnowledgeLevelSeries, KnowledgeLevelSeriesDto, number> {
  id: number;
  knowledgeLevelDescriptor: string;
  knowledgeLevels: KnowledgeLevel[];
  userRoles: UserRole[];
}

export interface KnowledgeDomain
  extends LongIdentifiable,
    SelfSerializing<KnowledgeDomain, KnowledgeDomainDto, number>,
    ClosureNode<KnowledgeDomain, KnowledgeDomainClosure> {
  closureManager: ClosureManager<KnowledgeDomain, KnowledgeDomainClosure>;
  name: string;
  shortCode: string;
  workTaskTypes: WorkTaskType[];
  workSchemaNodes: WorkSchemaNode[];
  closuresAsChild: KnowledgeDomainClosure[];
  closuresAsParent: KnowledgeDomainClosure[];
  providerPartyRoles: ProviderRole[];
}

export interface HasName {
  name: string;
}

export interface TimeDivision
  extends Comparable<TimeDivision>,
    SelfSerializing<TimeDivision, TimeDivisionDto, number> {
  id: number;
  instant: DateAsString;
}

export interface PartyRoleRelationship {
  fromDate: DateAsString;
  thruDate: DateAsString;
  id: number;
  name: string;
  fromPartyRole: PartyRole<any>;
  toPartyRole: PartyRole<any>;
  serviceProductType: WorkTaskType;
}

export interface ProviderRoleType
  extends ClosureNode<ProviderRoleType, ProviderRoleTypeClosure>,
    TypeFor<ProviderRole, ProviderRoleType, ProviderRoleTypeDto> {
  resourceRequirementItems: ResourceRequirementItem[];
  closureManager: ClosureManager<ProviderRoleType, ProviderRoleTypeClosure>;
  closuresAsParent: ProviderRoleTypeClosure[];
  closuresAsChild: ProviderRoleTypeClosure[];
  workTaskTypeProviderRoleTypeSuitabilities: ProviderRoleTypeWorkTaskTypeSuitability[];
  entities: ProviderRole[];
  allClosures: ProviderRoleTypeClosure[];
  allNodes: ProviderRoleType[];
}

export interface WorkTaskSeriesResourceRequirementItem {
  id: number;
  workTaskSeries: WorkTaskSeries;
  assetRoleType: AssetRoleType;
  providerRoleType: ProviderRoleType;
  assetRoleFulfillment: AssetRole;
  providerRoleFulfillment: ProviderRole;
  schedule: Schedule;
}

export interface Calendar {
  id: string;
  name: string;
  ownerRole: Role;
  scheduleEvents: Event[];
}

export interface Role extends LongIdentifiable, Nameable, HasEmail {
  colorCode: string;
  startDate: DateAsString;
  thruDate: DateAsString;
  partyRoleRelationships: PartyRoleRelationship[];
  party: Party;
  calendars: Calendar[];
  defaultCalendar: Calendar;
}

export interface ResourceRole {
  allowableCycleSubspans: CycleSubspan[];
}

export interface HasEmail {
  email: string;
}

export interface RatingEntity {
  rating: number;
}

export interface PersonName {}

export interface ClosureManager<N, C> extends ClosureManagerInterface<N, C> {
  shortestPath: boolean;
  uniqueRoot: boolean;
}

export interface PartyNodeRelationship
  extends Closure<PartyNode, PartyNodeRelationship>,
    EntityWithType<
      PartyNodeRelationship,
      PartyNodeRelationshipType,
      PartyNodeRelationshipTypeDto
    > {
  name: string;
  type: PartyNodeRelationshipType;
  child: PartyNode;
  parent: PartyNode;
  nodes: PartyNode[];
}

export interface Nameable extends HasName {}

export interface SelfSerializing<E, D, I> extends Identifiable<I> {}

export interface CycleModel {
  cycleLengthInDays: number;
  cycleLengthInWeeks: number;
  cycleSubSpans: CycleSubspan[];
  cycleLengthInSeconds: number;
  validCycleSubspanGroupSizes: number[];
  validCycleSubspanGroups: CycleSubspanGroup[];
  cycleStartDay: DayOfWeek;
}

export interface WorkTaskSeriesDto extends Serializable {
  id: number;
  workTaskTypeId: number;
  cycleSubSpanGroupSize: number;
  cycleSubSpanGroupId: string;
  workTaskSeriesUnits: WorkTaskSeriesUnitDto[];
}

export interface IntegerScalarProduct {
  dimensionX: number;
  dimensionY: number;
  area: number;
}

export interface CycleSubspanJoin
  extends Comparable<CycleSubspanJoin>,
    ItemEntityRead<CycleSubspanGroup, CycleSubspanJoin, CycleSubspan>,
    SelfSerializing<CycleSubspanJoin, CycleSubspanJoinDto, number> {
  id: number;
  cycleSubspan: CycleSubspan;
  cycleSubspanGroup: CycleSubspanGroup;
  joinOrdinal: number;
  entityB: CycleSubspan;
  entityA: CycleSubspanGroup;
}

export interface CycleLayerItem {
  id: number;
  cycleLayer: CycleLayer;
  cycleSubspanGroup: CycleSubspanGroup;
}

export interface CycleSlice {
  startTime: DateAsString;
  endTime: DateAsString;
  cycleDay: number;
}

export interface CarouselGroupOption
  extends ItemEntityRead<
      CarouselGroup,
      CarouselGroupOption,
      WorkProjectSeriesSchema
    >,
    SelfSerializing<CarouselGroupOption, CarouselGroupOptionDto, number>,
    IdSettable<number> {
  id: number;
  carouselGroup: CarouselGroup;
  workProjectSeriesSchema: WorkProjectSeriesSchema;
  entityB: WorkProjectSeriesSchema;
  entityA: CarouselGroup;
}

export interface CarouselOption
  extends LongIdentifiable,
    SelfSerializing<CarouselOption, CarouselOptionDto, number>,
    ItemEntityRead<Carousel, CarouselOption, WorkProjectSeriesSchema>,
    IdSettable<number> {
  carousel: Carousel;
  workProjectSeriesSchema: WorkProjectSeriesSchema;
  workSchemaNode: WorkSchemaNode;
  entityB: WorkProjectSeriesSchema;
  entityA: Carousel;
  assignedCarouselOrderItems: CarouselOrderItem[];
}

export interface WorkSchemaNode
  extends ClosureNode<WorkSchemaNode, WorkSchemaClosure>,
    WorkSchemaNodeTaskSourceResolver,
    SelfSerializing<WorkSchemaNode, WorkSchemaNodeDto, number> {
  closureManager: ClosureManager<WorkSchemaNode, WorkSchemaClosure>;
  id: number;
  name: string;
  knowledgeLevel: KnowledgeLevel;
  knowledgeDomain: KnowledgeDomain;
  workProjectSeriesSchema: WorkProjectSeriesSchema;
  carousel: Carousel;
  carouselGroup: CarouselGroup;
  carouselOption: CarouselOption;
  allowBundle: boolean;
  preferCarousel: boolean;
  priority: number;
  dominanceFactor: number;
  closuresAsParent: WorkSchemaClosure[];
  closuresAsChild: WorkSchemaClosure[];
  workSchemaNodeAssignments: WorkSchemaNodeAssignment[];
  workProjectSeriesAssignments: WorkProjectSeriesAssignment[];
  root: WorkSchemaNode;
  resolutionMode: WorkSchemaNodeTypes;
  uniqueRoot: boolean;
  orGenerateName: string;
  permittedChildTypes: WorkSchemaNodeTypes[];
}

export interface KnowledgeLevel
  extends LongIdentifiable,
    SelfSerializing<KnowledgeLevel, KnowledgeLevelDto, number> {
  name: string;
  id: number;
  levelOrdinal: number;
  knowledgeLevelSeries: KnowledgeLevelSeries;
  workTaskTypes: WorkTaskType[];
  carouselGroups: CarouselGroup[];
  workSchemaNodes: WorkSchemaNode[];
}

export interface EntryToken<T, W> {
  auctionIsLive: boolean;
}

export interface WorkProjectSeriesFactory extends AbstractSchemaNodeFactory {
  workProjectSeries: WorkProjectSeries;
  workProjectSeriesSchema: WorkProjectSeriesSchema;
  idealCycleSubspanManager: IdealCycleSubspanManager;
  baselineBandwidth: number;
  boxToConstrainCycle: NoOverlapDomainBox;
  workTaskTypeBandwidthMap: { [index: string]: { [index: string]: number } };
  domainConstraint: boolean;
  allocationCostFunctionGenerator: AllocationCostFunctionGenerator;
}

export interface CycleWorkerGrouping
  extends WorkerGrouping<WorkProjectSeriesFactory, CycleWorkerGrouping> {
  cycleSubspanGroup: CycleSubspanGroup;
  workers: Worker<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
}

export interface Duration
  extends TemporalAmount,
    Comparable<Duration>,
    Serializable {}

export interface UserRoleType
  extends TypeFor<UserRole, UserRoleType, UserRoleTypeDto>,
    ClosureNode<UserRoleType, UserRoleTypeClosure>,
    SelfSerializing<UserRoleType, UserRoleTypeDto, number> {
  closureManager: ClosureManager<UserRoleType, UserRoleTypeClosure>;
  id: number;
  closuresAsParent: UserRoleTypeClosure[];
  closuresAsChild: UserRoleTypeClosure[];
  userRole: UserRole[];
  entities: UserRole[];
}

export interface CarouselOrder
  extends CollectionEntity<
      CarouselOrder,
      CarouselOrderItem,
      WorkProjectSeriesSchema,
      string
    >,
    SelfSerializing<CarouselOrder, CarouselOrderDto, string> {
  id: string;
  carouselGroup: CarouselGroup;
  userRole: UserRole;
  intersectionItems: CarouselOrderItem[];
  orderItems: CarouselOrderItem[];
  subscribedCarousels: Carousel[];
  listOfActiveElectives: CarouselOrderItem[];
}

export interface IntersectionEntityRead<EntityA, EntityB> {
  entityB: EntityB;
  entityA: EntityA;
}

export interface QueueTreeNode {
  id: string;
  nodeNumber: number;
  taskSize: number;
  degreeOfNesting: number;
  successCount: number;
  failureCount: number;
  buildMetric: BuildMetric;
  workProjectSeriesNodeLinks: WorkProjectSeriesNodeLink[];
}

export interface ValidationType extends LongIdentifiable {
  name: string;
  workTaskTypes: WorkTaskType[];
}

export interface AssetRoleTypeWorkTaskTypeSuitability
  extends SelfSerializing<
      AssetRoleTypeWorkTaskTypeSuitability,
      AssetRoleTypeWorkTaskTypeSuitabilityDto,
      number
    >,
    TriIntersectionEntityRead<Asset, WorkTaskType, AssetRoleType>,
    RatingEntity,
    SuitabilityEntity<Asset, WorkTaskType, AssetRoleType>,
    IdSettable<number> {
  id: number;
  assetRoleType: AssetRoleType;
  workTaskType: WorkTaskType;
  asset: Asset;
  entityB: WorkTaskType;
  entityA: Asset;
  entityC: AssetRoleType;
}

export interface WorkTask
  extends ReasonInterface<WorkTask>,
    EntityWithType<WorkTask, WorkTaskType, WorkTaskTypeDto> {
  id: number;
  dueDate: DateAsString;
  type: WorkTaskType;
  creator: Role;
  createdDate: DateAsString;
  completedDate: DateAsString;
  notes: string;
  workProject: WorkProject;
  workTaskUtilizations: WorkTaskUtilization[];
  reason: WorkTask;
  normalisedOutcomeMeasure: number;
  serviceProductType: WorkTaskType;
}

export interface ResourceRequirementItem
  extends SelfSerializing<
    ResourceRequirementItem,
    ResourceRequirementItemDto,
    number
  > {
  workTaskType: WorkTaskType;
  providerRoleType: ProviderRoleType;
  assetRoleType: AssetRoleType;
  id: number;
}

export interface TaskSequenceSchemaItem {
  id: number;
  workTaskType: WorkTaskType;
  sequencePosition: number;
  workProjectSchema: TaskSequenceSchema;
}

export interface WorkTaskTypeName {
  id: number;
  name: string;
}

export interface WorkTaskTypeCycleLayerExclusion {
  id: number;
  workTaskType: WorkTaskType;
  cycleLayer: CycleLayer;
}

export interface AssetRoleType
  extends LongIdentifiable,
    ClosureNode<AssetRoleType, AssetRoleTypeClosure>,
    SelfSerializing<AssetRoleType, AssetRoleTypeDto, number>,
    TypeFor<AssetRole, AssetRoleType, AssetRoleTypeDto> {
  closureManager: ClosureManager<AssetRoleType, AssetRoleTypeClosure>;
  assetRoles: AssetRole[];
  closuresAsParent: AssetRoleTypeClosure[];
  closuresAsChild: AssetRoleTypeClosure[];
  assetRoleWorkTaskSuitabilities: AssetRoleTypeWorkTaskTypeSuitability[];
  resourceRequirementItems: ResourceRequirementItem[];
  allClosures: AssetRoleTypeClosure[];
  entities: AssetRole[];
  allNodes: AssetRoleType[];
}

export interface Asset
  extends ClosureNode<Asset, AssetClosure>,
    SelfSerializing<Asset, AssetDto, number>,
    EntityWithType<Asset, AssetType, AssetTypeDto> {
  closureManager: ClosureManager<Asset, AssetClosure>;
  id: number;
  assetCode: string;
  name: string;
  type: AssetType;
  owner: Party;
  closuresAsParent: AssetClosure[];
  closuresAsChild: AssetClosure[];
  assetRoleTypeWorkTaskTypeSuitabilities: AssetRoleTypeWorkTaskTypeSuitability[];
  assetRoles: AssetRole[];
  assetRoleAvailabilities: AssetRoleAvailability[];
  allClosures: AssetClosure[];
  allNodes: Asset[];
}

export interface WorkTaskUtilization {
  id: number;
  assetRole: AssetRole;
  workTask: WorkTask;
}

export interface AssetRoleAvailability
  extends SelfSerializing<
      AssetRoleAvailability,
      AssetRoleAvailabilityDto,
      number
    >,
    LongIdentifiable,
    IdSettable<number>,
    RoleAvailability<AssetRole> {
  assetRole: AssetRole;
  asset: Asset;
  entityA: AssetRole;
  neverAvailable: boolean;
}

export interface KnowledgeDomainClosure
  extends Closure<KnowledgeDomain, KnowledgeDomainClosure> {
  parent: KnowledgeDomain;
  child: KnowledgeDomain;
  nodes: KnowledgeDomain[];
}

export interface Comparable<T> {}

export interface TypeFor<E, T, DtoForType>
  extends Nameable,
    LongIdentifiable,
    SelfSerializing<T, DtoForType, number> {
  entities: E[];
  id: number;
}

export interface ProviderRoleTypeClosure
  extends Closure<ProviderRoleType, ProviderRoleTypeClosure> {
  parent: ProviderRoleType;
  child: ProviderRoleType;
  nodes: ProviderRoleType[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  creationTime: DateAsString;
  start: DateAsString;
  end: DateAsString;
  calendar: Calendar;
  eventAttendances: EventAttendance[];
  startTimeZone: ZoneId;
  scheduleEventAttendances: EventAttendance[];
}

export interface PartyRole<T> {
  name: string;
  id: number;
  party: Party;
  startDate: DateAsString;
  thruDate: DateAsString;
  roleType: T;
}

export interface EntityWithType<E, T, DT> {
  type: T;
}

export interface ProviderRoleTypeWorkTaskTypeSuitabilityDto
  extends Serializable,
    LongIdentifiable,
    DtoWrapper<
      ProviderRoleTypeWorkTaskTypeSuitability,
      ProviderRoleTypeWorkTaskTypeSuitabilityDto,
      number
    >,
    TriIntersectionDto<number, number, number> {
  id: number;
  rating: number;
  isDynamic?: boolean;
  partyId: number;
  providerRoleTypeId: number;
  providerRoleTypeName: string;
  workTaskTypeId: number;
  workTaskTypeName: string;
  idEntityC: number;
}

export interface TriIntersectionEntityRead<A, B, C>
  extends IntersectionEntityRead<A, B> {
  entityC: C;
  entityB: B;
  entityA: A;
}

export interface SuitabilityEntity<T, U, V>
  extends TriIntersectionEntityRead<T, U, V>,
    RatingEntity {
  entityC: V;
  entityB: U;
  entityA: T;
}

export interface IdSettable<IdClass> {}

export interface ProviderRoleAvailabilityDto
  extends Serializable,
    DtoWrapper<ProviderRoleAvailability, ProviderRoleAvailabilityDto, number>,
    LongIdentifiable,
    IntersectionDto<number, number>,
    RoleAvailabilityDto {
  providerRoleId: number;
  partyId: number;
}

export interface RoleAvailability<T>
  extends IntersectionEntityRead<T, CycleSubspan> {
  available: boolean;
  availabilityCode: AvailabilityCode;
  cycleSubspan: CycleSubspan;
  entityB: CycleSubspan;
  entityA: T;
}

export interface PartyNodeRelationshipType
  extends TypeFor<
      PartyNodeRelationship,
      PartyNodeRelationshipType,
      PartyNodeRelationshipTypeDto
    >,
    SelfSerializing<
      PartyNodeRelationshipType,
      PartyNodeRelationshipTypeDto,
      number
    > {
  entities: PartyNodeRelationship[];
  id: number;
  parentType: PartyNodeRelationshipType;
  childTypeSet: PartyNodeRelationshipType[];
  hierarchical: boolean;
}

export interface ClosureNode<N, C> extends LongIdentifiable {
  closuresAsParent: C[];
  closuresAsChild: C[];
  closureManager: ClosureManager<N, C>;
}

export interface CycleDto
  extends Serializable,
    DtoWrapper<Cycle, CycleDto, number> {
  id: number;
  cycleLengthInDays: number;
  maxGroupSize: number;
  cycleSubspanGroupSizes: number[];
  cycleDayZero: DayOfWeek;
  cycleLengthInWeeks: number;
}

export interface WorkTaskSeriesUnitDto extends Serializable {
  id: number;
  scheduleId: number;
  cycleSubspanId: number;
}

export interface WorkProjectSeriesDto
  extends Serializable,
    DtoWrapper<WorkProjectSeries, WorkProjectSeriesDto, string> {
  id: string;
  scheduleId: number;
  workTaskSeries?: WorkTaskSeriesDto[];
  workProjectSeriesSchemaId: number;
  completedStatus: boolean;
  workTaskType: WorkTaskTypeDto;
}

export interface CycleLayer {
  id: number;
  cycle: Cycle;
  cycleLayerItems: CycleLayerItem[];
  workTaskTypeCycleLayerPermissions: WorkTaskTypeCycleLayerExclusion[];
}

export interface CollectionEntity<
  CollectionE,
  Item,
  EntityReferencedByItem,
  CollectionIdClass
> extends Identifiable<CollectionIdClass> {
  intersectionItems: Item[];
  id: CollectionIdClass;
}

export interface CycleSubspanGroupDto
  extends Serializable,
    DtoWrapper<CycleSubspanGroup, CycleSubspanGroupDto, string>,
    CollectionDto<CycleSubspanJoinDto, number> {
  cycleSubspanJoins: CycleSubspanJoinDto[];
  id: string;
}

export interface CarouselGroup
  extends CollectionEntity<
      CarouselGroup,
      CarouselGroupOption,
      WorkProjectSeriesSchema,
      number
    >,
    SelfSerializing<CarouselGroup, CarouselGroupDto, number>,
    Nameable {
  id: number;
  knowledgeLevel: KnowledgeLevel;
  carousels: Carousel[];
  carouselGroupOptions: CarouselGroupOption[];
  carouselOrders: CarouselOrder[];
  workSchemaNode: WorkSchemaNode;
  intersectionItems: CarouselGroupOption[];
  carouselOptions: CarouselOption[];
}

export interface Carousel
  extends Nameable,
    Identifiable<number>,
    CollectionEntity<Carousel, CarouselOption, WorkProjectSeriesSchema, number>,
    SelfSerializing<Carousel, CarouselDto, number> {
  id: number;
  carouselOptions: CarouselOption[];
  carouselOrdinal: number;
  carouselGroup: CarouselGroup;
  workSchemaNode: WorkSchemaNode;
  workProjectSeriesSchemas: WorkProjectSeriesSchema[];
  intersectionItems: CarouselOption[];
  subscribers: CarouselOrderItem[];
}

export interface CarouselOrderItem
  extends ItemEntityRead<
      CarouselOrder,
      CarouselOrderItem,
      WorkProjectSeriesSchema
    >,
    SelfSerializing<CarouselOrderItem, CarouselOrderItemDto, number>,
    IdSettable<number> {
  id: number;
  carouselOrder: CarouselOrder;
  workProjectSeriesSchema: WorkProjectSeriesSchema;
  preferencePosition: number;
  active: boolean;
  carouselOption: CarouselOption;
  entityB: WorkProjectSeriesSchema;
  entityA: CarouselOrder;
  assignedCarousel: Carousel;
  course: WorkProjectSeriesSchema;
}

export interface WorkSchemaClosure
  extends Closure<WorkSchemaNode, WorkSchemaClosure> {
  parent: WorkSchemaNode;
  child: WorkSchemaNode;
  nodes: WorkSchemaNode[];
}

export interface WorkSchemaNodeAssignment
  extends IntersectionEntityRead<Organization, WorkSchemaNode>,
    SelfSerializing<
      WorkSchemaNodeAssignment,
      WorkSchemaNodeAssignmentDto,
      number
    >,
    IdSettable<number> {
  id: number;
  organization: Organization;
  workSchemaNode: WorkSchemaNode;
  entityB: WorkSchemaNode;
  entityA: Organization;
}

export interface WorkProjectSeriesAssignment
  extends SelfSerializing<
    WorkProjectSeriesAssignment,
    WorkProjectSeriesAssignmentDto,
    number
  > {
  id: number;
  sourceNode: WorkSchemaNode;
  workProjectSeries: WorkProjectSeries;
  organization: Organization;
}

export interface WorkSchemaNodeTaskSourceResolver {}

export interface ResourceMonitor {}

export interface IdealCycleSubspanManager {}

export interface WorkerDomain<T, W> {
  allSubDomains: WorkerGrouping<T, W>[];
}

export interface TaskRequest<T, W> {
  taskSource: TaskSource<T, W>;
  entryToken: EntryToken<T, W>;
  workerGroupingMap: { [index: string]: TaskCost };
  entryTokenSize: number;
}

export interface TessellationBox<T, W>
  extends Comparable<TessellationBox<T, W>>,
    ResourceMonitor {
  id: number;
  contents: CanTessellate<T, W>[];
  domains: WorkerDomain<T, W>[];
  degreeOfNesting: number;
  mappedWorkersIncludingChildren: Worker<T, W>[];
  mappedWorkersIncludingParents: Worker<T, W>[];
  contentsIncludingChildren: CanTessellate<T, W>[];
  unMappedWorkersThisLevel: Worker<T, W>[];
  contentsIncludingParents: CanTessellate<T, W>[];
  unAssignedWorkersFullHierarchy: Worker<T, W>[];
  domainsWithAvailability: WorkerDomain<T, W>[];
  workerGroupings: WorkerGrouping<T, W>[];
}

export interface NoOverlapDomainBox
  extends AbstractBox<WorkProjectSeriesFactory, CycleWorkerGrouping>,
    TessellationBox<WorkProjectSeriesFactory, CycleWorkerGrouping> {
  childBoxes: NoOverlapDomainBox[];
  owner: Organization;
  contents: CanTessellate<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
  domains: WorkerDomain<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
  parents: NoOverlapDomainBox[];
  allParents: NoOverlapDomainBox[];
  mappedWorkersIncludingChildren: Worker<
    WorkProjectSeriesFactory,
    CycleWorkerGrouping
  >[];
  mappedUnitsThisLevel: Worker<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
  mappedWorkersIncludingParents: Worker<
    WorkProjectSeriesFactory,
    CycleWorkerGrouping
  >[];
  completedCanTessellates: CanTessellate<
    WorkProjectSeriesFactory,
    CycleWorkerGrouping
  >[];
  contentsIncludingChildren: CanTessellate<
    WorkProjectSeriesFactory,
    CycleWorkerGrouping
  >[];
  unMappedWorkersThisLevel: Worker<
    WorkProjectSeriesFactory,
    CycleWorkerGrouping
  >[];
  contentsIncludingParents: CanTessellate<
    WorkProjectSeriesFactory,
    CycleWorkerGrouping
  >[];
  completedCanTessellatesIncludingParents: CanTessellate<
    WorkProjectSeriesFactory,
    CycleWorkerGrouping
  >[];
  unAssignedWorkersFullHierarchy: Worker<
    WorkProjectSeriesFactory,
    CycleWorkerGrouping
  >[];
  domainsWithAvailability: WorkerDomain<
    WorkProjectSeriesFactory,
    CycleWorkerGrouping
  >[];
  workerGroupings: WorkerGrouping<
    WorkProjectSeriesFactory,
    CycleWorkerGrouping
  >[];
}

export interface AllocationCostFunctionGenerator
  extends BiFunction<
    WorkProjectSeriesFactory,
    TaskRequest<WorkProjectSeriesFactory, CycleWorkerGrouping>,
    CycleSubspanGroupCostFunction[]
  > {}

export interface AbstractSchemaNodeFactory extends WorkSchemaNodeTaskSource {
  resourceMonitor: ResourceMonitor;
  costConstraints: boolean;
  boxConstrainingCycle: TessellationBox<
    WorkProjectSeriesFactory,
    CycleWorkerGrouping
  >;
}

export interface Worker<T, W> {}

export interface WorkProjectSeriesSchemaDto
  extends Serializable,
    DtoWrapper<WorkProjectSeriesSchema, WorkProjectSeriesSchemaDto, number>,
    CollectionDto<DeliveryAllocationDto, number> {
  id: number;
  name: string;
  deliveryAllocations: { [index: string]: DeliveryAllocationDto };
  workProjectBandwidth: number;
  userToProviderRatio: number;
  workTaskType: WorkTaskTypeDto;
}

export interface TemporalAmount {
  units: TemporalUnit[];
}

export interface CycleSubspanDto
  extends Serializable,
    DtoWrapper<CycleSubspan, CycleSubspanDto, number> {
  id: number;
  timeSpanDto: TimeSpanDto;
  parentCycleId: number;
  name: string;
  zeroIndexedCycleDay: number;
  dayOrdinal: number;
}

export interface UserRoleTypeClosure
  extends Closure<UserRoleType, UserRoleTypeClosure> {
  parent: UserRoleType;
  child: UserRoleType;
  nodes: UserRoleType[];
}

export interface UserRoleTypeDto
  extends Serializable,
    TypeDto<UserRoleType, UserRoleTypeDto> {}

export interface UserRoleDto
  extends Serializable,
    DtoWrapper<UserRole, UserRoleDto, number> {
  id: number;
  name: string;
  startDate: DateAsString;
  thruDate: DateAsString;
  knowledgeLevelSeriesName: string;
  knowledgeLevelSeriesId: number;
  partyName: string;
  partyId: number;
  partyType: string;
  partyDateOfBirth: DateAsString;
  userRoleType: UserRoleTypeDto;
}

export interface WorkProjectSeriesNodeLink {
  id: number;
  queueTreeNode: QueueTreeNode;
  workProjectSeries: WorkProjectSeries;
  outcome: CycleSubspanGroup;
  workProjectSeriesToString: string;
}

export interface GenericBuildMetric<T, W> {}

export interface BuildMetricDto
  extends Serializable,
    DtoWrapper<BuildMetric, BuildMetricDto, number> {
  id: number;
  finalState: string;
  totalAllocationLoops: number;
  scheduleId: number;
  queueTreeNodes: QueueTreeNodeDto[];
}

export interface WorkProject {
  id: number;
  name: string;
  notes: string;
  workTasks: WorkTask[];
}

export interface TaskSequenceSchema {
  id: number;
  name: string;
  description: string;
  taskSequenceSchemaItems: TaskSequenceSchemaItem[];
}

export interface AssetRoleTypeClosure
  extends Closure<AssetRoleType, AssetRoleTypeClosure> {
  parent: AssetRoleType;
  child: AssetRoleType;
  nodes: AssetRoleType[];
}

export interface AssetClosure extends Closure<Asset, AssetClosure> {
  parent: Asset;
  child: Asset;
  nodes: Asset[];
}

export interface AssetType
  extends ClosureNode<AssetType, AssetTypeClosure>,
    TypeFor<Asset, AssetType, AssetTypeDto>,
    SelfSerializing<AssetType, AssetTypeDto, number> {
  closureManager: ClosureManager<AssetType, AssetTypeClosure>;
  id: number;
  closuresAsParent: AssetTypeClosure[];
  closuresAsChild: AssetTypeClosure[];
  entities: Asset[];
  allClosures: AssetTypeClosure[];
  allNodes: AssetType[];
  moveable: boolean;
  consumable: boolean;
}

export interface TimeDivisionDto
  extends Serializable,
    DtoWrapper<TimeDivision, TimeDivisionDto, number> {
  id: number;
  instant: DateAsString;
}

export interface EventAttendance {
  id: number;
  party: Party;
  scheduleEvent: Event;
}

export interface RoleAvailabilityDto extends LongIdentifiable {
  type: string;
  cycleSubspanId: number;
  availabilityCode: number;
  roleEntityId: number;
  baseEntityId: number;
}

export interface ClosureManagerInterface<N, C> {
  allClosures: C[];
  allNodes: N[];
}

export interface Closure<N, C> extends LongIdentifiable {
  parent: N;
  child: N;
  weighting: number;
  depth: number;
  nodes: N[];
}

export interface PartyNodeRelationshipTypeDto
  extends Serializable,
    TypeDto<PartyNodeRelationshipType, PartyNodeRelationshipTypeDto> {
  hierarchical: boolean;
}

export interface ItemEntityRead<C, I, E>
  extends LongIdentifiable,
    IntersectionEntityRead<C, E> {
  entityB: E;
  entityA: C;
}

export interface CycleSubspanJoinDto
  extends Serializable,
    DtoWrapper<CycleSubspanJoin, CycleSubspanJoinDto, number>,
    IntersectionDto<string, number> {
  id: number;
  cycleSubspanGroupId: string;
  cycleSubspanGroupSize: number;
  joinOrdinal: number;
  cycleSubspanId: number;
  cycleSubspanDescription: string;
}

export interface CarouselGroupOptionDto
  extends Serializable,
    DtoWrapper<CarouselGroupOption, CarouselGroupOptionDto, number>,
    IntersectionDto<number, number>,
    LongIdentifiable {
  carouselGroupId: number;
  workProjectSeriesSchemaId: number;
}

export interface CarouselOptionDto
  extends Serializable,
    IntersectionDto<number, number>,
    DtoWrapper<CarouselOption, CarouselOptionDto, number>,
    LongIdentifiable {
  carouselId: number;
  workProjectSeriesSchemaId: number;
}

export interface Organization
  extends Party,
    ClosureNode<Organization, OrganizationRelationship>,
    SelfSerializing<Organization, OrganizationDto, number>,
    EntityWithType<Organization, OrganizationType, OrganizationTypeDto> {
  id: number;
  closureManager: ClosureManager<Organization, OrganizationRelationship>;
  workSchemaNodeAssignment: WorkSchemaNodeAssignment;
  closuresAsParent: OrganizationRelationship[];
  closuresAsChild: OrganizationRelationship[];
  type: OrganizationType;
  workProjectSeriesAssignments: WorkProjectSeriesAssignment[];
  allClosures: OrganizationRelationship[];
  allNodes: Organization[];
}

export interface WorkSchemaNodeDto
  extends Serializable,
    DtoWrapper<WorkSchemaNode, WorkSchemaNodeDto, number>,
    LongIdentifiable {
  allowBundle: boolean;
  preferCarousel: boolean;
  dominanceFactor: number;
  priority: number;
  workSchemaNodeAssignmentIds: number[];
  carouselOptionId?: number;
  knowledgeDomainId?: number;
  knowledgeLevelId?: number;
  name?: string;
  carouselGroupId?: number;
  carouselId?: number;
  workProjectSeriesSchemaId?: number;
  resolutionMode: string;
}

export interface WorkerGrouping<T, W> {
  size: number;
  scarcityFactor: number;
  workers: Worker<T, W>[];
}

export interface TaskSource<T, W> extends QueueProcessObserver {
  unusedDomains: WorkerDomain<T, W>[];
  taskRequest: TaskRequest<T, W>;
  unusedTokenList: EntryToken<T, W>[];
  nodeLinks: T[];
  maxUnallocatedTokenSize: number;
}

export interface TaskCost {
  sum: number;
  product: number;
  finalValue: number;
}

export interface CanTessellate<T, W> {
  size: number;
  shape: Worker<T, W>[];
  completedStatus: boolean;
}

export interface WorkSchemaNodeTaskSource
  extends DomainConstrainedTaskSource<
      WorkProjectSeriesFactory,
      CycleWorkerGrouping
    >,
    Observer {
  workSchemaNode: WorkSchemaNode;
  totalExpectedAllocationVolume: number;
  domainsWithAvailability: WorkerDomain<
    WorkProjectSeriesFactory,
    CycleWorkerGrouping
  >[];
  unusedDomains: WorkerDomain<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
  taskRequest: TaskRequest<WorkProjectSeriesFactory, CycleWorkerGrouping>;
  unusedTokenList: EntryToken<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
  nodeLinks: WorkProjectSeriesFactory[];
}

export interface TemporalUnit {
  dateBased: boolean;
  timeBased: boolean;
  duration: Duration;
  durationEstimated: boolean;
}

export interface CarouselOrderDto
  extends Serializable,
    DtoWrapper<CarouselOrder, CarouselOrderDto, string>,
    CollectionDto<CarouselOrderItemDto, number> {
  id: string;
  carouselOrderItems: { [index: string]: CarouselOrderItemDto };
  userRoleId: number;
  carouselGroupId: number;
}

export interface QueueTreeNodeDto extends Serializable {
  id: string;
  nodeNumber: number;
  taskSize: number;
  degreeOfNesting: number;
  netFailureCount: number;
  batchSize: number;
  totalAllocationArea: number;
  workProjectSeriesNodeLinks: WorkProjectSeriesNodeLinkDto[];
}

export interface AssetRoleTypeWorkTaskTypeSuitabilityDto
  extends Serializable,
    LongIdentifiable,
    DtoWrapper<
      AssetRoleTypeWorkTaskTypeSuitability,
      AssetRoleTypeWorkTaskTypeSuitabilityDto,
      number
    >,
    TriIntersectionDto<number, number, number> {
  id: number;
  rating: number;
  assetRoleTypeName: string;
  assetRoleTypeId: number;
  workTaskTypeName: string;
  workTaskTypeId: number;
  assetId: number;
  assetName: string;
  idEntityC: number;
}

export interface ReasonInterface<T> {
  reason: T;
}

export interface ResourceRequirementItemDto
  extends Serializable,
    DtoWrapper<ResourceRequirementItem, ResourceRequirementItemDto, number> {
  workTaskTypeId: number;
  providerRoleType: ProviderRoleTypeDto;
  assetRoleType: AssetRoleTypeDto;
  id: number;
}

export interface AssetTypeClosure extends Closure<AssetType, AssetTypeClosure> {
  parent: AssetType;
  child: AssetType;
  nodes: AssetType[];
}

export interface AssetDto
  extends Serializable,
    DtoWrapper<Asset, AssetDto, number>,
    LongIdentifiable {
  name: string;
  ownerId?: number;
  type: AssetTypeDto;
}

export interface AssetTypeDto
  extends Serializable,
    TypeDto<AssetType, AssetTypeDto> {
  isMoveable: boolean;
}

export interface AssetRoleAvailabilityDto
  extends Serializable,
    DtoWrapper<AssetRoleAvailability, AssetRoleAvailabilityDto, number>,
    IntersectionDto<number, number>,
    RoleAvailabilityDto {
  assetRoleId: number;
  assetId: number;
}

export interface TriIntersectionDto<A, B, C> extends IntersectionDto<A, B> {
  idEntityC: C;
}

export interface IntersectionDto<A, B> {}

export interface CollectionDto<ItemDto, IdTypeOfReferencedEntity> {}

export interface CarouselGroupDto
  extends Serializable,
    DtoWrapper<CarouselGroup, CarouselGroupDto, number>,
    CollectionDto<CarouselGroupOptionDto, number>,
    HasName {
  id: number;
  carousels: CarouselLeanDto[];
  carouselGroupOptions: CarouselGroupOptionDto[];
  knowledgeLevel: KnowledgeLevelDto;
}

export interface CarouselDto
  extends Serializable,
    CollectionDto<CarouselOptionDto, number>,
    DtoWrapper<Carousel, CarouselDto, number> {
  id: number;
  name: string;
  carouselOrdinal: number;
  carouselGroupId: number;
  carouselOptionDtos: CarouselOptionDto[];
}

export interface CarouselOrderItemDto
  extends Serializable,
    LongIdentifiable,
    DtoWrapper<CarouselOrderItem, CarouselOrderItemDto, number>,
    IntersectionDto<string, number> {
  id: number;
  carouselOrderId: string;
  workProjectSeriesSchemaId: number;
  preferencePosition: number;
  active: boolean;
  carouselOptionId?: number;
}

export interface OrganizationRelationship
  extends Closure<Organization, OrganizationRelationship> {
  parent: Organization;
  child: Organization;
  nodes: Organization[];
}

export interface OrganizationType
  extends ClosureNode<OrganizationType, OrganizationTypeClosure>,
    SelfSerializing<OrganizationType, OrganizationTypeDto, number>,
    TypeFor<Organization, OrganizationType, OrganizationTypeDto> {
  closureManager: ClosureManager<OrganizationType, OrganizationTypeClosure>;
  entities: Organization[];
  closuresAsParent: OrganizationTypeClosure[];
  closuresAsChild: OrganizationTypeClosure[];
  allClosures: OrganizationTypeClosure[];
  allNodes: OrganizationType[];
}

export interface WorkSchemaNodeAssignmentDto
  extends Serializable,
    DtoWrapper<WorkSchemaNodeAssignment, WorkSchemaNodeAssignmentDto, number>,
    IntersectionDto<number, number>,
    LongIdentifiable {
  organizationId: number;
  workSchemaNodeId?: number;
}

export interface WorkProjectSeriesAssignmentDto
  extends Serializable,
    DtoWrapper<
      WorkProjectSeriesAssignment,
      WorkProjectSeriesAssignmentDto,
      number
    > {
  id: number;
  sourceNodeId: number;
  workProjectSeries: WorkProjectSeriesDto;
  organizationId: number;
}

export interface QueueProcessObserver {}

export interface AbstractBox<T, W> extends TessellationBox<T, W> {}

export interface BiFunction<T, U, R> {}

export interface CycleSubspanGroupCostFunction
  extends Function<CycleSubspanGroup, number> {}

export interface Observer {}

export interface CarouselLeanDto extends Serializable {
  id: number;
  carouselOrdinal: number;
}

export interface OrganizationTypeClosure
  extends Closure<OrganizationType, OrganizationTypeClosure> {
  parent: OrganizationType;
  child: OrganizationType;
  nodes: OrganizationType[];
}

export interface OrganizationDto
  extends Serializable,
    DtoWrapper<Organization, OrganizationDto, number>,
    LongIdentifiable {
  name: string;
  type: OrganizationTypeDto;
  workSchemaNodeAssignment?: WorkSchemaNodeAssignmentDto;
}

export interface OrganizationTypeDto
  extends Serializable,
    TypeDto<OrganizationType, OrganizationTypeDto> {}

export interface DomainConstrainedTaskSource<T, W> extends TaskSource<T, W> {
  domainConstrained: boolean;
  domainsWithAvailability: WorkerDomain<T, W>[];
}

export interface Function<T, R> {}

export type DateAsString = string;

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export type AvailabilityCode = 'NEVER' | 'FALSE' | 'MAYBE' | 'TRUE';

export type PersonNameStrategy =
  | 'FAMILY_NAME_FIRST_PERSONAL_NAME_SECOND'
  | 'PERSONAL_NAME_FIRST_FAMILY_NAME_LAST';

export type ReportStatus = 'PENDING' | 'PASS' | 'FAIL';

export type AuctionState =
  | 'INITIALISED'
  | 'READY_TO_CALL'
  | 'SUCCESS'
  | 'FAILURE'
  | 'TREE_FAILURE'
  | 'COMPLETE_NULL';

export type WorkSchemaNodeTypes =
  | 'OPEN'
  | 'LEAF'
  | 'CAROUSEL'
  | 'SERIAL'
  | 'CAROUSEL_OPTION'
  | 'CAROUSEL_GROUP';
