import { HasIdClass, HasNumberId } from '@/api/types';
import {
  CycleDto,
  HasName,
  KnowledgeDomainDto,
  KnowledgeLevelDto,
  KnowledgeLevelSeriesDto
} from '@/api/generated-types/generated-types';

export type DeliveryAllocationBase = HasIdClass<string>;

export type DeliveryAllocationLeaf = {
  type: 'leaf';
  size: number;
} & DeliveryAllocationBase;

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
  children: KnowledgeDomainGroup[];
} & DeliveryAllocationBase;

export type KnowledgeLevelGroup = {
  type: 'knowledgeLevelGroup';
  knowledgeLevel: KnowledgeLevelDto;
  children: Bundle[];
  cycle: CycleDto;
  workTaskTypeName: HasName & HasNumberId;
} & DeliveryAllocationBase;

export type KnowledgeLevelSeriesGroup = {
  type: 'knowledgeLevelSeriesGroup';
  knowledgeLevelSeries: KnowledgeLevelSeriesDto;
  children: KnowledgeLevelGroup[];
} & DeliveryAllocationBase;

export type NestedWorkNode =
  | KnowledgeLevelSeriesGroup
  | KnowledgeLevelGroup
  | Bundle
  | KnowledgeDomainGroup
  | DeliveryAllocationList
  | DeliveryAllocationLeaf;

type NestedWorkNodeDiscriminator = NestedWorkNode['type'];

export type NestedWorkNodeDto<T extends NestedWorkNode = NestedWorkNode> = {
  data: T;
  type: T['type'];
};
