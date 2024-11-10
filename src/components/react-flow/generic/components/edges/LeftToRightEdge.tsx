import { EdgeProps, getBezierPath, Position } from '@xyflow/react';
import { EdgeWithDelete } from '@/components/react-flow/generic/components/edges/EdgeWithDelete';
import { useEdgeAnimationDirection } from '@/components/react-flow/generic/components/wrappers/edgeAnimationContext';

export function LeftToRightEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY } = props;
  const edgeAnimationDirection = useEdgeAnimationDirection();

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
        className={edgeAnimationDirection}
        {...props}
        path={path}
        labelX={labelX}
        labelY={labelY}
      ></EdgeWithDelete>
    </>
  );
}
