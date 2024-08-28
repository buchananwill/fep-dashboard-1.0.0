/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-08-28 12:09:57.

export interface AutoBuildParametersDto extends Serializable {
    multiStepUndoTimeoutMs: number;
    multiUndoIncrement: number;
    saveBuild: boolean;
    forceSaveMetrics: boolean;
}

export interface AvailabilityPostRequest {
    day: DayOfWeek;
    startTime: Date;
    endTime: Date;
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

export interface CycleSubspanWithJoinsListDto extends Serializable, Identifiable<number> {
    id: number;
    timeSpan: TimeSpanDto;
    parentCycleId: number;
    name: string;
    cycleSubspanJoins: { [index: string]: CycleSubspanJoinNestedDto };
    zeroIndexedCycleDay: number;
    dayOrdinal: number;
    joinsIfNotFirst: { [index: string]: CycleSubspanJoinNestedDto[] };
}

export interface GenericNestedDto<T> extends NestedDto<T> {
}

export interface ResourceRequirementItemRequest {
    providerRoleType: ProviderRoleType;
    assetRoleType: AssetRoleType;
    requiredNumber: number;
}

export interface RolePostRequest<T> {
    baseEntity: T;
    suitabilities: SuitabilityPostRequest[];
    availabilities: AvailabilityPostRequest[];
}

export interface ScheduleDto extends Serializable, DtoWrapper<Schedule, ScheduleDto, number> {
    id: number;
    creationDateTime: Date;
    fromDate: Date;
    thruDate: Date;
    active: boolean;
    cycleId: number;
    status: string;
}

export interface StaticDeliveryAllocationDto extends Serializable {
    id: number;
    cycleId: number;
    deliveryAllocation: DeliveryAllocationDto;
}

export interface StaticDeliveryAllocationItemDto extends Serializable, DtoWrapper<StaticDeliveryAllocationItem, StaticDeliveryAllocationItemDto, number> {
    id: number;
    cycleSubspanGroupId: string;
    staticDeliveryAllocation: StaticDeliveryAllocationDto;
    workProjectSeriesSchemaId: string;
}

export interface SuitabilityPostRequest {
    workTaskTypeMatrix: WorkTaskTypeListMatrix;
    roleTypeNames: string[];
    rating: number;
}

export interface ValidationTypeDto extends Serializable {
}

export interface WorkProjectSeriesMetricDto extends DtoWrapper<WorkProjectSeriesMetric, WorkProjectSeriesMetricDto, number> {
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
    id: string;
    name: string;
    workTaskType: WorkTaskTypeDto;
    workProjectBandwidth: number;
    userToProviderRatio: number;
}

export interface WorkProjectSeriesWithSchemaLabelsDto extends Serializable, Identifiable<string> {
    id: string;
    scheduleId: number;
    completedStatus: boolean;
    workProjectSeriesSchema: WorkProjectSeriesSchemaWithLabelsDto;
}

export interface WorkTaskTypeListMatrix {
    knowledgeLevelSeriesDtoList: KnowledgeLevelSeriesDto[];
    knowledgeDomainInclusionList: KnowledgeDomainDto[];
    knowledgeDomainExclusionList: KnowledgeDomainDto[];
    workTaskTypeNames: string[];
}

export interface WorkTaskTypeMatrix {
    knowledgeLevelSeriesDtoSet: KnowledgeLevelSeriesDto[];
    knowledgeDomainDtoInclusionSet: KnowledgeDomainDto[];
    knowledgeDomainDtoExclusionSet: KnowledgeDomainDto[];
    workTaskTypeNames: string[];
}

export interface WorkTaskTypeResourceRequirementPutRequest {
    resourceRequirementItemRequests: ResourceRequirementItemRequest[];
    workTaskTypeMatrix: WorkTaskTypeMatrix;
}

export interface Serializable {
}

export interface TimeSpanDto extends Serializable, TypeDto<TimeSpan, TimeSpanDto> {
    startTimeDivisionInstant: Date;
    endTimeDivisionInstant: Date;
    startTimeDivisionId: number;
    endTimeDivisionId: number;
}

export interface NestedDto<T> {
    children: NestedDto<T>[];
    data: T;
}

export interface ProviderRoleType extends ClosureNode<ProviderRoleType, ProviderRoleTypeClosure>, TypeFor<ProviderRole, ProviderRoleType, ProviderRoleTypeDto> {
    resourceRequirementItems: ResourceRequirementItem[];
    closureManager: ClosureManager<ProviderRoleType, ProviderRoleTypeClosure>;
    closuresAsParent: ProviderRoleTypeClosure[];
    closuresAsChild: ProviderRoleTypeClosure[];
    workTaskTypeProviderRoleTypeSuitabilities: ProviderRoleTypeWorkTaskTypeSuitability[];
    entities: ProviderRole[];
    allNodes: ProviderRoleType[];
    allClosures: ProviderRoleTypeClosure[];
}

export interface AssetRoleType extends LongIdentifiable, ClosureNode<AssetRoleType, AssetRoleTypeClosure>, SelfSerializing<AssetRoleType, AssetRoleTypeDto, number>, TypeFor<AssetRole, AssetRoleType, AssetRoleTypeDto> {
    closureManager: ClosureManager<AssetRoleType, AssetRoleTypeClosure>;
    assetRoles: AssetRole[];
    closuresAsParent: AssetRoleTypeClosure[];
    closuresAsChild: AssetRoleTypeClosure[];
    assetRoleWorkTaskSuitabilities: AssetRoleTypeWorkTaskTypeSuitability[];
    resourceRequirementItems: ResourceRequirementItem[];
    allNodes: AssetRoleType[];
    entities: AssetRole[];
    allClosures: AssetRoleTypeClosure[];
}

export interface DeliveryAllocationDto extends Serializable, DtoWrapper<DeliveryAllocation, DeliveryAllocationDto, number>, IntersectionDto<string, number> {
    id: number;
    deliveryAllocationSize: number;
    count: number;
    workProjectSeriesSchemaId: string;
    workTaskTypeId: number;
}

export interface WorkTaskTypeDto extends Serializable, TypeDto<WorkTaskType, WorkTaskTypeDto> {
    knowledgeDomain?: KnowledgeDomainDto;
    knowledgeLevel?: KnowledgeLevelDto;
    validationType?: ValidationTypeDto;
    knowledgeLevelSeriesId?: number;
}

export interface KnowledgeLevelSeriesDto extends Serializable, DtoWrapper<KnowledgeLevelSeries, KnowledgeLevelSeriesDto, number> {
    name: string;
    id: number;
    knowledgeLevelDescriptor: string;
    knowledgeLevels: KnowledgeLevelDto[];
}

export interface KnowledgeDomainDto extends Serializable, DtoWrapper<KnowledgeDomain, KnowledgeDomainDto, number> {
    id: number;
    name: string;
    shortCode?: string;
}

export interface Identifiable<I> {
    id: I;
}

export interface ResourceRequirementItem {
    workTaskTypeResourceRequirement: WorkTaskTypeResourceRequirement;
    providerRoleType: ProviderRoleType;
    assetRoleType: AssetRoleType;
    numberRequired: number;
    id: number;
}

export interface ClosureManager<N, C> extends ClosureManagerInterface<N, C> {
    pathCompression: boolean;
    uniqueRoot: boolean;
}

export interface ProviderRoleTypeClosure extends Closure<ProviderRoleType, ProviderRoleTypeClosure> {
    parent: ProviderRoleType;
    child: ProviderRoleType;
    nodes: ProviderRoleType[];
}

export interface ProviderRoleTypeWorkTaskTypeSuitability extends SelfSerializing<ProviderRoleTypeWorkTaskTypeSuitability, ProviderRoleTypeWorkTaskTypeSuitabilityDto, number>, TriIntersectionEntityRead<Party, WorkTaskType, ProviderRoleType>, RatingEntity, SuitabilityEntity<Party, WorkTaskType, ProviderRoleType>, IdSettable<number> {
    id: number;
    party: Party;
    providerRoleType: ProviderRoleType;
    workTaskType: WorkTaskType;
    entityC: ProviderRoleType;
    entityB: WorkTaskType;
    entityA: Party;
}

export interface ProviderRole extends Role, PartyRole<ProviderRole>, EntityWithType<ProviderRole, ProviderRoleType, ProviderRoleTypeDto>, SelfSerializing<ProviderRole, ProviderRoleDto, number> {
    id: number;
    knowledgeDomain: KnowledgeDomain;
    maximumWeeklyHours: number;
    workTaskSeries: WorkTaskSeries[];
    type: ProviderRoleType;
    providerAvailabilities: ProviderRoleAvailability[];
    roleType: ProviderRole;
    providerAvailability: ProviderRoleAvailability[];
}

export interface AssetRoleTypeClosure extends Closure<AssetRoleType, AssetRoleTypeClosure> {
    parent: AssetRoleType;
    child: AssetRoleType;
    nodes: AssetRoleType[];
}

export interface AssetRole extends SelfSerializing<AssetRole, AssetRoleDto, number>, EntityWithType<AssetRole, AssetRoleType, AssetRoleTypeDto>, LongIdentifiable {
    asset: Asset;
    name: string;
    type: AssetRoleType;
    workTaskUtilizations: WorkTaskUtilization[];
    assetRoleAvailabilities: AssetRoleAvailability[];
}

export interface AssetRoleTypeWorkTaskTypeSuitability extends SelfSerializing<AssetRoleTypeWorkTaskTypeSuitability, AssetRoleTypeWorkTaskTypeSuitabilityDto, number>, TriIntersectionEntityRead<Asset, WorkTaskType, AssetRoleType>, RatingEntity, SuitabilityEntity<Asset, WorkTaskType, AssetRoleType>, IdSettable<number> {
    id: number;
    assetRoleType: AssetRoleType;
    workTaskType: WorkTaskType;
    asset: Asset;
    entityC: AssetRoleType;
    entityB: WorkTaskType;
    entityA: Asset;
}

export interface LongIdentifiable extends Identifiable<number> {
    id: number;
}

export interface DtoWrapper<E, D, I> extends Identifiable<I>, Serializable {
}

export interface Schedule extends SelfSerializing<Schedule, ScheduleDto, number> {
    id: number;
    autoBuildParameters: AutoBuildParameters;
    status: ReportStatus;
    creationDateTime: Date;
    fromDate: Date;
    thruDate: Date;
    active: boolean;
    cycle: Cycle;
    workTaskSeriesUnits: WorkTaskSeriesUnit[];
    workProjectSeries: WorkProjectSeries[];
    scheduleEvents: Event[];
    multiUndoIncrement: number;
    serviceProductEnrollments: WorkTaskSeriesUnitEnrollment[];
    multiUnoTimeoutMs: number;
}

export interface StaticDeliveryAllocationItem extends SelfSerializing<StaticDeliveryAllocationItem, StaticDeliveryAllocationItemDto, number> {
    id: number;
    staticDeliveryAllocation: StaticDeliveryAllocation;
    cycleSubspanGroup: CycleSubspanGroup;
    staticDeliveryAllocationItemUnits: StaticDeliveryAllocationItemUnit[];
    cycleSubspans: CycleSubspan[];
    workProjectSeriesSchema: WorkProjectSeriesSchema;
}

export interface WorkProjectSeriesMetric extends SelfSerializing<WorkProjectSeriesMetric, WorkProjectSeriesMetricDto, number> {
    id: number;
    workProjectSeries: WorkProjectSeries;
    infinityCostCount: number;
    cycleSubspanGroup: CycleSubspanGroup;
    buildMetric: BuildMetric;
    finiteCostCount: number;
}

export interface KnowledgeLevelDto extends Serializable, DtoWrapper<KnowledgeLevel, KnowledgeLevelDto, number> {
    name: string;
    id: number;
    levelOrdinal: number;
    knowledgeLevelSeriesId: number;
}

export interface TypeDto<T, D> extends HasName, DtoWrapper<T, D, number>, LongIdentifiable {
}

export interface TimeSpan extends Comparable<TimeSpan>, TypeFor<CycleSubspan, TimeSpan, TimeSpanDto> {
    startTimeDivision: TimeDivision;
    endTimeDivision: TimeDivision;
    cycleSubspans: CycleSubspan[];
    startTime: Date;
    endTime: Date;
    entities: CycleSubspan[];
}

export interface WorkTaskTypeResourceRequirement extends LongIdentifiable {
    resourceRequirementItems: ResourceRequirementItem[];
    workTaskTypes: WorkTaskType[];
    assetRoleTypes: AssetRoleType[];
    providerRoleTypes: ProviderRoleType[];
}

export interface Party extends Nameable, LongIdentifiable {
    dateOfBirth: Date;
    providerRoles: ProviderRole[];
    workTaskTypeProviderRoleTypeSuitabilities: ProviderRoleTypeWorkTaskTypeSuitability[];
    partyGraphNodes: PartyNode[];
    partyType: string;
    workTaskSeriesUnits: WorkTaskSeriesUnit[];
    providerRoleAvailabilities: ProviderRoleAvailability[];
}

export interface WorkTaskType extends SelfSerializing<WorkTaskType, WorkTaskTypeDto, number>, IntersectionEntityRead<KnowledgeDomain, KnowledgeLevel>, TypeFor<WorkTask, WorkTaskType, WorkTaskTypeDto> {
    knowledgeDomain: KnowledgeDomain;
    knowledgeLevel: KnowledgeLevel;
    validationType: ValidationType;
    durationInCycleSubspans: number;
    durationInMinutes: number;
    workTaskTypeResourceRequirement: WorkTaskTypeResourceRequirement;
    workProjectSeriesSchemas: WorkProjectSeriesSchema[];
    assetRoleTypeWorkTaskTypeSuitabilities: AssetRoleTypeWorkTaskTypeSuitability[];
    providerRoleTypeWorkTaskTypeSuitabilities: ProviderRoleTypeWorkTaskTypeSuitability[];
    entities: WorkTask[];
    workTaskSeries: WorkTaskSeries[];
    entityB: KnowledgeLevel;
    entityA: KnowledgeDomain;
    shortCode: string;
    workTaskTypeCycleLayerPermissions: WorkTaskTypeCycleLayerExclusion[];
    nameSpaceIdentifier: string;
    knowledgeLevelOrdinal: number;
    workTaskTypeName: WorkTaskTypeName;
    workProjectSchemaItems: TaskSequenceSchemaItem[];
    knowledgeLevelSeries: KnowledgeLevelSeries;
    serviceProductCycleSchemas: WorkProjectSeriesSchema[];
}

export interface RatingEntity {
    rating: number;
}

export interface KnowledgeDomain extends LongIdentifiable, SelfSerializing<KnowledgeDomain, KnowledgeDomainDto, number>, ClosureNode<KnowledgeDomain, KnowledgeDomainClosure> {
    closureManager: ClosureManager<KnowledgeDomain, KnowledgeDomainClosure>;
    name: string;
    shortCode: string;
    workTaskTypes: WorkTaskType[];
    workSchemaNodes: WorkSchemaNode[];
    closuresAsChild: KnowledgeDomainClosure[];
    closuresAsParent: KnowledgeDomainClosure[];
    providerPartyRoles: ProviderRole[];
}

export interface PartyRoleRelationship {
    fromDate: Date;
    thruDate: Date;
    id: number;
    name: string;
    fromPartyRole: PartyRole<any>;
    toPartyRole: PartyRole<any>;
    serviceProductType: WorkTaskType;
}

export interface WorkTaskSeries extends Comparable<WorkTaskSeries> {
    id: number;
    workTaskType: WorkTaskType;
    workProjectSeries: WorkProjectSeries;
    cycleSubspanGroup: CycleSubspanGroup;
    providerRole: ProviderRole;
    workTaskSeriesUnits: WorkTaskSeriesUnit[];
    size: number;
    cycleSubspans: CycleSubspan[];
}

export interface ProviderRoleAvailability extends SelfSerializing<ProviderRoleAvailability, ProviderRoleAvailabilityDto, number>, LongIdentifiable, IdSettable<number>, RoleAvailability<ProviderRole> {
    providerRole: ProviderRole;
    party: Party;
    cycleSubspan: CycleSubspan;
    entityA: ProviderRole;
    neverAvailable: boolean;
}

export interface Calendar {
    id: string;
    ownerRole: Role;
    scheduleEvents: Event[];
}

export interface Role extends LongIdentifiable, Nameable {
    colorCode: string;
    startDate: Date;
    thruDate: Date;
    partyRoleRelationships: PartyRoleRelationship[];
    calendars: Calendar[];
    party: Party;
    defaultCalendar: Calendar;
}

export interface ClosureNode<N, C> extends LongIdentifiable {
    closuresAsParent: C[];
    closureManager: ClosureManager<N, C>;
    closuresAsChild: C[];
}

export interface TypeFor<E, T, DtoForType> extends Nameable, LongIdentifiable, SelfSerializing<T, DtoForType, number> {
    entities: E[];
    id: number;
}

export interface ProviderRoleTypeDto extends Serializable, TypeDto<ProviderRoleType, ProviderRoleTypeDto> {
}

export interface Asset extends ClosureNode<Asset, AssetClosure>, SelfSerializing<Asset, AssetDto, number>, EntityWithType<Asset, AssetType, AssetTypeDto> {
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
    allNodes: Asset[];
    allClosures: AssetClosure[];
}

export interface WorkTaskUtilization {
    id: number;
    assetRole: AssetRole;
    workTask: WorkTask;
}

export interface AssetRoleAvailability extends SelfSerializing<AssetRoleAvailability, AssetRoleAvailabilityDto, number>, LongIdentifiable, IdSettable<number>, RoleAvailability<AssetRole> {
    assetRole: AssetRole;
    asset: Asset;
    cycleSubspan: CycleSubspan;
    entityA: AssetRole;
    neverAvailable: boolean;
}

export interface SelfSerializing<E, D, I> extends Identifiable<I> {
}

export interface AssetRoleTypeDto extends Serializable, TypeDto<AssetRoleType, AssetRoleTypeDto> {
}

export interface AutoBuildParameters {
    multiStepUndoTimeoutMs: number;
    multiUndoIncrement: number;
    saveBuild: boolean;
    forceSaveMetrics: boolean;
}

export interface Cycle extends CycleModel, SelfSerializing<Cycle, CycleDto, number> {
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
    party: Party;
}

export interface WorkProjectSeries extends SelfSerializing<WorkProjectSeries, WorkProjectSeriesDto, string> {
    id: string;
    schedule: Schedule;
    workProjectSeriesEnrollments: WorkProjectSeriesEnrollment[];
    workProjectSeriesSchema: WorkProjectSeriesSchema;
    completedStatus: boolean;
    workProjectSeriesNodeLinks: WorkProjectSeriesNodeLink[];
    workProjectSeriesMetric: WorkProjectSeriesMetric[];
    size: number;
    cycleSubspanSetView: CycleSubspan[];
    workTaskSeriesDtoList: WorkTaskSeriesDto[];
    workTaskSeriesSetView: WorkTaskSeries[];
    knowledgeDomain: KnowledgeDomain;
    workTaskType: WorkTaskType;
    serviceProductCycleSchema: WorkProjectSeriesSchema;
}

export interface Event {
    id: string;
    name: string;
    description: string;
    creationTime: Date;
    schedule: Schedule;
    eventStart: Date;
    eventEnd: Date;
    eventReason: EventReason;
    calendar: Calendar;
    eventAttendances: EventAttendance[];
    scheduleEventAttendances: EventAttendance[];
}

export interface WorkTaskSeriesUnitEnrollment extends IntersectionEntityRead<Party, CycleSubspan> {
    schedule: Schedule;
    id: number;
    cycleSubspan: CycleSubspan;
    userRole: UserRole;
    party: Party;
    serviceProductCycleEnrollment: WorkProjectSeriesEnrollment;
    entityB: CycleSubspan;
    entityA: Party;
    serviceProductSeriesEnrollment: WorkProjectSeriesEnrollment;
}

export interface DeliveryAllocation extends ItemEntityRead<WorkProjectSeriesSchema, DeliveryAllocation, WorkTaskType>, SelfSerializing<DeliveryAllocation, DeliveryAllocationDto, number> {
    id: number;
    workProjectSeriesSchema: WorkProjectSeriesSchema;
    allocationArea: IntegerScalarProduct;
    staticDeliveryAllocations: StaticDeliveryAllocation[];
    size: number;
    count: number;
    volume: number;
    entityB: WorkTaskType;
    entityA: WorkProjectSeriesSchema;
    workTaskType: WorkTaskType;
    course: WorkProjectSeriesSchema;
}

export interface IntersectionDto<A, B> {
}

export interface StaticDeliveryAllocation {
    id: number;
    cycle: Cycle;
    deliveryAllocation: DeliveryAllocation;
    staticDeliveryAllocationItems: StaticDeliveryAllocationItem[];
    cycleSubspanGroups: CycleSubspanGroup[];
}

export interface CycleSubspanGroup extends Comparable<CycleSubspanGroup>, CollectionEntity<CycleSubspanGroup, CycleSubspanJoin, CycleSubspan>, SelfSerializing<CycleSubspanGroup, CycleSubspanGroupDto, string> {
    size: number;
    cycleSubspanJoins: CycleSubspanJoin[];
    id: string;
    staticDeliveryAllocationItems: StaticDeliveryAllocationItem[];
    cycleLayerItems: CycleLayerItem[];
    dayOfWeek: DayOfWeek;
    intersectionItems: CycleSubspanJoin[];
    cycleSubspansList: CycleSubspan[];
    startTime: Date;
    endTime: Date;
    cycle?: Cycle;
    cycleSubSpans: CycleSubspan[];
    cycleDay: number;
}

export interface StaticDeliveryAllocationItemUnit {
    id: number;
    workProjectSeriesSchema: WorkProjectSeriesSchema;
    cycleSubspan: CycleSubspan;
    staticDeliveryAllocationItem: StaticDeliveryAllocationItem;
}

export interface CycleSubspan extends Comparable<CycleSubspan>, LongIdentifiable, SelfSerializing<CycleSubspan, CycleSubspanDto, number>, EntityWithType<CycleSubspan, TimeSpan, TimeSpanDto>, Nameable {
    id: number;
    timeSpan: TimeSpan;
    cycle: Cycle;
    cycleSubspanJoins: CycleSubspanJoin[];
    singletonGroup: CycleSubspanGroup;
    zeroIndexedCycleDay: number;
    type: TimeSpan;
    duration: Duration;
    dayOfWeek: DayOfWeek;
    zeroIndexedWeekNumber: number;
    startTime: Date;
    endTime: Date;
    dayOrdinal: number;
}

export interface WorkProjectSeriesSchema extends UuidIdentifiable, Nameable, CollectionEntity<WorkProjectSeriesSchema, DeliveryAllocation, WorkTaskType>, SelfSerializing<WorkProjectSeriesSchema, WorkProjectSeriesSchemaDto, string> {
    id: string;
    workTaskType: WorkTaskType;
    deliveryAllocations: DeliveryAllocation[];
    workProjectBandwidth: number;
    userToProviderRatio: number;
    carouselGroupOptions: CarouselGroupOption[];
    carouselOptions: CarouselOption[];
    workSchemaNodes: WorkSchemaNode[];
    intersectionItems: DeliveryAllocation[];
    knowledgeDomain: KnowledgeDomain;
    knowledgeLevel: KnowledgeLevel;
    shortCode: string;
    deliveryAllocationsPerCycle: number;
    allocationEntryTokens: EntryToken<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    subjectNamePrefix: string;
}

export interface BuildMetric extends GenericBuildMetric<WorkProjectSeriesFactory, CycleWorkerGrouping>, SelfSerializing<BuildMetric, BuildMetricDto, number> {
    id: number;
    schedule: Schedule;
    workProjectSeriesMetrics: WorkProjectSeriesMetric[];
    queueTreeNodes: QueueTreeNode[];
    finalState: AuctionState;
    totalAllocationLoops: number;
}

export interface KnowledgeLevelSeries extends LongIdentifiable, Nameable, SelfSerializing<KnowledgeLevelSeries, KnowledgeLevelSeriesDto, number> {
    id: number;
    knowledgeLevelDescriptor: string;
    knowledgeLevels: KnowledgeLevel[];
    userRoles: UserRole[];
}

export interface HasName {
    name: string;
}

export interface TimeDivision extends Comparable<TimeDivision>, SelfSerializing<TimeDivision, TimeDivisionDto, number> {
    id: number;
    instant: Date;
}

export interface ClosureManagerInterface<N, C> {
    allNodes: N[];
    allClosures: C[];
}

export interface Closure<N, C> extends LongIdentifiable {
    parent: N;
    child: N;
    depth: number;
    nodes: N[];
    weighting: number;
}

export interface PartyNode extends ClosureNode<PartyNode, PartyNodeRelationship> {
    closureManager: ClosureManager<PartyNode, PartyNodeRelationship>;
    party: Party;
    closuresAsChild: PartyNodeRelationship[];
    closuresAsParent: PartyNodeRelationship[];
    allNodes: PartyNode[];
    allClosures: PartyNodeRelationship[];
}

export interface Nameable extends HasName {
}

export interface KnowledgeLevel extends LongIdentifiable, SelfSerializing<KnowledgeLevel, KnowledgeLevelDto, number> {
    name: string;
    id: number;
    levelOrdinal: number;
    knowledgeLevelSeries: KnowledgeLevelSeries;
    workTaskTypes: WorkTaskType[];
    carouselGroups: CarouselGroup[];
    workSchemaNodes: WorkSchemaNode[];
}

export interface ValidationType extends LongIdentifiable {
    name: string;
    workTaskTypes: WorkTaskType[];
}

export interface WorkTask extends EventReason, ReasonInterface<WorkTask>, EntityWithType<WorkTask, WorkTaskType, WorkTaskTypeDto> {
    dueDate: Date;
    type: WorkTaskType;
    creator: Role;
    createdDate: Date;
    completedDate: Date;
    notes: string;
    workProject: WorkProject;
    workTaskUtilizations: WorkTaskUtilization[];
    reason: WorkTask;
    serviceProductType: WorkTaskType;
    scheduleEvents: Event[];
}

export interface WorkTaskTypeCycleLayerExclusion {
    id: number;
    workTaskType: WorkTaskType;
    cycleLayer: CycleLayer;
}

export interface WorkTaskTypeName {
    id: number;
    name: string;
}

export interface TaskSequenceSchemaItem {
    id: number;
    workTaskType: WorkTaskType;
    sequencePosition: number;
    workProjectSchema: TaskSequenceSchema;
}

export interface ProviderRoleTypeWorkTaskTypeSuitabilityDto extends Serializable, LongIdentifiable, DtoWrapper<ProviderRoleTypeWorkTaskTypeSuitability, ProviderRoleTypeWorkTaskTypeSuitabilityDto, number>, TriIntersectionDto<number, number, number> {
    id: number;
    rating: number;
    partyId: number;
    providerRoleTypeId: number;
    providerRoleTypeName: string;
    workTaskTypeId: number;
    workTaskTypeName: string;
    idEntityC: number;
}

export interface TriIntersectionEntityRead<A, B, C> extends IntersectionEntityRead<A, B> {
    entityC: C;
    entityB: B;
    entityA: A;
}

export interface SuitabilityEntity<T, U, V> extends TriIntersectionEntityRead<T, U, V>, RatingEntity {
    entityC: V;
    entityB: U;
    entityA: T;
}

export interface IdSettable<IdClass> {
}

export interface KnowledgeDomainClosure extends Closure<KnowledgeDomain, KnowledgeDomainClosure> {
    parent: KnowledgeDomain;
    child: KnowledgeDomain;
    nodes: KnowledgeDomain[];
}

export interface WorkSchemaNode extends ClosureNode<WorkSchemaNode, WorkSchemaClosure>, WorkSchemaNodeTaskSourceResolver, SelfSerializing<WorkSchemaNode, WorkSchemaNodeDto, number> {
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
    uniqueRoot: boolean;
    permittedChildTypes: WorkSchemaNodeTypes[];
    resolutionMode: WorkSchemaNodeTypes;
    orGenerateName: string;
}

export interface PartyRole<T> {
    name: string;
    id: number;
    startDate: Date;
    party: Party;
    roleType: T;
    thruDate: Date;
}

export interface EntityWithType<E, T, DT> {
    type: T;
}

export interface ProviderRoleDto extends DtoWrapper<ProviderRole, ProviderRoleDto, number>, LongIdentifiable {
    name: string;
    partyName: string;
    partyId: number;
    knowledgeDomainId: number;
    knowledgeDomainName: string;
    type: ProviderRoleTypeDto;
}

export interface AssetClosure extends Closure<Asset, AssetClosure> {
    parent: Asset;
    child: Asset;
    nodes: Asset[];
}

export interface AssetType extends ClosureNode<AssetType, AssetTypeClosure>, TypeFor<Asset, AssetType, AssetTypeDto>, SelfSerializing<AssetType, AssetTypeDto, number> {
    closureManager: ClosureManager<AssetType, AssetTypeClosure>;
    id: number;
    closuresAsParent: AssetTypeClosure[];
    closuresAsChild: AssetTypeClosure[];
    entities: Asset[];
    moveable: boolean;
    allNodes: AssetType[];
    allClosures: AssetTypeClosure[];
    consumable: boolean;
}

export interface AssetRoleDto extends Serializable, DtoWrapper<AssetRole, AssetRoleDto, number> {
    assetId: number;
    assetAssetCode: string;
    assetName: string;
    name: string;
    type: AssetRoleTypeDto;
    id: number;
}

export interface AssetRoleTypeWorkTaskTypeSuitabilityDto extends Serializable, LongIdentifiable, DtoWrapper<AssetRoleTypeWorkTaskTypeSuitability, AssetRoleTypeWorkTaskTypeSuitabilityDto, number>, TriIntersectionDto<number, number, number> {
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

export interface CycleModel {
    cycleStartDay: DayOfWeek;
    cycleLengthInWeeks: number;
    cycleLengthInDays: number;
    validCycleSubspanGroupSizes: number[];
    validCycleSubspanGroups: CycleSubspanGroup[];
    cycleLengthInSeconds: number;
    cycleSubSpans: CycleSubspan[];
}

export interface WorkProjectSeriesEnrollment extends LongIdentifiable, IntersectionEntityRead<UserRole, WorkProjectSeries> {
    userRole: UserRole;
    workProjectSeries: WorkProjectSeries;
    thruDate: Date;
    fromDate: Date;
    entityB: WorkProjectSeries;
    entityA: UserRole;
    serviceProductEnrollments: WorkTaskSeriesUnitEnrollment[];
    serviceProductCycle: WorkProjectSeries;
}

export interface WorkProjectSeriesNodeLink {
    id: number;
    queueTreeNode: QueueTreeNode;
    workProjectSeries: WorkProjectSeries;
    outcome: CycleSubspanGroup;
    workProjectSeriesToString: string;
}

export interface WorkTaskSeriesDto extends Serializable {
    id: number;
    workTaskTypeId: number;
    cycleSubSpanGroupSize: number;
    cycleSubSpanGroupId: string;
    providerRoleId: number;
    workTaskSeriesUnits: WorkTaskSeriesUnitDto[];
}

export interface EventReason {
    id: number;
    events: Event[];
    normalisedOutcomeMeasure: number;
}

export interface EventAttendance {
    id: number;
    party: Party;
    scheduleEvent: Event;
}

export interface UserRole extends Role, PartyRole<UserRole>, EntityWithType<UserRole, UserRoleType, UserRoleTypeDto>, SelfSerializing<UserRole, UserRoleDto, number> {
    id: number;
    knowledgeLevelSeries: KnowledgeLevelSeries;
    userRoleType: UserRoleType;
    carouselOrders: CarouselOrder[];
    type: UserRoleType;
    roleType: UserRole;
}

export interface IntegerScalarProduct {
    dimensionX: number;
    dimensionY: number;
    area: number;
}

export interface CycleSubspanJoin extends Comparable<CycleSubspanJoin>, ItemEntityRead<CycleSubspanGroup, CycleSubspanJoin, CycleSubspan>, SelfSerializing<CycleSubspanJoin, CycleSubspanJoinDto, number> {
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

export interface Duration extends TemporalAmount, Comparable<Duration>, Serializable {
}

export interface CarouselGroupOption extends ItemEntityRead<CarouselGroup, CarouselGroupOption, WorkProjectSeriesSchema>, SelfSerializing<CarouselGroupOption, CarouselGroupOptionDto, number>, IdSettable<number> {
    id: number;
    carouselGroup: CarouselGroup;
    workProjectSeriesSchema: WorkProjectSeriesSchema;
    entityB: WorkProjectSeriesSchema;
    entityA: CarouselGroup;
}

export interface CarouselOption extends LongIdentifiable, SelfSerializing<CarouselOption, CarouselOptionDto, number>, ItemEntityRead<Carousel, CarouselOption, WorkProjectSeriesSchema>, IdSettable<number> {
    carousel: Carousel;
    workProjectSeriesSchema: WorkProjectSeriesSchema;
    workSchemaNode: WorkSchemaNode;
    assignedCarouselOrderItems: CarouselOrderItem[];
    entityB: WorkProjectSeriesSchema;
    entityA: Carousel;
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

export interface CycleWorkerGrouping extends WorkerGrouping<WorkProjectSeriesFactory, CycleWorkerGrouping> {
    workers: Worker<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    cycleSubspanGroup: CycleSubspanGroup;
}

export interface UuidIdentifiable extends Identifiable<string> {
    id: string;
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

export interface Comparable<T> {
}

export interface PartyNodeRelationship extends Closure<PartyNode, PartyNodeRelationship>, EntityWithType<PartyNodeRelationship, PartyNodeRelationshipType, PartyNodeRelationshipTypeDto> {
    name: string;
    type: PartyNodeRelationshipType;
    child: PartyNode;
    parent: PartyNode;
    nodes: PartyNode[];
}

export interface CarouselGroup extends CollectionEntity<CarouselGroup, CarouselGroupOption, WorkProjectSeriesSchema>, SelfSerializing<CarouselGroup, CarouselGroupDto, string>, Nameable {
    id: string;
    knowledgeLevel: KnowledgeLevel;
    carousels: Carousel[];
    carouselGroupOptions: CarouselGroupOption[];
    carouselOrders: CarouselOrder[];
    workSchemaNode: WorkSchemaNode;
    intersectionItems: CarouselGroupOption[];
    carouselOptions: CarouselOption[];
}

export interface WorkProject {
    id: number;
    name: string;
    notes: string;
    workTasks: WorkTask[];
}

export interface CycleLayer {
    id: number;
    cycle: Cycle;
    cycleLayerItems: CycleLayerItem[];
    workTaskTypeCycleLayerPermissions: WorkTaskTypeCycleLayerExclusion[];
}

export interface TaskSequenceSchema {
    id: number;
    name: string;
    description: string;
    taskSequenceSchemaItems: TaskSequenceSchemaItem[];
}

export interface IntersectionEntityRead<EntityA, EntityB> {
    entityB: EntityB;
    entityA: EntityA;
}

export interface WorkSchemaClosure extends Closure<WorkSchemaNode, WorkSchemaClosure> {
    parent: WorkSchemaNode;
    child: WorkSchemaNode;
    nodes: WorkSchemaNode[];
}

export interface Carousel extends Nameable, Identifiable<string>, CollectionEntity<Carousel, CarouselOption, WorkProjectSeriesSchema>, SelfSerializing<Carousel, CarouselDto, string> {
    id: string;
    carouselOptions: CarouselOption[];
    carouselOrdinal: number;
    carouselGroup: CarouselGroup;
    workSchemaNode: WorkSchemaNode;
    intersectionItems: CarouselOption[];
    subscribers: CarouselOrderItem[];
    workProjectSeriesSchemas: WorkProjectSeriesSchema[];
}

export interface WorkSchemaNodeAssignment extends IntersectionEntityRead<Organization, WorkSchemaNode>, SelfSerializing<WorkSchemaNodeAssignment, WorkSchemaNodeAssignmentDto, number>, IdSettable<number> {
    id: number;
    organization: Organization;
    workSchemaNode: WorkSchemaNode;
    entityB: WorkSchemaNode;
    entityA: Organization;
}

export interface WorkProjectSeriesAssignment extends SelfSerializing<WorkProjectSeriesAssignment, WorkProjectSeriesAssignmentDto, number> {
    id: number;
    sourceNode: WorkSchemaNode;
    workProjectSeries: WorkProjectSeries;
    organization: Organization;
}

export interface WorkSchemaNodeTaskSourceResolver {
}

export interface ProviderRoleAvailabilityDto extends Serializable, DtoWrapper<ProviderRoleAvailability, ProviderRoleAvailabilityDto, number>, LongIdentifiable, IntersectionDto<number, number>, AvailabilityDto {
    providerRoleId: number;
    partyId: number;
    cycleSubspanId: number;
    availabilityCode: number;
}

export interface RoleAvailability<T> extends IntersectionEntityRead<T, CycleSubspan> {
    availabilityCode: AvailabilityCode;
    entityB: CycleSubspan;
    entityA: T;
}

export interface AssetTypeClosure extends Closure<AssetType, AssetTypeClosure> {
    parent: AssetType;
    child: AssetType;
    nodes: AssetType[];
}

export interface AssetDto extends Serializable, DtoWrapper<Asset, AssetDto, number>, LongIdentifiable {
    name: string;
    assetTypeId: number;
    assetTypeName: string;
    assetTypeIsMoveable: boolean;
    ownerId: number;
    distanceFromRoot: number;
}

export interface AssetTypeDto extends Serializable, TypeDto<AssetType, AssetTypeDto> {
    isMoveable: boolean;
}

export interface AssetRoleAvailabilityDto extends Serializable, DtoWrapper<AssetRoleAvailability, AssetRoleAvailabilityDto, number>, IntersectionDto<number, number>, AvailabilityDto {
    id: number;
    assetRoleId: number;
    assetId: number;
    cycleSubspanId: number;
    availabilityCode: number;
}

export interface CycleDto extends Serializable, DtoWrapper<Cycle, CycleDto, number> {
    id: number;
    cycleLengthInDays: number;
    cycleDayZero: DayOfWeek;
    maxGroupSize: number;
    cycleLengthInWeeks: number;
    cycleSubspanGroupSizes: number[];
}

export interface WorkTaskSeriesUnitDto extends Serializable {
    id: number;
    scheduleId: number;
    cycleSubspanId: number;
    partyId: number;
}

export interface WorkProjectSeriesDto extends Serializable, DtoWrapper<WorkProjectSeries, WorkProjectSeriesDto, string> {
    id: string;
    scheduleId: number;
    workTaskSeries: WorkTaskSeriesDto[];
    workProjectSeriesSchemaId: string;
    completedStatus: boolean;
}

export interface UserRoleType extends TypeFor<UserRole, UserRoleType, UserRoleTypeDto>, ClosureNode<UserRoleType, UserRoleTypeClosure>, SelfSerializing<UserRoleType, UserRoleTypeDto, number> {
    closureManager: ClosureManager<UserRoleType, UserRoleTypeClosure>;
    id: number;
    closuresAsParent: UserRoleTypeClosure[];
    closuresAsChild: UserRoleTypeClosure[];
    userRole: UserRole[];
    entities: UserRole[];
}

export interface CarouselOrder extends CollectionEntity<CarouselOrder, CarouselOrderItem, WorkProjectSeriesSchema>, SelfSerializing<CarouselOrder, CarouselOrderDto, string> {
    id: string;
    carouselGroup: CarouselGroup;
    userRole: UserRole;
    listOfActiveElectives: CarouselOrderItem[];
    subscribedCarousels: Carousel[];
    intersectionItems: CarouselOrderItem[];
    orderItems: CarouselOrderItem[];
}

export interface ItemEntityRead<C, I, E> extends LongIdentifiable, IntersectionEntityRead<C, E> {
    entityB: E;
    entityA: C;
}

export interface CollectionEntity<CollectionE, Item, EntityReferencedByItem> extends Identifiable<string> {
    intersectionItems: Item[];
    id: string;
}

export interface CycleSubspanGroupDto extends Serializable, DtoWrapper<CycleSubspanGroup, CycleSubspanGroupDto, string>, CollectionDto<CycleSubspanJoinDto, number> {
    cycleSubspanJoins: CycleSubspanJoinDto[];
    id: string;
}

export interface TemporalAmount {
    units: TemporalUnit[];
}

export interface CycleSubspanDto extends Serializable, DtoWrapper<CycleSubspan, CycleSubspanDto, number> {
    id: number;
    timeSpanDto: TimeSpanDto;
    parentCycleId: number;
    name: string;
    zeroIndexedCycleDay: number;
    dayOrdinal: number;
}

export interface CarouselOrderItem extends ItemEntityRead<CarouselOrder, CarouselOrderItem, WorkProjectSeriesSchema>, SelfSerializing<CarouselOrderItem, CarouselOrderItemDto, number>, IdSettable<number> {
    id: number;
    carouselOrder: CarouselOrder;
    workProjectSeriesSchema: WorkProjectSeriesSchema;
    preferencePosition: number;
    active: boolean;
    assignedCarousel: Carousel;
    carouselOption: CarouselOption;
    entityB: WorkProjectSeriesSchema;
    entityA: CarouselOrder;
    course: WorkProjectSeriesSchema;
}

export interface ResourceMonitor {
}

export interface IdealCycleSubspanManager {
}

export interface TaskRequest<T, W> {
    taskSource: TaskSource<T, W>;
    entryToken: EntryToken<T, W>;
    workerGroupingMap: { [index: string]: TaskCost };
    entryTokenSize: number;
}

export interface WorkerDomain<T, W> {
    allSubDomains: WorkerGrouping<T, W>[];
}

export interface TessellationBox<T, W> extends Comparable<TessellationBox<T, W>>, ResourceMonitor {
    id: number;
    contents: CanTessellate<T, W>[];
    domainsWithAvailability: WorkerDomain<T, W>[];
    unAssignedWorkersFullHierarchy: Worker<T, W>[];
    unMappedWorkersThisLevel: Worker<T, W>[];
    contentsIncludingParents: CanTessellate<T, W>[];
    mappedWorkersIncludingChildren: Worker<T, W>[];
    contentsIncludingChildren: CanTessellate<T, W>[];
    mappedWorkersIncludingParents: Worker<T, W>[];
    domains: WorkerDomain<T, W>[];
    degreeOfNesting: number;
    workerGroupings: WorkerGrouping<T, W>[];
}

export interface NoOverlapDomainBox extends AbstractBox<WorkProjectSeriesFactory, CycleWorkerGrouping>, TessellationBox<WorkProjectSeriesFactory, CycleWorkerGrouping> {
    childBoxes: NoOverlapDomainBox[];
    owner: Organization;
    contents: CanTessellate<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    domainsWithAvailability: WorkerDomain<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    unAssignedWorkersFullHierarchy: Worker<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    completedCanTessellates: CanTessellate<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    unMappedWorkersThisLevel: Worker<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    mappedUnitsThisLevel: Worker<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    contentsIncludingParents: CanTessellate<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    mappedWorkersIncludingChildren: Worker<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    contentsIncludingChildren: CanTessellate<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    mappedWorkersIncludingParents: Worker<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    domains: WorkerDomain<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    parents: NoOverlapDomainBox[];
    completedCanTessellatesIncludingParents: CanTessellate<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    workerGroupings: WorkerGrouping<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    allParents: NoOverlapDomainBox[];
}

export interface AllocationCostFunctionGenerator extends BiFunction<WorkProjectSeriesFactory, TaskRequest<WorkProjectSeriesFactory, CycleWorkerGrouping>, AllocationCostFunction[]> {
}

export interface AbstractSchemaNodeFactory extends WorkSchemaNodeTaskSource {
    resourceMonitor: ResourceMonitor;
    costConstraints: boolean;
    boxConstrainingCycle: TessellationBox<WorkProjectSeriesFactory, CycleWorkerGrouping>;
}

export interface Worker<T, W> {
}

export interface WorkProjectSeriesSchemaDto extends Serializable, DtoWrapper<WorkProjectSeriesSchema, WorkProjectSeriesSchemaDto, string>, CollectionDto<DeliveryAllocationDto, number> {
    id: string;
    name: string;
    deliveryAllocations: { [index: string]: DeliveryAllocationDto };
    workProjectBandwidth: number;
    userToProviderRatio: number;
    workTaskType: WorkTaskTypeDto;
}

export interface GenericBuildMetric<T, W> {
}

export interface BuildMetricDto extends Serializable, DtoWrapper<BuildMetric, BuildMetricDto, number> {
    id: number;
    finalState: string;
    totalAllocationLoops: number;
    scheduleId: number;
    queueTreeNodes: QueueTreeNodeDto[];
}

export interface TimeDivisionDto extends Serializable, DtoWrapper<TimeDivision, TimeDivisionDto, number> {
    id: number;
    instant: Date;
}

export interface PartyNodeRelationshipType extends TypeFor<PartyNodeRelationship, PartyNodeRelationshipType, PartyNodeRelationshipTypeDto>, SelfSerializing<PartyNodeRelationshipType, PartyNodeRelationshipTypeDto, number> {
    entities: PartyNodeRelationship[];
    id: number;
    parentType: PartyNodeRelationshipType;
    childTypeSet: PartyNodeRelationshipType[];
    hierarchical: boolean;
}

export interface ReasonInterface<T> {
    reason: T;
}

export interface TriIntersectionDto<A, B, C> extends IntersectionDto<A, B> {
    idEntityC: C;
}

export interface Organization extends Party, ClosureNode<Organization, OrganizationRelationship>, SelfSerializing<Organization, OrganizationDto, number>, EntityWithType<Organization, OrganizationType, OrganizationTypeDto> {
    id: number;
    closureManager: ClosureManager<Organization, OrganizationRelationship>;
    workSchemaNodeAssignment: WorkSchemaNodeAssignment;
    closuresAsParent: OrganizationRelationship[];
    closuresAsChild: OrganizationRelationship[];
    type: OrganizationType;
    workProjectSeriesAssignments: WorkProjectSeriesAssignment[];
    allNodes: Organization[];
    allClosures: OrganizationRelationship[];
}

export interface WorkSchemaNodeDto extends Serializable, DtoWrapper<WorkSchemaNode, WorkSchemaNodeDto, number> {
    allowBundle: boolean;
    preferCarousel: boolean;
    dominanceFactor: number;
    priority: number;
    workSchemaNodeAssignmentIds: number[];
    carouselOptionId: number;
    id: number;
    knowledgeDomainId: number;
    knowledgeLevelId: number;
    name: string;
    carouselGroupId: string;
    carouselId: string;
    workProjectSeriesSchemaId: string;
    resolutionMode: string;
}

export interface AvailabilityDto {
}

export interface UserRoleTypeClosure extends Closure<UserRoleType, UserRoleTypeClosure> {
    parent: UserRoleType;
    child: UserRoleType;
    nodes: UserRoleType[];
}

export interface UserRoleTypeDto extends Serializable, TypeDto<UserRoleType, UserRoleTypeDto> {
}

export interface UserRoleDto extends Serializable, DtoWrapper<UserRole, UserRoleDto, number> {
    id: number;
    name: string;
    startDate: Date;
    thruDate: Date;
    knowledgeLevelSeriesName: string;
    knowledgeLevelSeriesId: number;
    partyName: string;
    partyId: number;
    partyType: string;
    partyDateOfBirth: Date;
    userRoleType: UserRoleTypeDto;
}

export interface CycleSubspanJoinDto extends Serializable, DtoWrapper<CycleSubspanJoin, CycleSubspanJoinDto, number>, IntersectionDto<string, number> {
    id: number;
    cycleSubspanGroupId: string;
    cycleSubspanGroupSize: number;
    joinOrdinal: number;
    cycleSubspanId: number;
    cycleSubspanDescription: string;
}

export interface TemporalUnit {
    dateBased: boolean;
    timeBased: boolean;
    duration: Duration;
    durationEstimated: boolean;
}

export interface CarouselGroupOptionDto extends Serializable, DtoWrapper<CarouselGroupOption, CarouselGroupOptionDto, number>, IntersectionDto<string, string> {
    id: number;
    carouselGroupId: string;
    workProjectSeriesSchemaId: string;
}

export interface CarouselOptionDto extends Serializable, IntersectionDto<string, string>, DtoWrapper<CarouselOption, CarouselOptionDto, number> {
    carouselId: string;
    id: number;
    workProjectSeriesSchemaId: string;
}

export interface TaskSource<T, W> extends QueueProcessObserver {
    taskRequest: TaskRequest<T, W>;
    maxUnallocatedTokenSize: number;
    nodeLinks: T[];
    unusedTokenList: EntryToken<T, W>[];
    unusedDomains: WorkerDomain<T, W>[];
}

export interface TaskCost {
    sum: number;
    product: number;
    finalValue: number;
}

export interface WorkerGrouping<T, W> {
    size: number;
    workers: Worker<T, W>[];
    scarcityFactor: number;
}

export interface CanTessellate<T, W> {
    size: number;
    shape: Worker<T, W>[];
    completedStatus: boolean;
}

export interface WorkSchemaNodeTaskSource extends DomainConstrainedTaskSource<WorkProjectSeriesFactory, CycleWorkerGrouping>, Observer {
    totalExpectedAllocationVolume: number;
    workSchemaNode: WorkSchemaNode;
    domainsWithAvailability: WorkerDomain<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    taskRequest: TaskRequest<WorkProjectSeriesFactory, CycleWorkerGrouping>;
    nodeLinks: WorkProjectSeriesFactory[];
    unusedTokenList: EntryToken<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
    unusedDomains: WorkerDomain<WorkProjectSeriesFactory, CycleWorkerGrouping>[];
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

export interface PartyNodeRelationshipTypeDto extends Serializable, TypeDto<PartyNodeRelationshipType, PartyNodeRelationshipTypeDto> {
    hierarchical: boolean;
}

export interface CarouselGroupDto extends Serializable, DtoWrapper<CarouselGroup, CarouselGroupDto, string>, CollectionDto<CarouselGroupOptionDto, string>, HasName {
    id: string;
    carousels: CarouselLeanDto[];
    carouselGroupOptions: CarouselGroupOptionDto[];
    knowledgeLevel: KnowledgeLevelDto;
}

export interface CarouselDto extends Serializable, CollectionDto<CarouselOptionDto, string>, DtoWrapper<Carousel, CarouselDto, string> {
    id: string;
    name: string;
    carouselOrdinal: number;
    carouselGroupId: string;
    carouselOptionDtos: CarouselOptionDto[];
}

export interface OrganizationRelationship extends Closure<Organization, OrganizationRelationship> {
    parent: Organization;
    child: Organization;
    nodes: Organization[];
}

export interface OrganizationType extends ClosureNode<OrganizationType, OrganizationTypeClosure>, SelfSerializing<OrganizationType, OrganizationTypeDto, number>, TypeFor<Organization, OrganizationType, OrganizationTypeDto> {
    closureManager: ClosureManager<OrganizationType, OrganizationTypeClosure>;
    entities: Organization[];
    closuresAsParent: OrganizationTypeClosure[];
    closuresAsChild: OrganizationTypeClosure[];
    allNodes: OrganizationType[];
    allClosures: OrganizationTypeClosure[];
}

export interface WorkSchemaNodeAssignmentDto extends Serializable, DtoWrapper<WorkSchemaNodeAssignment, WorkSchemaNodeAssignmentDto, number>, IntersectionDto<number, number> {
    id: number;
    organizationId: number;
    workSchemaNodeId?: number;
}

export interface WorkProjectSeriesAssignmentDto extends Serializable, DtoWrapper<WorkProjectSeriesAssignment, WorkProjectSeriesAssignmentDto, number> {
    id: number;
    sourceNodeId: number;
    workProjectSeries: WorkProjectSeriesDto;
    organizationId: number;
}

export interface CarouselOrderDto extends Serializable, DtoWrapper<CarouselOrder, CarouselOrderDto, string>, CollectionDto<CarouselOrderItemDto, string> {
    id: string;
    carouselOrderItems: { [index: string]: CarouselOrderItemDto };
    userRoleId: number;
    carouselGroupId: string;
}

export interface CollectionDto<ItemDto, IdTypeOfReferencedEntity> {
}

export interface CarouselOrderItemDto extends Serializable, LongIdentifiable, DtoWrapper<CarouselOrderItem, CarouselOrderItemDto, number>, IntersectionDto<string, string> {
    id: number;
    carouselOrderId: string;
    workProjectSeriesSchemaId: string;
    preferencePosition: number;
    active: boolean;
    carouselOptionId?: number;
}

export interface QueueProcessObserver {
}

export interface AbstractBox<T, W> extends TessellationBox<T, W> {
}

export interface BiFunction<T, U, R> {
}

export interface AllocationCostFunction extends Function<CycleSubspanGroup, number> {
    active: boolean;
}

export interface Observer {
}

export interface CarouselLeanDto extends Serializable {
    id: string;
    carouselOrdinal: number;
}

export interface OrganizationTypeClosure extends Closure<OrganizationType, OrganizationTypeClosure> {
    parent: OrganizationType;
    child: OrganizationType;
    nodes: OrganizationType[];
}

export interface OrganizationDto extends Serializable, DtoWrapper<Organization, OrganizationDto, number> {
    id: number;
    name: string;
    type: OrganizationTypeDto;
    workSchemaNodeAssignment?: WorkSchemaNodeAssignmentDto;
}

export interface OrganizationTypeDto extends Serializable, TypeDto<OrganizationType, OrganizationTypeDto> {
}

export interface DomainConstrainedTaskSource<T, W> extends TaskSource<T, W> {
    domainsWithAvailability: WorkerDomain<T, W>[];
    domainConstrained: boolean;
}

export interface Function<T, R> {
}

export type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

export type AvailabilityCode = "NEVER" | "FALSE" | "MAYBE" | "TRUE";

export type ReportStatus = "PENDING" | "PASS" | "FAIL";

export type AuctionState = "INITIALISED" | "READY_TO_CALL" | "SUCCESS" | "FAILURE" | "TREE_FAILURE" | "COMPLETE_NULL";

export type WorkSchemaNodeTypes = "OPEN" | "LEAF" | "CAROUSEL" | "SERIAL" | "CAROUSEL_OPTION" | "CAROUSEL_GROUP";
