/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-10-13 18:16:41.

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
  availabilityCode: any;
}

export interface CycleSubspanJoinNestedDto extends Serializable {
  id: number;
  cycleSubspanId: number;
  cycleSubspanGroupSize: number;
  cycleSubspanGroupId: number;
  joinOrdinal: number;
}

export interface CycleSubspanViewDto extends Serializable {
  id: number;
  startTime: DateAsString;
  endTime: DateAsString;
  name: string;
  zeroIndexedCycleDay: number;
}

export interface CycleSubspanWithJoinsListDto extends Serializable {
  id: number;
  timeSpan: TimeSpanDto;
  parentCycleId: number;
  name: string;
  cycleSubspanJoins: { [index: string]: CycleSubspanJoinNestedDto };
  zeroIndexedCycleDay: number;
  dayOrdinal: number;
  joinsIfNotFirst: { [index: string]: CycleSubspanJoinNestedDto[] };
}

export interface BaseReportItemDto {
  id: number;
  passes: boolean;
  itemType: string;
}

export interface HasCycleSubspanRequirement {}

export interface HasResidual {}

export interface NestedReportItemReportItem<T> extends BaseReportItemDto {}

export interface GenericTableRecord<
  Row,
  Column,
  CellContent,
  RowId,
  ColumnId,
  CellId,
  CellReference
> {
  rowList: Row[];
  columnList: Column[];
  rowColumnCellReferenceMap: {
    [index: string]: { [index: string]: CellReference };
  };
  cellIdCellContentMap: { [index: string]: CellContent };
}

export interface GenericTableRow<T> {
  id: string;
  data: T;
  entityClass: string;
}

export interface Bundle<T>
  extends KnowledgeTreeNode,
    NodeWithChildren<KnowledgeDomainGroup<T>> {
  children: KnowledgeDomainGroup<T>[];
  name: string;
}

export interface ChildPathNormalizer {}

export interface DeliveryAllocationLeaf extends KnowledgeTreeNode {
  size: number;
  startTime?: StartTime;
}

export interface DeliveryAllocationList
  extends KnowledgeTreeNode,
    NodeWithChildren<DeliveryAllocationLeaf> {
  children: DeliveryAllocationLeaf[];
}

export interface GenericNestedNode<T> {
  data: T;
  type: string;
}

export interface KnowledgeDomainGroup<T>
  extends KnowledgeTreeNode,
    NodeWithChildren<T> {
  knowledgeDomains: KnowledgeDomainDto[];
  children: T[];
}

export interface KnowledgeLevelGroup<T>
  extends KnowledgeTreeNode,
    NodeWithChildren<Bundle<T>> {
  knowledgeLevel: KnowledgeLevelDto;
  children: Bundle<T>[];
}

export interface KnowledgeLevelSeriesGroup<T>
  extends KnowledgeTreeNode,
    NodeWithChildren<KnowledgeLevelGroup<T>> {
  knowledgeLevelSeries: KnowledgeLevelSeriesDto;
  organizationTypeName?: string;
  children: KnowledgeLevelGroup<T>[];
  workTaskTypeName: any;
  cycle?: CycleDto;
}

export interface KnowledgeTreeNode {
  type: string;
  path: string;
}

export interface NodeWithChildren<C> extends KnowledgeTreeNode {
  children: C[];
}

export interface StartTime {
  time: DateAsString;
  zeroIndexedCycleDay: number;
}

export interface OrganizationLeafCycleSubspanGroupFeasibilityDto
  extends Serializable {
  organizationId: number;
  cycleId: number;
  rankSize: number;
  rankSizeInheritedAllocation: number;
  residualCycleSubspanGroupsPerSize: number;
}

export interface OrganizationLeafTotalAllocationFeasibilityDto
  extends Serializable {
  organizationId: number;
  cycleId: number;
  totalAllocationAllSizes: number;
  residualCycleSubspanCount: number;
}

export interface TaskAreaPerKnowledgeDomain {
  id: number;
  taskArea: number;
  name: string;
  shortCode: string;
  color: any;
}

