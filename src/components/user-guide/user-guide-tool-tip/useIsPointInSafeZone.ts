import { useSafeTrapezium } from '@/components/user-guide/user-guide-tool-tip/useSafeTrapezium';
import { useCallback } from 'react';
import { Coordinate } from '@/components/react-flow/generic/types';

export function useIsPointInSafeZone(
  getSafeTrapezium: ReturnType<typeof useSafeTrapezium>
): (point: Coordinate) => 'PARENT' | 'CHILD' | 'SAFE_TRAPEZIUM' | 'EXTERNAL' {
  return useCallback(
    (point: Coordinate) => {
      const trapAndPosition = getSafeTrapezium();
      if (trapAndPosition === null) return 'EXTERNAL';
      const { trapezium, position, parent, tooltipRect } = trapAndPosition;

      if (parent && pointIsInsidePolygon(parent, point)) {
        return 'PARENT';
      } else if (tooltipRect && pointIsInsidePolygon(tooltipRect, point)) {
        return 'CHILD';
      } else if (trapezium && pointIsInsidePolygon(trapezium, point)) {
        return 'SAFE_TRAPEZIUM';
      } else {
        return 'EXTERNAL';
      }
    },
    [getSafeTrapezium]
  );
}

const pointIsInsidePolygon = (polygon: Coordinate[], testPoint: Coordinate) => {
  const crossProduct = (p1: Coordinate, p2: Coordinate, p3: Coordinate) =>
    (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);

  for (let i = 0; i < polygon.length; i++) {
    const result = crossProduct(
      polygon[i],
      polygon[(i + 1) % polygon.length],
      testPoint
    );
    if (result < 0) {
      return false;
    }
  }
  return true;
};
