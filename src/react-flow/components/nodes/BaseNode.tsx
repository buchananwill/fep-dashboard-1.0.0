import {
  ArrowDownOnSquareStackIcon,
  MinusCircleIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import { button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';

import { Handle, NodeProps, Position } from 'reactflow';

import { usePopoverFix } from '@/react-flow/hooks/usePopoverFix';
import { TrashIcon } from '@heroicons/react/16/solid';
import {
  AddNodesParams,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  undefinedAddNodes,
  undefinedDeleteNodes,
  undefinedLabelAccessor,
  useGraphDispatch,
  useGraphListener
} from 'react-d3-force-wrapper';
import React, { useCallback } from 'react';
import { cloneFunctionWrapper } from '@/components/react-flow/organization/organizationCallbacks';
import { HasNumberId } from '@/api/main';

export type GenericDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function BaseNode<T extends HasNumberId>({
  data,
  isConnectable,
  xPos,
  yPos,
  type,
  children,
  className,
  style
}: NodeProps<T> & Pick<GenericDivProps, 'children' | 'className' | 'style'>) {
  const { dispatchWithoutListen: toggleDetailsModal } = useGraphDispatch(
    GraphSelectiveContextKeys.nodeDetailsModalOpen
  );
  const listenerKey = `node:${data.id}`;
  const { dispatchWithoutListen: sendNodeData } = useGraphDispatch(
    GraphSelectiveContextKeys.nodeInModal
  );

  const {
    currentState: { memoizedFunction }
  } = useGraphListener(
    GraphSelectiveContextKeys.addNodes,
    listenerKey,
    undefinedAddNodes as MemoizedFunction<AddNodesParams, void>
  );
  const {
    currentState: { memoizedFunction: memoizedDeleteNodes }
  } = useGraphListener<MemoizedFunction<string[], void>>(
    GraphSelectiveContextKeys.deleteNodes,
    listenerKey,
    undefinedDeleteNodes
  );
  const {
    currentState: { memoizedFunction: labelAccessor }
  } = useGraphListener(
    GraphSelectiveContextKeys.nodeLabelAccessor,
    listenerKey,
    undefinedLabelAccessor as MemoizedFunction<[T, string], string>
  );
  const fixAddProps = usePopoverFix();
  const fixDeleteProps = usePopoverFix();
  const { currentState } = useGraphListener(
    GraphSelectiveContextKeys.nodeCloneFunction,
    listenerKey,
    undefined
  );

  const { id } = data;
  const addSibling = useCallback(() => {
    memoizedFunction({
      sourceNodeIdList: [`${id}`],
      relation: 'sibling'
    });
  }, [memoizedFunction, id]);

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#0000cc' }}
        isConnectable={isConnectable}
      />
      <div className={className} style={style}>
        <div className={'flex items-center justify-between gap-2'}>
          {labelAccessor([data, type])}
          {/*<Popover*/}
          {/*  {...fixAddProps}*/}
          {/*  placement={'right'}*/}
          {/*  triggerScaleOnOpen*/}
          {/*  updatePositionDeps={[xPos, yPos]}*/}
          {/*  triggerType={'menu'}*/}
          {/*>*/}
          {/*  <PopoverTrigger>*/}
          {/*    <button>*/}
          {/*      <PlusCircleIcon className={'w-6 h-6'} />*/}
          {/*    </button>*/}
          {/*  </PopoverTrigger>*/}
          {/*  <PopoverContent>*/}
          {/*    <div className={'grid grid-cols-1 gap-1'}>*/}
          {/*      <button onClick={addSibling}>*/}
          {/*        <ArrowDownOnSquareStackIcon*/}
          {/*          className={'-rotate-90 w-6 h-6'}*/}
          {/*        />*/}
          {/*      </button>*/}
          {/*      <button*/}
          {/*        className={'p-1.5'}*/}
          {/*        onClick={() =>*/}
          {/*          memoizedFunction({*/}
          {/*            sourceNodeIdList: [`${data.id}`],*/}
          {/*            relation: 'child'*/}
          {/*          })*/}
          {/*        }*/}
          {/*      >*/}
          {/*        <ArrowDownOnSquareStackIcon className={'w-6 h-6'} />*/}
          {/*      </button>*/}
          {/*    </div>*/}
          {/*  </PopoverContent>*/}
          {/*</Popover>*/}
        </div>
        <div className={' flex gap-1'}>
          <button
            className={'grow'}
            onClick={() => {
              sendNodeData(structuredClone(data));
              toggleDetailsModal((isOpen: boolean) => !isOpen);
            }}
          >
            Details
          </button>
          {/*<Popover*/}
          {/*  {...fixDeleteProps}*/}
          {/*  placement={'right'}*/}
          {/*  triggerScaleOnOpen*/}
          {/*  updatePositionDeps={[xPos, yPos]}*/}
          {/*  triggerType={'menu'}*/}
          {/*>*/}
          {/*  <PopoverTrigger>*/}
          {/*    <button>*/}
          {/*      <MinusCircleIcon className={'w-6 h-6'} />*/}
          {/*    </button>*/}
          {/*  </PopoverTrigger>*/}
          {/*  <PopoverContent>*/}
          {/*    <div className={'grid grid-cols-1 gap-1'}>*/}
          {/*      <button*/}
          {/*        className={'p-2'}*/}
          {/*        onClick={() => {*/}
          {/*          memoizedDeleteNodes([`${data.id}`]);*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        <TrashIcon className={'svg-button'} />*/}
          {/*      </button>*/}
          {/*    </div>*/}
          {/*  </PopoverContent>*/}
          {/*</Popover>*/}
        </div>
        {children}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#cc0000' }}
        isConnectable={isConnectable}
      />
    </>
  );
}

export const BaseNodeMemo = React.memo(BaseNode);
