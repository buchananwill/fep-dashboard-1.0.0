import { GraphDto } from 'react-d3-force-wrapper';
import { Classification } from '@/components/react-flow/bi-partite-graph/ClassificationNode';

export interface ProjectionClassificationValidationGraph {
  classificationGraph: GraphDto<Classification>;
  validationTraversalMap: { [Key: string]: BandwidthValidationTraversal };
}

export interface BandwidthValidationLayer {
  rootClassificationId: number;
  residualBandwidth: number;
  taskClassificationIdList: number[];
  resourceClassificationIdList: number[];
}

export interface BandwidthValidationTraversal {
  id: number;
  layers: BandwidthValidationLayer[];
}
