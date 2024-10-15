import React, { useCallback, useRef, useState } from 'react';

import { offset, useFloating } from '@floating-ui/react';
import { Button, ButtonProps } from '@nextui-org/button';

import { Chip } from '@nextui-org/chip';
import { PressEvent } from '@react-types/shared';
import clsx from 'clsx';

export function TwoStageClick({
  children,
  onPress,
  timeOutDelayMs = 2000,
  standardAppearance = 'ghost',
  primedAppearance = 'danger',
  primedMessage = 'Confirm delete?',
  className,
  size,
  ...props
}: {
  timeOutDelayMs?: number;
  standardAppearance?: 'light' | 'ghost';
  primedAppearance?: 'danger' | 'primary';
  primedMessage?: string;
} & Pick<
  ButtonProps,
  'children' | 'onPress' | 'className' | 'size' | 'isIconOnly' | 'isDisabled'
>) {
  const [clickPrimed, setClickPrimed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const { refs, floatingStyles } = useFloating({
    placement: 'right',
    middleware: [offset({ mainAxis: 10 })]
  });

  const guardClick = useCallback(
    (e: PressEvent) => {
      if (clickPrimed && onPress !== undefined) {
        onPress(e);
        setClickPrimed(false);
        if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current);
      } else {
        setClickPrimed(true);
        timeoutRef.current = setTimeout(
          () => setClickPrimed(false),
          timeOutDelayMs
        );
      }
    },
    [timeOutDelayMs, onPress, clickPrimed]
  );

  return (
    <div className={'inline-block h-fit w-fit'} ref={refs.setReference}>
      <Button
        className={clsx(
          'relative z-10 transition-colors duration-500',
          className
        )}
        color={clickPrimed ? primedAppearance : 'default'}
        variant={standardAppearance}
        size={size ?? 'sm'}
        onPress={guardClick}
        {...props}
      >
        {children}
      </Button>
      {clickPrimed && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={'z-10 h-fit w-fit rounded-full bg-white bg-opacity-100'}
        >
          <Chip color={primedAppearance} className={''}>
            {primedMessage}
          </Chip>
        </div>
      )}
    </div>
  );
}
