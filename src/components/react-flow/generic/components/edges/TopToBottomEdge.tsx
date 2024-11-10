import { EdgeProps, getBezierPath, Position } from '@xyflow/react';
import { EdgeWithDelete } from '@/components/react-flow/generic/components/edges/EdgeWithDelete';
import { useEdgeAnimationDirection } from '@/components/react-flow/generic/components/wrappers/edgeAnimationContext';

export function TopToBottomEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY } = props;
  const edgeAnimationDirection = useEdgeAnimationDirection();

  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition: Position.Bottom,
    targetX,
    targetY,
    targetPosition: Position.Top
  });

  return (
    <>
      <EdgeWithDelete
        {...props}
        className={edgeAnimationDirection}
        path={path}
        labelX={labelX}
        labelY={labelY}
      ></EdgeWithDelete>
    </>
  );
}