export interface TaskAreaPerKnowledgeDomainDto extends Serializable {
  id: number;
  taskArea: number;
  name: string;
  shortCode: string;
  color: ColorDto;
}

export interface EventSource<T> {
  id: string;
  sourceData: T;
  events: EventDto[];
}

export interface Event<T> {
  start: DateAsString;
  end: DateAsString;
  id: number;
  data: T;
  title: string;
}

export interface HasDescription extends DescribableDto {}

export interface HasNameDto {
  name: string;
}

export interface HasNumberIdDto {
  id: number;
}

export interface HasTypeDto {}

export interface HasUuidDto {
  id: string;
}

export interface ClosureDto {
  id: number;
  closureType: string;
  source: number;
  target: number;
  value: number;
  weighting: number;
}

export interface DataNodeDto<T> extends NodeDto, Serializable {
  data: T;
  id: number;
  distanceFromRoot: number;
}

export interface ForceGraphAttributesDto extends Serializable {
  id: number;
  centerStrength: number;
  collideStrength: number;
  linkDistance: number;
  linkStrength: number;
  manyBodyStrength: number;
  manyBodyTheta: number;
  manyBodyMinDistance: number;
  manyBodyMaxDistance: number;
  forceXStrength: number;
  forceYStrength: number;
  forceRadialStrength: number;
  forceRadialXRelative: number;
  forceRadialYRelative: number;
}

export interface GraphDto<T> {
  nodes: DataNodeDto<T>[];
  closureDtos: ClosureDto[];
}

export interface GraphDtoPutRequestBody<T> {
  graphDto: GraphDto<T>;
  deletedNodeIdList: number[];
  deletedClosureIdList: number[];
}

export interface NodeDto {}

export interface CellDataAndMetaData<D> {
  cellData: D;
  cellRow: number;
  cellColumn: number;
}

export interface IntersectionTableRequestBody<T, U> {
  idListTypeT: T[];
  idListTypeU: U[];
}

export interface BreakDto {
  startTime: DateAsString;
  endTime: DateAsString;
}

export interface CarouselGroupDto
  extends Serializable,
    DtoWrapper<any, CarouselGroupDto, number>,
    CollectionDto<CarouselGroupOptionDto, number> {
  id: number;
  name: string;
  carousels: CarouselLeanDto[];
  carouselGroupOptions: CarouselGroupOptionDto[];
  knowledgeLevel: KnowledgeLevelDto;
}

export interface ColorDto
  extends Serializable,
    DtoWrapper<any, ColorDto, number> {
  id: number;
  r: number;
  g: number;
  b: number;
  a: number;
  name: string;
}

export interface CycleDto
  extends Serializable,
    DtoWrapper<any, CycleDto, number> {
  id: number;
  cycleSubspanGroupSizes: number[];
  cycleDayZero: DayOfWeek;
  cycleLengthInWeeks: number;
  nominalCycleSubspanLengthInMinutes: number;
}

export interface CycleInitDto {
  startDay: DayOfWeek;
  durationInWeeks: number;
  omitDays: number[];
  startOfDay: TimeRule;
  endOfDay: TimeRule;
  cycleSubspanDuration: number;
  breaks: { [index: string]: BreakDto[] };
  groupSizes: number[];
}

export interface CycleSubspanGroupDto
  extends Serializable,
    DtoWrapper<any, CycleSubspanGroupDto, number>,
    CollectionDto<CycleSubspanJoinDto, number> {
  cycleSubspanJoins: CycleSubspanJoinDto[];
  id: number;
}

export interface InteractionBasedValidationDto
  extends ValidationTypeDto,
    Serializable,
    DtoWrapper<any, InteractionBasedValidationDto, number> {}

export interface KnowledgeDomainDto
  extends Serializable,
    DtoWrapper<any, KnowledgeDomainDto, number> {
  id: number;
  name: string;
  shortCode?: string;
  color?: ColorDto;
}

export interface KnowledgeLevelSeriesDto
  extends Serializable,
    DtoWrapper<any, KnowledgeLevelSeriesDto, number> {
  id: number;
  name: string;
  knowledgeLevelDescriptor?: string;
  knowledgeLevels: KnowledgeLevelDto[];
}

