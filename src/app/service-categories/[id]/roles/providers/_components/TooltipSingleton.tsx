'use client';
import { useGlobalController } from 'selective-context';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import {
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react';
import {
  autoUpdate,
  FloatingPortal,
  offset,
  Placement,
  useFloating,
  useTransitionStatus,
  useTransitionStyles
} from '@floating-ui/react';
import clsx from 'clsx';

export interface TooltipContextInterface {
  content: ReactNode;
  isOpen: boolean;
  rootNodeRef: MutableRefObject<any>;
  placement?: Placement;
}

export const TooltipContext = 'tooltip-context';
export default function TooltipSingleton() {
  const listenerKey = useUuidListenerKey();
  const rootNodeRefInitial = useRef(null);
  const initialValue = useMemo(() => {
    return {
      content: <div className={'z-50'}>Hello</div>,
      isOpen: false,
      rootNodeRef: rootNodeRefInitial
    };
  }, []);
  const {
    currentState: { content, rootNodeRef, isOpen, placement },
    dispatch
  } = useGlobalController<TooltipContextInterface>({
    contextKey: TooltipContext,
    listenerKey,
    initialValue
  });
  const setIsOpen = useCallback(
    (openAction: SetStateAction<boolean>) => {
      dispatch((tooltipContext) => {
        const nextOpen =
          typeof openAction === 'function'
            ? openAction(tooltipContext.isOpen)
            : openAction;
        return { ...tooltipContext, isOpen: nextOpen };
      });
    },
    [dispatch]
  );
  const { floatingStyles, refs, context } = useFloating({
    placement: placement ?? 'right',
    middleware: [offset({ mainAxis: 10 })],
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 500,
    initial: {
      opacity: 0,
      transform: `scale(0.8) `
    }
  });

  const { status } = useTransitionStatus(context);

  useEffect(() => {
    refs.setPositionReference(rootNodeRef.current);
  }, [rootNodeRef, refs]);

  if (!rootNodeRef.current || !content) return null;

  return (
    <div ref={rootNodeRefInitial} className={'pointer-events-none'}>
      <FloatingPortal root={rootNodeRefInitial}>
        <div
          style={floatingStyles}
          ref={refs.setFloating}
          className={clsx(
            status === 'initial' ? '' : 'transition-transform duration-500',
            'pointer-events-none z-50'
          )}
        >
          <div
            style={{ ...transitionStyles }}
            className={'pointer-events-none'}
          >
            {content}
          </div>
        </div>
      </FloatingPortal>
    </div>
  );
}
