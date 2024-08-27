import { KnowledgeLevelSeries } from './KnowledgeLevels';
import { GenericNestedDto } from './knowledgeDomains';

interface RolePostRequest<T> {
  baseEntity: T;
  suitabitilities: SuitabilityPostRequest[];
  availabilities: AvailabilityPostRequest[];
}

interface AvailabilityPostRequest {
  day: string;
  startTime: string;
  endTime: string;
}

interface PartyBaseEntity {
  names: string[];
  id: number;
  // other party fields
}

interface AssetBaseEntity {
  name: string;
  id: number;
}

interface SuitabilityPostRequest {
  workTaskTypeMatrix: WorkTaskTypeMatrix;
  // Role fields
  roleTypes: RoleType[];
  rating: number;
}

/** 
1. Default: add all the levels in the listed series
    Exception: if specific levels are given, only add those.
2. KnowledgeDomains: only add specified domains.
3. Generate the cross-product in the server.
*/
export interface WorkTaskTypeMatrix {
  // WorkTaskType fields:
  knowledgeLevelSeries: KnowledgeLevelSeries[];
  knowledgeDomains: (KnowledgeDomain & { includeChildren?: boolean })[];
  workTaskTypeNames: string[];
}

interface RoleType {
  name: string;
  id?: number;
}

export interface ResourceRequirementItemRequest {
  providerRoleType?: RoleType;
  assetRoleType?: RoleType;
  numberRequired: number;
}

export interface WorkTaskTypeResourceRequirementPutRequest {
  resourceRequirementItems: ResourceRequirementItemRequest[];
  workTaskTypes: WorkTaskTypeMatrix;
}
