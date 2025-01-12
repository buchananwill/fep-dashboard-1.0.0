/* tslint:disable */
/* eslint-disable */

// Generated using typescript-generator version 3.2.1263 on 2024-12-02 12:58:45.

export interface AutoBuildParametersDto extends Serializable {
  multiStepUndoTimeoutMs: number;
  multiUndoIncrement: number;
  saveBuild: boolean;
  forceSaveMetrics: boolean;
}

export interface AutoCarouselGroupOptionDto extends Serializable {
  carouselGroupName: string;
  workTypeCategoryName: string;
  knowledgeDomainName: string;
  knowledgeLevelName: string;
  allocationList: string;
}

export interface AvailabilityPostRequest {
  day: DayOfWeek;
  startTime: DateAsString;
  endTime: DateAsString;
  roleTypeNames: string[];
  availabilityCode: any;
}

export interface AvailabilitySummaryDto {
  day: DayOfWeek;
  startTime: DateAsString;
  endTime: DateAsString;
  roleTypeName: string;
  availabilityCode: any;
}

export interface CarouselOrderSummaryDto extends Serializable {
  id: number;
  dateOfBirth?: DateAsString;
  orderItems: string;
  carouselGroupName: string;
  lName: string;
  fName: string;
}

export interface CostParameterDto extends Serializable {
  id: number;
  name: string;
  scheduleId: number;
  position: number;
}

export interface CycleSubspanDefinitionDto extends Serializable {
  name: string;
  zeroIndexedCycleDay: number;
  startTime: DateAsString;
  endTime: DateAsString;
  beginsGroupsOfSize: string;
}

export interface CycleSubspanGroupIndexDto
  extends Serializable,
    DtoWrapper<CycleSubspanGroupIndex, CycleSubspanGroupIndexDto, number> {
  groupStartTime: DateAsString;
  groupEndTime: DateAsString;
  id: number;
  zeroIndexed: number;
  cycleDay: number;
  startTime: DateAsString;
  endTime: DateAsString;
  cycleSubspanGroupSubsetIdList: number[];
  cycleSubspanIndexIntSetZeroIndexed: number[];
}

