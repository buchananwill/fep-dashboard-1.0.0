'use client';
import { useGlobalController } from 'selective-context';
import { Coordinate } from '@/react-flow/types';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';
import { ControllerKey } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselGroup';

export interface ConnectionVector {
  source?: Coordinate;
  target?: Coordinate;
}

export const RotationConnectionMap = 'rotationConnectionMap';
export default function RotationConnectionOverlay() {
  const { currentState } = useGlobalController({
    initialValue: initialMap as Map<string, ConnectionVector>,
    contextKey: RotationConnectionMap,
    listenerKey: ControllerKey
  });

  const connectionVectorList = useMemo(() => {
    return [...currentState.values()];
  }, [currentState]);

  return <CurveOverlay connections={connectionVectorList} />;
}

import React, { useState, useEffect, useMemo } from 'react';
import { line, curveBasis } from 'd3';
import { isNotNull, isNotUndefined } from '@/api/main';

const CurveOverlay = ({ connections }: { connections: ConnectionVector[] }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <svg
      width={size.width}
      height={size.height}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      className={'z-50 border-emerald-600 border-2'}
    >
      {connections
        .filter(
          (connection) =>
            isNotUndefined(connection.target) &&
            isNotUndefined(connection.target)
        )
        .map((connection) => connectionVectorToCurve(connection))
        .filter(isNotNull)
        .map((conn, index) => (
          <path
            key={index}
            d={conn}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        ))}
    </svg>
  );
};

function connectionVectorToCurve({ source, target }: ConnectionVector) {
  if (source === undefined || target === undefined) return null;
  console.log(source, target);
  let lineGenerator = line(
    (d: Coordinate) => d.x,
    (d: Coordinate) => d.y
  );

  lineGenerator = lineGenerator.curve(curveBasis);

  const data: Coordinate[] = [{ ...source }, { ...target }];
  const lineGenerator1 = lineGenerator(data);
  // console.log(lineGenerator1);
  return lineGenerator1;
}
