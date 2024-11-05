import React, { useCallback, useRef, useState } from 'react';

import { offset, useFloating } from '@floating-ui/react';
import clsx from 'clsx';
import { Badge, Button, ButtonProps } from '@mantine/core';

export function TwoStageClick({
  children,
  onClick,
  timeOutDelayMs = 2000,
  standardAppearance = 'subtle',
  primedColor = 'danger',
  primedMessage = 'Confirm delete?',
  className,
  size,
  ...props
}: {
  timeOutDelayMs?: number;
  standardAppearance?: ButtonProps['variant'];
  primedColor?: ButtonProps['color'];
  primedMessage?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & Pick<ButtonProps, 'children' | 'className' | 'size' | 'disabled'>) {
  const [clickPrimed, setClickPrimed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const { refs, floatingStyles } = useFloating({
    placement: 'right',
    middleware: [offset({ mainAxis: 10 })]
  });

  const guardClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (clickPrimed && onClick !== undefined) {
        onClick(e);
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
    [timeOutDelayMs, onClick, clickPrimed]
  );

  return (
    <div className={'inline-block h-fit w-fit'} ref={refs.setReference}>
      <Button
        className={clsx(
          'relative z-10 transition-colors duration-500',
          className
        )}
        color={clickPrimed ? primedColor : 'default'}
        variant={standardAppearance}
        onClick={guardClick}
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
          <Badge color={primedColor} className={''}>
            {primedMessage}
          </Badge>
        </div>
      )}
    </div>
  );
}
