'use client';
import { useGlobalController } from 'selective-context';
import { Coordinate } from '@/react-flow/types';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';
import { ControllerKey } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselGroup';
import React, { useState, useEffect, useMemo } from 'react';
import { line, curveBasis, interpolateObject } from 'd3';
import { HasId, isNotNull, isNotUndefined } from '@/api/main';
import { Identifier } from 'dto-stores';

export interface ConnectionVector {
  source?: Coordinate & HasId;
  target?: Coordinate & HasId;
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

const CurveOverlay = ({ connections }: { connections: ConnectionVector[] }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      const largestPoint = connections.reduce(
        (prevPoint, currVec) => ({
          x: Math.max(
            currVec.source?.x || 0,
            currVec.target?.x || 0,
            prevPoint.x
          ),
          y: Math.max(
            currVec.source?.y || 0,
            currVec.target?.y || 0,
            prevPoint.y
          )
        }),
        { x: 0, y: 0 }
      ); // Initial value for the largest x and y

      setSize({
        width: Math.max(window.innerWidth, largestPoint.x),
        height: Math.max(window.innerHeight, largestPoint.y)
      });
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, [connections]);

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
            className={'stroke-emerald-400 stroke-2 fill-transparent'}
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

  const locationInterpolation = interpolateObject(
    { x: source.x, y: source.y },
    { x: target.x, y: target.y }
  );

  const start = { ...locationInterpolation(0) };
  const firstQuart = { ...locationInterpolation(0.25) };
  const midPoint = { ...locationInterpolation(0.5) };
  const lastQuart = { ...locationInterpolation(0.75) };
  const end = { ...locationInterpolation(1) };

  const data: Coordinate[] = [
    { x: start.x, y: source.y },
    { x: firstQuart.x, y: source.y },
    { x: midPoint.x, y: midPoint.y },
    { x: lastQuart.x, y: target.y },
    { x: end.x, y: target.y }
  ];

  lineGenerator = lineGenerator.curve(curveBasis);

  // const data: Coordinate[] = [{ ...source }, { ...target }];
  const lineGenerator1 = lineGenerator(data);
  // console.log(lineGenerator1);
  return lineGenerator1;
}
