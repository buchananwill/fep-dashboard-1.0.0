'use client';
import { useGlobalController } from 'selective-context';
import { Coordinate } from '@/components/react-flow/generic/types';
import React, { useEffect, useMemo, useState } from 'react';
import { curveBasis, interpolateObject, line } from 'd3';
import { isNotNull, isNotUndefined } from '@/api/main';
import { ControllerKey, initialMap } from '@/app/_literals';
import { GenericDivProps } from '@/components/react-flow/generic/components/nodes/BaseEditableNode';
import { HasId, HasNumberId } from '@/api/types';

export interface ConnectionVector {
  source?: Coordinate & HasNumberId;
  target?: Coordinate & HasNumberId;
}

export const RotationConnectionMap = 'rotationConnectionMap';
export default function RotationConnectionOverlay() {
  const { currentState } = useGlobalController({
    initialValue: initialMap as Map<number, ConnectionVector>,
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
        width: largestPoint.x + 20,
        height: largestPoint.y + 20
      });
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, [connections]);

  const curvePaths = useMemo(() => {
    return connections
      .filter(
        (connection) =>
          isNotUndefined(connection.target) && isNotUndefined(connection.source)
      )
      .map((connection) => connectionVectorToCurve(connection))
      .filter(isNotNull);
  }, [connections]);

  return (
    <>
      <svg
        width={size.width}
        height={size.height}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
        className={'z-50'}
      >
        {curvePaths.map((conn, index) => (
          <g key={index}>
            <path
              d={conn}
              className={'carousel-order-pills animate-pills fill-transparent '}
            />
          </g>
        ))}
      </svg>
      {curvePaths.map((path, index) => (
        <Beacon
          key={`beacon:${index}`}
          className={'beacon'}
          style={{
            offsetPath: `path('${path}')`
          }}
        />
      ))}
    </>
  );
};

function connectionVectorToCurve({ source, target }: ConnectionVector) {
  if (source === undefined || target === undefined) return null;

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

  return lineGenerator(data);
}

function Beacon(props: GenericDivProps) {
  return <div {...props}></div>;
}
