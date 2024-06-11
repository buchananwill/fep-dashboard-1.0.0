'use client';
import { GenericDivProps } from '@/react-flow/components/nodes/BaseNode';
import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@nextui-org/button';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

export default function Drawer({
  children,
  buttonLabel,
  innerDivProps,
  whenOpen,
  whenClosed,
  ...props
}: GenericDivProps & {
  buttonLabel: string;
  innerDivProps?: Omit<GenericDivProps, 'children'>;
  whenOpen: string;
  whenClosed: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  let otherProps = innerDivProps;
  let classNameDefined = '';
  if (innerDivProps?.className) {
    const { className, ...rest } = innerDivProps;
    classNameDefined = className ?? '';
    otherProps = rest;
  }

  return (
    <div {...props}>
      <div className={'mb-2 flex justify-end'}>
        <Button
          endContent={
            <ChevronLeftIcon
              className={clsx(
                isOpen && '-rotate-90',
                'h-6 w-6 transition-transform'
              )}
            />
          }
          onPress={() => setIsOpen((open) => !open)}
        >
          {buttonLabel}
        </Button>
      </div>
      <div
        {...otherProps}
        className={clsx(isOpen ? whenOpen : whenClosed, classNameDefined)}
      >
        {children}
      </div>
    </div>
  );
}
