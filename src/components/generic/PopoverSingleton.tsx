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
  autoPlacement,
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useFloating,
  UseFloatingOptions,
  useTransitionStatus,
  useTransitionStyles
} from '@floating-ui/react';
import clsx from 'clsx';

export interface PopoverSingletonContextInterface {
  content: ReactNode;
  isOpen: boolean;
  rootNodeRef: MutableRefObject<any>;
  placement?: UseFloatingOptions['placement'];
}

export type PopoverSingletonProps = {
  contextKey: string;
  middleware?: UseFloatingOptions['middleware'];
  placement?: UseFloatingOptions['placement'];
};

export const TooltipContext = 'tooltip-context';
export function PopoverSingleton({
  contextKey,
  middleware,
  placement
}: PopoverSingletonProps) {
  const listenerKey = useUuidListenerKey();
  const rootNodeRefInitial = useRef(null);
  const initialValue = useMemo(() => {
    return {
      content: <div className={'z-50'}>Empty Popover</div>,
      isOpen: false,
      rootNodeRef: rootNodeRefInitial
    };
  }, []);
  const {
    currentState: { content, rootNodeRef, isOpen, placement: statePlacement },
    dispatch
  } = useGlobalController<PopoverSingletonContextInterface>({
    contextKey,
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
        return { ...tooltipContext, opened: nextOpen };
      });
    },
    [dispatch]
  );
  const { floatingStyles, refs, context } = useFloating({
    placement: statePlacement ?? placement ?? 'right',
    middleware: middleware ?? [
      offset({ mainAxis: 10 }),
      autoPlacement(),
      shift({ padding: 10 })
    ],
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

  if (!rootNodeRef.current || !content) {
    return null;
  }

  return (
    <div ref={rootNodeRefInitial}>
      <FloatingPortal root={rootNodeRefInitial}>
        <div
          style={floatingStyles}
          ref={refs.setFloating}
          className={clsx(
            status === 'initial' ? '' : 'transition-transform duration-500',

            ' z-[200000]'
          )}
        >
          {isMounted && <div style={{ ...transitionStyles }}>{content}</div>}
        </div>
      </FloatingPortal>
    </div>
  );
}
