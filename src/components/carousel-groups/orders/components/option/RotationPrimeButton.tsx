'use client';
import { Button, ButtonProps, Loader } from '@mantine/core';
import clsx from 'clsx';
import { memo, useTransition } from 'react';
import { ArrowDownIcon } from '@heroicons/react/24/solid';

function RotationPrimeButtonInner({
  canDrop,
  canPrime,
  fallBackColor,
  onClick,
  primed,
  textFade
}: {
  canPrime?: boolean;
  canDrop: boolean;
  primed: boolean;
  fallBackColor: ButtonProps['color'];
  onClick?: () => void;
  textFade: string | undefined;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      styles={{
        root: {
          padding: '0.25em 0.5em 0.25em'
        }
      }}
      autoContrast
      disabled={!canPrime}
      className={clsx(
        'w-fit min-w-0 px-1  opacity-100',
        !canDrop && 'data-[disabled]:bg-zinc-300'
      )}
      radius={'xs'}
      color={primed || pending ? 'green' : canDrop ? 'blue' : fallBackColor}
      onClick={() => {
        startTransition(() => {
          onClick && onClick();
        });
      }}
    >
      {pending ? (
        <Loader size={'xs'} className={'w-6'} color={'black'} />
      ) : (
        <ArrowMemo
          className={clsx(
            'w-6 px-0',
            // ' py-0.5',
            primed && 'animate-bounce-less',
            textFade,
            !canPrime && 'opacity-0'
          )}
        />
      )}
    </Button>
  );
}

const ArrowMemo = memo(ArrowDownIcon);
export const RotationPrimeButton = memo(RotationPrimeButtonInner);
