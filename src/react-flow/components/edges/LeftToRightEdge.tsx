import { EdgeProps, getBezierPath, Position } from 'reactflow';
import { EdgeWithDelete } from '@/react-flow/components/edges/EdgeWithDelete';

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