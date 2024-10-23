import { Button, ButtonProps } from '@nextui-org/button';
import clsx from 'clsx';
import { memo } from 'react';
import { ArrowDownIcon } from '@heroicons/react/24/solid';

function RotationPrimeButtonInner(props: {
  canPrime?: boolean;
  canDrop: boolean;
  primed: boolean;
  fallBackColor: ButtonProps['color'];
  onPress?: () => void;
  textFade: string | undefined;
}) {
  return (
    <Button
      isIconOnly
      isDisabled={!props.canPrime}
      className={clsx(
        'w-fit min-w-0 px-1  opacity-100',
        !props.canDrop && 'data-[disabled]:bg-default-300'
      )}
      color={
        props.primed
          ? 'success'
          : props.canDrop
            ? 'primary'
            : props.fallBackColor
      }
      onClick={props.onPress}
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
