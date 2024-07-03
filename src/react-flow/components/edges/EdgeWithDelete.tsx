import { BaseEdge, EdgeLabelRenderer, EdgeProps } from 'reactflow';

import { TrashIcon } from '@heroicons/react/16/solid';
import {
  GraphSelectiveContextKeys,
  MemoizedFunction,
  undefinedDeleteLinks,
  useGraphListener
} from 'react-d3-force-wrapper';

export function EdgeWithDelete({
  id,
  path,
  labelX,
  labelY
}: EdgeProps & { path: string; labelX: number; labelY: number }) {
  const {
    currentState: { memoizedFunction }
  } = useGraphListener(
    GraphSelectiveContextKeys.deleteLinks,
    `edge:${id}`,
    undefinedDeleteLinks as MemoizedFunction<string[], void>
  );

  return (
    <>
      <BaseEdge id={id} path={path} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all'
          }}
          className="nodrag nopan z-10 rounded-lg bg-default-300 text-default-600 opacity-0 transition-opacity duration-500 hover:opacity-100"
          onClick={() => {
            memoizedFunction([id]);
          }}
        >
          <TrashIcon className={'h-6 w-6 p-1'} />
        </button>
        <div
          className={
            'pointer-events-none z-0 h-1 w-1 rounded-full bg-default-400'
          }
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all'
          }}
        ></div>
      </EdgeLabelRenderer>
    </>
  );
}
