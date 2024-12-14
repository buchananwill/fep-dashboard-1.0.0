import { ReactElement, useCallback, useRef } from 'react';
import { Placement } from '@floating-ui/react';
import { useGlobalDispatch } from 'selective-context';
import {
  TooltipContext,
  TooltipContextInterface
} from '@/components/tooltip/TooltipSingleton';

export function usePopoverSingleton(
  content: ReactElement | string | number,
  placement: Placement = 'right',
  contextKey: string = TooltipContext
) {
  const ref = useRef(null);
  const { dispatchWithoutListen: dispatchTooltip } =
    useGlobalDispatch<TooltipContextInterface>(contextKey);
  const onMouseOver = useCallback(() => {
    dispatchTooltip((state) => {
      return {
        ...state,
        isOpen: true,
        rootNodeRef: ref,
        content,
        placement
      };
    });
  }, [dispatchTooltip, ref, content, placement]);
  const onMouseOut = useCallback(() => {
    dispatchTooltip((state) => {
      return {
        ...state,
        isOpen: false
      };
    });
  }, [dispatchTooltip]);
  return { ref, onMouseOver, onMouseOut };
}
