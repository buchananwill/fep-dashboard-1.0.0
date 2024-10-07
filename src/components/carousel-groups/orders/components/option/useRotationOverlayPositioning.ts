import { CarouselOptionStateInterface } from '@/components/carousel-groups/orders/_types';
import { useEffect, useMemo, useRef } from 'react';
import { useGlobalDispatch } from 'selective-context';
import {
  ConnectionVector,
  RotationConnectionMap
} from '@/components/carousel-groups/orders/components/RotationConnectionOverlay';
import { Coordinate } from '@/components/react-flow/generic/types';
import { HasId } from '@/api/types';

export function useRotationOverlayPositioning(
  isPrimed: boolean,
  isAntiPrimed: boolean,
  entity: CarouselOptionStateInterface
) {
  // Chip location calculation condition: primed or anti-primed
  const assignChipRef = useRef<HTMLDivElement | null>(null);
  const { dispatchWithoutListen: dispatchConnectionMap } = useGlobalDispatch<
    Map<number, ConnectionVector>
  >(RotationConnectionMap);
  const primeState = useRef({ prime: false, antiPrime: false });

  const elementRef = assignChipRef.current;

  const center: (Coordinate & HasId) | undefined = useMemo(() => {
    if (!elementRef) return undefined;
    const { top, left, width, height } = elementRef.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2,
      id: entity.id
    };
  }, [elementRef, entity]);

  /*
   *  Use prime/anti-prime to signal connection location.
   *  CURRENTLY: HAS TO RUN EVERY RENDER, IN CASE THE ORDER OF OPTIONS CHANGED.
   *  TODO: Track the carousel option order?
   * */
  useEffect(() => {
    const primeChange = primeState.current.prime !== isPrimed;
    const antiPrimeChange = primeState.current.antiPrime !== isAntiPrimed;

    if (
      center &&
      (primeChange || antiPrimeChange || isPrimed || isAntiPrimed)
    ) {
      dispatchConnectionMap((currentMap) => {
        const map = new Map(currentMap);
        const currentConnection = map.get(entity.workProjectSeriesSchemaId);
        const updatedConnection: ConnectionVector = {
          ...currentConnection
        };
        if (isPrimed) {
          updatedConnection.source = { ...center, id: entity.id };
        } else if (!isPrimed && primeChange) {
          updatedConnection.source =
            updatedConnection.source?.id === entity.id
              ? undefined
              : updatedConnection.source;
        } else if (isAntiPrimed) {
          updatedConnection.target = { ...center, id: entity.id };
        } else if (!isAntiPrimed && antiPrimeChange) {
          updatedConnection.target =
            updatedConnection.target?.id === entity.id
              ? undefined
              : updatedConnection.target;
        }
        map.set(entity.workProjectSeriesSchemaId, updatedConnection);
        return map;
      });
    }
    primeState.current = { prime: isPrimed, antiPrime: isAntiPrimed };
  });
  return assignChipRef;
}
