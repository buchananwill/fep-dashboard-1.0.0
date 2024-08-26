import { DatumWithArc } from '@nivo/arcs';
import { MouseEvent, useCallback } from 'react';
import { ComputedDatum } from '@nivo/sunburst';
import { WorkNodeHierarchy } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export type ArcMouseHandler<Datum extends DatumWithArcAndColor> = (
  datum: Datum,
  event: MouseEvent<SVGPathElement>
) => void;

export interface DatumWithArcAndColor extends DatumWithArc {
  color: string;
  // when using patterns/gradients
  fill?: string;
}

export interface ArcShapeProps<Datum extends ComputedDatum<WorkNodeHierarchy>> {
  datum: Datum;
  style: {
    opacity: number;
    color: string;
    borderWidth: number;
    borderColor: string;
    path: string;
  };
  onClick?: ArcMouseHandler<Datum>;
  onMouseEnter?: ArcMouseHandler<Datum>;
  onMouseMove?: ArcMouseHandler<Datum>;
  onMouseLeave?: ArcMouseHandler<Datum>;
}

/**
 * A simple arc component to be used typically with an `ArcsLayer`.
 *
 * Please note that the component accepts `SpringValue`s instead of
 * regular values to support animations.
 */
export const StaticArcShape = <Datum extends ComputedDatum<WorkNodeHierarchy>>({
  datum,
  style,
  onClick,
  onMouseEnter,
  onMouseMove,
  onMouseLeave
}: ArcShapeProps<Datum>) => {
  const handleClick = useCallback(
    (event: MouseEvent<SVGPathElement>) => onClick?.(datum, event),
    [onClick, datum]
  );

  const handleMouseEnter = useCallback(
    (event: MouseEvent<SVGPathElement>) => onMouseEnter?.(datum, event),
    [onMouseEnter, datum]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent<SVGPathElement>) => onMouseMove?.(datum, event),
    [onMouseMove, datum]
  );

  const handleMouseLeave = useCallback(
    (event: MouseEvent<SVGPathElement>) => onMouseLeave?.(datum, event),
    [onMouseLeave, datum]
  );

  return (
    <path
      d={style.path}
      data-id={datum.data.path}
      className={'pointer-events-none'}
      opacity={style.opacity}
      fill={datum.fill || style.color}
      stroke={style.borderColor}
      strokeWidth={style.borderWidth}
      onClick={onClick ? handleClick : undefined}
      onMouseEnter={onMouseEnter ? handleMouseEnter : undefined}
      onMouseMove={onMouseMove ? handleMouseMove : undefined}
      onMouseLeave={onMouseLeave ? handleMouseLeave : undefined}
    />
  );
};