export interface CycleSubspanJoinNestedDto extends Serializable {
  id: number;
  cycleSubspanId: number;
  cycleSubspanGroupSize: number;
  cycleSubspanGroupId: number;
  joinOrdinal: number;
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

export interface Bundle<T>
  extends KnowledgeTreeNode,
    NodeWithChildren<KnowledgeDomainGroup<T>> {
  children: KnowledgeDomainGroup<T>[];
  name: string;
}

export interface DeliveryAllocationLeaf extends KnowledgeTreeNode {
  size: number;
  startTime?: StartTime;
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
  workTypeCategory: any;
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

export interface WorkSchemaNodeLeafDto
  extends Serializable,
    DtoWrapper<WorkSchemaNodeLeaf, WorkSchemaNodeLeafDto, number> {
  id: number;
  workSchemaId: number;
  numberNeeded: number;
  rootId: number;
}

export interface WorkSchemaNodeRootTotalDeliveryAllocationRollupDto
  extends Serializable {
  id: number;
  name: string;
  deliveryAllocationSum: number;
  workSchemaNodeLeaf: WorkSchemaNodeLeafDto[];
}

export interface FlywayOperationRequest {
  schemaName: string;
  beginWith: FlywayOperation;
  finishWith: FlywayOperation;
  targetTemplateId: number;
}

export interface HasNameDto {
  name: string;
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
}

export interface GraphDto<T> {
  nodes: DataNodeDto<T>[];
  closureDtos: ClosureDto[];
}

export interface NodeDto {}

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

export interface CycleInitWithCycleSubspanDefinitions {
  cycleDayZero: DayOfWeek;
  cycleSubspanDefinitions: CycleSubspanDefinitionDto[];
}

export interface CycleSubspanGroupDto
  extends Serializable,
    DtoWrapper<any, CycleSubspanGroupDto, number>,
    CollectionDto<CycleSubspanJoinDto, number> {
  cycleSubspanJoins: CycleSubspanJoinDto[];
  id: number;
}

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
  totalNodeSteps: number;
  scheduleId: number;
  queueTreeNodes: QueueTreeNodeDto[];
  queueProgress: number[];
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
  workSchemaId: number;
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
  timeZone: ZoneId;
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
  netFailureCount: number;
  batchSize: number;
  totalAllocationArea: number;
  queueTreeNodeTaskDtos: QueueTreeNodeTaskDto[];
}
export interface QueueTreeNodeTaskDto
  extends Serializable,
    DtoWrapper<any, QueueTreeNodeTaskDto, number> {
  id: number;
  queueTreeNodeId: number;
  queueTreeNodeTaskSize: number;
  taskSourceEntityId: number;
  cycleSubspanGroupId: number;
}

export interface TaskSourceEntitySummaryDto extends Serializable {
  id: number;
  organizationName: string;
  workSchemaNodeName: string;
  knowledgeDomainName: string;
  knowledgeLevelName: string;
  workTypeCategory: string;
  scheduleId: number;
  parentId: number;
}

export interface WorkSchemaDto
  extends Serializable,
    DtoWrapper<any, WorkSchemaDto, number>,
    CollectionDto<DeliveryAllocationDto, number> {
  id: number;
  name: string;
  deliveryAllocations: { [index: string]: DeliveryAllocationDto };
  userToProviderRatio: number;
  workType: WorkTypeDto;
}

export interface AssetRoleAvailabilityDto
  extends Serializable,
    DtoWrapper<any, AssetRoleAvailabilityDto, number>,
    IntersectionDto<number, number>,
    RoleAvailabilityDto {
  assetRoleId: number;
  assetId: number;
}

export interface AssetRoleTypeWorkTypeSuitabilityDto
  extends Serializable,
    DtoWrapper<any, AssetRoleTypeWorkTypeSuitabilityDto, number>,
    TriIntersectionDto<number, number, number> {
  id: number;
  rating: number;
  assetRoleTypeName: string;
  assetRoleTypeId: number;
  workTypeCategory: string;
  workTypeId: number;
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
  workSchemaId: number;
}

export interface CarouselOptionDto
  extends Serializable,
    IntersectionDto<number, number>,
    DtoWrapper<any, CarouselOptionDto, number> {
  carouselId: number;
  id: number;
  workSchemaId: number;
}

export interface CarouselOrderItemDto
  extends Serializable,
    DtoWrapper<any, CarouselOrderItemDto, number>,
    IntersectionDto<string, number> {
  id: number;
  carouselOrderId: string;
  workSchemaId: number;
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
  knowledgeDomainId?: number;
  knowledgeDomainName?: string;
  type: ProviderRoleTypeDto;
}

export interface ProviderRoleTypeWorkTypeSuitabilityDto
  extends Serializable,
    DtoWrapper<any, ProviderRoleTypeWorkTypeSuitabilityDto, number>,
    TriIntersectionDto<number, number, number> {
  id: number;
  rating: number;
  partyId: number;
  providerRoleTypeId: number;
  providerRoleTypeName: string;
  workTypeId: number;
  workTypeCategory: string;
  isDynamic: boolean;
  idEntityC: number;
}

export interface RoleAvailabilityDto {
  type: string;
  cycleSubspanId: number;
  availabilityCode: number;
  roleEntityId: number;
  baseEntityId: number;
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
  dominanceFactor: number;
  priority: number;
  carouselOptionId?: number;
  id: number;
  knowledgeDomainId?: number;
  knowledgeLevelId?: number;
  name: string;
  carouselGroupId?: number;
  carouselId?: number;
  workSchemaId?: number;
  resolutionMode: any;
  childrenAs: any;
}

export interface WorkTaskSeriesDto extends Serializable {
  id: number;
  workTypeId: number;
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

export interface ProviderRoleTypeDto
  extends Serializable,
    TypeDto<any, ProviderRoleTypeDto> {}

export interface UserRoleTypeDto
  extends Serializable,
    TypeDto<any, UserRoleTypeDto> {}

export interface WorkTypeDto extends Serializable, TypeDto<any, WorkTypeDto> {
  knowledgeDomain: KnowledgeDomainDto;
  knowledgeLevel?: KnowledgeLevelDto;
  knowledgeLevelSeriesId?: number;
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
  workSchemaId: number;
  completedStatus: boolean;
  workType: WorkTypeDto;
}

export interface GenericNestedDto<T> extends NestedDto<T> {
  children: GenericNestedDto<T>[];
}

export interface HasParentNameStringList {
  parentNames: string | null;
  name: string;
}

export interface InitDataTypeDto extends Serializable {
  id: number;
  name: string;
}

export interface InitJsonTemplateDto
  extends Serializable,
    DtoWrapper<any, InitJsonTemplateDto, number> {
  id: number;
  name: string;
  content: string;
  dataType: InitDataTypeDto;
}

export interface OrganizationWorkHierarchyDto
  extends Serializable,
    HasParentNameStringList {
  typeName: string;
  workSchemaNodeName: string | null;
}

export interface PersonDto
  extends Serializable,
    DtoWrapper<any, PersonDto, number> {
  id: number;
  dateOfBirth?: DateAsString;
  fName: string;
  lName: string;
}

export interface ResourceFlowQueryInterface {
  size: number;
}

export interface ResourceFlowQueryMapRecord extends ResourceFlowQueryInterface {
  workTypeIndexToLoadMap: { [index: string]: number };
}

export interface ResourceFlowResponse {
  flowAchieved: number;
  flowRequested: number;
  outcome: boolean;
}

export interface ResourceRequirementItemDto
  extends Serializable,
    DtoWrapper<any, ResourceRequirementItemDto, number> {
  workTypeId: number;
  providerRoleType?: ProviderRoleTypeDto;
  assetRoleType?: AssetRoleTypeDto;
  id: number;
}

export interface ResourceRequirementItemRequest {
  providerRoleTypeName: string;
  assetRoleTypeName: string;
  requiredNumber: number;
}

export interface ResourceRequirementItemSummaryDto extends Serializable {
  id: number;
  workTypeCategoryName: string;
  knowledgeDomainName: string;
  knowledgeLevelName: string;
  providerRoleTypeName: string;
  assetRoleTypeName: string;
}

export interface RolePostRequest<T> {
  baseEntity: T;
  roleDataMap: { [index: string]: RoleData };
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
  autoBuildParameters: AutoBuildParametersDto;
  costParameters: CostParameterDto[];
}

export interface ScheduleParametersDto {
  autoBuildParametersDto: AutoBuildParametersDto;
  costParameters: string[];
}

export interface SchemaAccessTokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface SchemaRequestDto {
  schemaName: string;
  email: string;
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
  workSchemaId: number;
}

export interface SuitabilityPostRequest {
  workTypeMatrix: WorkTypeListMatrix;
  roleTypeNames: string[];
  rating: number;
}

export interface SuitabilitySummaryDto extends HasWorkTypeViewId {
  roleTypeName: string;
  taskTypeName: string;
  knowledgeLevelName: string;
  knowledgeDomainName: string;
  rating: number;
}

export interface TaskAreaPerKnowledgeDomainDto extends Serializable {
  id: number;
  taskArea: number;
  name: string;
  shortCode: string;
  color: ColorDto;
}

export interface TenancyDto extends Serializable {
  id: number;
  schemaName?: string;
  active: boolean;
  email: string;
  initJsonTemplateBaseline?: number;
}

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

export interface WorkSchemaWithLabelsDto extends Serializable {
  id: number;
  name: string;
  workType: WorkTypeDto;
  userToProviderRatio: number;
}

export interface WorkProjectSeriesWithSchemaLabelsDto extends Serializable {
  id: string;
  scheduleId: number;
  completedStatus: boolean;
  workSchema: WorkSchemaWithLabelsDto;
  workType: WorkTypeDto;
}

export interface WorkSchemaNodeManualDefinitionDto extends Serializable {
  name: string;
  childrenAs: any;
  dominanceFactor?: number;
  priority?: number;
  taskTypeName?: string;
  knowledgeDomainName?: string;
  knowledgeLevelName?: string;
  allocationList?: string;
  parentNodeName?: string;
  auto: AutoNodeType;
}

export interface WorkTaskSeriesEventDto {
  start: DateAsString;
  end: DateAsString;
  id: number;
  title: string;
  workTypeId: number;
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

export interface WorkTypeListMatrix {
  knowledgeLevelSeriesDtoList: KnowledgeLevelSeriesDto[];
  knowledgeDomainDtoList: KnowledgeDomainDto[];
  workTypeCategorys: string[];
}

export interface Serializable {}

export interface WorkSchemaSummaryId extends Serializable {
  taskTypeName: string;
  knowledgeDomainName: string;
  knowledgeLevelName: string;
  allocationList: string;
}

export interface DescribableDto {
  description: string;
}

export interface ZoneId extends Serializable {}

export interface BitSet extends Cloneable, Serializable {
  empty: boolean;
}

export interface RoleData {
  suitabilities: SuitabilitySummaryDto[];
  availabilities: AvailabilitySummaryDto[];
}

export interface HasWorkTypeViewId {}

export interface DtoWrapper<E, D, I> extends Serializable {
  id: I;
}

export interface CycleSubspanGroupIndex {
  cycleSubspanGroupId: number;
  cycleSubspanIndexList: string;
  cycleSubspanGroupIndex: number;
  cycleId: number;
  size: number;
  zeroIndexedCycleDay: number;
  subsetIdList: string;
  groupStartTime: DateAsString;
  groupEndTime: DateAsString;
  id: number;
}

export interface WorkSchemaNodeLeaf {
  id: number;
  workSchemaId: number;
  numberNeeded: number;
  root: WorkSchemaNodeRootTotalDeliveryAllocationRollup;
}

export interface WorkPlanRequest {
  planName: string;
  organizationTypeName: string;
  numberOfUsers: number;
  independentWorkSchemas: number[];
  synchronizedWorkPlanRequests: SynchronizedWorkPlanRequest[];
}

export interface SynchronizedWorkPlanRequest {
  id: string;
  name: string;
  workSchemaList: number[];
  userCount: number;
  organizationRepeatCount: number;
  groupSize: number;
}

export interface WorkPlanResponse {
  organizations: GraphDto<OrganizationDto>;
  workSchemaNodeRoots: { [index: string]: GenericNestedDto<WorkSchemaNodeDto> };
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

export interface NestedDto<T> {
  children: NestedDto<T>[];
  data: T;
}

export interface Cloneable {}

export interface WorkSchemaNodeRootTotalDeliveryAllocationRollup {
  id: number;
  name: string;
  deliveryAllocationSum: number;
  workSchemaNodeLeaf: WorkSchemaNodeLeaf[];
}

export type DateAsString = string;

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export type FlywayOperation = 'BASELINE' | 'CLEAN' | 'MIGRATE';

export type AutoNodeType = 'NONE' | 'CAROUSEL_GROUP' | 'CAROUSEL';
