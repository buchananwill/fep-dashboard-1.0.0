'use client';
import { useGlobalController, useGlobalListener } from 'selective-context';
import { Coordinate } from '@/components/react-flow/generic/types';
import React, { useMemo } from 'react';
import { curveBasis, interpolateObject, line } from 'd3';
import { isNotNull, isNotUndefined } from '@/api/main';
import { ControllerKey, initialMap } from '@/app/_literals';
import { GenericDivProps } from '@/components/react-flow/generic/components/nodes/BaseEditableNode';
import { HasId } from '@/api/types';
import { useViewportSize, useWindowScroll } from '@mantine/hooks';
import { Portal } from '@mantine/core';
import { MainScrollPosition } from '@/components/generic/MainScrollPort';
import { ObjectPlaceholder } from '@/api/client-literals';

export interface ConnectionVector {
  source?: Coordinate & HasId;
  target?: Coordinate & HasId;
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
  const { width, height } = useViewportSize();
  const { currentState: mainScroll } = useGlobalListener({
    contextKey: MainScrollPosition,
    initialValue: ObjectPlaceholder as Coordinate,
    listenerKey: RotationConnectionMap
  });

  const curvePaths = useMemo(() => {
    return connections
      .filter(
        (connection) =>
          isNotUndefined(connection.target) && isNotUndefined(connection.source)
      )
      .map((connection) => connectionVectorToCurve(connection))
      .filter(isNotNull);
  }, [connections]);

  const beacons = useMemo(() => {
    return curvePaths.map((path, index) => (
      <Beacon
        key={`beacon:${index}`}
        className={'beacon'}
        style={{
          offsetPath: `path('${path}')`
        }}
      />
    ));
  }, [curvePaths]);

  const translationStyle = {
    transform: `translate(${mainScroll.x}px, ${-mainScroll.y}px)`
  };
  const svgPaths = useMemo(() => {
    return curvePaths.map((conn, index) => (
      <g key={index}>
        <path
          d={conn}
          className={'carousel-order-pills animate-pills fill-transparent '}
        />
      </g>
    ));
  }, [curvePaths]);

  return (
    <Portal>
      <div className={'pointer-events-none fixed left-0 top-0 z-50'}>
        <svg width={width} height={height} className={'z-50'}>
          <g style={translationStyle}>{...svgPaths}</g>
        </svg>
        <div
          className={'fixed left-0 top-0'}
          style={{ height, width, ...translationStyle }}
        >
          {...beacons}
        </div>
      </div>
    </Portal>
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
