import { CarouselOptionStateInterface } from '@/components/carousel-groups/orders/_types';
import { useEffect, useMemo, useRef } from 'react';
import { useGlobalDispatch } from 'selective-context';
import {
  ConnectionVector,
  RotationConnectionMap
} from '@/components/carousel-groups/orders/components/RotationConnectionOverlay';
import { Coordinate } from '@/components/react-flow/generic/types';
import { HasId } from '@/api/types';
import { useResizeObserver, useViewportSize } from '@mantine/hooks';

export function useRotationOverlayPositioning(
  isPrimed: boolean,
  isAntiPrimed: boolean,
  entity: CarouselOptionStateInterface
) {
  // Chip location calculation condition: primed or anti-primed
  const assignChipRef = useRef<HTMLDivElement | null>(null);
  useViewportSize();
  // assignChipRef.current = ref.current;
  const { dispatchWithoutListen: dispatchConnectionMap } = useGlobalDispatch<
    Map<number, ConnectionVector>
  >(RotationConnectionMap);
  const primeState = useRef({ prime: false, antiPrime: false });

  const elementRef = assignChipRef.current;

  // const localNode: (Coordinate & HasId) | undefined = useMemo(() => {
  //   if (!elementRef) return undefined;
  //   const { top, left, width, height } = elementRef.getBoundingClientRect();
  //   return {
  //     x: left + width / 2,
  //     y: top + height / 2,
  //     id: entity.id
  //   };
  // }, [elementRef, entity]);
  const boundingClientRect = elementRef?.getBoundingClientRect();

  const localNode = {
    x: (boundingClientRect?.left ?? 0) + (boundingClientRect?.width ?? 0) / 2,
    y: (boundingClientRect?.top ?? 0) + (boundingClientRect?.height ?? 0) / 2,
    id: entity.id
  };

  /*
   *  Use prime/anti-prime to signal connection location.
   *  CURRENTLY: HAS TO RUN EVERY RENDER, IN CASE THE ORDER OF OPTIONS CHANGED.
   *  TODO: Track the carousel option order?
   * */
  useEffect(() => {
    const primeChange = primeState.current.prime !== isPrimed;
    const antiPrimeChange = primeState.current.antiPrime !== isAntiPrimed;

    if (
      localNode &&
      (primeChange || antiPrimeChange || isPrimed || isAntiPrimed)
    ) {
      dispatchConnectionMap((currentMap) => {
        let map = currentMap;
        const currentConnection = currentMap.get(
          entity.workProjectSeriesSchemaId
        );
        let currentSource = currentConnection?.source;
        let currentTarget = currentConnection?.target;
        // Start out with the update being the current
        let updatedConnection = currentConnection;

        // Check a series of conditions and maybe reassign...

        // Condition to set the local node as the source
        if (isPrimed && currentSource !== localNode) {
          updatedConnection = { ...updatedConnection, source: localNode };
        }
        // condition to remove the local node as the source
        else if (
          !isPrimed &&
          primeChange &&
          currentSource?.id === localNode.id
        ) {
          updatedConnection = { ...updatedConnection, source: undefined };
        }
        // condition to set the local node as the target
        else if (isAntiPrimed && currentTarget !== localNode) {
          updatedConnection = { ...updatedConnection, target: localNode };
        }
        // condition to remove the local node as the target
        else if (
          !isAntiPrimed &&
          antiPrimeChange &&
          currentTarget?.id === localNode.id
        ) {
          updatedConnection = { ...updatedConnection, target: undefined };
        }

        // If the references no longer match, we now update the map
        if (updatedConnection && currentConnection !== updatedConnection) {
          map = new Map(map);
          map.set(entity.workProjectSeriesSchemaId, updatedConnection);
        }
        return map;
      });
    }
    primeState.current = { prime: isPrimed, antiPrime: isAntiPrimed };
  });
  return assignChipRef;
}