export interface PartyDto extends Serializable {
  id: number;
  name: string;
  partyType: any;
}

export interface TimeDivisionDto
  extends Serializable,
    DtoWrapper<any, TimeDivisionDto, number> {
  id: number;
  instant: DateAsString;
}

export interface TimeRule {
  defaultTime: DateAsString;
  exceptions: { [index: string]: DateAsString };
}

export interface AssetDto
  extends Serializable,
    DtoWrapper<any, AssetDto, number> {
  id: number;
  name: string;
  ownerId?: number;
  type: AssetTypeDto;
}

export interface AssetRoleDto
  extends Serializable,
    DtoWrapper<any, AssetRoleDto, number> {
  assetId: number;
  assetAssetCode: string;
  assetName: string;
  name: string;
  type: AssetRoleTypeDto;
  id: number;
}

export interface BuildMetricDto
  extends Serializable,
    DtoWrapper<any, BuildMetricDto, number> {
  id: number;
  finalState: string;
  totalAllocationLoops: number;
  scheduleId: number;
  queueTreeNodes: QueueTreeNodeDto[];
}

export interface CarouselDto
  extends Serializable,
    CollectionDto<CarouselOptionDto, number>,
    DtoWrapper<any, CarouselDto, number> {
  id: number;
  name: string;
  carouselOrdinal: number;
  carouselGroupId: number;
  carouselOptionDtos: CarouselOptionDto[];
}

export interface CarouselLeanDto extends Serializable {
  id: number;
  carouselOrdinal: number;
}

export interface CarouselOrderDto
  extends Serializable,
    DtoWrapper<any, CarouselOrderDto, string>,
    CollectionDto<CarouselOrderItemDto, number> {
  id: string;
  carouselOrderItems: { [index: string]: CarouselOrderItemDto };
  userRoleId: number;
  carouselGroupId: number;
}

