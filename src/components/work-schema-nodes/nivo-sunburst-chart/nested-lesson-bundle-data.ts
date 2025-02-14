import { HasIdClass, HasNumberId } from '@/api/types';
import {
  CycleDto,
  KnowledgeDomainDto,
  KnowledgeLevelDto,
  KnowledgeLevelSeriesDto
} from '@/api/generated-types/generated-types_';
import { HasName } from 'react-d3-force-wrapper';

export type DeliveryAllocationBase = Partial<HasNumberId> & {
  path: string;
  color?: string;
};

export type DeliveryAllocationLeaf = {
  type: 'leaf';
  size: number;
  startTime?: StartTime;
} & DeliveryAllocationBase;

type StartTime = {
  time: string;
  zeroIndexedCycleDay: number;
};

export type DeliveryAllocationList = {
  type: 'leafList';
  children: DeliveryAllocationLeaf[];
} & DeliveryAllocationBase;

export type KnowledgeDomainGroup = {
  type: 'knowledgeDomainGroup';
  knowledgeDomains: KnowledgeDomainDto[];
  children: DeliveryAllocationList[];
} & DeliveryAllocationBase;

export type Bundle = {
  type: 'bundle';
  name?: string;
  children: KnowledgeDomainGroup[];
} & DeliveryAllocationBase;

export type KnowledgeLevelGroup = {
  type: 'knowledgeLevelGroup';
  knowledgeLevel: KnowledgeLevelDto;
  children: Bundle[];
} & DeliveryAllocationBase;

export type KnowledgeLevelSeriesGroup = {
  type: 'knowledgeLevelSeriesGroup';
  knowledgeLevelSeries: KnowledgeLevelSeriesDto;
  cycle?: CycleDto;
  workTypeCategory: HasName & HasNumberId;
  organizationTypeName?: string;
  children: KnowledgeLevelGroup[];
} & DeliveryAllocationBase;

export type NestedWorkNode =
  | KnowledgeLevelSeriesGroup
  | KnowledgeLevelGroup
  | Bundle
  | KnowledgeDomainGroup
  | DeliveryAllocationList;
export type WorkNodeHierarchy = NestedWorkNode | DeliveryAllocationLeaf;

export type NestedWorkNodeDiscriminator = WorkNodeHierarchy['type'];

export const DiscriminatorOrder: NestedWorkNodeDiscriminator[] = [
  'knowledgeLevelSeriesGroup',
  'knowledgeLevelGroup',
  'bundle',
  'knowledgeDomainGroup',
  'leafList',
  'leaf'
] as const;

export function getTypeDepth(discriminator: NestedWorkNodeDiscriminator) {
  return DiscriminatorOrder.indexOf(discriminator);
}

export type NestedWorkNodeDto<T extends WorkNodeHierarchy = WorkNodeHierarchy> =
  {
    data: T;
    type: T['type'];
  };
