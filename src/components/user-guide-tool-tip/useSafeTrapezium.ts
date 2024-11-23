import { MutableRefObject, useCallback } from 'react';
import { Coordinate } from '@/components/react-flow/generic/types';

export function useSafeTrapezium(
  ref: MutableRefObject<HTMLDivElement | null>,
  tooltipRef: MutableRefObject<HTMLDivElement | null>
) {
  return useCallback(() => {
    const parentRect = ref.current
      ? ref.current.getBoundingClientRect()
      : undefined;
    const tooltipRect = tooltipRef.current
      ? tooltipRef.current.getBoundingClientRect()
      : undefined;

    const parentCenter = parentRect
      ? {
          x: parentRect.left + parentRect.width / 2,
          y: parentRect.top + parentRect.height / 2
        }
      : undefined;

    const tooltipCenter = tooltipRect
      ? {
          x: tooltipRect.left + tooltipRect.width / 2,
          y: tooltipRect.top + tooltipRect.height / 2
        }
      : undefined;

    const horizontalDiff =
      tooltipCenter && parentCenter
        ? tooltipCenter.x - parentCenter.x
        : undefined;
    const verticalDiff =
      tooltipCenter && parentCenter
        ? tooltipCenter.y - parentCenter.y
        : undefined;

    const position =
      horizontalDiff && verticalDiff
        ? Math.abs(horizontalDiff) > Math.abs(verticalDiff)
          ? horizontalDiff > 0
            ? 'right'
            : 'left'
          : verticalDiff > 0
            ? 'bottom'
            : 'top'
        : undefined;

    // Define the trapezium bounds based on the position
    let trapezium = null as null | Coordinate[];
    if (tooltipRect && parentRect) {
      switch (position) {
        case 'top':
          trapezium = [
            { x: tooltipRect.left, y: tooltipRect.top },
            { x: tooltipRect.right, y: tooltipRect.top },
            { x: parentRect.right, y: parentRect.top },
            { x: parentRect.left, y: parentRect.top }
          ];
          break;
        case 'bottom':
          trapezium = [
            { x: parentRect.left, y: parentRect.bottom },
            { x: parentRect.right, y: parentRect.bottom },
            { x: tooltipRect.right, y: tooltipRect.bottom },
            { x: tooltipRect.left, y: tooltipRect.bottom }
          ];
          break;
        case 'left':
          trapezium = [
            { x: tooltipRect.left, y: tooltipRect.top },
            { x: parentRect.left, y: parentRect.top },
            { x: parentRect.left, y: parentRect.bottom },
            { x: tooltipRect.left, y: tooltipRect.bottom }
          ];
          break;
        case 'right':
          trapezium = [
            { x: parentRect.right, y: parentRect.top },
            { x: tooltipRect.right, y: tooltipRect.top },
            { x: tooltipRect.right, y: tooltipRect.bottom },
            { x: parentRect.right, y: parentRect.bottom }
          ];
          break;
        default:
          trapezium = null;
      }
    }

    return {
      trapezium,
      position,
      parent: parentRect
        ? [
            { x: parentRect.left, y: parentRect.top },
            { x: parentRect.right, y: parentRect.top },
            { x: parentRect.right, y: parentRect.bottom },
            { x: parentRect.left, y: parentRect.bottom }
          ]
        : null,
      tooltipRect: tooltipRect
        ? [
            { x: tooltipRect.left, y: tooltipRect.top },
            { x: tooltipRect.right, y: tooltipRect.top },
            { x: tooltipRect.right, y: tooltipRect.bottom },
            { x: tooltipRect.left, y: tooltipRect.bottom }
          ]
        : null
    };
  }, [ref, tooltipRef]);
}