export interface DeliveryAllocationDto
  extends Serializable,
    DtoWrapper<any, DeliveryAllocationDto, number> {
  id: number;
  deliveryAllocationSize: number;
  count: number;
  workProjectSeriesSchemaId: number;
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

export interface DateAndTimeAndZoneDto extends Serializable {
  dateTime: DateAsString;
  date: DateAsString;
  timeZone: string;
}

export interface KnowledgeLevelDto
  extends Serializable,
    DtoWrapper<any, KnowledgeLevelDto, number> {
  name: string;
  id: number;
  levelOrdinal: number;
  knowledgeLevelSeriesId: number;
}

export interface OrganizationDto
  extends Serializable,
    DtoWrapper<any, OrganizationDto, number> {
  id: number;
  name: string;
  type: OrganizationTypeDto;
  workSchemaNodeAssignment?: WorkSchemaNodeAssignmentDto;
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

export interface WorkProjectSeriesSchemaDto
  extends Serializable,
    DtoWrapper<any, WorkProjectSeriesSchemaDto, number>,
    CollectionDto<DeliveryAllocationDto, number> {
  id: number;
  name: string;
  deliveryAllocations: { [index: string]: DeliveryAllocationDto };
  userToProviderRatio: number;
  workTaskType: WorkTaskTypeDto;
}

export interface WorkTaskDto extends Serializable {
  id: number;
  dueDate: DateAsString;
  serviceProductSeriesSchemaId: number;
  workProjectSeriesSchemaName: string;
  workTaskTypeDto: WorkTaskTypeDto;
  completedDate: DateAsString;
  notes: string;
}

export interface AssetRoleAvailabilityDto
  extends Serializable,
    DtoWrapper<any, AssetRoleAvailabilityDto, number>,
    IntersectionDto<number, number>,
    RoleAvailabilityDto {
  assetRoleId: number;
  assetId: number;
}

export interface AssetRoleTypeWorkTaskTypeSuitabilityDto
  extends Serializable,
    DtoWrapper<any, AssetRoleTypeWorkTaskTypeSuitabilityDto, number>,
    TriIntersectionDto<number, number, number> {
  id: number;
  rating: number;
  assetRoleTypeName: string;
  assetRoleTypeId: number;
  workTaskTypeName: string;
  workTaskTypeId: number;
  assetId: number;
  assetName: string;
  dynamic: boolean;
  idEntityC: number;
}

export interface CarouselGroupOptionDto
  extends Serializable,
    DtoWrapper<any, CarouselGroupOptionDto, number>,
    IntersectionDto<number, number> {
  id: number;
  carouselGroupId: number;
  workProjectSeriesSchemaId: number;
}

export interface CarouselOptionDto
  extends Serializable,
    IntersectionDto<number, number>,
    DtoWrapper<any, CarouselOptionDto, number> {
  carouselId: number;
  id: number;
  workProjectSeriesSchemaId: number;
}

export interface CarouselOrderItemDto
  extends Serializable,
    DtoWrapper<any, CarouselOrderItemDto, number>,
    IntersectionDto<string, number> {
  id: number;
  carouselOrderId: string;
  workProjectSeriesSchemaId: number;
  preferencePosition: number;
  active: boolean;
  carouselOptionId?: number;
}

export interface CycleSubspanDto
  extends Serializable,
    DtoWrapper<any, CycleSubspanDto, number> {
  id: number;
  timeSpanDto: TimeSpanDto;
  parentCycleId: number;
  name: string;
  zeroIndexedCycleDay: number;
  dayOrdinal: number;
}

export interface CycleSubspanGroupEditDto extends Serializable {
  id: number;
  timeSpanDto: TimeSpanDto;
  parentCycleId: number;
  name: string;
  zeroIndexedCycleDay: number;
  sizesStartingAtCycleSubspanId: number[];
}

export interface CycleSubspanJoinDto
  extends Serializable,
    DtoWrapper<any, CycleSubspanJoinDto, number>,
    IntersectionDto<number, number> {
  id: number;
  cycleSubspanGroupId: number;
  cycleSubspanGroupSize: number;
  joinOrdinal: number;
  cycleSubspanId: number;
  cycleSubspanDescription: string;
}

export interface CycleSubspanLeanDto extends Serializable {
  id: number;
  start: DateAsString;
  end: DateAsString;
  zeroIndexedCycleDay: number;
  timeSpanId: number;
  parentCycleId: number;
  name: string;
}

export interface ProviderRoleAvailabilityDto
  extends Serializable,
    DtoWrapper<any, ProviderRoleAvailabilityDto, number>,
    IntersectionDto<number, number>,
    RoleAvailabilityDto {
  providerRoleId: number;
  partyId: number;
}

export interface ProviderRoleDto
  extends DtoWrapper<any, ProviderRoleDto, number> {
  name: string;
  id: number;
  partyName: string;
  partyId: number;
  knowledgeDomainId: number;
  knowledgeDomainName: string;
  type: ProviderRoleTypeDto;
}

export interface ProviderRoleTypeWorkTaskTypeSuitabilityDto
  extends Serializable,
    DtoWrapper<any, ProviderRoleTypeWorkTaskTypeSuitabilityDto, number>,
    TriIntersectionDto<number, number, number> {
  id: number;
  rating: number;
  partyId: number;
  providerRoleTypeId: number;
  providerRoleTypeName: string;
  workTaskTypeId: number;
  workTaskTypeName: string;
  isDynamic: boolean;
  idEntityC: number;
}

export interface RoleAvailabilityDto {
  type: string;
  cycleSubspanId: number;
  baseEntityId: number;
  roleEntityId: number;
  availabilityCode: number;
  id: number;
}

export interface TimeSpanDto extends Serializable, TypeDto<any, TimeSpanDto> {
  startTimeDivisionInstant: DateAsString;
  endTimeDivisionInstant: DateAsString;
  startTimeDivisionId: number;
  endTimeDivisionId: number;
}

export interface UserRoleDto
  extends Serializable,
    DtoWrapper<any, UserRoleDto, number> {
  id: number;
  name: string;
  startDate: DateAsString;
  thruDate?: DateAsString;
  knowledgeLevelSeriesName: string;
  knowledgeLevelSeriesId: number;
  partyName: string;
  partyId: number;
  partyType: any;
  partyDateOfBirth: DateAsString;
  userRoleType: UserRoleTypeDto;
}

export interface WorkSchemaNodeAssignmentDto
  extends Serializable,
    DtoWrapper<any, WorkSchemaNodeAssignmentDto, number>,
    IntersectionDto<number, number> {
  id: number;
  organizationId: number;
  workSchemaNodeId?: number;
}

export interface WorkSchemaNodeDto
  extends Serializable,
    DtoWrapper<any, WorkSchemaNodeDto, number> {
  allowBundle: boolean;
  preferCarousel: boolean;
  dominanceFactor: number;
  priority: number;
  workSchemaNodeAssignmentIds: number[];
  carouselOptionId?: number;
  id: number;
  knowledgeDomainId?: number;
  knowledgeLevelId?: number;
  name?: string;
  carouselGroupId?: number;
  carouselId?: number;
  workProjectSeriesSchemaId?: number;
  resolutionMode: any;
}

export interface WorkTaskSeriesDto extends Serializable {
  id: number;
  workTaskTypeId: number;
  cycleSubSpanGroupSize: number;
  cycleSubspanGroupId: number;
  workTaskSeriesUnits: WorkTaskSeriesUnitDto[];
}

export interface WorkTaskSeriesUnitDto extends Serializable {
  id: number;
  scheduleId: number;
  cycleSubspanId: number;
}

export interface AssetRoleTypeDto
  extends Serializable,
    TypeDto<any, AssetRoleTypeDto> {}

export interface AssetTypeDto extends Serializable, TypeDto<any, AssetTypeDto> {
  isMoveable: boolean;
}

export interface OrganizationTypeDto
  extends Serializable,
    TypeDto<any, OrganizationTypeDto> {}

export interface PartyNodeRelationshipTypeDto
  extends Serializable,
    TypeDto<any, PartyNodeRelationshipTypeDto> {
  hierarchical: boolean;
}

export interface ProviderRoleTypeDto
  extends Serializable,
    TypeDto<any, ProviderRoleTypeDto> {}

export interface UserRoleTypeDto
  extends Serializable,
    TypeDto<any, UserRoleTypeDto> {}

export interface WorkTaskTypeDto
  extends Serializable,
    TypeDto<any, WorkTaskTypeDto> {
  knowledgeDomain: KnowledgeDomainDto;
  knowledgeLevel?: KnowledgeLevelDto;
  validationType?: ValidationTypeDto;
  partyClassificationSetId?: number;
  assetClassificationSetId: number;
  knowledgeLevelSeriesId?: number;
}

export interface ChordMapWithMetaData<MetaData> {
  metaData: MetaData;
  chordMapData: number[][];
}

export interface HeatMapDatumWithLabel<IdClass> {
  entityId: IdClass;
  x: string;
  y: number;
}

export interface HeatMapSeries<IdClass> {
  entityId: IdClass;
  id: string;
  data: HeatMapDatumWithLabel<IdClass>[];
}

export interface LongIdStringNameTuple {
  id: number;
  name: string;
}

export interface LongLongTuple {
  longOne: number;
  longTwo: number;
}

export interface NameIdStringTuple {
  name: string;
  id: string;
}

export interface NamedNumberRecord {
  name: string;
  stringIntegerMap: { [index: string]: number };
}

export interface StringIntegerTuple {
  name: string;
  value: number;
}

export interface StringLongTuple {
  string: string;
  aLong: number;
}

export interface WorkProjectSeriesAssignmentDto
  extends Serializable,
    DtoWrapper<any, WorkProjectSeriesAssignmentDto, number> {
  id: number;
  sourceNodeId: number;
  workProjectSeries: WorkProjectSeriesDto;
  organizationId: number;
}

export interface WorkProjectSeriesDto
  extends Serializable,
    DtoWrapper<any, WorkProjectSeriesDto, string> {
  id: string;
  scheduleId: number;
  workTaskSeries: WorkTaskSeriesDto[];
  workProjectSeriesSchemaId: number;
  completedStatus: boolean;
  workTaskType: WorkTaskTypeDto;
}

export interface GenericNestedDto<T> extends NestedDto<T> {}

export interface HierarchyEnrollmentRequest {
  scheduleId: number;
  organizationIdToUserRoleIdList: { [index: string]: number[] };
}

export interface PersonDto
  extends Serializable,
    DtoWrapper<any, PersonDto, number> {
  id: number;
  dateOfBirth: DateAsString;
  fName: string;
  lName: string;
}

export interface BitSetResourceFlowQuery {
  taskBitSet: BitSet;
  taskCounts: number[];
  items: { [index: string]: number };
}

export interface ResourceFlowQuery {
  workTaskTypeIdToLoadMap: { [index: string]: number };
}

export interface ResourceFlowQueryTree {
  items: { [index: string]: number };
}

export interface ResourceFlowResponse {
  flowAchieved: number;
  flowRequested: number;
  outcome: boolean;
}

export interface TrieNode {
  taskTypeId: number;
  taskCount: number;
  children: { [index: string]: TrieNode };
  query: ResourceFlowQuery;
}

export interface WorkTaskTypeTrie {}

export interface ResourceRequirementItemDto
  extends Serializable,
    DtoWrapper<any, ResourceRequirementItemDto, number> {
  workTaskTypeId: number;
  providerRoleType?: ProviderRoleTypeDto;
  assetRoleType?: AssetRoleTypeDto;
  id: number;
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
    DtoWrapper<any, ScheduleDto, number> {
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
    DtoWrapper<any, StaticDeliveryAllocationItemDto, number> {
  id: number;
  cycleSubspanGroupId: number;
  staticDeliveryAllocation: StaticDeliveryAllocationDto;
  workProjectSeriesSchemaId: number;
}

export interface SuitabilityPostRequest {
  workTaskTypeMatrix: WorkTaskTypeListMatrix;
  roleTypeNames: string[];
  rating: number;
}

export interface ValidationErrorMessages {}

export interface ValidationTypeDto extends Serializable {}

export interface WorkProjectSeriesEnrollmentDto
  extends Serializable,
    DtoWrapper<any, WorkProjectSeriesEnrollmentDto, number> {
  id: number;
  userRoleId: number;
  workProjectSeriesId: string;
  fromDate: DateAsString;
  thruDate: DateAsString;
}

export interface WorkProjectSeriesMetricDto
  extends DtoWrapper<any, WorkProjectSeriesMetricDto, number> {
  id: number;
  finiteCostCount: number;
  infinityCostCount: number;
}

export interface WorkProjectSeriesNodeLinkDto extends Serializable {
  id: number;
  workProjectSeriesId: string;
  outcomeId: number;
}

export interface WorkProjectSeriesSchemaWithLabelsDto extends Serializable {
  id: number;
  name: string;
  workTaskType: WorkTaskTypeDto;
  userToProviderRatio: number;
}

export interface WorkProjectSeriesWithSchemaLabelsDto extends Serializable {
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
  workTaskTypeNames: string[];
}

export interface WorkTaskTypeResourceRequirementPostRequest {
  resourceRequirementItemRequests: ResourceRequirementItemRequest[];
  workTaskTypeMatrix: WorkTaskTypeListMatrix;
}

export interface Serializable {}

export interface DescribableDto {
  description: string;
}

export interface ZoneId extends Serializable {}

export interface NestedDto<T> {
  children: NestedDto<T>[];
  data: T;
}

export interface BitSet extends Cloneable, Serializable {
  empty: boolean;
}

export interface DtoWrapper<E, D, I> extends Serializable {
  id: I;
}

export interface CollectionDto<ItemDto, IdTypeOfReferencedEntity> {}

export interface IntersectionDto<A, B> {}

export interface TriIntersectionDto<A, B, C> extends IntersectionDto<A, B> {
  idEntityC: C;
}

export interface TypeDto<T, D> extends DtoWrapper<T, D, number> {
  name: string;
  id: number;
}

export interface Cloneable {}

export type DateAsString = string;

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';
