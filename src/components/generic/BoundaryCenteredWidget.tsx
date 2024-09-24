'use client';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { GenericDivProps } from '@/types';
import { useGlobalController } from 'selective-context';
import { navigationBreadcrumbs } from '@/components/navigation/NavigationBreadcrumbs';
import { JSX } from 'react/jsx-runtime';
import clsx from 'clsx';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

export function BoundaryCenteredWidget({ children }: PropsWithChildren) {
  const [boundaryType, setBoundaryType] = useState<BoundaryType>('bottom');
  const dropCallback = useCallback((item: {}, monitor: DropTargetMonitor) => {
    const clientOffset = monitor.getClientOffset();
    if (clientOffset) {
      setBoundaryType(getQuadrant(clientOffset.x, clientOffset.y) ?? 'bottom');
    }
  }, []);

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Calculate the angle to rotate based on the viewport's aspect ratio
    const calculateRotation = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const angleInRadians = Math.atan2(height, width); // arctangent of height/width
      const angleInDegrees = (angleInRadians * 180) / Math.PI;
      setRotation(angleInDegrees);
    };

    // Initial calculation
    calculateRotation();

    // Update on resize
    window.addEventListener('resize', calculateRotation);
    return () => window.removeEventListener('resize', calculateRotation);
  }, []);

  const [{ isDragging }, drag] = useDrag({
    type: 'widget',
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  const [{}, drop] = useDrop({
    accept: 'widget',
    drop: dropCallback,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      currentItem: monitor.getItem(),
      currentItemType: monitor.getItemType()
    })
  });

  const classNameOverlay = ClassNameOverlay[boundaryType].className;
  const classNameWidget = ClassNameWidget[boundaryType].className;

  const { currentState } = useGlobalController<JSX.Element | null>({
    contextKey: navigationBreadcrumbs,
    initialValue: null,
    listenerKey: 'widget'
  });

  return (
    <div
      className={clsx(
        'pointer-events-none fixed left-0 top-0 z-40 flex h-[100vh] w-[100vw] bg-opacity-0',
        classNameOverlay
      )}
    >
      {isDragging &&
        drop(
          <div
            className={
              'quadrant-container pointer-events-auto z-50 animate-pulse opacity-50'
            }
          >
            <div
              className={'line'}
              style={{
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`
              }}
            ></div>
            <div
              className={'line'}
              style={{
                transform: `translate(-50%, -50%) rotate(-${rotation}deg)`
              }}
            ></div>
          </div>
        )}
      {drag(
        <div
          className={clsx(
            'pointer-events-auto z-40 flex w-fit  flex-col items-center bg-primary-100 bg-opacity-50 transition-colors-opacity hover:bg-opacity-100',
            classNameWidget
          )}
        >
          {boundaryType === 'top' ? (
            currentState ? (
              currentState
            ) : (
              <div className={'h-4'}></div>
            )
          ) : null}
          {children}
          {boundaryType !== 'top' ? (
            currentState ? (
              currentState
            ) : (
              <div className={'h-4'}></div>
            )
          ) : null}
        </div>
      )}
    </div>
  );
}

const BoundaryTypes = ['top', 'bottom', 'left', 'right'] as const;

type BoundaryType = (typeof BoundaryTypes)[number];
type BoundaryPositionAttributes = Pick<GenericDivProps, 'className'>;
type BoundaryPosAttMap = {
  [key in BoundaryType]: BoundaryPositionAttributes;
};

const ClassNameWidget: BoundaryPosAttMap = {
  bottom: {
    className: 'bottom-0 left-1/2 rounded-t-full pb-4 px-4'
  },
  top: {
    className: 'top-0 left-1/2  rounded-b-full pt-4 px-4'
  },
  left: {
    className: ' left-0 top-1/2 rounded-r-full pr-6 py-2 pl-2'
  },
  right: {
    className: ' right-0 top-1/2  rounded-l-full  pl-6 py-2 pr-2'
  }
};

const ClassNameOverlay: BoundaryPosAttMap = {
  bottom: { className: ' items-end justify-center' },
  top: { className: ' items-start justify-center' },
  left: { className: ' items-center justify-start' },
  right: { className: ' items-center justify-end' }
};

const getQuadrant = (x: number, y: number): BoundaryType | null => {
  if (typeof window === 'undefined') {
    // If window is not defined, return null
    return null;
  }

  const { innerWidth: width, innerHeight: height } = window;

  // Calculate bisectors
  const isAboveLeftDiagonal = y < (height / width) * x; // tl -> br diagonal
  const isAboveRightDiagonal = y < (-height / width) * x + height; // tr -> bl diagonal

  // Determine quadrant
  if (isAboveLeftDiagonal && isAboveRightDiagonal) {
    return 'top';
  } else if (!isAboveLeftDiagonal && !isAboveRightDiagonal) {
    return 'bottom';
  } else if (!isAboveLeftDiagonal && isAboveRightDiagonal) {
    return 'left';
  } else {
    return 'right';
  }
};
