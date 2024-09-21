import { HasStringId } from 'react-d3-force-wrapper';

export interface SuitabilityMatrixCell extends HasStringId {
  rating: number;
  isDynamic?: boolean;
  knowledgeLevelId: number;
  knowledgeDomainId: number;
}
