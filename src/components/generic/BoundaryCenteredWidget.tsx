'use client';
import { PropsWithChildren, useState } from 'react';
import { GenericDivProps } from '@/types';
import { useGlobalController } from 'selective-context';
import { navigationBreadcrumbs } from '@/components/navigation/NavigationBreadcrumbs';
import { JSX } from 'react/jsx-runtime';
import clsx from 'clsx';

export function BoundaryCenteredWidget({ children }: PropsWithChildren) {
  const [boundaryPosition, setBoundaryPosition] =
    useState<BoundaryPositionAttributes>(classNameAndStyles.bottom);
  const { className, style } = boundaryPosition;

  const { currentState } = useGlobalController<JSX.Element | null>({
    contextKey: navigationBreadcrumbs,
    initialValue: null,
    listenerKey: 'widget'
  });

  return (
    <div
      style={style}
      className={clsx(
        'fixed  z-40 flex flex-col items-center  bg-primary-300 bg-opacity-75 ',
        className
      )}
    >
      {children}
      {currentState ? currentState : <div className={'h-4'}></div>}
    </div>
  );
}

const BoundaryTypes = ['top', 'bottom', 'left', 'right'] as const;

type BoundaryType = (typeof BoundaryTypes)[number];
type BoundaryPositionAttributes = Pick<GenericDivProps, 'style' | 'className'>;
type BoundaryPosAttMap = {
  [key in BoundaryType]: BoundaryPositionAttributes;
};

const classNameAndStyles: BoundaryPosAttMap = {
  bottom: {
    className: 'bottom-0 left-1/2 rounded-t-full pb-4 px-4',

    style: { transform: 'translate(-50%, 0%)' }
  },
  top: {
    className: 'top-0 left-1/2  rounded-b-full pt-4',

    style: { transform: 'translate(-50%, 0%)' }
  },
  left: {
    className: ' left-0 top-1/2 rounded-r-full pl-4',

    style: { transform: 'translate(0%, -50%)' }
  },
  right: {
    className: ' right-0 top-1/2  rounded-r-full  pr-4',
    style: { transform: 'translate(0%, -50%)' }
  }
};
