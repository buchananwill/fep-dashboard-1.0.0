import { ReactElement, useCallback, useRef } from 'react';
import { Placement } from '@floating-ui/react';
import { useGlobalDispatch } from 'selective-context';
import {
  TooltipContext,
  TooltipContextInterface
} from '@/components/tooltip/TooltipSingleton';

export function useFloatingTooltip(
  content: ReactElement | string | number,
  placement: Placement = 'right'
) {
  const ref = useRef(null);
  const { dispatchWithoutListen: dispatchTooltip } =
    useGlobalDispatch<TooltipContextInterface>(TooltipContext);
  const onMouseOver = useCallback(() => {
    dispatchTooltip((state) => {
      return {
        ...state,
        opened: true,
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
        opened: false
      };
    });
  }, [dispatchTooltip]);
  return { ref, onMouseOver, onMouseOut };
}
