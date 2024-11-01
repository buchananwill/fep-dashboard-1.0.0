import { Button, ButtonProps } from '@mantine/core';
import clsx from 'clsx';
import { memo } from 'react';
import { ArrowDownIcon } from '@heroicons/react/24/solid';

function RotationPrimeButtonInner(props: {
  canPrime?: boolean;
  canDrop: boolean;
  primed: boolean;
  fallBackColor: ButtonProps['color'];
  onClick?: () => void;
  textFade: string | undefined;
}) {
  return (
    <Button
      styles={{
        root: {
          padding: '0.25em 0.5em 0.25em'
        }
      }}
      autoContrast
      disabled={!props.canPrime}
      className={clsx(
        'w-fit min-w-0 px-1  opacity-100',
        !props.canDrop && 'data-[disabled]:bg-zinc-300'
      )}
      radius={'xs'}
      color={
        props.primed ? 'green' : props.canDrop ? 'blue' : props.fallBackColor
      }
      onClick={props.onClick}
    >
      <ArrowMemo
        className={clsx(
          'w-6 px-0 py-0.5',
          props.primed && 'animate-bounce-less',
          props.textFade,
          !props.canPrime && 'opacity-0'
        )}
      />
    </Button>
  );
}

const ArrowMemo = memo(ArrowDownIcon);
export const RotationPrimeButton = memo(RotationPrimeButtonInner);
