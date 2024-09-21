import { HasStringId } from 'react-d3-force-wrapper';
import { Simplify } from 'type-fest';

export interface SuitabilityMatrixCell {
  rating: number;
  isDynamic?: boolean;
}

export interface KnowledgeDomainLevelCell extends HasStringId {
  knowledgeLevelId: number;
  knowledgeDomainId: number;
}

export type CreateRoleCell = Simplify<
  KnowledgeDomainLevelCell & SuitabilityMatrixCell
>;
