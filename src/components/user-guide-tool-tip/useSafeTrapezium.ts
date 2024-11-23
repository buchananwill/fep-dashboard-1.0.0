import { MutableRefObject, useCallback } from 'react';
import { Coordinate } from '@/components/react-flow/generic/types';

export function useSafeTrapezium(
  ref: MutableRefObject<HTMLDivElement | null>,
  tooltipRef: MutableRefObject<HTMLDivElement | null>
) {
  return useCallback(() => {
    if (!ref.current || !tooltipRef.current) return null;

    const parentRect = ref.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const parentCenter = {
      x: parentRect.left + parentRect.width / 2,
      y: parentRect.top + parentRect.height / 2
    };

    const tooltipCenter = {
      x: tooltipRect.left + tooltipRect.width / 2,
      y: tooltipRect.top + tooltipRect.height / 2
    };

    const horizontalDiff = tooltipCenter.x - parentCenter.x;
    const verticalDiff = tooltipCenter.y - parentCenter.y;

    const position =
      Math.abs(horizontalDiff) > Math.abs(verticalDiff)
        ? horizontalDiff > 0
          ? 'right'
          : 'left'
        : verticalDiff > 0
          ? 'bottom'
          : 'top';

    // Define the trapezium bounds based on the position
    let trapezium = null as null | Coordinate[];
    switch (position) {
      case 'top':
        trapezium = [
          { x: tooltipRect.left, y: tooltipRect.bottom },
          { x: tooltipRect.right, y: tooltipRect.bottom },
          { x: parentRect.right, y: parentRect.top },
          { x: parentRect.left, y: parentRect.top }
        ];
        break;
      case 'bottom':
        trapezium = [
          { x: parentRect.left, y: parentRect.bottom },
          { x: parentRect.right, y: parentRect.bottom },
          { x: tooltipRect.right, y: tooltipRect.top },
          { x: tooltipRect.left, y: tooltipRect.top }
        ];
        break;
      case 'left':
        trapezium = [
          { x: tooltipRect.right, y: tooltipRect.top },
          { x: parentRect.left, y: parentRect.top },
          { x: parentRect.left, y: parentRect.bottom },
          { x: tooltipRect.right, y: tooltipRect.bottom }
        ];
        break;
      case 'right':
        trapezium = [
          { x: parentRect.right, y: parentRect.top },
          { x: tooltipRect.left, y: tooltipRect.top },
          { x: tooltipRect.left, y: tooltipRect.bottom },
          { x: parentRect.right, y: parentRect.bottom }
        ];
        break;
      default:
        trapezium = null;
    }

    return { trapezium, position };
  }, [ref, tooltipRef]);
}
