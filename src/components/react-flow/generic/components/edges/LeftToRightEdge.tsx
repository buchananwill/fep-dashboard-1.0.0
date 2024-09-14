import { EdgeProps, getBezierPath, Position } from '@xyflow/react';
import { EdgeWithDelete } from '@/components/react-flow/generic/components/edges/EdgeWithDelete';

export function LeftToRightEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY } = props;

  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition: Position.Right,
    targetX,
    targetY,
    targetPosition: Position.Left
  });

  return (
    <>
      <EdgeWithDelete
        {...props}
        path={path}
        labelX={labelX}
        labelY={labelY}
      ></EdgeWithDelete>
    </>
  );
}
