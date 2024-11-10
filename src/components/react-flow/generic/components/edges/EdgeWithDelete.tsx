import {
  BaseEdge,
  BaseEdgeProps,
  EdgeLabelRenderer,
  EdgeProps
} from '@xyflow/react';

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
  labelY,
  ...edgeProps
}: EdgeProps & {
  path: string;
  labelX: number;
  labelY: number;
} & BaseEdgeProps) {
  const {
    currentState: { memoizedFunction }
  } = useGraphListener(
    GraphSelectiveContextKeys.deleteLinks,
    `edge:${id}`,
    undefinedDeleteLinks as MemoizedFunction<string[], void>
  );

  return (
    <>
      <BaseEdge id={id} path={path} {...edgeProps} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all'
          }}
          className="nodrag nopan text-default-600 z-10 rounded-lg bg-zinc-300 opacity-0 transition-opacity duration-500 hover:opacity-100"
          onClick={() => {
            memoizedFunction([id]);
          }}
        >
          <TrashIcon className={'h-6 w-6 p-1'} />
        </button>
        <div
          className={'pointer-events-none z-0 h-1 w-1 rounded-full bg-zinc-400'}
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
